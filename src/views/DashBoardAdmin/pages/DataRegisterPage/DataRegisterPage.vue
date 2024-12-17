<template>
  <div class="content-page">
    <div class="cont-config bg-gray-100">
      <h1>Dados de Registro</h1>
      <div class="container mx-auto justify-center flex mt-8">
        <div
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      containers: [
        { title: "Status" },
        { title: "Categorias" },
        { title: "Modalidade" },
        { title: "Habilidades" },
      ],
    };
  },
  methods: {
    deleteJob(id) {},
    editJob(id) {},
    viewJob(id) {},
  },
};
</script>

<style lang="scss" scoped>
.content-page {
  padding: 0;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .cont-config {
    h1 {
      padding-top: 2rem;
      font-family: "Roboto";
      font-size: 2rem;
      text-align: center;
    }
    button {
      font-size: 2rem;
    }
    border: 1px solid #d5d5d5;
    border-radius: 12px;
    box-shadow: 2px 3px rgb(156 163 175 / var(--tw-bg-opacity, 1));
    max-width: 80vw;
    padding: 2rem;
  }
}

h2 {
  margin-top: 16px;
  text-align: center;
}

button {
  padding: 8px 12px;
  font-size: 16px;
}
</style>
