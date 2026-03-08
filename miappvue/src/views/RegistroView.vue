<template>
<div class="Contenedor-registro">
    <h1>Crear cuenta nueva</h1>
    
    <section>
      <div>
        <label>Nombre Completo:</label>
        <input v-model="nuevo_nombre" type="text" placeholder="Ej:camilo andres">
      </div>

      <div>
        <label>Nombre de Usuario:</label>
        <input v-model="nuevo_usuario" type="text" placeholder="Crea un usuario">
      </div>

      <div>
        <label>Correo Electrónico:</label>
        <input v-model="nuevo_correo" type="email" placeholder="usuario@correo.com">
      </div>
      <div>
        <label>Contraseña:</label>
        <input v-model="nueva_contrasena" type="password" placeholder="contraseña">
      </div>
      <div>
        <button v-on:click="RegistrarUsuario">Registrarme</button>
        <button v-on:click="VolverAlLogin">¿Ya tienes cuenta? Inicia sesión</button>
      </div>
    </section>
  </div>
</template>

<script >
export default {
  data(){
    return{
        nuevo_usuario: "",
        nuevo_correo: "",
        nuevo_nombre: "",
        nueva_contrasena:""
    }
  },
  methods: {
    //registra el usuario y lo guarda en el localstrorege, tambien validamos que ingresen todos los datos
    RegistrarUsuario: function(){
        if(this.nuevo_usuario && this.nueva_contrasena && this.nuevo_correo && this.nuevo_nombre){
            localStorage.setItem("usuarioNuevo", this.nuevo_usuario) 
            localStorage.setItem("contrasenaNueva", this.nueva_contrasena)
            localStorage.setItem("correoNuevo", this.nuevo_correo)
            localStorage.setItem("nombreNuevo", this.nuevo_nombre)
            alert("registro exitoso")
            this.$router.push("/login") 
        }
        else{
            alert("Llene todos los campos")
        }
    },
    VolverAlLogin: function(){
        this.$router.push("/login")
    }
  }
}
</script>

<style  scoped>

</style>