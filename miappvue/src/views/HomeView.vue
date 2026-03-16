<template>
  
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

            <router-link to="/mapa" @click="validacionSesionMapa">
              <button class="btn-explorarRutas">Explorar rutas</button>
            </router-link>

            <button class="btn-saberMas">Saber más</button>
          </div>

        </div>
        
        <div class="zona-imagen">
          <div class="contenedor-bus">
            <img src="../assets/imagen-bus.png" alt="Pronto Bus" class="imagen-flotante">
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

.pagina-inicio {                              /* estilos base de la pagina (celedon)*/
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

.zona-imagen {                    /*mantiene la imagen el bus a la derecha (celedon)*/
  width: 45%; 
}

.imagen-flotante {
  width: 110%;
  border-radius: 25px;
  filter: drop-shadow(0 0px 30px rgba(0, 102, 255, 0.836));       /*borde azul alredor de la imagen del bus (celedon)*/
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