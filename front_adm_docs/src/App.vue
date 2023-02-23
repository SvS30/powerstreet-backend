<template>
  <div id="view">
    <AppHeader />
    <router-view />
    <AppFooter />
  </div>
  <VueSidebarMenuAkahon :isMenuOpen="true" :menuItems="menu" :isSearch="false" menuTitle="PowerStreet"
    profileImg="" profileName="" profileRole="" />
</template>

<script>
import AppHeader from "./layouts/AppHeader.vue";
import AppFooter from "./layouts/AppFooter.vue";
import VueSidebarMenuAkahon from "vue-sidebar-menu-akahon";

export default {
  data() {
    return {
      menu: [
        { link: '/home', name: 'Dashboard', tooltip: 'Dashboard', icon: 'bx-home-alt-2' },
        { link: '/about', name: 'Documentos', tooltip: 'Documentos', icon: 'bx-file-doc' }
      ]
    };
  },
  methods: {
    clickedExit() { console.log('Exit clicked') }
  },
  components: {
    AppHeader,
    AppFooter,
    VueSidebarMenuAkahon
  },
};
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
