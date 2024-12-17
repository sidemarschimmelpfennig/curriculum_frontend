<template>
  <div
    class="joblist-table p-5"
    :class="{
      activeModalClass:
        showModalCreate || showModalUpdate || showModalView || showModalDelete,
    }"
  >
    <div class="flex flex-wrap justify-between items-center gap-4 mb-6">
      <button
        class="material-icons text-gray-600 hover:text-white px-4 py-2 rounded-md hover:bg-gray-600 shadow-md"
        @click="showModalCreate = true"
      >
        add
      </button>
      <CreateJobForm
        v-if="showModalCreate"
        :show="showModalCreate"
        @close="closeModal()"
        class="openModal"
        :mobilities="mobilities"
      />

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
          <UpdateOrViewJobForm
            v-if="showModalUpdate"
            :show="showModalUpdate"
            @close="closeModal()"
            :idJobListing="isIdForJob"
            :isUpdate="isUpdate"
            class="openModal"
          />
          <DeleteMessage
            v-if="showModalDelete"
            :show="showModalDelete"
            @close="closeModal()"
            :labelText="textDelete"
            :routeText="textRouteDelete"
            class="openModal"
          />
          <UpdateOrViewJobForm
            v-if="showModalView"
            :show="showModalView"
            @close="showModalView = false"
            :idJobListing="isIdForJob"
            :isUpdate="isUpdate"
            class="openModal"
          />
          <div class="w-1/5 truncate">{{ job.name }}</div>
          <div class="w-2/5 truncate">
            {{ stringLimit(job.description, 40) }}
          </div>
          <div class="w-1/5 truncate">{{ job.department }}</div>
          <div class="w-1/5 truncate">
            {{ job.status }}
          </div>
          <div class="w-1/5 flex justify-center space-x-2">
            <button
              class="material-icons text-red-600 hover:text-red-800 border-none outline-none"
              @click="deleteJob(job.id, job.name)"
            >
              delete
            </button>
            <button
              class="material-icons text-blue-600 hover:text-blue-800 border-none outline-none"
              @click="editJob(job.id)"
            >
              edit
            </button>

            <button
              class="material-icons text-gray-600 hover:text-gray-800 border-none outline-none"
              @click="openJobView(job.id)"
            >
              visibility
            </button>
            <button
              class="material-icons text-gray-600 hover:text-gray-800 border-none outline-none"
              @click="getCandidates(job.id)"
            >
              lists
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import CreateJobForm from "./Forms/CreateJobForm.vue";
import UpdateOrViewJobForm from "./Forms/UpdateOrViewJobForm.vue";
import DeleteMessage from "@/components/DeleteMessage.vue";

export default {
  name: "JobListComponent",
  data() {
    return {
      joblist: [],
      status: [],
      searchText: "",
      selectedCategory: "",
      api: process.env.VUE_APP_API_URL,
      showModalCreate: false,
      showModalUpdate: false,
      showModalView: false,
      showModalDelete: false,
      isUpdate: false,
      form: {},
      textDelete: "Deseja excluir esta vaga?",
      textRouteDelete: "",
      mobilities: ["Hibrido", "Presencial", "Remoto"],
      isIdForJob: "",
    };
  },
  computed: {
    filteredJobs() {
      return this.joblist.filter((job) => {
        const matchesText = job.name
          .toLowerCase()
          .includes(this.searchText.toLowerCase());
        const matchesCategory =
          !this.selectedCategory ||
          job.status.toLowerCase() === this.selectedCategory.toLowerCase();
        return matchesText && matchesCategory;
      });
    },
    getJob() {
      return (id) => this.joblist.find((job) => job.id === id);
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
    stringLimit(text, limit) {
      return text.length > limit ? `${text.substring(0, limit)}...` : text;
    },
    async deleteJob(id, name) {
      try {
        this.showModalDelete = true;
        this.textDelete = `Deseja excluir a vaga de "${name}"?`;
        this.textRouteDelete = `${this.api}joblisting/${id}`;
      } catch (error) {
        console.error("Erro ao deletar vaga:", error);
      }
    },
    editJob(id) {
      this.showModalUpdate = true;
      this.isUpdate = true;
      this.form = this.getJob(id);
    },
    openJobView(id) {
      this.isIdForJob = String(id);
      this.isUpdate = false;
      this.showModalView = true;
    },
    closeModal() {
      this.showModalUpdate = false;
      this.showModalCreate = false;
      this.showModalDelete = false;
      this.getJobs();
    },
    getCandidates(id) {
      this.$router.push({ name: "candidatestojob", params: { id } });
    },
  },
  mounted() {
    this.getJobs();
  },
  components: {
    CreateJobForm,
    UpdateOrViewJobForm,
    DeleteMessage,
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

.openModal {
  width: auto;
  height: auto;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  input,
  button {
    margin-bottom: 10px;
  }
  .userpage {
    background: #22222287;
  }
}

.activeModalClass::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(#2222, 0.5);
  z-index: 1;
  @media (max-width: 500px) {
    height: 100%;
  }
}
</style>