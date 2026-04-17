<template>
  <header class="header-principal">  
    
    <div class="seccion-izquierda">
      <menu-hamburguesa-componente />

      <div class="logo" v-on:click="volverInicio">
        <img class="logo-icono" src="../assets/logo-bus.png" alt="Logo bus">
        <img class="logo-texto" src="../assets/tipografia-pronto.png" alt="Tipografia">
      </div>
    </div>

    <nav class="contenedor-menu">
      <div class="buses-activos">
        🟢 {{ BusesActivos }} Buses en línea
      </div>

      <router-link to="/login">
        <button class="boton-sesion" v-if="!logueado">Iniciar sesion</button>
      </router-link>
      <router-link to="/registro" class="router-registro">
        <button v-if="!logueado" class="boton-registro">Registrarse</button>
      </router-link>

      <section class="menu-rayitas"></section>
    </nav>

  </header>

  <div class="texto-rodante">
    <span>
      ¡Pronto llegó a Santa Marta, consulta la ubicación de tus bus en tiempo real!ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ
      La información que necesitas para moverte está ahora en un solo lugarㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ
      La movilidad en Santa Marta ahora es más inteligenteㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ
      Optimiza tu tiempo y reduce la espera en las paradasㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ
    </span>
  </div>
</template>


<script>
import { buses } from '@/data/buses'
import MenuHamburguesaComponente from './MenuHamburguesaComponente.vue';

export default {
  name: "AppNavbar",
  components: {
    MenuHamburguesaComponente
  },

  data() {
    return {
      logueado: false,
      contenidoMenu: false,
      buses: buses
    }
  },

  computed: {
    BusesActivos() {
      return this.buses.length
    }
  },

  mounted() {
  //Aca se revisa si hay una sesion activa cuando se recargue la pagina
    this.verificarSesion();
  },
  watch: {
    //ejecuta cada vez que cambia de pestaña (ME tenia loco esta parte)
    $route() {
      this.verificarSesion();
      this.contenidoMenu = false
    }
  },
  methods: { 
    volverInicio: function(){
      this.$router.push("/")
    },
    //funcion para el mounted y watch
    verificarSesion() {
      const mostrador = localStorage.getItem('SesionActiva');
      if (mostrador === 'true') {
        this.logueado = true;
      } else {
        this.logueado = false;
      }
    },
      
  } 
} 
</script>


<style>

* {                             /* aqui el body (celedon)*/ 
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.header-principal {
  display: flex;
  align-items: center;
  justify-content: space-between;      /* mantiene izquierda y derecha en sus extremos (celedon)*/
  background: #1e3a8a;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  padding: 3px 140px;
  position: relative;
  z-index: 99999;
}

.seccion-izquierda {
  display: flex;
  align-items: center;
  gap: 30px;                    /* Espacio entre el menú hamburguesa y el logo (celedon)*/

}

.logo {
  display: flex;
  align-items: center;
}

.logo-icono {
  height: 65px;                      /* tamaño logo (celedon)*/        
  cursor: pointer;
}

.logo-texto {
  height: 48px;                       /* tamaño tipografia logo (celedon)*/   
  cursor: pointer;
}

.buses-activos {
  color: white;
  font-size: 14px;
  font-weight: bold;
  display: flex;
  align-items: center;
  margin-right: 60px;
}

.texto-rodante {
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  color: white;
  background-color: #1387d4;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bold;
  padding: 5px 0;
}

.texto-rodante span {
  display: inline-block;
  padding-left: 100%;
  animation: mover 50s linear infinite;           /* velocidad en la que se mueve el texto rodante  (celedon)*/         
}

@keyframes mover {
  100% { transform: translateX(-100%); }          
}

.contenedor-menu {
  display: flex;
  align-items: center;
  gap: 25px;                       /* espaciado entre botones "iniciar sesion" y "registrarse"  (celedon)*/ 
}

.boton-sesion, .boton-registro {
  padding: 8px 12px;
  border-radius: 15px;
  background-color: #ffd500;
  color: black;
  cursor: pointer;
  border: none;
}

.boton-sesion:hover, .boton-registro:hover {
  background: rgba(224, 195, 30, 0.973);
}
</style>