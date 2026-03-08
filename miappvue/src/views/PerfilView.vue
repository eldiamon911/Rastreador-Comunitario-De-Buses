<template>
    <div class="boton-cs" v-if="!salirCuenta" v-on:click="ConfirmacionCuenta">
        <button class="cerrar_sesion">Cerrar sesion</button>
    </div>
    <div class="alertaCerrarSesion" v-else>
        <div class="TextoConfirmacion">
            <h3>Estas seguro de realizar esta accion?</h3>
        </div>
        <div class="botones-confirmar">
            <button class="boton-aceptar" v-on:click="accionAceptar">Aceptar</button>
            <button class="boton-cancelar">Cancelar</button>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            salirCuenta: false,
            mostrarBotoncs: true
        }
    },
    methods: {
        ConfirmacionCuenta: function(){
            this.salirCuenta = true
        },
        accionAceptar: function(){
            localStorage.removeItem("usuarioNuevo") 
            localStorage.removeItem("contrasenaNueva")
            localStorage.setItem('SesionActiva', 'false')
            alert("Ha cerrado sesion")
            this.$router.push("/")
        }
    }
}

</script>

<style scoped>

</style>