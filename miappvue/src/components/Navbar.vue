<template>

<header class="header-principal">  

  <div class="menu-hamburguesa" v-if="logueado" v-on:click="mostrarMenuHmburguesa">
            <i class='bx bx-menu'></i>

            <div class="menuDesplegable" v-show="contenidoMenu">
      <router-link to="/perfil" >
        <ul v-on:click="mostrarMenuHmburguesa">Perfil</ul>
      </router-link>
      <router-link to="/administrarRutas" v-show="contenidoMenu">
        <ul v-on:click="mostrarMenuHmburguesa">
          Administrar rutas
        </ul>
      </router-link>
  </div>
        </div>

  <div class="logo" v-on:click="volverInicio">
    <img class="logo-icono" src="../assets/logo-bus.png" alt="Logo bus">
    <img class="logo-texto" src="../assets/tipografia-pronto.png" alt="Tipografia">
  </div>

  <nav class="contenedor-menu">
    <!-- CAMILO2 -- Puse nuevos links que funcionan mediante botones y simplemente pase el componente del menu
     a este(dejare el componente del menuComponente por si acaso) -->
      
    <router-link to="/login">
      <button class="boton-sesion" v-if="!logueado">Iniciar sesion</button>
    </router-link>
    <router-link to="/registro" class="router-registro">
      <button v-if="!logueado" class="boton-registro">Registrarse</button>
    </router-link>


    <!-- Menu rayitas para que dentro pueda interacturar con su perfil y administrar sus rutas jijiji -->
    <section class="menu-rayitas">

        

       

    </section>

  </nav>

</header>

  <div class="franja-publicitaria"> 
    <span>¡Pronto ha llegado a Santa Marta, consulta la ubicación de tu bus en tiempo real!</span>
  </div>

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

* {
  margin: 0;
  padding: 0;
  box-sizing:border-box;
}

.header-principal {    /* Este es el header principal, donde van las opciones de navegación (CELEDÓN)*/
  display:flex;
  justify-content:space-between;
  align-items:center;
  background:#1e3a8a;
  padding:16px 90px;
  box-shadow:0px 3px 10px rgba(0,0,0,0.15);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.logo {
  display: flex;
  align-items: center;
}

.logo-icono {
  height: 75px;
  margin-right: 5px;
  transform: translateY(-5px);      /* baja 5px */
  cursor: pointer;
}

.logo-texto {
  height: 52px;
  cursor: pointer;
}

.franja-publicitaria {     /* Esta es la franja debajo del header, es la parte donde se agrega publicidad (CELEDÓN)*/
  background:#1387d4; 
  color:white; 
  font-size:15px; 
  text-align:center; 
  padding:8px 0;
  font-weight: bold;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.contenedor-menu {
  display:flex;
  align-items:center;
  gap:15px;
}

.contenedor-menu a {
  color:white;
  text-decoration:none;
  font-size:16px;
  transition:0.3s;
}

.contenedor-menu a:hover {
  color:#60a5fa;
}

.boton-sesion {
  background:#2563eb;
  border:none;
  padding:6px 12px;
  border-radius:5px;
  color:white;
  cursor:pointer;
}

.boton-registro {
  background:#10b981;
  border:none;
  padding:6px 12px;
  border-radius:5px;
  color:white;
  cursor:pointer;
}

.menu-rayitas {
  position:relative;
}

.menu-hamburguesa {
  position: relative;
  font-size:26px;
  color:white;
  cursor:pointer;
}

.menuDesplegable {
  position: absolute;
  top: 100%;
  left:0;
  top:35px;
  background:white;
  border-radius:6px;
  width: 190px;
  box-shadow:0px 5px 10px rgba(0,0,0,0.15);
  padding:10px;
}

.menuDesplegable u l{
  list-style:none;
  padding:5px 10px;
  cursor:pointer;  
}

.menuDesplegable ul:hover {
  background:#f1f5f9;
}

</style>