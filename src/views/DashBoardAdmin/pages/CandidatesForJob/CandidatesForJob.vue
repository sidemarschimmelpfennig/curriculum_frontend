<template>
  <div class="joblist-table p-5">
    <div class="flex flex-wrap justify-between items-center gap-4 mb-6">
      <div class="flex flex-wrap justify-center gap-4">
        <input
          id="input1"
          class="w-80 border pl-4 p-2 rounded-md focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
          type="text"
          placeholder="Nome do Candidato"
        />
        <form class="w-60"></form>
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
        <div class="w-1/5">Nome do Candidato</div>
        <div class="w-2/5">Email</div>
        <div class="w-1/5">Telefone</div>
        <div class="w-1/5 text-center">Ações</div>
      </div>
      <div id="joblist-table-rows" class="divide-y">
        <div
          v-for="(job, id) in jobs"
          :key="id"
          class="joblist-table-row flex items-center p-4 text-gray-600 hover:bg-gray-100 transition"
        >
          <div class="w-1/5 truncate">{{ job.full_name }}</div>
          <div class="w-2/5 truncate">
            {{ job.email }}
          </div>
          <div class="w-1/5 truncate">
            {{ job.contactphone }}
          </div>
          <div class="w-1/5 flex justify-center space-x-2">
            <button class="material-icons text-red-600 hover:text-red-800">
              delete
            </button>
            <button class="material-icons text-blue-600 hover:text-blue-800">
              edit
            </button>

            <button class="material-icons text-gray-600 hover:text-gray-800">
              visibility
            </button>
            <button
              class="material-icons text-gray-600 hover:text-gray-800"
              @click="download(job.id)"
            >
              download
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
      jobs: [],
      search: "",
    };
  },
  methods: {
    async getJobs() {
      try {
        let id = this.$route.params.id;
        let response = await axios.get(
          `http://localhost:5000/api/candidates/job/${id}`
        );

        this.jobs = response.data.candidates;
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    },
    async download(id) {
      try {
        let response = await axios.get(
          `http://localhost:5000/api/candidates/download/id/${id}`
        );
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    },
  },
  mounted() {
    this.getJobs();
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

.addnewuser {
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

.active-form::before {
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