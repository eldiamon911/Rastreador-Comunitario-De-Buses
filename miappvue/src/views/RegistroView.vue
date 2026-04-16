<template>
  <main class="pagina-registro">
    <ToastComponent position="top-center"/>
    <div class="Contenedor-registro">
      
      <section class="formulario-registro">
        <h1 class="titulo-registro">Crear cuenta</h1>
        
        <div class="grupo-input">
          <label>Nombre Completo:</label>
          <input v-model="nuevo_nombre" type="text" placeholder="Ej: Camilo Andrés" class="input-estilo">
        </div>

        <div class="grupo-input">
          <label>Nombre de Usuario:</label>
          <input v-model="nuevo_usuario" type="text" placeholder="Crea un usuario" class="input-estilo">
        </div>

        <div class="grupo-input">
          <label>Correo Electrónico:</label>
          <input v-model="nuevo_correo" type="email" placeholder="usuario@correo.com" class="input-estilo">
        </div>

        <div class="grupo-input">
          <label>Contraseña:</label>
          <input v-model="nueva_contrasena" type="password" placeholder="••••••••" class="input-estilo">
        </div>

        <div class="acciones">
          <button v-on:click="RegistrarUsuario" class="btn-principal">Registrarme</button>
          <button v-on:click="VolverAlLogin" class="btn-secundario">¿Ya tienes cuenta? Inicia sesión</button>
        </div>
      </section>

      <div class="info-registro">
        <img src="../assets/logo+tipografia-pronto.png" alt="Logo Pronto" class="logo-registro">
        <p class="frase-registro">Únete a la red de transporte más grande de la ciudad.</p>
      </div>

    </div>
  </main>
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

      this.$toast.removeAllGroups();

        if(this.nuevo_usuario && this.nueva_contrasena && this.nuevo_correo && this.nuevo_nombre){
          let usuriosNuevosLista = JSON.parse(localStorage.getItem("usurio_sistema")) || []
          const nuevosUsuarios = {
            usuario: this.nuevo_usuario,
            correo: this.nuevo_correo,
            nombre: this.nuevo_nombre,
            contrasena: this.nueva_contrasena,
          } 

          const usuarioExistente =  usuriosNuevosLista.find( us => us.usuario === nuevosUsuarios.usuario);
          if(usuarioExistente){
            alert("Ya se registraron con este usuario");
          }

          usuriosNuevosLista.push(nuevosUsuarios);
          localStorage.setItem("usurio_sistema", JSON.stringify(usuriosNuevosLista))
          alert("Se registro correctamente")
          this.$router.push("/login")

        }
        else{
            this.$toast.add({ 
            severity: 'warn', 
            summary: 'Atención', 
            detail: 'Por favor, llene todos los campos', 
            life: 3000 
          });
        }
    },
    VolverAlLogin: function(){
        this.$router.push("/login")
    }
  }
}
</script>

<style scoped>
.pagina-registro {
  font-family: 'Segoe UI', sans-serif;

  background: linear-gradient(135deg, #eef5ff, #dbeafe, #eff6ff);
  height: 100vh;


  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  width: 100%;
}

.Contenedor-registro {
  display: flex;
  flex-direction: row;
  height: 72vh; 
  width: 65vw;
  max-height: 560px;
  min-width: 700px;
  box-shadow: 0px 10px 40px rgba(0,0,0,0.12);
  background: #1e3a8a; 
  border-radius: 25px;

  overflow: hidden;
  margin-top: -30px; 
}


.formulario-registro {
  display: flex;
  width: 60% ;
  flex-direction: column;
  background-color: white;
  justify-content: center;
  padding: 25px 50px; 


}

.titulo-registro {
  font-size: 24px;
  color: #1387d4;
  margin-bottom: 5px;
  font-weight: 800;

}

.subtitulo-registro {
  font-size: 0.9rem;

  color: #666;
  margin-bottom: 20px;
}


.grupo-input {
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
}

.grupo-input label {
  font-size: 0.8rem;
  font-weight: bold;
  color: #1e3a8a;

  margin-bottom: 4px;
  margin-left: 2px;
}

.input-estilo {
  padding: 11px 15px;
  border-radius: 10px;
  border: 1px solid #d1d5db;
  background: #ffffff;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  color: #000000;
}

.input-estilo:focus {
  outline: none;
  border-color: #1387d4;
  background: white;
  box-shadow: 0 0 0 3px rgba(19, 135, 212, 0.1);
}

.acciones {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
}

.btn-principal {
  background: #ffd500;
  color: #1a1a1a;
  padding: 13px;
  border-radius: 12px;
  border: none;
  font-weight: 800;
  font-size: 1rem;

  cursor: pointer;
}

.btn-principal:hover {
  background: #f5cc00;
  transform: translateY(-1px);
}

.btn-secundario {
  background: none;
  border: none;
  color: #1387d4;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 600;

  text-decoration: underline;
  transition: color 0.3s;
}

.btn-secundario:hover {
  color: #1e3a8a;
}


.info-registro {
  width: 40%;
  display: flex;
  flex-direction: column;
  gap: 15px;
  justify-content: center;
  align-items: center;
  color: white;
  padding: 30px;
  text-align: center;
  background: linear-gradient(180deg, #1e3a8a 0%, #162d6b 100%);
}

.logo-registro {
  width: 85%;
  max-width: 180px;
  height: auto;
  
  object-fit: contain;
  margin-bottom: 10px;
}

.frase-registro {
  font-size: 0.9rem;

  line-height: 1.4;
  padding: 0 10px;
  font-weight: 400;
  opacity: 0.9;
}
</style>