<template>
    <div v-if="cargando" class="pantalla-carga">
      <div class="escena-animacion">       
        <div class="logo-carga">
          <h1 class="texto-pronto">PRONTO</h1>
          <p class="texto-ciudad">SANTA MARTA</p>
        </div>
        <div class="contenedor-movimiento">
          <img src="../assets/bus-loading.png" class="bus-animado" alt="Bus Pronto">
          <div class="carretera-linea"></div>
        </div>
      </div>
    </div>

  <main class="pagina-inicio">

    <section class="presentacion-principal">

      <div class="capa-oscura"></div>

      <div class="bloque-contenido">

        <div class="texto-bienvenida">
          
          <span class="etiqueta-info">SISTEMA DE TRANSPORTE - SANTA MARTA</span>
          <h1 class="titulo-pronto">PRONTO</h1>
          <h2 class="subtitulo-web">Tu ciudad, <span class="resaltado-amarillo">en movimiento</span></h2>
          <p class="parrafo-descripcion">
            Moverse por la Perla es más fácil cuando tienes el mapa en tus manos.
             La tecnología que guía a los samarios directo a su destino, con seguimiento en vivo y sin complicaciones.</p>

          <div class="botones-grupo">
            <button @click="irAlMapa" class="btn-explorarRutas">Explorar rutas</button>
            <button class="btn-saberMas">Saber más</button>
          </div>
        </div>
        
        <div class="zona-imagen">
          <div class="contenedor-bus">
            <ImageComponent :src="require('../assets/imagen-bus.png')" alt="Pronto Bus" class="estilo-bus-premium" preview/>
            <div class="efecto-pulso"></div>
          </div>
        </div>

      </div>

    </section>

    <section class="seccion-servicios">

      <div class="encabezado-seccion">
        <h2>Tecnología al servicio del ciudadano</h2>
        <div class="linea-decorativa"></div>
      </div>

      <div class="contenedor-tarjetas">

        <div class="tarjeta-informativa">
          <div class="icono-servicio"><i class=' bx bx-stopwatch'></i></div>
          <h3>Tiempo Real</h3>
          <p>Algoritmos de alta precisión para que sepas exactamente dónde está tu bus cada segundo.</p>
        </div>

        <div class="tarjeta-informativa">
          <div class="icono-servicio"><i class=' bx bx-shield-quarter'></i></div>
          <h3>Viaje Seguro</h3>
          <p>Planifica tus rutas con antelación y comparte tu ubicación con seres queridos.</p>
        </div>

        <div class="tarjeta-informativa">
          <div class="icono-servicio"><i class='bx bxs-leaf'></i></div>
          <h3>Sostenibilidad</h3>
          <p>Menos esperas, rutas más eficientes y una Santa Marta más organizada.</p>
        </div>

      </div>

    </section>

  </main>

</template>


<script>
export default {
  data() {
    return {
      cargando: true    // esta es la variable que controla la pantalla de carga
    };
  },

  mounted() {
    setTimeout(() => {             // agregamos un retraso de 2.5 segundos para que el usuario
      this.cargando = false;       // pueda apreciar la animación del bus antes de entrar al sitio web
    }, 2500);
  },

  methods: {
    irAlMapa: function() {
      const validarSesionActiva = localStorage.getItem('SesionActiva');

      if (validarSesionActiva === 'true') {
        localStorage.setItem('verificarGuardarRuta', 'true');
        this.$router.push("/mapa");
      } else {
        localStorage.setItem('verificarGuardarRuta', 'false');
        this.$router.push("/mapa");
      }
    },
  }
}
</script>


<style scoped>

.pantalla-carga {      /*desde aquí son estilos de progress bar / pantalla de espera (celedon)*/
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #0a0f18; 
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99999;
}

.escena-animacion {
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logo-carga {
  text-align: center;
  margin-bottom: 50px;
}

.texto-pronto {
  color: white;
  font-size: 3rem;
  font-weight: 900;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  margin: 0;
  background: linear-gradient(to bottom, #ffffff, #666);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.texto-ciudad {
  color: #60a5fa;
  letter-spacing: 4px;
  font-weight: bold;
  letter-spacing: 1.5px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}

.contenedor-movimiento {
  position: relative;
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
}

.bus-animado {
  width: 180px;                /* ajusta según la imagen */
  height: auto;
  z-index: 2;
  animation: conducirBus 3s linear infinite;   /* velocidad en la que se mueve el bus*/
}

.carretera-linea {
  width: 85%;
  height: 2px;
  background: linear-gradient(90deg, transparent, #ffd500, transparent);
  box-shadow: 0 0 10px rgba(255, 213, 0, 0.5);
  margin-top: -10px;
}

@keyframes conducirBus {          /* aqui se definen los movimientos del bus */
  0% {
    transform: translateX(-150%); /* entra por la izquierda */
    opacity: 0;
  }
  15% {
    opacity: 1;
  }
  85% {
    opacity: 1;
  }
  100% {
    transform: translateX(150%); /* sale por la derecha */
    opacity: 0;
  }
}                                              /*aquí terminan los estilos de progress bar / pantalla de espera (celedon)*/

.pagina-inicio {                              /*empiezan los estilos base de la pagina (celedon)*/
  font-family: 'Segoe UI', sans-serif;
  background: #0a0f18;
}

.presentacion-principal {
  position: relative;
  min-height: 42rem;
  display: flex;
  padding: 0 10%;
  color: white;
}

.bloque-contenido {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.texto-bienvenida { 
  max-width: 600px; 
}

.etiqueta-info {
  background: rgba(96, 165, 250, 0.15);
  color: #60a5fa;
  padding: 7px 16px;
  border-radius: 30px;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 1.5px;
}

.titulo-pronto {                      /* titulo grande blanco que dice "pronto" (celedon)*/
  font-size: 85px;
  font-weight: 900;
  margin: 25px 0 15px;
  background: linear-gradient(to bottom, #ffffff 50%, #707070);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.subtitulo-web { 
  font-size: 36px; 
  margin-bottom: 20px; 
  font-weight: 700; 
}

.resaltado-amarillo { 
  color: #ffd500; 
  font-weight: 700; 
}

.parrafo-descripcion {
  font-size: 18px;
  color: #d1d1d1;
  margin-bottom: 45px;
  line-height: 1.6;
  font-weight: bold;
}

.botones-grupo {               /* aqui se separan los botones "explorar mapa" y "saber mas" (celedon)*/
  display: flex; 
  gap: 35px; 
}

.btn-explorarRutas {
  background: #ffd500;
  color: #1a1a1a;
  padding: 15px 27px;
  border-radius: 10px;
  border: none;
  font-weight: bold;
  cursor: pointer;
}

.btn-explorarRutas:hover {
  background: rgba(224, 195, 30, 0.973);
}

.btn-saberMas{
  background: transparent;
  border: 2px solid rgba(255,255,255,0.15);
  color: white;
  padding: 15px 32px;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.3s;
}

.btn-saberMas:hover {
  background: rgba(255,255,255,0.05);
}



/* Ajuste del contenedor de PrimeVue */
.contenedor-bus :deep(.p-image) {
  display: block;
  position: relative;
  z-index: 5;
  /* El secreto del resplandor azul (glow) */
  box-shadow: 0 0 35px rgba(0, 102, 255, 0.836); 
  border-radius: 30px; /* Bordes muy redondeados */
  overflow: hidden;
  transition: all 0.4s ease;

}

/* Estilo de la imagen interna */
.contenedor-bus :deep(.p-image img) {
  width: 100%;
  max-width: 600px; /* Tamaño similar al de la captura */
  height: auto;
  display: block;
  object-fit: cover;
}


/* Icono de la lupa en amarillo Pronto */
.contenedor-bus :deep(.p-image-preview-icon) {
  color: #ffd500 !important;
  font-size: 2.5rem;
}

/* Ajuste del efecto pulso para que esté centrado */
.efecto-pulso {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  
  /* CAMBIO CLAVE: Tamaño controlado */
  width: 80%; 
  height: 80%;
  
  /* ESTA LÍNEA ES LA QUE ACTIVA TUS BOTONES */
  pointer-events: none; 
  
  z-index: 1; /* Se queda atrás del bus que tiene z-index 5 */
  border-radius: 50%;

}



.seccion-servicios {                 /* esta es la seccion de tarjetas inferiores (celedon)*/
  padding: 80px 10%; 
  background: #0a0f18; 
}

.encabezado-seccion { 
  text-align: center; 
  margin-bottom: 50px; 
  color: white; 
}

.encabezado-seccion h2 { 
  font-size: 36px; 
}

.linea-decorativa { 
  width: 50px; 
  height: 4px; 
  background: #ffd500; 
  margin: 15px auto; 
  border-radius: 10px; 
}

.contenedor-tarjetas {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 25px;
}

.tarjeta-informativa {
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(8px);
  padding: 45px 35px;
  border-radius: 20px;
  border: 1px solid rgba(255,255,255,0.06);
  transition: 0.3s ease;
  color: white;
}

.tarjeta-informativa:hover {
  background: rgba(255, 255, 255, 0.07);
  border-color: #ffd500;
  transform: translateY(-8px);
}

.icono-servicio { 
  font-size: 40px; 
  color: #ffd500; 
  margin-bottom: 20px; 
}

.tarjeta-informativa h3 { 
  font-size: 22px; 
  margin-bottom: 12px; 
}

.tarjeta-informativa p { 
  color: #9ba7b9; 
  line-height: 1.5; 
  font-size: 15px;
}

</style>