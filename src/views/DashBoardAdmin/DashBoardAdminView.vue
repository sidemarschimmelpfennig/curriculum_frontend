<template>
  <div class="dashboard-admin">
    <SidebarAdmin class="sidebar" />
    <div class="dashboard-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import SidebarAdmin from "@/components/SidebarAdmin.vue";

export default {
  name: "DashBoardAdminView",
  components: {
    SidebarAdmin,
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/views/dashboardadmin";
.sidebar {
  min-height: 100vh;
}
</style>
