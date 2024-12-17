<template>
  <div class="mx-auto p-6 bg-white shadow-md rounded-lg showModalComponent">
    <div class="text-xl font-semibold text-center flex">
      <h2 class="text-2xl font-semibold mb-4 pr-48 pl-5">
        Cadastre uma nova vaga
      </h2>
      <span
        class="material-icons text-white bold pl-8 hover:text-red-600 hover:cursor-pointer"
        @click="closeModal"
        >close</span
      >
    </div>

    <form class="formModalComponent" @submit.prevent="submitForm">
      <div class="flex flex-col space-y-2">
        <label
          for="jobname"
          class="text-sm font-medium text-gray-700 text-start"
          >Nome da vaga</label
        >
        <input
          type="text"
          id="jobname"
          v-model="form.name"
          required
          class="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <div class="flex flex-col space-y-2 h-40">
        <label
          for="description"
          class="text-sm font-medium text-gray-700 text-start"
          >Descrição</label
        >
        <textarea
          id="description"
          v-model="form.description"
          class="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Descreva a vaga aqui"
        ></textarea>
      </div>
      <div class="flex flex-col space-y-2">
        <label for="category" class="text-sm font-medium text-gray-700"
          >Setor :</label
        >
        <select
          id="category"
          v-model="form.department"
          required
          class="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option
            v-for="departament in departments"
            :key="departament.name"
            :value="departament.name"
          >
            {{ departament.name }}
          </option>
        </select>
      </div>

      <div class="flex flex-col space-y-2">
        <label for="category" class="text-sm font-medium text-gray-700"
          >Categorias :</label
        >
        <select
          id="category"
          v-model="form.department_categories"
          required
          class="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option
            v-for="dc in departments_categories"
            :key="dc.name"
            :value="dc.name"
          >
            {{ dc.name }}
          </option>
        </select>
      </div>

      <div class="flex flex-col space-y-2">
        <label for="mobilities" class="text-sm font-medium text-gray-700"
          >Modelo de trabalho :</label
        >
        <select
          id="mobilities"
          v-model="form.mobilities"
          required
          class="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option
            v-for="mobility in mobilities_array"
            :value="mobility.name"
            :key="mobility.name"
          >
            {{ mobility.name }}
          </option>
        </select>
      </div>

      <div class="flex flex-col space-y-2">
        <label for="skills" class="text-sm font-medium text-gray-700 text-start"
          >Requisitos :</label
        >
        <input
          type="text"
          id="skills"
          v-model="form.skills"
          class="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Digite as habilidades separadas por vírgula"
        />
      </div>

      <button
        type="submit"
        class="py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition mt-4"
      >
        Criar nova vaga
      </button>
    </form>
  </div>
</template>
<script>
import axios from "axios";
import data from "@/assets/data.json";

export default {
  data() {
    return {
      form: {
        name: "",
        description: "",
        department: "",
        department_categories: "",
        status: "Aberta",
        skills: "",
        mobilities: "",
      },
      departments: data.departments,
      departments_categories: data.departmentCategory,
      mobilities_array: data.mobilities,
      api: process.env.VUE_APP_API_URL,
    };
  },
  methods: {
    async submitForm() {
      try {
        const jobData = {
          name: this.form.name,
          description: this.form.description,
          department: this.form.department,
          department_categories: this.form.department_categories,
          status: this.form.status,
          skills: this.form.skills.split(",").map((skill) => skill.trim()),
          mobilities: this.form.mobilities,
        };

        const response = await axios.post(`${this.api}joblisting`, jobData);
        console.log("Nova vaga cadastrada com sucesso!");
        this.closeModal();
      } catch (error) {
        console.error("Erro ao enviar o formulário:", error);
        alert("Erro ao enviar o formulário. Por favor, tente novamente.");
      }
    },

    closeModal() {
      this.$emit("close");
    },

    handleKeydown(event) {
      if (event.key === "Escape") {
        this.closeModal();
      }
    },
  },
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    mobilities: {
      type: Array,
      required: true,
    },
  },
  mounted() {
    window.addEventListener("keydown", this.handleKeydown);
  },
  beforeUnmount() {
    window.removeEventListener("keydown", this.handleKeydown);
  },
};
</script>
<style scoped lang="scss">
@import "@/assets/scss/main";
</style>
