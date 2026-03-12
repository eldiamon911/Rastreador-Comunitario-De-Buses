<template>

<header class="header-principal">  
  
  <div class="menu-hamburguesa" >
            <i class='bx bx-menu' v-on:click="mostrarMenuHmburguesa"></i>

            <div class="menuDesplegable" v-show="contenidoMenu">
        <div v-on:click="ejecuarValidacionPerfil" >
        <ul  class="texto-info">Perfil</ul>
        </div>
      <div  v-on:click="ejecuarValidacion" v-show="contenidoMenu">
        <ul class="texto-info">
          Administrar rutas
        </ul>
      </div>
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

  <div class="texto-rodante">
    <span>
      ¡Pronto llegó a Santa Marta, consulta la ubicación de tus bus en tiempo real!ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ
      La información que necesitas para moverte está ahora en un solo lugarㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ
      La movilidad en Santa Marta ahora es más inteligenteㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ
      Optimiza tu tiempo y reduce la espera en las paradasㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ
      ¡Pronto llegó a Santa Marta, consulta la ubicación de tus bus en tiempo real!ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ
      La información que necesitas para moverte está ahora en un solo lugarㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ
      La movilidad en Santa Marta ahora es más inteligenteㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ
      Optimiza tu tiempo y reduce la espera en las paradasㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ
    </span>
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
      this.contenidoMenu = false
    }
  },
  methods: { 
    volverInicio: function(){
      this.$router.push("/")
    },
    ejecuarValidacionPerfil:function(){
      if(this.logueado === true){
        this.$router.push("/perfil")
      }
      else{
        this.$router.push("/login")
      }

    },
    ejecuarValidacion: function(){
      if(this.logueado === true){
        this.$router.push("/administrarRutas")
      }
      else{
        this.$router.push("/login")
      }
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

* {                    /* Body aquí (CELEDÓN)*/
  margin: 0;
  padding: 0;
  box-sizing:border-box;
}

.header-principal {    /* Este es el header principal, donde van las opciones de navegación (CELEDÓN)*/
  display:flex;
  align-items:center;
  background:#1e3a8a;
  padding:6px 90px;
  box-shadow:0px 3px 10px rgba(0,0,0,0.15);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.logo {
  display: flex;
  align-items: center;
  margin-left: 35px;
}

.logo-icono {
  height: 75px;
  transform: translateY(-5px);      /* baja 5px */
  cursor: pointer;
}

.logo-texto {
  height: 52px;
  cursor: pointer;
}

.texto-rodante {
    width: 100%;
    margin: auto;
    overflow: hidden;            
    white-space: nowrap;         
    box-sizing: border-box;
    color: white;
    background-color:#1387d4;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: bold;
    padding: 8px 0;
}

.texto-rodante span {
    display: inline-block;
    padding-left: 100%;         
    animation: mover 60s linear infinite; 
}

@keyframes mover {                       /* Esto es del texto azul claro rodante, justo debajo del header (CELEDÓN)*/
    0%   { transform: translateX(0); }
    100% { transform: translateX(-100%); }
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
 padding: 8px 12px;
 border-radius: 15px;
 background-color: #ffd500;
 color: black;
 cursor: pointer;
 margin-left: 800px;
}

.boton-registro {
  padding: 8px 12px;
  border-radius: 15px;
  background-color: #ffd500;
  color: black;
  cursor: pointer;
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

.texto-info{
  color: black;
}

</style>