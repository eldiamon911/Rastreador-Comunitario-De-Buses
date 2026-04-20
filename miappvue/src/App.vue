<template>
  <div>
    <AppNavbar/>
    <router-view />
    <AppFooter/>
  </div>
</template>

<script>
import AppNavbar from './components/Navbar.vue'
import AppFooter from './components/AppFooter.vue'

export default {
  components: {
    AppNavbar,
    AppFooter
  }
}

</script>


<style>
.p-toast{
    top: 120px !important;                                    /*ajustar altura del alert*/
    font-family: Verdana, Geneva, Tahoma, sans-serif;
}

.p-toast-detail {
    color:white !important;                             /* color de la descripcion*/
}
</style>