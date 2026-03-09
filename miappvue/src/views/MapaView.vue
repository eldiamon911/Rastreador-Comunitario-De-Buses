<template>
  <div class="contenedor">
    <h1>Mapa en tiempo real</h1>
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
      confirmarSesionMapa: localStorage.getItem('verificarGuardarRuta') === 'true'
    };
  },
  mounted() {
    // Centrar el mapa en Santa Marta
    const santaMartaBounds = L.latLngBounds([11.05, -74.30], [11.33, -74.05]);
    this.map = L.map("map", {
      maxBounds: santaMartaBounds,
      maxBoundsViscosity: 1.0,
      minZoom: 12,
      zoomAnimation: false,
    }).setView([11.2408, -74.1990], 13);

    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
      attribution: "© OpenStreetMap & CARTO",
      subdomains: "abcd",
      maxZoom: 20,
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
  },
  methods: {
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
        createMarker: () => null,
        lineOptions: {
          styles: [{ color: "blue", opacity: 0.7, weight: 5 }],
        },
      }).addTo(this.map);
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

          const velocidad = 0.01; // velocidad del bus

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

          }, 50);
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
  color: #0f2a44;
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
  font-family: bold;
  border-radius: 6px;
  padding: 4px 8px;
}
</style>