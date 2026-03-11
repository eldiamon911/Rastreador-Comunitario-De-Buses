<template>

  <!-- HERO ORIGINAL (TU CODIGO) -->
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


  <!-- NUEVA SECCION FUNCIONES -->
  <section class="funciones-pronto">

    <h2>¿Qué puedes hacer con PRONTO?</h2>

    <div class="contenedor-funciones">

      <div class="tarjeta-funcion">
        <i class='bx bx-map'></i>
        <h3>Rutas en tiempo real</h3>
        <p>
          Visualiza en el mapa las rutas activas del transporte
          público y observa el recorrido de los buses en vivo.
        </p>
      </div>

      <div class="tarjeta-funcion">
        <i class='bx bx-time-five'></i>
        <h3>Ahorra tiempo</h3>
        <p>
          Evita largas esperas en las paradas y planifica
          mejor tus viajes en la ciudad.
        </p>
      </div>

      <div class="tarjeta-funcion">
        <i class='bx bx-current-location'></i>
        <h3>Ubicación inteligente</h3>
        <p>
          Encuentra fácilmente las rutas cercanas
          a tu ubicación en Santa Marta.
        </p>
      </div>

    </div>

  </section>


  <!-- SECCION COMO FUNCIONA -->
  <section class="como-funciona">

    <h2>¿Cómo funciona?</h2>

    <div class="pasos">

      <div class="paso">
        <span>1</span>
        <p>Ingresa al mapa interactivo del sistema.</p>
      </div>

      <div class="paso">
        <span>2</span>
        <p>Selecciona la ruta de transporte que deseas consultar.</p>
      </div>

      <div class="paso">
        <span>3</span>
        <p>Visualiza la ubicación del bus en tiempo real.</p>
      </div>

    </div>

  </section>


  <!-- SECCION BENEFICIOS -->
  <section class="beneficios-pronto">

    <h2>Movilidad inteligente para la ciudad</h2>

    <p>
      PRONTO busca mejorar la movilidad urbana permitiendo
      a los ciudadanos acceder a información clara y actualizada
      sobre el transporte público de Santa Marta.
    </p>

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

/* HERO */

.contenido-inicio {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 80vh;
  background: linear-gradient(120deg,#0f1b2b,#1f3555);
  color: white;
  padding: 100px;
  overflow: hidden;
}

.contenido-izquierda {
  width: 45%;
}

.contenido-izquierda h1 {
  font-size: 60px;
  font-weight: bold;
  letter-spacing: 2px;
}

.contenido-izquierda h2 {
  font-size: 30px;
  margin-bottom: 20px;
  color: #60a5fa;
}

.contenido-izquierda p {
  font-size: 17px;
  margin-bottom: 30px;
  line-height: 1.6;
}

/* BOTON MODERNO */

.btn-verRutas {
  background: #ffd500;
  padding: 12px 30px;
  border-radius: 30px;
  cursor: pointer;
  font-weight:bold;
  border:none;
  transition: all 0.3s ease;
  box-shadow: 0px 5px 15px rgba(0,0,0,0.25);
}

.btn-verRutas:hover {
  transform: translateY(-3px);
  box-shadow: 0px 10px 20px rgba(0,0,0,0.3);
  background: #ffe347;
}

/* IMAGEN BUS */

.imagen-bus {
  width: 50%;
  transition: transform 0.5s ease;
}

.imagen-bus img{
  width: 100%;
  border-radius: 20px;
  box-shadow: 0px 20px 40px rgba(0,0,0,0.3);
}

/* FUNCIONES */

.funciones-pronto{
  padding: 100px;
  text-align: center;
  background: #f1f5f9;
  background: linear-gradient(120deg,#0f1b2b,#1f3555);

}

.funciones-pronto h2{
  font-size: 34px;
  margin-bottom: 10px;
}

.contenedor-funciones{
  display:flex;
  justify-content:center;
  gap:40px;
  margin-top:50px;
  flex-wrap: wrap;
}

/* TARJETAS MODERNAS */

.tarjeta-funcion{
  background:white;
  padding:35px;
  border-radius:15px;
  width:260px;
  box-shadow:0px 10px 25px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
  cursor:pointer;
}

.tarjeta-funcion:hover{
  transform: translateY(-10px);
  box-shadow:0px 20px 40px rgba(0,0,0,0.15);
}

.tarjeta-funcion i{
  font-size:45px;
  color:#1e3a8a;
  margin-bottom:15px;
}

.tarjeta-funcion h3{
  margin-bottom:10px;
}

.tarjeta-funcion p{
  font-size:14px;
  line-height:1.5;
}



/* COMO FUNCIONA */

.como-funciona{
  padding:100px;
  text-align:center;
  background:white;
}

.como-funciona h2{
  font-size:34px;
}

.pasos{
  display:flex;
  justify-content:center;
  gap:60px;
  margin-top:50px;
  flex-wrap: wrap;
}

.paso{
  width:200px;
  transition: transform 0.3s;
}

.paso:hover{
  transform: scale(1.05);
}

.paso span{
  background:#1e3a8a;
  color:white;
  border-radius:50%;
  padding:14px 20px;
  font-weight:bold;
  display:inline-block;
  margin-bottom:15px;
  font-size:18px;
  box-shadow:0px 5px 15px rgba(0,0,0,0.2);
}



/* BENEFICIOS */

.beneficios-pronto{
  background: linear-gradient(120deg,#0f1b2b,#1f3555);
  color:white;
  text-align:center;
  padding:100px;
}

.beneficios-pronto h2 {
  font-size:32px;
  margin-bottom:20px;
}

.beneficios-pronto p {
  max-width:700px;
  margin:auto;
  line-height:1.6;
  font-size:17px;
}

</style>