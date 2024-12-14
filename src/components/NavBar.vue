<template>
  <div class="nav">
    <div class="logo">
      <router-link to="/">
        <img src="../assets/image/logo-sgbr.png" alt="" />
      </router-link>
      <p class="farsan-regular">Deus seja louvado!</p>
    </div>
    <ul class="pr-4">
      <router-link class="nav-link" to="/">Inicio</router-link>
      <router-link class="nav-link" to="/joblisting"
        >Vagas disponiveis</router-link
      >
      <router-link class="nav-link" to="/login">Faça seu Login</router-link>
    </ul>
  </div>
</template>

<script>
export default {
  methods: {},
};
</script>

<style lang="scss">
@import "@/assets/scss/components/navbar";
</style>
