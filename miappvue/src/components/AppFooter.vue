<template>
    <footer id="Contacto" class="footer">
    <div class="footer-contenido">
        <div class="footer-secciones">
          <img src="../assets/logo+tipografia-pronto.png" alt="" class="footer-logo">
        <p>
          <br>Sistema de Transporte Público 
        </p>
    </div>

<div class="footer-secciones">
    <h4>Menú</h4>
    <p>Inicio</p>
    <p>Categorías</p>
    <p>Ofertas</p>
    <p>Notificaciones</p>
    <p>Política de Privacidad</p>
</div>

<div class="footer-secciones">
    <h4>Ubicaciones</h4>
    <div class="footer-ubicaciones">
        <p>Santa Marta</p>
    </div>
</div>

<div class="footer-contactar">
    <h4>Contacto</h4>
    <p>Calle 123 #45-67, Santa Marta</p>
    <p>Email: pronto@gmail.com</p>
    <p>Tel: +57 3017657878</p>
</div>
    </div>
    <div class="footer-derechos">
    <p>© 2026 Pronto | Todos los derechos reservados</p>
    </div>
</footer>
</template>

<script>
    export default {
        name: "AppFooter"
    }
</script>

<style scoped>

.footer {
    background-color: #1e3a8a;
    color: #bbb;
    font-family: Arial, Helvetica, sans-serif;
    padding: 20px 20px;
   
}

.footer-contenido {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    max-width: 1200px;
    margin: auto;
    gap: 60px;
}

.footer-secciones {
    flex: 1;
    min-width: 180px;
}

.footer-contactar {
    flex: 1;
    min-width: 180px;
}

.footer-logo{
    width: 150px;
    margin-bottom: 12px;
}

.footer-secciones h4,
.footer-contactar h4 {
    color:#1387d4;
    margin-bottom: 10px;
    font-size: 16px;
}

.footer-secciones p,
.footer-contactar p,
.footer-ubicaciones p {
    margin: 6px 0;
    font-size: 14px;
    color: white;
}

.footer-derechos{
    text-align: center;
    border-top: 1px solid #444;
    margin-top: 20px;
    padding-top: 15px;
    font-size: 12px;
    color: white;
}
</style>