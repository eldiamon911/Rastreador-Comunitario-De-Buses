import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'

import axios from 'axios'
import VueAxios from 'vue-axios'

import 'leaflet/dist/leaflet.css'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'

import ToastService from 'primevue/toastservice'
import Toast from 'primevue/toast'
import Image from 'primevue/image'
import ProgressSpinner from 'primevue/progressspinner';
import Dialog from 'primevue/dialog';
import Checkbox from 'primevue/checkbox';




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

// 4. Registrar el componente de forma global
app.component('ToastComponent', Toast);
app.component('ImageComponent', Image);
app.component('ProgressSpinner', ProgressSpinner);
app.component('DialogComponent', Dialog);
app.component('CheckBox', Checkbox);

app.mount('#app')