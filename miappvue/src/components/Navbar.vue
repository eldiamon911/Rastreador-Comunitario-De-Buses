<template>

<header class="header-principal">

  <!-- Logo y nombre del proyecto -->
  <div class="logo">
    <img src="" alt="logo" class="Logo">
  </div>
  

  <nav class="contenedor-menu">
    <!-- CAMILO2 -- Puse nuevos links que funcionan mediante botones y simplemente pase el componente del menu
     a este(dejare el componente del menuComponente por si acaso) -->
    <router-link to="/">Inicio</router-link> |
    <router-link to="/mapa" v-on:click="validacionSesionMapa">Mapa</router-link> |
    <router-link to="/login">
      <button class="boton-sesion" v-if="!logueado">Iniciar sesion</button>
    </router-link>
    <router-link to="/registro" class="router-registro">
      <button v-if="!logueado" class="boton-registro">Registrarse</button>
    </router-link>

    <!-- Menu rayitas para que dentro pueda interacturar con su perfil y administrar sus rutas jijiji -->
    <section class="menu-rayitas">

        <div class="menu-hamburguesa" v-if="logueado" v-on:click="mostrarMenuHmburguesa">
            <i class='bx bx-menu'></i>
        </div>

        <div class="menuDesplegable">

        <router-link to="/perfil" v-show="contenidoMenu">
          <ul v-on:click="mostrarMenuHmburguesa">Perfil</ul>
        </router-link>

        <router-link to="/administrarRutas" v-show="contenidoMenu">
          <ul v-on:click="mostrarMenuHmburguesa">
            administrar rutas
          </ul>
        </router-link>

        </div>

    </section>

  </nav>

</header>

</template>

<script>
export default {
  name: "AppNavbar",
  data() {
    return {
      logueado: false,
      contenidoMenu: false
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
    //funcion para el mounted y watch
    verificarSesion() {
      const mostrador = localStorage.getItem('SesionActiva');
      if (mostrador === 'true') {
        this.logueado = true;
      } else {
        this.logueado = false;
      }
    },
      validacionSesionMapa: function(){
      const validarSesionActiva = localStorage.getItem('SesionActiva')
      if(validarSesionActiva == 'true'){
        localStorage.setItem('verificarGuardarRuta','true')
      }
      else{
        localStorage.setItem('verificarGuardarRuta','false')
      }
    },
    //Aca es para cuando toque las tres rayitas se muestre el contenido
    mostrarMenuHmburguesa: function(){
      if(this.contenidoMenu === false){
        this.contenidoMenu = true
      }
      else{
        this.contenidoMenu = false
      }
    }
  } 
} 
</script>
<style>

/*CAMILO2 --- Compañero camilo aca tienes que reducir el menu ese porque como puedes ver ocupa todo el ancho
(no me aguante y puse eso, disculpame camilo)
*/
/* debes de ajustar la altura del menu porque si no es un caos, la barrita de hamburguesa tambien debes de 
ponerla del lado derecho */




/* HEADER PRINCIPAL */

.header-principal{
  display:flex;
  justify-content:space-between;
  align-items:center;
  background:#1e3a8a;
  padding:12px 40px;
  box-shadow:0px 3px 10px rgba(0,0,0,0.15);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}


/* LOGO */

.logo{
  display:flex;
  align-items:center;
}

.logo-img{
  width:2px;
  height:2px;
  margin-right:10px;
}




/* MENU */

.contenedor-menu{
  display:flex;
  align-items:center;
  gap:15px;
}

.contenedor-menu a{
  color:white;
  text-decoration:none;
  font-size:16px;
  transition:0.3s;
}

.contenedor-menu a:hover{
  color:#60a5fa;
}


/* BOTONES */

.boton-sesion{
  background:#2563eb;
  border:none;
  padding:6px 12px;
  border-radius:5px;
  color:white;
  cursor:pointer;
}

.boton-registro{
  background:#10b981;
  border:none;
  padding:6px 12px;
  border-radius:5px;
  color:white;
  cursor:pointer;
}


/* MENU HAMBURGUESA */

.menu-rayitas{
  position:relative;
}

.menu-hamburguesa{
  font-size:26px;
  color:white;
  cursor:pointer;
}

.menuDesplegable{
  position:absolute;
  right:0;
  top:35px;
  background:white;
  border-radius:6px;
  box-shadow:0px 5px 10px rgba(0,0,0,0.15);
  padding:10px;
}

.menuDesplegable ul{
  list-style:none;
  padding:5px 10px;
  cursor:pointer;
}

.menuDesplegable ul:hover{
  background:#f1f5f9;
}

</style>