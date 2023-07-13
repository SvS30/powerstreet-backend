<script>
import AppHeader from "./layouts/AppHeader.vue";
import AppFooter from "./layouts/AppFooter.vue";
import VueSidebarMenuAkahon from "vue-sidebar-menu-akahon";
import 'boxicons'

export default {
  data() {
    return {
      menu: [
        { link: '/', name: 'Dashboard', tooltip: 'Dashboard', icon: 'bx-home' },
        { link: '/about', name: 'Documentos', tooltip: 'Documentos', icon: 'bx-file' },
        { link: '/sockets', name: 'Sockets', tooltip: 'Sockets', icon: 'bx-signal' }
      ]
    }
  },
  components: {
    AppHeader,
    AppFooter,
    VueSidebarMenuAkahon
  }
}
</script>

<template>
  <div id="view">
    <AppHeader />
    <router-view />
    <AppFooter />
  </div>
  <VueSidebarMenuAkahon :isMenuOpen="true" :menuItems="menu" :isSearch="false"
    menuTitle="PowerStreet" profileName="" profileRole="" />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.sidebar.open div.profile { display: none; }
</style>
