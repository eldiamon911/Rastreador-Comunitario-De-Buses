<template>
    <h1>Iniciar Sesión</h1>
    
    <section>
      <div>
        <label>Nombre de Usuario:</label>
        <input v-model="validar_usuario" type="text" placeholder="Ingresa tu usuario">
      </div>

      <br>

      <div>
        <label>Contraseña:</label>
        <input v-model="validar_contrasena" type="password" placeholder="Ingresa tu contraseña">
      </div>
      <br>
      <div>
        <button v-on:click="ValidarLogin">Entrar</button>
        <button v-on:click="VolverInicio">Volver al Inicio</button>
        <button v-on:click="ResgistrarLogin">Registrar</button>
      </div>
    </section>
</template>

<script>
export default {
  name: "LoginView",
  data(){
    return{
      validar_contrasena: "",
      validar_usuario: "",
      usuarioEncontrado: false,
    }
  },
  methods:{
  //Aca llamamos los localstorege que habiamos guardado en la vista de registro y validamos que 
  //el user y la contraseña
    ValidarLogin: function(){
      const validarUsuariosExistentes = localStorage.getItem("usurio_sistema")
      const listaUsuarios = JSON.parse(validarUsuariosExistentes) || [];
      for ( const usu in listaUsuarios){
        const usuarioActual = listaUsuarios[usu]
        if(this.validar_usuario === usuarioActual.usuario && this.validar_contrasena === usuarioActual.contrasena){
          localStorage.setItem('SesionActiva', 'true')
          this.usuarioEncontrado = true;
          this.$router.push("/");
          break;
        }
      }
      if(this.usuarioEncontrado === false){
        localStorage.setItem('SesionActiva', 'false')
        alert("Usuario o contraseña incorrectos")
      } 
    },
    //al view del home
    VolverInicio: function(){
      this.$router.push("/")
    },
    //para dirigir a el view de registro
    ResgistrarLogin: function(){
      this.$router.push("/registro")
    }


  }
  
}
</script>

<style scoped>

.footer {
    background-color: #1e3a8a;
    color: #bbb;
    font-family: Arial, Helvetica, sans-serif;
    padding: 20px 20px;
   
}

</style>
