<template>
  <div>
    <h1>Mapa en tiempo real</h1>
    <div id="map" style="height: 500px; width: 100%;"></div>
  </div>
</template>

<script>
import L from "leaflet"

export default {
  name: "MapaView",
  mounted() {
    const map = L.map("map").setView([0, 0], 2)

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors"
    }).addTo(map)

    // Detectar ubicación del usuario
    map.locate({ setView: true, maxZoom: 16 })

    // Cuando encuentra ubicación
    map.on("locationfound", (e) => {
      L.marker(e.latlng)
        .addTo(map)
        .bindPopup("Estás aquí 📍")
        .openPopup()

      L.circle(e.latlng, {
        radius: e.accuracy
      }).addTo(map)
    })

    // Si el usuario bloquea el permiso
    map.on("locationerror", () => {
      alert("No se pudo obtener tu ubicación. Activa el GPS o da permisos.")
    })
  }
}
</script>
