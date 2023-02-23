<template>
  <div>
    <app-header />
    <sidebar-menu />
    <router-view />
    <app-footer />
  </div>
</template>

<script>
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";
import SidebarMenu from "@/components/SidebarMenu.vue";

export default {
  components: {
    AppHeader,
    AppFooter,
    SidebarMenu
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
