import { createRouter, createWebHistory } from "vue-router"

import HomeView from "../views/HomeView.vue"
import MapaView from "../views/MapaView.vue"
import LoginView from "../views/LoginView.vue"
import DashboardView from "../views/DashboardView.vue"

const routes = [
  { path: "/", component: HomeView },
  { path: "/mapa", component: MapaView },
  { path: "/login", component: LoginView },
  { path: "/dashboard", component: DashboardView }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
