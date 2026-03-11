<template>

  <section class="contenido-inicio">

    <div class="contenido-izquierda">
      <h1>PRONTO</h1>
      <h2>LOCALIZA TU BUS</h2>
      <p>
        Consulta la ubicación de los buses en tiempo real,
        revisa rutas activas y organiza mejor tu tiempo
        en el transporte público.
      </p>
      <router-link to="/mapa" @:click="validacionSesionMapa">
        <button class="btn-verRutas">Ver rutas</button>
      </router-link>
    </div>

    <div class="imagen-bus">
      <img src="../assets/imagen-bus.png" alt="Imagen bus">
    </div>

  </section>

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

<style scoped>

.contenido-inicio {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  background: linear-gradient(120deg,#0f1b2b,#1f3555);    /* difuminado colores */
  color: white;
  padding: 100px;
}

.contenido-izquierda {       /* titulo */
  width: 45%;
}

.contenido-izquierda h1 {     /* subtitulo1 */
  font-size: 60px;
  font-weight: bold;
}

.contenido-izquierda h2 {     /* subtitulo2*/
  font-size: 30px;
  margin-bottom: 20px;
}

.contenido-izquierda p {      /* parrafo */
  font-size: 16px;
  margin-bottom: 25px;
}

.btn-verRutas {               /* boton "ver rutas" */
  background: #ffd500;
  padding: 8px 20px;
  border-radius: 25px;
  cursor: pointer;
  font-weight:bold;
}

.imagen-bus {                /* imagen derecha del bus */
  width: 50%;
}

.imagen-bus img{
  width: 100%;
  border-radius: 20px;
}

</style>