<template>
  <div class="dark:bg-gray-900">
    <div
      class="flex flex-col items-center justify-center mx-auto md:h-screen lg:py-0"
    >
      <div class="w-full bg-white shadow md:mt-0 xl:p-0">
        <div class="p-4 space-y-4 md:space-y-6 sm:p-8">
          <h1
            class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
          >
            Cadastrar nova vaga
          </h1>
          <form class="space-y-4 md:space-y-6" @submit.prevent="handleSubmit">
            <div>
              <label
                for="jobname"
                class="flex mb-2 text-sm font-medium justify-start text-gray-900 dark:text-white"
                >Nome da Vaga</label
              >
              <input
                type="text"
                id="jobname"
                v-model="job.jobname"
                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Descreva o nome da vaga"
                required
              />
            </div>
            <div>
              <label
                for="description"
                class="flex mb-2 text-sm font-medium justify-start text-gray-900 dark:text-white"
                >Descrição</label
              >
              <textarea
                id="description"
                v-model="job.description"
                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Descreva a vaga"
                required
              ></textarea>
            </div>
            <div>
              <label
                for="status"
                class="flex mb-2 text-sm font-medium justify-start text-gray-900 dark:text-white"
                >Status</label
              >
              <input
                type="text"
                id="status"
                v-model="job.status"
                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Ex: Em Seleção"
                required
              />
            </div>
            <div>
              <label
                for="department"
                class="flex mb-2 text-sm font-medium justify-start text-gray-900 dark:text-white"
                >Departamento</label
              >
              <input
                type="text"
                id="department"
                v-model="job.department"
                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Ex: Desenvolvimento"
                required
              />
            </div>
            <div>
              <label
                for="departmentCategory"
                class="flex mb-2 text-sm font-medium justify-start text-gray-900 dark:text-white"
                >Categoria do Departamento</label
              >
              <input
                type="text"
                id="departmentCategory"
                v-model="job.departmentCategory"
                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Ex: Backend"
                required
              />
            </div>
            <button
              type="submit"
              class="w-full text-white bg-blue-950 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Cadastrar Vaga
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      job: {
        id: null,
        jobname: "",
        description: "",
        status: "Em Seleção",
        department: "",
        start_date: new Date(),
        departmentCategory: "",
      },
    };
  },
  methods: {
    async handleSubmit() {
      try {
        const response = await fetch("http://localhost:8/api/jobs", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.job),
        });

        if (!response.ok) {
          throw new Error("Erro ao cadastrar vaga.");
        }

        alert("Vaga cadastrada com sucesso!");
      } catch (error) {
        console.error(error);
        alert("Erro ao cadastrar vaga.");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
