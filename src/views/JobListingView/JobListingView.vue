<template>
  <div class="joblist" :class="{ 'active-form': showModal }">
    <div class="p-5 w-full readme flex justify-center">
      <input
        id="input1"
        class="w-96 border pl-4 py-2 rounded focus:border-blue-500 focus:shadow-outline outline-none"
        type="text"
        placeholder="Vaga desejada"
        v-model="searchText"
      />
      <form class="max-w-40 pr-4 w-full">
        <select
          id="countries"
          v-model="selectedCategory"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option
            v-for="(department, id) in departments"
            :key="id"
            :value="department.name"
          >
            {{ department.name }}
          </option>
        </select>
      </form>
    </div>

    <div class="bg-blue-400 w-full">
      <h1 class="font-bold text-3xl mb-3 pt-4 text-white">
        Oportunidades Disponíveis
      </h1>
      <div v-if="filteredJobs.length > 0">
        <JobListingComponent :joblisting="filteredJobs" />
      </div>
      <div v-else class="conte">
        <H2>Nenhuma Vaga Disponível no momento</H2>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import JobListingComponent from "./Components/JobListingComponent.vue";

export default {
  data() {
    return {
      departments: [
        { name: "Todas" },
        { name: "Desenvolvimento" },
        { name: "Comercial" },
        { name: "Suporte" },
        { name: "Administrativo" },
      ],
      selectedCategory: "Todas",
      searchText: "", // Para armazenar o texto da pesquisa
      arrayFromJobs: [],

      api: process.env.VUE_APP_API_URL,
    };
  },
  methods: {
    async getJobsListing() {
      try {
        let response = await axios.get(`${this.api}jobvacancies`);
        this.arrayFromJobs = response.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
  computed: {
    filteredJobs() {
      return this.arrayFromJobs.filter((job) => {
        const matchesSearchText = job.name
          .toLowerCase()
          .includes(this.searchText.toLowerCase());
        const matchesCategory =
          this.selectedCategory === "Todas" ||
          job.department === this.selectedCategory;
        return matchesSearchText && matchesCategory;
      });
    },
  },
  mounted() {
    this.getJobsListing();
  },
  components: {
    JobListingComponent,
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/views/joblistingview";
</style>
