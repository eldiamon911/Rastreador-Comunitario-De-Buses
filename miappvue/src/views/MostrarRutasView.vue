<template>

<div class="contenedor-maximo">
    <header class="header-rutas">
      <h1> Rutas guardadas</h1>
      <p>Gestiona los buses que rastreas con frecuencia</p>
    </header>

    <div class="contenedor-rutas">
      <div class="tarjeta-bus" v-for="ruta in misRutas" :key="ruta.id">
        <h3 class="nombre-ruta"> {{ ruta.nombreRuta }}</h3>
  
    <div class="detalles">
        <p>Bus: <span class="busGuardado"> {{ ruta.rutaBus}}</span></p>
        <p>Placa: <span class="placaGuardada">{{ ruta.placa }}</span></p>
        <p>Ruta: <span class="rutaGuardada">{{ ruta.rutaBus }}</span></p>
    </div>

    <div class="botones">
        <button class="btn-ver" @click="verEnMapa(ruta)">Ver en Mapa</button>
        <button class="btn-borrar" v-on:click="eliminarRuta(ruta.id)">Eliminar</button>
    </div>
</div>
</div>
      </div>
</template>

<script >
export default {
  data() {
    return {
        misRutas: []
    }
  },
  mounted() {
  this.misRutas = JSON.parse(localStorage.getItem('rutasMasUsadas')) || [];
    },
    methods: {
        //se elimina la ruta de la lista 
        eliminarRuta: function(idAEliminar){
            //aca el filter funciona como un filtro literalmente saca lo que no cumple la condicion
            this.misRutas = this.misRutas.filter(ruta => ruta.id !== idAEliminar);
            localStorage.setItem('rutasMasUsadas', JSON.stringify(this.misRutas));
        },
        verEnMapa(ruta){
            this.$router.push({
                path: '/mapa',
                query: {
                    rutaBus: ruta.rutaBus,
                }
            })
        }
    }
}
</script>

<style scoped>
.contenedor-maximo{
    background: #f1f5f9;
    min-height: 100vh;
    padding: 30px;
}

.header-rutas{
    text-align: center;
    margin-bottom: 30px;
}

.header-rutas h1{
    font-size: 32px;
    color: #1e3a8a;
    margin-bottom: 5px;
}

.header-rutas p {
    color: #646464;
    font-size: 15px;
}

.contenedor-rutas{
    display: grid;
    grid-template-columns: repeat(auto-fit,minmax(260px,1fr));
    gap: 25px;
    max-width: 900px;
    margin: auto;
}

.tarjeta-bus{
    background: white;
    border-radius: 14px;
    padding: 20px;
    box-shadow: 0 8px 20px rgba(0,0,0,0.8);
    border-top: 5px solid #2563eb;
    transition: transform 0.2s ease;
}

.tarjeta-bus:hover{
    transform: translateY(-6px);
}

.contenedor-ruta{
    color: #1e40af;
    font-size: 20px;
    margin-bottom: 15px;
}

.detalles{
    font-size: 14px;
    margin-bottom: 20px;
}

.detalles p{
    margin: 6px 0;
    color: #334155;
}

.busGuardado{
    font-weight: bold;
    color: #0f172a;
}

.placaGuardada{
    font-weight: bold;
    color: #15803d;
}

.rutaGuardada{
    font-weight: bold;
    color: #2563eb;
}

.botones{
    display: flex;
    gap: 10px;
}

.botones button{
    flex: 1;
    padding: 8px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 13px;
    transition: 0.2s;
}

.btn-ver{
    background:  #2563eb;
    color: white;
}

.btn-borrar:hover{
    background: #dc2626;
}
</style>