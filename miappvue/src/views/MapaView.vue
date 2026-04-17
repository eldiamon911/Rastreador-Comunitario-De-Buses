  <template>
    <div class="contenedor">
      <h1>Mapa en tiempo real</h1>

      <div class="buscador">
        <input v-model="filtroRuta" @input="buscarRuta" placeholder="🔎 Buscar ruta (ej: SM101)" />
        <button @click="irAMiUbicacion">📍 Mi ubicación</button>
      </div>

      <div class="stats">
        <div class="mini-carta" v-on:click="mostrarBusesActivos">
          <div class="icon">🚌</div>
          <h2>{{ cantidadBuses }}</h2>
          <p>Buses activos</p>
        </div>

        <div class="mini-carta" v-on:click="verRutasDisponibles" >
          <div class="icon">🗺</div>
          <h2>{{ rutasDisponibles }}</h2>
          <p>Rutas disponibles</p>
        </div>
      </div>

      <div id="map"></div>

      <div v-if="busSeleccionado" class="panelBus">

        <div class="contenedor-icono-reportes" v-on:click="irAReportes" v-if="confirmarSesionMapa">
          <i class='bx bx-chat'></i>
        </div>

        <h2>🚌 Bus {{ busSeleccionado.ruta }}</h2>
        <p><b>Conductor:</b> {{ busSeleccionado.conductor }}</p>
        <p><b>Placa:</b> {{ busSeleccionado.placa }}</p>
        <p><b>Capacidad:</b> {{ busSeleccionado.capacidad }} pasajeros</p>
        <p><b>Estado:</b> {{ estadoDeLosBuses }}</p>

        <button @click="cerrarPanel">Cerrar</button>
        <button v-if="confirmarSesionMapa" v-on:click="guardarRuta">Guardar ruta</button>

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
  import { paradas } from "@/data/paradas.js";

  export default {

    data() {
      return {
        map: null,
        mapaActivo: true,
        busSeleccionado: null,
        estadoDeLosBuses: "En movimiento",
        rutaActiva: null,
        intervalosBuses: [],
        busesMarkers: [],
        confirmarSesionMapa: localStorage.getItem('SesionActiva') === 'true',
        cantidadBuses: buses.length,
        rutasDisponibles: rutas.length,
        usuarioUbicacion: null,
        paradaCercanaMarker: null,
        filtroRuta: "",
        coloresRuta: [
          "#2563eb",
          "#dc2626",
          "#16a34a",
          "#9333ea",
          "#f59e0b",
          "#0891b2"
        ]
      }
    },

    mounted() {
      const santaMartaBounds = L.latLngBounds([11.00, -74.28], [11.32, -74.12]);

      this.map = L.map("map", {
        maxBounds: santaMartaBounds,
        maxBoundsViscosity: 0.9,
        minZoom: 11
      }).setView([11.18, -74.21], 12);

      L.tileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
        { maxZoom: 19 }
      ).addTo(this.map);

      buses.forEach((bus, index) => {
        const codigoBus = bus.ruta.split(' ')[0];
        const ruta = rutas.find(r => r.nombre.startsWith(codigoBus));
        if (!ruta) return;

        const busIcon = L.icon({
          iconUrl: "https://cdn-icons-png.flaticon.com/512/3448/3448339.png",
          iconSize: [40, 40],
          iconAnchor: [20, 20]
        });

        const marker = L.marker(bus.posicion, {
          icon: busIcon,
          rotationAngle: 0
        }).addTo(this.map);

        marker.bindTooltip(bus.ruta, { permanent: true, direction: "top" });

        this.busesMarkers.push({ bus, marker, ruta });

        marker.on("click", () => {
          this.confirmarSesionMapa = localStorage.getItem('SesionActiva') === 'true';
          this.busSeleccionado = bus;
          this.estadoDeLosBuses = bus.estado;
          this.mostrarRuta(ruta, index);
          marker.setZIndexOffset(1000);
        });

        this.animarBus(marker, ruta, bus);
      });

      this.map.locate({ setView: true, maxZoom: 16 });

      const self = this;

      this.map.on("locationfound", function (e) {
        self.usuarioUbicacion = e.latlng;

        L.marker(e.latlng)
          .addTo(self.map)
          .bindPopup("📍 Tu estás aquí")
          .openPopup();

        L.circle(e.latlng, { radius: e.accuracy }).addTo(self.map);

        self.buscarBusMasCercano();
        self.buscarParadaMasCercana();
      });

      this.map.on("locationerror", () => {
        alert("No se pudo obtener tu ubicación. Activa el GPS");
      });
    },

    methods: {                                        // ← ABRE methods

      mostrarBusesActivos() {
        this.$router.push("/busesActivos")
      },

      irAReportes() {
        this.$router.push("/reportes")
      },

      verRutasDisponibles() {
        this.$router.push("/administrarRutas")
      },

      irAMiUbicacion() {
        if (!this.usuarioUbicacion) return;
        this.map.setView(this.usuarioUbicacion, 16, { animate: true });
      },

      mostrarRuta(ruta, index) {
        const coordenadas = ruta.puntos.map(p => L.latLng(p[0], p[1]));

        if (this.rutaActiva) {
          this.rutaActiva.remove();
          this.rutaActiva = null;
        }

        if (!this.map) return;

        const color = this.coloresRuta[index % this.coloresRuta.length];

        this.rutaActiva = L.Routing.control({
          waypoints: coordenadas,
          router: L.Routing.osrmv1({
            serviceUrl: "https://router.project-osrm.org/route/v1"
          }),
          addWaypoints: false,
          draggableWaypoints: false,
          show: false,
          createMarker: () => null,
          lineOptions: {
            styles: [{ color: color, weight: 6, opacity: 0.95 }]
          }
        }).addTo(this.map);

        this.rutaActiva.on('routingerror', () => { });
      },

      buscarBusMasCercano() {
        if (!this.usuarioUbicacion) return;

        let busMasCercano = null;
        let distanciaMinima = Infinity;

        this.busesMarkers.forEach(b => {
          const distancia = this.map.distance(
            this.usuarioUbicacion,
            b.marker.getLatLng()
          );
          if (distancia < distanciaMinima) {
            distanciaMinima = distancia;
            busMasCercano = b;
          }
        });

        if (!busMasCercano) return;

        const distanciaKm = (distanciaMinima / 1000).toFixed(2);
        busMasCercano.marker.bindPopup(
          `🚍 Bus ${busMasCercano.bus.ruta}<br>📏 ${distanciaKm} km`
        ).openPopup();
      },

      buscarParadaMasCercana() {
        if (!this.usuarioUbicacion) return;

        let paradaMasCercana = null;
        let distanciaMinima = Infinity;

        paradas.forEach(parada => {
          const distancia = this.map.distance(
            this.usuarioUbicacion,
            parada.coord
          );
          if (distancia < distanciaMinima) {
            distanciaMinima = distancia;
            paradaMasCercana = parada;
          }
        });

        if (!paradaMasCercana) return;

        if (this.paradaCercanaMarker) {
          this.map.removeLayer(this.paradaCercanaMarker);
        }

        const icono = L.icon({
          iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
          iconSize: [40, 40]
        });

        this.paradaCercanaMarker = L.marker(
          paradaMasCercana.coord,
          { icon: icono }
        ).addTo(this.map);

        const distancia = distanciaMinima.toFixed(0);
        this.paradaCercanaMarker.bindPopup(
          `🛑 <b>Parada más cercana</b><br>
          ${paradaMasCercana.nombre}<br>
          📏 ${distancia} metros`
        ).openPopup();
      },

      animarBus(marker, ruta, bus) {
        const puntos = ruta.puntos.map(p => L.latLng(p[0], p[1]));
        let i = 0;

        const moverAlSiguiente = () => {
          if (!this.map || !this.mapaActivo) return;

          const actual = puntos[i];
          const siguiente = puntos[(i + 1) % puntos.length];

          // verifica si el bus está cerca de alguna parada (menos de 80 metros)
          const cercaDeParada = paradas.some(p => {
            const distancia = this.map.distance(actual, L.latLng(p.coord[0], p.coord[1]));
            return distancia < 80;
          });

          // actualiza el estado del bus
          bus.estado = cercaDeParada ? "En parada 🛑" : "En movimiento 🚌";

          // si este bus está seleccionado actualiza el estado visible en el panel
          if (this.busSeleccionado && this.busSeleccionado.id === bus.id) {
            this.estadoDeLosBuses = bus.estado;
          }

          const angulo = Math.atan2(
            siguiente.lng - actual.lng,
            siguiente.lat - actual.lat
          ) * (180 / Math.PI);

          marker.setLatLng(siguiente);

          if (marker.setRotationAngle) {
            marker.setRotationAngle(angulo);
          }

          i = (i + 1) % puntos.length;
        };

        const intervalo = setInterval(moverAlSiguiente, 1500);
        this.intervalosBuses.push(intervalo);
      },

      buscarRuta() {
        if (!this.filtroRuta) return;

        const texto = this.filtroRuta.toUpperCase();
        const busEncontrado = this.busesMarkers.find(b =>
          b.bus.ruta.toUpperCase().includes(texto)
        );

        if (!busEncontrado) return;

        this.map.setView(busEncontrado.marker.getLatLng(), 16, { animate: true });
        busEncontrado.marker.openPopup();
        this.busSeleccionado = busEncontrado.bus;
      },

      cerrarPanel() {
        this.busSeleccionado = null;

        if (this.rutaActiva) {
          this.rutaActiva.remove();
          this.rutaActiva = null;
        }
      },

      guardarRuta() {
        if (!this.busSeleccionado) return;

        const nombreRuta = prompt("📝 Ponle un nombre a esta ruta (ej: Al trabajo, A la universidad):");
        if (!nombreRuta || nombreRuta.trim() === "") return;

        const rutasGuardadas = JSON.parse(localStorage.getItem('rutasMasUsadas')) || [];

        const nuevaRuta = {
          id: Date.now(),
          nombreRuta: nombreRuta.trim(),
          rutaBus: this.busSeleccionado.ruta,
          placa: this.busSeleccionado.placa,
          conductor: this.busSeleccionado.conductor,
          capacidad: this.busSeleccionado.capacidad
        };

        rutasGuardadas.push(nuevaRuta);
        localStorage.setItem('rutasMasUsadas', JSON.stringify(rutasGuardadas));
        alert("✅ Ruta guardada correctamente como: " + nuevaRuta.nombreRuta);
      }

    },                                                // ← CIERRA methods

    beforeUnmount() {
      this.mapaActivo = false;
      this.intervalosBuses.forEach(i => clearInterval(i));
      this.intervalosBuses = [];

      if (this.map) {
        this.map.stop();

        if (this.rutaActiva) {
          this.rutaActiva.off();
          try {
            this.rutaActiva.remove();
          } catch (e) {
            // intencional: silencia error si la petición HTTP sigue en vuelo
          }
          this.rutaActiva = null;
        }

        this.busesMarkers.forEach(b => {
          b.marker.off();
          this.map.removeLayer(b.marker);
        });
        this.busesMarkers = [];

        if (this.paradaCercanaMarker) {
          this.map.removeLayer(this.paradaCercanaMarker);
          this.paradaCercanaMarker = null;
        }

        this.map.off();
        this.map.remove();
        this.map = null;
      }
    }

  }
</script>

<style scoped>
.contenedor {
  min-height: 100vh;
  padding: 30px;
  background: linear-gradient(135deg, #eef5ff, #dbeafe, #eff6ff);
  font-family: 'Segoe UI', sans-serif;
  position: relative;
}

.contenedor::before {
  content: "";
  position: absolute;
  top: -100px;
  left: -100px;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, #3b82f6 0%, transparent 70%);
  opacity: 0.15;
}

.contenedor::after {
  content: "";
  position: absolute;
  bottom: -120px;
  right: -120px;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, #2563eb 0%, transparent 70%);
  opacity: 0.15;
}

h1 {
  text-align: center;
  font-weight: 700;
  color: #1e3a8a;
  margin-bottom: 25px;
  letter-spacing: 1px;
}

.stats {
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-bottom: 25px;
  flex-wrap: wrap;
}

.mini-carta {
  width: 260px;
  background: white;
  border-radius: 16px;
  padding: 20px;
  text-align: center;
  border: 1px solid #e5e7eb;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.08),
    0 2px 6px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  cursor: pointer;
}

.mini-carta:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.12);
}

.icon {
  font-size: 36px;
  margin-bottom: 5px;
}

.mini-carta h2 {
  font-size: 32px;
  margin: 6px 0;
  color: #2563eb;
}

.mini-carta p {
  font-size: 14px;
  color: #64748b;
}

#map {
  height: 520px;
  width: 100%;
  border-radius: 18px;
  overflow: hidden;
  border: 3px solid #1e40af;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  transition: 0.3s;
  margin-bottom: 80px;
  margin-top: 10px;
}

#map:hover {
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
}

.panelBus {
  position: absolute;
  top: 130px;
  right: 25px;
  width: 280px;
  background: white;
  padding: 20px;
  border-radius: 14px;
  border-top: 6px solid #2563eb;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.25);
  z-index: 1000;
  animation: aparecerPanel 0.35s ease;
  
}

@keyframes aparecerPanel {
  from {
    transform: translateX(40px);
    opacity: 0;
  }

  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.panelBus h2 {
  color: #1e3a8a;
  margin-bottom: 12px;
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
  padding: 9px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
}

.panelBus button:hover {
  background: #1e40af;
  transform: scale(1.02);
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

:deep(.leaflet-routing-container) {
  display: none !important;
}

.icono-resaltado {
  filter: drop-shadow(0 0 8px rgba(37, 99, 235, 0.7));
}

.contenedor-icono-reportes {
  position: absolute;
  top: -12px;
  right: -12px;
  background: #2363eb;
  color: white;
  width: 35px;
  height: 35px;
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 18px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
}

.contenedor-icono-reportes:hover {
  background: #1e40af;
  transform: scale(1.1);
}

.buscador {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 15px;
}

.buscador input {
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  width: 220px;
}

.buscador button {
  background: #2563eb;
  color: white;
  border: none;
  padding: 10px 14px;
  border-radius: 8px;
  cursor: pointer;
}

.buscador button:hover {
  background: #1e40af;
}
</style>