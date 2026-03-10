<template>
  <div class="lista-buses">
  <div class="card-bus" v-for="bus in almacenarBusesActivos" :key="bus.id">
    <div class="bus-contenido">
      <span class="bus-icon">🚌</span>
      <div class="bus-info-id">
        <span class="bus-id"> Id - {{ bus.id }}</span>
      </div>
      <div class="bus-info-ruta">
            <span class="bus-ruta">{{ bus.ruta }}</span>
      </div>

    
    <div class="bus-info-placa">
      <span class="bus-placa">Placa: {{ bus.placa }}</span>
    </div>
   </div>
      <span class="bus-actividad">Activo</span>
    </div>
  </div>
</template>

<script >
import { buses } from "@/data/buses.js";

export default{
    data(){
        return{
            almacenarBusesActivos: buses
        }
    }

}
</script>

<style scoped>
    .card-bus{
        border: 2px solid black;
    }
</style>