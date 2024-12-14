<template>
  <div id="app">
    <NavBar v-if="$route.meta.requiresNavbar !== false" />
    <router-view />
    <FooterComponent v-if="$route.meta.requiresFooter !== false" />
  </div>
</template>
<script>
import NavBar from "@/components/NavBar.vue";
import FooterComponent from "@/components/FooterComponent.vue";
import SidebarAdmin from "./components/SidebarAdmin.vue";

export default {
  components: {
    NavBar,
    FooterComponent,
    SidebarAdmin,
  },
  mounted() {
    document.title = "Curriculo";
  },
};
</script>
<style lang="scss">
@import "@/assets/scss/main";
</style>
