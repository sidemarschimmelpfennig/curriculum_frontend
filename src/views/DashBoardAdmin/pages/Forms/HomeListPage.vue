<template>
  <div class="joblist-table p-5">
    <div class="flex flex-wrap justify-between items-center gap-4 mb-6">
      <button
        class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 shadow-md"
        @click="addNewJob"
      >
        Adicionar Nova Vaga
      </button>

      <div class="flex flex-wrap justify-center gap-4">
        <input
          id="input1"
          class="w-80 border pl-4 p-2 rounded-md focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
          type="text"
          placeholder="Vaga desejada"
          v-model="searchText"
        />
        <form class="w-60">
          <select
            id="categories"
            v-model="selectedCategory"
            class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-2 focus:ring-blue-500 outline-none shadow-sm py-3"
          >
            <option value="">Todos os status</option>
            <option v-for="(state, id) in status" :key="id" :value="state.name">
              {{ state.name }}
            </option>
          </select>
        </form>
      </div>
    </div>

    <div
      id="joblist-table"
      class="bg-white shadow-md rounded-lg overflow-hidden"
    >
      <div
        id="joblist-table-heading"
        class="flex text-sm font-semibold bg-gray-200 text-gray-700 p-4"
      >
        <div class="w-1/5">Vaga</div>
        <div class="w-2/5">Descrição</div>
        <div class="w-1/5">Categoria</div>
        <div class="w-1/5">Status</div>
        <div class="w-1/5 text-center">Ações</div>
      </div>

      <div id="joblist-table-rows" class="divide-y">
        <div
          v-for="(job, id) in filteredJobs"
          :key="id"
          class="joblist-table-row flex items-center p-4 text-gray-600 hover:bg-gray-100 transition"
        >
          <div class="w-1/5 truncate">{{ job.jobname }}</div>
          <div class="w-2/5 truncate">
            {{ stringLimit(job.description, 40) }}
          </div>
          <div class="w-1/5 truncate">{{ job.departmentCategory }}</div>
          <div class="w-1/5">
            <select
              v-model="job.status"
              class="w-full border-gray-300 rounded-md focus:ring-2 py-2 focus:ring-blue-500 outline-none"
            >
              <option
                v-for="state in status"
                :key="state.id"
                :value="state.name"
              >
                {{ state.name }}
              </option>
            </select>
          </div>
          <div class="w-1/5 flex justify-center space-x-2">
            <button
              class="material-icons text-red-600 hover:text-red-800"
              @click="deleteJob(job.id)"
            >
              delete
            </button>
            <button
              class="material-icons text-blue-600 hover:text-blue-800"
              @click="editJob(job.id)"
            >
              edit
            </button>
            <button
              class="material-icons text-gray-600 hover:text-gray-800"
              @click="viewJob(job.id)"
            >
              visibility
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "JobListComponent",
  data() {
    return {
      joblist: [],
      status: [], // Status também é usado como categorias
      searchText: "",
      selectedCategory: "",
      api: process.env.VUE_APP_API_URL,
    };
  },
  computed: {
    filteredJobs() {
      return this.joblist.filter((job) => {
        const matchesText = job.jobname
          .toLowerCase()
          .includes(this.searchText.toLowerCase());
        const matchesCategory =
          !this.selectedCategory ||
          job.status.toLowerCase() === this.selectedCategory.toLowerCase();
        return matchesText && matchesCategory;
      });
    },
  },
  methods: {
    async getJobs() {
      try {
        const response = await axios.get(`${this.api}joblisting`);
        this.joblist = response.data;
      } catch (error) {
        console.error("Erro ao buscar vagas:", error);
      }
    },
    async getStatus() {
      try {
        const response = await axios.get(`${this.api}status`);
        this.status = response.data;
      } catch (error) {
        console.error("Erro ao buscar status:", error);
      }
    },
    stringLimit(text, limit) {
      return text.length > limit ? `${text.substring(0, limit)}...` : text;
    },
    async deleteJob(id) {
      try {
        await axios.delete(`${this.api}job/${id}`);
        this.joblist = this.joblist.filter((job) => job.id !== id);
      } catch (error) {
        console.error("Erro ao deletar vaga:", error);
      }
    },
    editJob(id) {
      console.log(`Edit job with ID: ${id}`);
    },
    viewJob(id) {
      console.log(`View job with ID: ${id}`);
    },
    addNewJob() {
      this.$router.push("/admin/joblistpage/create");
    },
  },
  mounted() {
    this.getJobs();
    this.getStatus();
  },
};
</script>
<style lang="scss" scoped>
.joblist-table {
  max-width: 1200px;
  margin: 0 auto;
}
button:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
}
</style>