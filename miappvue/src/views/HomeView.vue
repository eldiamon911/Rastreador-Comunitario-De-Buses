<template>
  <div>
    <router-link to="/mapa" v-on:click="validacionSesionMapa">
      <button class="botonMapa"> Explora el mapa</button>
    </router-link>
  </div>
</template>

<script>

export default {
  data(){
    return{
      
    }
  },
  methods: {
    validacionSesionMapa: function(){
      const validarSesionActiva = localStorage.getItem('SesionActiva')
      if(validarSesionActiva == 'true'){
        localStorage.setItem('verificarGuardarRuta','true')
      }
      else{
        localStorage.setItem('verificarGuardarRuta','false')
      }
    },
  }

}

</script>

<style>
 /*Full style chavales*/


</style>
