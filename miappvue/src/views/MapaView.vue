<template>
  <div class="contenedor">
    <h1>Mapa en tiempo real</h1>
    <div id="map"></div>
     <!-- Panel de información del bus seleccionado -->
    <div v-if="busSeleccionado" class="panelBus">
      <h2>🚌 Bus {{ busSeleccionado.ruta }}</h2>
      <p><b>Conductor:</b> {{ busSeleccionado.conductor }}</p>
      <p><b>Placa:</b> {{ busSeleccionado.placa }}</p>
      <p><b>Capacidad:</b> {{ busSeleccionado.capacidad }} pasajeros</p>
      <button @click="cerrarPanel">Cerrar</button>
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
    };
  },
  mounted() {
    // Centrar el mapa en Santa Marta
    const santaMartaBounds = L.latLngBounds([11.05, -74.30], [11.33, -74.05]);
    this.map = L.map("map", {
      maxBounds: santaMartaBounds,
      maxBoundsViscosity: 1.0,
      minZoom: 12,
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
    this.map.locate({ setView: true, maxZoom: 16 });
    this.map.on("locationfound", e => {
      L.marker(e.latlng).addTo(this.map).bindPopup("Tú estás aquí 📍").openPopup();
      L.circle(e.latlng, { radius: e.accuracy }).addTo(this.map);
    });
    this.map.on("locationerror", () => alert("No se pudo obtener tu ubicación. Activa el GPS."));
  },
  methods: {
    // metodo para cerrar el panel de información del bus y eliminar la ruta activa del mapa
    cerrarPanel() {
      this.busSeleccionado = null;
      if (this.rutaActiva) {
        this.map.removeControl(this.rutaActiva);
        this.rutaActiva = null;
      }
    },
    // metodo para mostrar la ruta del bus seleccionado en el mapa utilizando Leaflet Routing Machine
    mostrarRuta(ruta) {
      const coordenadas = ruta.puntos.map(p => L.latLng(p[0], p[1]));

      if(this.rutaActiva){
        this.map.removeControl(this.rutaActiva);
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
        itineray: false,
        collapsible: true,
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

          let index = 0;
          // Animar el bus moviendo el marcador a lo largo de las coordenadas de la ruta cada 1.2 segundos
          const intervalo = setInterval(() => {
            const actual = coordenadas[index];
            const siguiente = coordenadas[(index + 1) % coordenadas.length];

            marker.setLatLng([actual.lat, actual.lng]);

            const dx = siguiente.lng - actual.lng;
            const dy = siguiente.lat - actual.lat;

            const angulo = Math.atan2(dy, dx) * (180 / Math.PI);
            marker.setRotationAngle(angulo);
            index = (index + 1) % coordenadas.length;
          }, 200);
          this.intervalosBuses.push(intervalo);
        }
      );
    },
  },
  // metodo para limpiar los intervalos de animación de los buses cuando el componente se desmonta para evitar fugas de memoria
  beforeUnmount() {
    this.intervalosBuses.forEach(i => clearInterval(i));
  },
};
</script>

<style scoped>  
/* estilos para el mapa y el panel de información del bus */
#map {
  height: 500px;
  width: 100%;
}

.panelBus {
  position: absolute;
  top: 120px;
  right: 20px;
  width: 250px;
  background: white;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  z-index: 1000;
}
.leaflet-routing-container {
  display: none !important;
}
</style>