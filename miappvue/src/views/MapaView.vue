<template>
  <div>
    <h1>Mapa en tiempo real</h1>
    <div id="map" style="height: 500px; width: 100%;"></div>
  </div>
</template>

<script>
import L from "leaflet"
import "leaflet-routing-machine"
import { rutas } from "../data/rutas.js"

export default {
  name: "MapaView",

  mounted(){

    // API de OpenRouteService para calcular rutas por calles reales
    const API_KEY = "eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6IjJhMmVjZWQ4NzI3MjRhZjg4MTE2MDE4OGU2Y2RiZWEyIiwiaCI6Im11cm11cjY0In0="

    // límites del mapa para no salir de Santa Marta
    const santaMartaBounds = L.latLngBounds(
      [11.05, -74.30],
      [11.33, -74.05]
    )

    const map = L.map("map", {
      maxBounds: santaMartaBounds,
      maxBoundsViscosity: 1.0,
      minZoom: 12
    }).setView([11.2408, -74.1990], 13)

    // mapa base
    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
      attribution: "&copy; OpenStreetMap & CARTO",
      subdomains: "abcd",
      maxZoom: 20
    }).addTo(map)

    // dibujar todas las rutas usando calles reales
    rutas.forEach(ruta => {

      const waypoints = ruta.puntos.map(p =>
        L.latLng(p[0], p[1])
      )

      L.Routing.control({
        waypoints: waypoints,

        // calcula la ruta siguiendo calles
        router: L.Routing.openrouteservice(API_KEY),

        lineOptions: {
          styles: [{ color: ruta.color, weight: 5 }]
        },

        createMarker: () => null, // no mostrar marcadores
        addWaypoints: false,
        draggableWaypoints: false,
        routeWhileDragging: false,
        show: false // ocultar panel de navegación

      }).addTo(map)

    })

    // detectar ubicación del usuario
    map.locate({ setView: true, maxZoom: 16 })

    map.on("locationfound", (e) => {

      L.marker(e.latlng)
        .addTo(map)
        .bindPopup("Tú estás aquí 📍")
        .openPopup()

      L.circle(e.latlng, { radius: e.accuracy }).addTo(map)

    })

    map.on("locationerror", () => {
      alert("No se pudo obtener tu ubicación. Activa el GPS o da permisos.")
    })

  }
}
</script>