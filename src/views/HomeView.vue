<template>
  <div class="home">
    <h1 class="title">Bem-vindos ao SGBR!</h1>
    <h2 class="subtitle">Junte-se à nossa equipe!</h2>
    <h3 class="subtitle">Venha crescer conosco e com excelência.</h3>
    <br />
    <button class="btn text-cyan-50" @click="getJobs">
      Venha fazer parte do nosso time.
    </button>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  components: {},
  methods: {
    getJobs() {
      return this.$router.push("/joblisting");
    },
  },
};
</script>
<style lang="scss" scoped>

@import "@/assets/scss/views/homeview";
</style>
