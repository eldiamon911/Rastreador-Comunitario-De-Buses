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
            localStorage.setItem('mis_reportes', JSON.stringify(this.listaReportes));
            }, 60000);
        }
            else{
                alert("Llene el reporte correctamente")
            }
        }
    }  
}

</script>

<style scoped>
.reportes-view{
    display: flex;
    flex-direction: column;
    height: 100vh;
    background: #f1f5f9;
    font-family: "Segoe UI", sans-serif;
}

.reportes-header{
    display: flex;
    align-items: center;
    gap: 15px;
    background: #1e3a8a;
    color: white;
    padding: 15px 25px;
}

.reportes-header h1{
    font-size: 22px;
    font-weight: 700;
}

.boton-volver{
    background: rgba(255, 255, 255, 0.15);
    border: none;
    color: white;
    font-size: 24px;
    border-radius: 8px;
    cursor: pointer;
    padding: 4px 8px;
    display: flex;
    align-items: center;
    transition: 0.2s;
}

.boton-volver:hover{
    background: rgba(255, 255, 255, 0.25);
}

.reportes-lista{
    flex: 1;
    overflow-y: auto;
    padding: 20px 25px;
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.tarjeta-reporte{
    background: white;
    border-radius: 12px;
    padding: 14px 18px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.06);
    border-left: 4px solid #2563eb;
}

.nombre-usuario{
    font-weight: 700;
    color: #1e3a8a;
    font-size: 13px;
    display: block;
    margin-bottom: 6px;
}

.reporte-texto{
    color: black;
    font-size: 15px;
    line-height: 1.5;
}

.reportes-input-contenedor{
    padding: 15px 25px;
    background: white;
    border-top: 1px solid #e2e8f0;
}

.input-reporte{
    display: flex;
    gap: 10px;
    align-items: center;
}

.input-reporte input{
    flex: 1;
    padding: 12px 15px;
    border: 1px solid #cbd5e1;
    border-radius: 10px;
    font-size: 15px;
    outline: none;
    transition: 0.2s;
}

.input-reporte input:focus{
    border-color: #2563eb;
}

.boton-enviar{
    background: #2563eb;
    color: white;
    border: none;
    border-radius: 10px;
    padding: 12px 16px;
    font-size: 20px;
    cursor: pointer;
    display: flex;
    align-items: center;
    transition: 0.2s;
}

.boton-enviar:hover{
    background: #1e40af;
}
</style>