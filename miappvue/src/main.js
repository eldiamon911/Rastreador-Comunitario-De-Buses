import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'

// Estilos de mapas y temas
import 'leaflet/dist/leaflet.css'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'

// Servicios de Mensajes (Toasts)
import ToastService from 'primevue/toastservice'
import Toast from 'primevue/toast'
import Image from 'primevue/image'

// Conexión a API
import axios from 'axios'
import VueAxios from 'vue-axios'

const app = createApp(App)

// 1. Configurar Router y Axios
app.use(router)
app.use(VueAxios, axios)

// 2. Configurar PrimeVue con el tema Aura
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});

// 3. Activar el servicio de mensajes
app.use(ToastService);

// 4. Registrar el componente Toast de forma global
app.component('ToastComponent', Toast);
app.component('ImageComponent', Image);

app.mount('#app')