<template>
    <!-- /* MENU de inicio (Opciones, logo, botones, etc...), es un componente para que 
    podamos utilizarlo en todas las view*/ -->
    <menu class="menuInicio">
        <div class="opciones">
            <div class="logo">LOGOO</div>
            <ul class="opc">Inicio</ul>
            <ul class="opc">Descripcion</ul>
            <ul class="opc">Mapa</ul> //lo hice yo mejia 
            <ul class="opc">Ver transporte</ul>
        </div>
        <button class="boton-sesion" v-if="!logueado" v-on:click="MostrarLogin">Iniciar sesion</button>
        <button v-if="!logueado" class="boton-registro" v-on:click="Registro">Registrarse</button>
        <button class="boton-perfil" v-else  v-on:click="mostradorPerfil">Perfil</button>
    </menu>
</template>

<script>
export default {
name: 'MenuComponente',
data() {
    return {
      logueado: false
    }
  },
  mounted() {
    //Aca se revisa si hay una sesion activa cuando se recargue la pagina
    this.verificarSesion();
  },
  methods: {
    Registro: function(){
      this.$router.push("/registro")
    },

    //parte logica para ocultar el boton de iniciar sesion y dirigir a las vistas (login,perfil)
    MostrarLogin: function(){
         this.$router.push("/login")
    },
    verificarSesion (){
    const mostrador = localStorage.getItem('SesionActiva')
    if(mostrador === 'true'){
      this.logueado = true
      }
    },
    mostradorPerfil: function(){
      this.$router.push("/perfil")
    }
  }
}
</script>

<style scoped>

</style>