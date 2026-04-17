<template>
  <main class="pantalla-completa">
    <ToastComponent/>

    <div class="decoracion circulo-1"></div>
    <div class="decoracion circulo-2"></div>

    <div class="Tarjeta-Login">
      <div class="encabezado-login">
        <img src="../assets/logo+tipografia-pronto.png" alt="Logo Pronto" class="logo-img">
        <span class="badge-login">Nuevo Usuario</span>
        <h1>Crea tu cuenta</h1>
        <p>Regístrate para comenzar a usar el sistema</p>
      </div>

      <div class="formulario-vertical">
        <div class="campo">
          <label for="nuevo_usuario">Usuario</label>
          <input 
            type="text" 
            placeholder="Crea tu nombre de usuario" 
            class="input-moderno" 
            id="nuevo_usuario" 
            v-model="nuevo_usuario"
          >
        </div>

        <div class="campo">
          <label for="nueva_contrasena">Contraseña</label>
          <input 
            type="password" 
            placeholder="Crea tu contraseña" 
            class="input-moderno" 
            id="nueva_contrasena" 
            v-model="nueva_contrasena"
          >
        </div>
      </div>

      <div class="footer-acciones">
        <button class="btn-login-principal" @click="RegistrarUsuario">
          Registrarme ahora
        </button>
        
        <div class="divisor">o también</div>

        <button class="btn-secundario-glass" @click="VolverAlLogin">
          ¿Ya tienes cuenta? Inicia sesión
        </button>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      nuevo_usuario: "",
      nueva_contrasena: ""
    }
  },
  methods: {
    RegistrarUsuario: function() {

      // esta funcion sirve para que no se repitan las alertas, solo se ve 1 sola
      this.$toast.removeAllGroups();

      // validacion de campos vacios
      if (!this.nuevo_usuario || !this.nueva_contrasena) {
        this.$toast.add({ 
          severity: 'warn', 
          summary: 'Campos incompletos', 
          detail: 'Por favor, ingresa un usuario y una contraseña.', 
          life: 3000 
        });
        return; // aqui se detiene la ejecucuon
      }

      // carecteres minimos para crear la contraseña (4) minimo
      if (this.nueva_contrasena.length < 4) {
        this.$toast.add({ 
          severity: 'error', 
          summary: 'Contraseña débil', 
          detail: 'La contraseña debe tener al menos 4 caracteres.', 
          life: 3000 
        });
        return;
      }

      // logica de almacenamiento en el localstorage
      let usuariosLista = JSON.parse(localStorage.getItem("usurio_sistema")) || [];

      // verifica si un usuario ya existe
      const usuarioExistente = usuariosLista.find(us => us.usuario === this.nuevo_usuario);

      if (usuarioExistente) {
        this.$toast.add({ 
          severity: 'error', 
          summary: 'Usuario no disponible', 
          detail: 'Este nombre de usuario ya está registrado.', 
          life: 3000 
        });
      } else {
        const nuevoUsuario = {
          usuario: this.nuevo_usuario,
          contrasena: this.nueva_contrasena,
        };

        // Guardar
        usuariosLista.push(nuevoUsuario);
        localStorage.setItem("usurio_sistema", JSON.stringify(usuariosLista));

        // muestra una alerta de exito al crear un usuario
        this.$toast.add({ 
          severity: 'success', 
          summary: '¡Éxito!', 
          detail: 'Usuario creado correctamente. Redirigiendo...', 
          life: 4000 
        });

        // redireccion con un pequeño retraso para que vean el mensaje de exito
        setTimeout(() => {
          this.$router.push("/login");
        }, 4000);
      }
    },

    VolverAlLogin: function() {
      this.$router.push("/login");
    }
  }
}
</script>



<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
}

.pantalla-completa {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  background: #0b1120;
  min-height: calc(100vh - 70px);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  padding: 20px;
}

.decoracion {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  z-index: 0;
  opacity: 0.5;
}

.circulo-1 {
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, #1387d4 0%, transparent 70%);
  top: -150px;
  right: -100px;
}

.circulo-2 {
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, #ffd50070 0%, transparent 70%);
  bottom: -200px;
  left: -150px;
}

.Tarjeta-Login {
  position: relative;
  z-index: 1;
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(30px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 40px; 
  width: 100%;
  max-width: 600px; 
  padding: 30px 60px; 
  color: white;
  box-shadow: 0 40px 100px -20px rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
}

.encabezado-login {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 20px;
}

.logo-img {
  height: 64px;
  margin-bottom: 10px;
  filter: drop-shadow(0 0 15px rgba(255, 255, 255, 0.1));
}

.badge-login {
  background: rgba(3, 53, 119, 0.349);
  color: #4f96fa;
  padding: 6px 14px;
  border-radius: 100px;
  font-size: 0.7rem;
  font-weight: 800;
  text-transform: uppercase;
  margin-bottom: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

h1 {
  font-size: 2.25rem;
  font-weight: 800;
  letter-spacing: -1px;
  margin-bottom: 5px;
}

.encabezado-login p {
  color: #64748b;
  font-size: 1rem;
}

.formulario-vertical {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 25px;
}

.campo {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

label {
  font-size: 0.9rem;
  color: white;
  font-weight: 500;
  margin-left: 4px;
}

.input-moderno {
  background: white;
  border: none;
  padding: 16px 20px;
  border-radius: 18px;
  color: black;
  font-size: 1rem;
}

.input-moderno:focus {
  outline: none;
  box-shadow: 0 0 0 4px rgba(30, 122, 241, 0.671);
}

.footer-acciones {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
}

.btn-login-principal {
  background: #ffd500;
  color: #0f172a;
  border: none;
  padding: 16px;
  border-radius: 20px;
  font-weight: 700;
  font-size: 1.05rem;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
}

.btn-login-principal:hover {
  background-color: rgba(224, 195, 30, 0.973);
}

.divisor {
  display: flex;
  align-items: center;
  color: #475569;
  font-size: 0.75rem;
  text-transform: uppercase;
  margin: 5px 0;
}

.divisor::before,
.divisor::after {
  content: "";
  flex: 1;
  height: 1px;
  background: rgba(255, 255, 255, 0.05);
  margin: 0 15px;
}

.btn-secundario-glass {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #f1f5f9;
  padding: 14px;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.95rem;
}

.btn-secundario-glass:hover {
  background: rgba(255, 255, 255, 0.08);
}
</style>