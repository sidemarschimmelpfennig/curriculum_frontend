<template>
  <div class="mx-auto p-6 bg-white shadow-md rounded-lg showModalComponent">
    <div class="text-xl font-semibold text-center flex">
      <h2 class="text-2xl font-semibold mb-4 pr-48 pl-5 justify-start">
        {{ isUpdate ? "Atualizar vaga" : form.name }}
      </h2>
      <span
        class="material-icons text-white bold pl-8 hover:text-red-600 hover:cursor-pointer"
        @click="closeModal"
        >close</span
      >
    </div>

    <form class="formModalComponent" @submit.prevent="submitForm">
      <div class="flex flex-col space-y-2" v-if="isUpdate">
        <label for="name" class="text-sm font-medium text-gray-700 text-start"
          >Nome da vaga</label
        >
        <input
          :readonly="!isUpdate"
          type="text"
          id="name"
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
          :disabled="!isUpdate"
          id="description"
          v-model="form.description"
          class="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Descreva a vaga aqui"
        ></textarea>
      </div>

      <div class="flex flex-col space-y-2">
        <label for="category" class="text-sm font-medium text-gray-700"
          >Categoria</label
        >
        <select
          :disabled="!isUpdate"
          v-model="form.department_categories"
          required
          class="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">{{ form.department_categories }}</option>
          <option
            v-for="categori in departments_categories"
            :key="categori.name"
            :value="categori.name"
          >
            {{ categori.name }}
          </option>
        </select>
      </div>

      <div class="flex flex-col space-y-2">
        <label for="mobility" class="text-sm font-medium text-gray-700"
          >Modalidade de trabalho</label
        >
        <select
          :disabled="!isUpdate"
          v-model="form.mobilities"
          required
          class="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option :value="form.mobilities">{{ form.mobilities }}</option>
          <option
            v-for="mobility in mobilities_array"
            :key="mobility.name"
            :value="mobility.id"
          >
            {{ mobility.name }}
          </option>
        </select>
      </div>
      <div class="flex flex-col space-y-2">
        <label for="skills" class="text-sm font-medium text-gray-700 text-start"
          >Requisitos</label
        >
        <input
          :disabled="!isUpdate"
          type="text"
          id="name"
          v-model="form.skills"
          required
          class="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <button
        v-if="isUpdate"
        type="submit"
        class="py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition mt-4"
      >
        {{ "Atualizar" }}
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
    closeModal() {
      this.$emit("close");
    },
    submitForm() {},
    async updateJob() {
      try {
        const response = await axios.put(
          `${this.api}joblisting/${this.idJobListing}`,
          this.form
        );
        console.log("Vaga atualizada:", response);
        this.closeModal();
      } catch (error) {
        console.error("Erro ao atualizar vaga:", error);
      }
    },
    async getJob() {
      try {
        const response = await axios.get(
          `${this.api}joblisting/${this.idJobListing}`
        );
        console.log(response);
        this.form = response.data;
      } catch (error) {
        console.error("Erro ao buscar vaga:", error);
      }
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
    isUpdate: {
      type: Boolean,
      required: true,
    },
    idJobListing: {
      type: String,
      required: true,
    },
  },
  mounted() {
    window.addEventListener("keydown", this.handleKeydown);
    this.getJob();
  },
  beforeUnmount() {
    window.removeEventListener("keydown", this.handleKeydown);
  },
};
</script>


<style scoped lang="scss">
@import "@/assets/scss/main";
</style>

