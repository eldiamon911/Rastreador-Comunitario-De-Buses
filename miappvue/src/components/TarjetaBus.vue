<template>
    <div class="card-bus">
        <div class="bus-izquierda">
            <span class="bus-icono">🚌</span>
            <div class="bus-info">
                <span class="bus-id">ID - {{ bus.id }}</span>
                <span class="bus-ruta">{{ bus.nombre_ruta }}</span>
                <span class="bus-placa">Placa: {{ bus.placa }}</span>
            </div>
        </div>
        <span class="bus-actividad">Activo</span>
    </div>
</template>

<script>
export default {
    name: "TarjetaBus",
    props: {
        bus: {
            type: Object,
            required: true
        }
    }
}
</script>

<style scoped>
.card-bus {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: solid 1px white;
    background: #f7f7f7;
    padding: 20px 25px;
    margin: 24px 0;
    border-radius: 25px;
}

.card-bus:hover {
    box-shadow: 0 8px 18px rgba(0, 0, 0, 0.12);
}

.bus-izquierda {
    display: flex;
    align-items: center;
    gap: 15px;
}

.bus-icono { font-size: 42px; }

.bus-info {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.bus-id { font-weight: 700; font-size: 20px; }
.bus-ruta { color: #2c2929; font-size: 25px; font-weight: bold; }
.bus-placa { font-size: 25px; font-weight: bold; color: #2c2929; }

.bus-actividad {
    background: darkgreen;
    color: white;
    padding: 6px 14px;
    border-radius: 20px;
    font-size: 18px;
    font-weight: 700;
}
</style>