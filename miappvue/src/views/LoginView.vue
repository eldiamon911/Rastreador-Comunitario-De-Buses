<template>

  <main class="pagina-inicio">

    <div class="Contenedor">
        <div class="info">
            <img src="../assets/logo+tipografia-pronto.png" alt="" class="logo">
            <p class="frase">Sistema de Transporte Público</p>
        </div>

        <div class="login">
            <h2 class="login_b">Bienvenido</h2>
            <p class="parrafo_login">Inicia sesión para continuar</p>
            <input type="text" placeholder="Ingrese el usuario" class="boton1 boton" id="usuario">
            <input type="password" placeholder="Ingrese la contraseña" class="boton2 boton" id="contrasena">
            <a href="#" class="contrasenaO">¿Olvidaste la contraseña?</a>
            <button class="IniciarSesion">Iniciar sesion</button>
            <p class="regirtrar">¿No tienes cuenta aún? <a class="color_registro">Registrarse</a></p>
        </div>
    </div>

  </main>

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

.pagina-inicio {
  font-family: 'Segoe UI', sans-serif;
  background: linear-gradient(135deg, #eef5ff, #dbeafe, #eff6ff);
  min-height: 100vh;                 /*ocupa el 100% de la altura de la pantalla (celedón)*/
  display: flex;          
  justify-content: center; 
  align-items: center;     
  width: 100%;          
}

.Contenedor {
  display: flex;
  margin: 0; 
  height: 68vh;
  width: 60vw;
  box-shadow: 0px 4px 20px rgba(0,0,0,0.2);
  background: #1e3a8a;
  border-radius: 25px;
  overflow: hidden;               /*esto hace que las esquinas de los hijos no se salgan (celedón)*/
}

.info {
  width: 40%;
  display: flex;
  flex-direction: column;
  gap: 15px;
  justify-content: center;
  color: white;
}  

.login {
  display: flex;
  width: 60%;
  flex-direction: column;
  background-color: white;
  border-radius: 25px;
  justify-content: center;
}

.login_b {
  margin: 0px 15px 30px 52px;
  font-size: 28px;
  color: #1387d4;
}

.parrafo_login {
  margin: 0px 25px 30px 52px;
  font-size: 20px;
}

.boton {
  padding: 13px;
  border-radius: 8px;
  margin: 0px 25px 15px 52px;
  color: black;
  border: 1px solid #ccc;
  background: linear-gradient(135deg, #eef5ff, #dbeafe, #eff6ff);
}

.contrasenaO {
  margin: 5px 45px 25px 52px;
  text-decoration: none;
  color: #1387d4;
  text-align: end;
}

.IniciarSesion {
  margin: 0px 178px ;
  background: #ffd500;
  color: #1a1a1a;
  padding: 15px 27px;
  border-radius: 10px;
  border: none;
  font-weight: bold;
  cursor: pointer;  
}

.regirtrar {
  text-align: center;
  margin-top: 15px;
}

.color_registro {
  color: #1387d4;
}

.logo {
  width: 90%;
  height: 80px;
  overflow: hidden;
  object-fit: contain;  
}

.frase {
  text-align: center;  
}

.IniciarSesion:hover {
  background: rgba(224, 195, 30, 0.973);
}

@media (max-width: 600px) {
  .Contenedor{
    display: flex;
    flex-direction: column;
    border-radius: none;
  }
    
  .info {
    height: 15%;
    width: 100%;
  }

  .login {
    height: 90%;
    width: 100%;
  }

  .frase,.nombre {
    display: none;
    }

  .contrasenaO{
    text-align: center;
  }

  .login_b {
      text-align: center;
      margin: 0;
  }
}

@media (max-width: 860px) {
  .frase,.nombre{
    display: none;
  }

  .logo {
    text-align: center;
    margin: 0;
    width: 90%;
  }

  .login_b {
    text-align: center;
    margin: 0px 0px 30px 0px;
  }

  .contrasenaO {
    text-align: center;
  }
}

</style>
