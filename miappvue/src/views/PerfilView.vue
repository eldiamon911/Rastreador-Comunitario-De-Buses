<template>
  <div class="perfil-view">
    <div class="header-decorativo">
      <div class="avatar-circulo">
        <i class='bx bxs-user'></i>
      </div>
      <h2 class="saludo">Mi Perfil</h2>
      <p class="subtexto">Gestiona tu cuenta de PRONTO</p>
    </div>

    <div class="Datos personales">
      <div class="info-grupo">
        <label><i class='bx bx-envelope'></i> Correo Electrónico</label>
        <div class="contenedor-correo">
          <h3 class="correo-ver">
            {{ correoVer }}
          </h3>
        </div>
      </div>
      
      <div class="info-grupo">
        <label><i class='bx bx-map-pin'></i> Ubicación</label>
        <h3 class="dato-falso">Santa Marta, Colombia</h3>
      </div>
    </div>

    <div class="contenedor-acciones">
        <div class="boton-cs" v-if="!salirCuenta" v-on:click="ConfirmacionCuenta">
            <button class="cerrar_sesion">
              <i class='bx bx-log-out'></i> Cerrar sesión
            </button>
        </div>

        <div class="alertaCerrarSesion" v-else>
            <div class="TextoConfirmacion">
                <i class='bx bx-error-circle'></i>
                <h3>¿Estás seguro de realizar esta acción?</h3>
            </div>
            <div class="botones-confirmar">
                <button class="boton-aceptar" v-on:click="accionAceptar">Aceptar</button>
                <button class="boton-cancelar" v-on:click="accionCancelar">Cancelar</button>
            </div>
        </div>
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
.perfil-view {
    min-height: 100vh;
    background: #0f172a; /* Azul oscuro profundo de tu marca */
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px 20px;
    font-family: 'Segoe UI', sans-serif;
    color: white;
}

/* Header decorativo */
.header-decorativo {
    text-align: center;
    margin-bottom: 30px;
}

.avatar-circulo {
    width: 80px;
    height: 80px;
    background: #ffd500; 
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 45px;
    color: #0f172a;
    margin: 0 auto 15px;
    box-shadow: 0 0 20px rgba(255, 213, 0, 0.3);
}

.saludo { font-size: 24px; margin: 0; }
.subtexto { color: #94a3b8; font-size: 14px; }
.Datos.personales {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    padding: 25px;
    border-radius: 20px;
    width: 100%;
    max-width: 400px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    margin-bottom: 40px;
}

.info-grupo {
    margin-bottom: 20px;
    text-align: left;
}

.info-grupo label {
    font-size: 12px;
    text-transform: uppercase;
    color: #ffd500;
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 5px;
}

.correo-ver, .dato-falso {
    font-size: 16px;
    margin: 0;
    color: #f1f5f9;
    word-wrap: break-word;
}

.cerrar_sesion {
    background: transparent;
    border: 2px solid #ef4444;
    color: #ef4444;
    padding: 12px 40px;
    border-radius: 12px;
    font-weight: bold;
    cursor: pointer;
    transition: 0.3s;
    display: flex;
    align-items: center;
    gap: 10px;
}

.cerrar_sesion:hover {
    background: #ef4444;
    color: white;
}

.alertaCerrarSesion {
    background: #1e293b;
    padding: 25px;
    border-radius: 20px;
    border: 1px solid rgba(239, 68, 68, 0.5);
    max-width: 350px;
}

.TextoConfirmacion i {
    font-size: 40px;
    color: #ef4444;
    margin-bottom: 10px;
}

.botones-confirmar {
    display: flex;
    gap: 10px;
    margin-top: 20px;
}

.boton-aceptar, .boton-cancelar {
    flex: 1;
    padding: 10px;
    border-radius: 8px;
    border: none;
    font-weight: bold;
    cursor: pointer;
}

.boton-aceptar { 
    background: #ef4444; 
    color: white; 
}
.boton-cancelar { 
    background: #475569; 
    color: white; 
}
</style>