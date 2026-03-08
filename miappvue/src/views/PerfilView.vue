<template>
<!-- Fluye aca camilo te voy a poner algo de ayuda como para que se vea el nombre de usuario y correo -->
     <div class="Datos personales">
        <div class="contenedor-correo">
            <h3 class="correo-ver">
                {{ correoVer }}
            </h3>
        </div>
     </div>






     <!-- NO tocar esto arriba de esto todo el html ( esto solo modificar con css) -->
    <div class="boton-cs" v-if="!salirCuenta" v-on:click="ConfirmacionCuenta">
        <button class="cerrar_sesion">Cerrar sesion</button>
    </div>
    <div class="alertaCerrarSesion" v-else>
        <div class="TextoConfirmacion">
            <h3>Estas seguro de realizar esta accion?</h3>
        </div>
        <div class="botones-confirmar">
            <button class="boton-aceptar" v-on:click="accionAceptar">Aceptar</button>
            <button class="boton-cancelar" v-on:click="accionCancelar">Cancelar</button>
        </div>
    </div>

</template>

<script>
export default {
    data(){
        return{
            salirCuenta: false,
            mostrarBotoncs: true,
            correoVer:  localStorage.getItem("correoNuevo"),
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
        },
        accionCancelar: function(){
            this.salirCuenta = false
        }
    }
}

</script>

<style scoped>

</style>