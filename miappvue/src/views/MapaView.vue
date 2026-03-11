<template>
  <div class="contenedor">
    <h1>Mapa en tiempo real</h1>
    <div class="stats">

  <div class="mini-card" v-on:click="mostrarBusesActivos">
    <div class="icon">🚌</div>
    <h2>{{cantidadBuses}}</h2>
    <p>Buses activos</p>
  </div>

  <div class="mini-card" v-on:click="mostrarBusesActivos">
    <div class="icon">🗺</div>
    <h2>{{cantidadBuses}}</h2>
    <p>Rutas disponibles</p>
  </div>

</div>
    <div id="map"></div>
     <!-- Panel de información del bus seleccionado -->
    <div v-if="busSeleccionado" class="panelBus" >
<div class="contenedor-icono-reportes" v-on:click="irAReportes" v-show="confirmarSesionMapa">
  <i class='bx bx-chat'></i>  
</div>
      <h2>🚌 Bus {{ busSeleccionado.ruta }}</h2>
      <p><b>Conductor:</b> {{ busSeleccionado.conductor }}</p>
      <p><b>Placa:</b> {{ busSeleccionado.placa }}</p>
      <p><b>Capacidad:</b> {{ busSeleccionado.capacidad }} pasajeros</p>
      <button @click="cerrarPanel">Cerrar</button>
      <button v-show="confirmarSesionMapa" v-on:click="guardarRuta">Guardar ruta</button>
    </div>
  </div>
</template>

<script>
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-rotatedmarker";
import "leaflet-routing-machine";
import { rutas } from "../data/rutas.js";
import { buses } from "@/data/buses.js";

export default {
  data() {
    return {
      map: null,
      busSeleccionado: null,
      capaRutas: null,
      rutaActiva: null,
      intervalosBuses: [],
      busesMarkers: [],
      confirmarSesionMapa: localStorage.getItem('verificarGuardarRuta') === 'true',
      cantidadBuses: buses.length
      
    };
  },
  mounted() {
    // Centrar el mapa en Santa Marta
    const santaMartaBounds = L.latLngBounds([11.00, -74.28], [11.32, -74.12]);
    this.map = L.map("map", {
      maxBounds: santaMartaBounds,
      maxBoundsViscosity: 0.9,
      minZoom: 11,
      zoomAnimation: false,
    }).setView([11.18, -74.21], 12);

    //Mapa nuevo actualizado con tiles de Esri para mejor rendimiento y apariencia
    L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}", {
      attribution: "Tiles Esri",
      maxZoom: 19,
    }).addTo(this.map);

    this.capaRutas = L.layerGroup().addTo(this.map);

    // Crear y animar todos los buses
    buses.forEach(bus => {
      const ruta = rutas.find(r => r.nombre.startsWith(bus.ruta));
      if (!ruta) return;

      const busIcon = L.icon({
        iconUrl: "https://cdn-icons-png.flaticon.com/512/3448/3448339.png",
        iconSize: [40, 40],
        iconAnchor: [20, 20],
      });

      const marker = L.marker(bus.posicion, { icon: busIcon, rotationAngle: 0 }).addTo(this.map);
      marker.bindTooltip(bus.ruta, { permanent: true, direction: "top" });

      this.busesMarkers.push({
        bus: bus,
        marker: marker,
        ruta: ruta
      });

      // Click en bus para mostrar panel
      marker.on("click", () => {
        this.busSeleccionado = bus;
        this.mostrarRuta(ruta);
      });

      // Animar bus
      this.animarBus(marker, ruta);
    });

    // Ubicación usuario
    if(this.map){
      this.map.locate({ setView: true, maxZoom: 16 });
    }
    this.map.on("locationfound", e => {
      L.marker(e.latlng).addTo(this.map).bindPopup("Tú estás aquí 📍").openPopup();
      L.circle(e.latlng, { radius: e.accuracy }).addTo(this.map);
    });
    this.map.on("locationerror", () => alert("No se pudo obtener tu ubicación. Activa el GPS."));

    // Obtener la ruta seleccionada desde la vista de rutas guardadas
    const rutaBus = this.$route.query.rutaBus;

    if(rutaBus){
      const rutaEncontrada = rutas.find(r => r.nombre.startsWith(rutaBus))
      if(rutaEncontrada){
        this.mostrarRuta(rutaEncontrada);

        setTimeout(() => {
          this.enfocarBus(rutaBus);
        }, 1000);
      }
    }
  },
  methods: {
    mostrarBusesActivos: function(){
      this.$router.push("/busesActivos")
    },
    irAReportes: function(){
      this.$router.push("/reportes")
    },
    //Guarda la ruta
    guardarRuta: function(){
      const nombreAsignado = prompt("¿Como quieres que se llame esta ruta?")
      if (nombreAsignado && nombreAsignado.trim() !== "") {
        const almacenarRutas= {
          id: Date.now(),
          nombreRuta: nombreAsignado,
          rutaBus: this.busSeleccionado.ruta,
          placa: this.busSeleccionado.placa,
        }

        const listaGuardarRuta = JSON.parse(localStorage.getItem('rutasMasUsadas')) || [];
        listaGuardarRuta.push(almacenarRutas)
        localStorage.setItem('rutasMasUsadas', JSON.stringify(listaGuardarRuta))
        alert("Su ruta se guardo correctamente")
      }
    },
    // metodo para cerrar el panel de información del bus y eliminar la ruta activa del mapa
    cerrarPanel() {
      this.busSeleccionado = null;
      if (this.rutaActiva) {
        this.rutaActiva.remove();
        this.rutaActiva = null;
      }
    },

    // metodo para mostrar la ruta del bus seleccionado en el mapa utilizando Leaflet Routing Machine
    mostrarRuta(ruta) {
      const coordenadas = ruta.puntos.map(p => L.latLng(p[0], p[1]));

      if(this.rutaActiva){
        this.rutaActiva.remove();
        this.rutaActiva = null;
      }

      this.rutaActiva = L.Routing.control({
        waypoints: coordenadas,
        router: L.Routing.osrmv1({
          serviceUrl: "https://router.project-osrm.org/route/v1",
        }),
        addWaypoints: false,
        draggableWaypoints: false,
        routeWhileDragging: false,
        show: false,
        itinerary: false,
        collapsible: true,
        createMarker: () => null,
        lineOptions: {
          styles: [{ color: "#1d4ed8", opacity: 0.95, weight: 6}],
        },
      }).addTo(this.map);
    },
    //enfoque en la ruta del bus seleccionado
    enfocarBus(rutaBus){
      const busEncontrado = this.busesMarkers.find(b => b.bus.ruta.startsWith(rutaBus));

      if(!busEncontrado) return;

      const marker = busEncontrado.marker;

      this.map.setView(marker.getLatLng(), 15, { animate: true });

      this.busSeleccionado = busEncontrado.bus;

      const iconoResaltado = L.icon({
        iconUrl: "https://cdn-icons-png.flaticon.com/512/3448/3448339.png",
        iconSize: [50, 50],
        iconAnchor: [25, 25],
        className: "icono-resaltado"
      });

      marker.setIcon(iconoResaltado);
    },
    // metodo para animar el bus a lo largo de su ruta utilizando las coordenadas de la ruta y actualizando la posición del marcador cada cierto tiempo
    animarBus(marker, ruta) {
      const puntos_de_referencia = ruta.puntos.map(p => L.latLng(p[0], p[1]));
      
      const router = L.Routing.osrmv1({
        serviceUrl: "https://router.project-osrm.org/route/v1",
      });
      // Obtener la ruta entre los puntos de referencia y animar el bus a lo largo de esa ruta
      router.route(
        puntos_de_referencia.map(p => ({latLng: p})),
        (err, routes) => {
          
          if (err) {
            console.error("Error calculando la ruta:", err);
            return;
          }

          const coordenadas = routes[0].coordinates;

          let segmento = 0;
          let progreso = 0;

          const velocidad = 0.0025; // velocidad del bus

          // Animar el bus moviendo el marcador a lo largo de las coordenadas de la ruta cada 1.2 segundos
          const intervalo = setInterval(() => {

            if (!this.map) return;
            if (!marker) return;

            const actual = coordenadas[segmento];
            const siguiente = coordenadas[(segmento + 1) % coordenadas.length];

            if (!actual || !siguiente) {
              segmento = 0;
              progreso = 0;
              return;
            }

            //Interpolacion entre puntos para un movimiento suave del bus
            const lat = actual.lat + (siguiente.lat - actual.lat) * progreso;
            const lng = actual.lng + (siguiente.lng - actual.lng) * progreso;
            marker.setLatLng([lat, lng]);

            //rotacion del marcador para que apunte en la dirección del movimiento
            const dx = siguiente.lng - actual.lng;
            const dy = siguiente.lat - actual.lat;

            const angulo = Math.atan2(dy, dx) * (180 / Math.PI);
            marker.setRotationAngle(angulo);

            progreso += velocidad;

            if(progreso >= 1) {
              progreso = 0;
              segmento ++;
            }

            if (segmento >= coordenadas.length - 1) {
              segmento = 0;
            }

          }, 30);
          this.intervalosBuses.push(intervalo);
        }
      );
    },
  },
  // metodo para limpiar los intervalos de animación de los buses cuando el componente se desmonta para evitar fugas de memoria
  beforeUnmount() {
    this.intervalosBuses.forEach(i => clearInterval(i));
    this.intervalosBuses = [];

    if(this.map){
      this.map.off();
      this.map.remove();
      this.map = null;
    }
  },
};
</script>

<style scoped>
.stats{
  display: flex;
  justify-content: center;
  gap: 25px;
  margin: 20px 0;
}

.mini-card{
  width: 300px;
  background: white;
  border-radius: 12px;
  padding: 15px;
  text-align: center;
  box-shadow: 0 4px 10px rgba(12, 65, 190, 0.1);
  transition: transform 0.2s ease;
}

.mini-card:hover{
  transform: translateY(-5px);
}

.icon{
  font-size: 28px;
}

.mini-card h2{
  font-size: 28px;
  margin: 5px 0;
}

.mini-card p{
  font-size: 14px;
  color: #555;
}
/* estilos para el mapa y el panel de información del bus */
#map {
  height: 500px;
  width: 100%;
  border-radius: 15px;
  overflow: hidden;
  border: 3px solid #1e40af;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

.contenedor {
  background: #f8fbff;
  min-height: 100vh;
  padding: 20px;
}

h1{
  color: #0f4413;
  text-align: center;
  margin-bottom: 20px;
  font-weight: 600;
}

.panelBus {
  position: absolute;
  top: 120px;
  right: 20px;
  width: 260px;
  background: white;
  padding: 18px;
  border-radius: 12px;
  border-top: 5px solid #2563eb;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  z-index: 1000;
}
.leaflet-routing-container {
  display: none !important;
}

.panelBus h2 {
  color: #1e3a8a;
  margin-bottom: 10px;
}

.panelBus p {
  color: #334155;
  margin: 6px 0;
  font-size: 14px;
}

.panelBus button {
  width: 100%;
  margin-top: 10px;
  background: #2563eb;
  color: white;
  border: none;
  padding: 8px;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.2s;
}

.panelBus button:hover {
  background: #1e40af;
}

.panelBus button:last-child {
  background: #facc15;
  color: #1e293b;
}

.panelBus button:last-child:hover {
  background: #eab308;
}

.leaflet-tooltip {
  background: #1e40af;
  color: white;
  border: none;
  font-weight: bold;
  border-radius: 6px;
  padding: 4px 8px;
}
</style>