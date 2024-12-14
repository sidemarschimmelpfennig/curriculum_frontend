<template>
  <div class="container-home">
    <h1 class="pt-12 pb-4 text-5xl font-bold">
      Bem vindo {{ user.name }}!<br />
    </h1>
    <h1 class="font-semibold text-2xl">
      Veja as vagas com o processo de seleção finalizado na ultima semana na
      ultima semana:
    </h1>
  </div>
</template>
<script>
export default {
  name: "Home",
  data() {
    return {
      user: {
        name: "Maycon",
        email: "maycon@sgbr.com",
      },
    };
  },
  mounted() {},
  methods: {},
};
</script>
<style lang="scss" scoped>
.container-home {
  height: 100vh;
  background-color: #222;
  h1 {
    color: white;
  }
}
</style>