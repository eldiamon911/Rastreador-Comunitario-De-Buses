<template>
<div class="reportes-view">

  <header class="reportes-header">
    <button class="boton-volver" v-on:click="VolverBoton">
      <i class='bx bx-left-arrow-alt'></i>
    </button>
    <h1>Reportes</h1>
  </header>
  

<main class="reportes-lista"> <div class="tarjeta-reporte" v-for="reporte in listaReportes" :key="reporte">
        <div class="reporte-contenedor-datos">
            <span class="nombre-usuario">{{ usuarioMostrar }}</span>
        </div>
        <p class="reporte-texto">{{ reporte }}</p>
    </div>
</main>

  <section class="reportes-input-contenedor">
    <div class="input-reporte">
        <input type="text" placeholder="Escribe aqui" v-model="almacenarReporte">
        <button class="boton-enviar"  v-on:click="guardarReporte">
        <i class='bx bx-send'></i>
      </button>
    </div>
  </section>

</div>
</template>

<script>

export default{
    data(){
        return{
            almacenarReporte: "",
            listaReportes: [],
            usuarioMostrar: localStorage.getItem("usuarioNuevo", this.nuevo_usuario)
        }
    },
    mounted(){
        const guardarDatos = localStorage.getItem('mis_reportes')
        if (guardarDatos){
            this.listaReportes = JSON.parse(guardarDatos);
        }
    },
    methods: {
        VolverBoton: function(){
            this.$router.push("/mapa")
        },
        guardarReporte: function(){
            if (this.almacenarReporte !== ""){
                this.listaReportes.push(this.almacenarReporte);
                localStorage.setItem('mis_reportes', JSON.stringify(this.listaReportes));
                this.almacenarReporte="";

            setTimeout(() => {
            this.listaReportes.shift();
            }, 600000);
        }
            else{
                alert("Llene el reporte correctamente")
            }
        }
    }  
}

</script>

<style scoped>

</style>