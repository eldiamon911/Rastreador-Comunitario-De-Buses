<template>


<div class="contenedor">
  <div class="lista-buses">
    <div class="intro-seccion">
      <h1>Panel de Buses Activos</h1>
      <p>Monitoreo de los buses que se encuentran operando actualmente en el sistema.</p>
      <div class="contador-buses">
        <span>{{ almacenarBusesActivos.length }} Buses en línea</span>
      </div>
    </div>


    <div class="card-bus" v-for="bus in almacenarBusesActivos" :key="bus.id">

      <div class="bus-izquierda">
        <span class="bus-icono">🚌</span>

        <div class="bus-info">
          <span class="bus-id">ID - {{ bus.id }}</span>
          <span class="bus-ruta">{{ bus.ruta }}</span>
          <span class="bus-placa">Placa: {{ bus.placa }}</span>
        </div>
      </div>

      <span class="bus-actividad"> Activo</span>

    </div>
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
.contenedor {
  background: linear-gradient(180deg, #c8d5ef 0%, #f4f7f6 100%);
  min-height: 100vh;       
  width: 100%;
  margin: 0;
  padding: 40px 0;         
}

.lista-buses{
  width:70%;
  margin:auto;
  
  
}

.card-bus{
  display:flex;
  justify-content:space-between;
  align-items:center;
  border: solid 1px white;

  background:#f7f7f7;
  padding:20px 25px;
  margin:24px 0;

  border-radius:25px;

 
  

}

.card-bus:hover{
  
  box-shadow:0 8px 18px rgba(0,0,0,0.12);
}


.bus-icono{
  font-size:42px;
  
}

.bus-info{
  display:flex;

  flex-direction:column;
  gap:4px;
}

.bus-id{
  font-weight:700;
  font-size:20px;
}

.bus-ruta{
  color:#2c2929;
  font-size:25px;
  font-weight:bold;

}

.bus-placa{
  font-size:25px;
  font-weight:bold;
  color:#2c2929;
}

.bus-actividad{
  background:darkgreen;
  color:white;
  padding:6px 14px;
  
  border-radius:20px;
  font-size:18px;
  font-weight: 700;
}

.intro-seccion {
  margin-top: 30px;


  margin-bottom: 10px;
  display: flex;
  flex-direction: column;

  align-items: center;
}

.intro-seccion h1 {
  font-size: 40px;
  margin-bottom: 5px;

  color: #333;
}

.intro-seccion p {
  font-size: 20px;

  color: #302e2e;
  margin-bottom: 10px;
}

.contador-buses {
  font-size: 20px;
  font-weight: bold;
  color: #1e3a8a;


}

</style>