<template>
    <div class="tarjeta-reporte">
        <div class="reporte-contenedor-datos">
            <span class="nombre-usuario">{{ reporte.usuario }}</span>
            <span class="reporte-fecha">{{ formatearFecha(reporte.creado_en) }}</span>
        </div>
        <p class="reporte-texto">{{ reporte.mensaje }}</p>
    </div>
</template>

<script>
export default {
    name: "TarjetaReporte",
    props: {
        reporte: {
            type: Object,
            required: true
        }
    },
    methods: {
        formatearFecha(fecha) {
            if (!fecha) return ""
            const d = new Date(fecha)
            return d.toLocaleDateString('es-CO', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })
        }
    }
}
</script>

<style scoped>
.tarjeta-reporte {
    background: white;
    border-radius: 12px;
    padding: 14px 18px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    border-left: 4px solid #2563eb;
}

.reporte-contenedor-datos {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 6px;
}

.nombre-usuario {
    font-weight: 700;
    color: #1e3a8a;
    font-size: 13px;
}

.reporte-fecha {
    font-size: 11px;
    color: #94a3b8;
}

.reporte-texto {
    color: black;
    font-size: 15px;
    line-height: 1.5;
}
</style>