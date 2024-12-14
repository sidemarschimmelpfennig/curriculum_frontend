<template>
  <div class="mx-auto p-6 bg-white shadow-md rounded-lg applyforajob">
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
    <form class="form-new-job">
      <div class="flex flex-col space-y-2">
        <label
          for="full_Name"
          class="text-sm font-medium text-gray-700 text-start"
          >Nome da vaga</label
        >
        <input
          type="text"
          id="full_Name"
          v-model="formData.full_Name"
          required
          class="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <div class="flex flex-col space-y-2 h-40">
        <label
          for="additional_info"
          class="text-sm font-medium text-gray-700 text-start"
          >Descrição</label
        >
        <textarea
          id="additional_info"
          v-model="formData.description"
          class="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Descreva a vaga aqui"
        ></textarea>
      </div>

      <div class="flex flex-col space-y-2">
        <label for="email" class="text-sm font-medium text-gray-700"
          >Categorias :</label
        >
        <select
          name=""
          id=""
          v-model="formData.category"
          required
          class="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Teste</option>
        </select>
      </div>
      <div class="flex flex-col space-y-2">
        <label for="email" class="text-sm font-medium text-gray-700"
          >Modelo de trabalho :</label
        >
        <select
          name=""
          id=""
          v-model="formData.mobilities"
          required
          class="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Teste</option>
        </select>
      </div>

      <div class="flex flex-col space-y-2">
        <label for="skills" class="text-sm font-medium text-gray-700 text-start"
          >Requisitos :</label
        >
        <input
          type="text"
          id="skills"
          v-model="formData.skills"
          class="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <button
        type="submit"
        class="py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition mt-4"
        @click="submitForm"
      >
        Enviar
      </button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      formData: {
        full_Name: "",
        description: "",
        category: "",
        mobilities: "",
        skills: "",
      },
      curriculum: "",
      api: process.env.VUE_APP_API_URL,
    };
  },
  methods: {
    handleFileChange(event, fieldName) {
      const file = event.target.files[0];
      if (file) {
        this.formData[fieldName] = file;
      } else {
        this.formData[fieldName] = null;
      }
    },
    async submitForm() {
      try {
        // Criando uma instância de FormData
        const form = new FormData();
        data = {
          full_Name: "",
          description: "",
          category: "",
          mobilities: "",
          skills: "",
        };

        const response = await axios.post(`${this.api}send`, form);
        console.log(response);
        console.log("Nova vaga cadastrada com sucesso!");
        this.closeModal(); // Fechar o modal após o envio
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
    idForJob: {
      type: Number,
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
.applyforajob {
  form {
    max-width: 35rem;

    button {
      align-items: center;
      width: 50%;
    }
    label {
      text-align: start;
      padding-top: 0.5rem;
    }
  }
  .names {
    justify-content: start;
    justify-items: start;
  }
  .form-new-job {
    width: 40rem;
  }
}
</style>
