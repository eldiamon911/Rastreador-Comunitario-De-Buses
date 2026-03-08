<template>
  <nav>
    <!-- CAMILO2 -- Puse nuevos links que funcionan mediante botones y simplemente pase el componente del menu
     a este(dejare el componente del menuComponente por si acaso) -->
    <router-link to="/">Inicio</router-link> |
    <router-link to="/mapa">Mapa</router-link> |
    <router-link to="/login">
      <button class="boton-sesion" v-if="!logueado" v-on:click="MostrarLogin">Iniciar sesion</button>
    </router-link>
    <router-link to="/perfil">
      <button class="boton-sesion" v-if="logueado" v-on:click="mostradorPerfil">Perfil</button>
    </router-link>
    <router-link to="/registro" class="router-registro">
      <button v-if="!logueado" class="boton-registro" v-on:click="Registro">Registrarse</button>
    </router-link> |
  </nav>
</template>

<script>
export default {
  name: "AppNavbar",
  data() {
    return {
      logueado: false
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
    }
  },
  methods: { 
    //lo simple, funciones que asignamos a botones y a el mounted y watch
    Registro: function() {
      this.$router.push("/registro");
    },
    MostrarLogin: function() {
      this.$router.push("/login");
    },
    verificarSesion() {
      const mostrador = localStorage.getItem('SesionActiva');
      if (mostrador === 'true') {
        this.logueado = true;
      } else {
        this.logueado = false;
      }
    },
    mostradorPerfil: function() {
      this.$router.push("/perfil");
    }
  } 
} 
</script>
