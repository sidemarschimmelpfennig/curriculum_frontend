<template>
  <div class="mx-auto p-6 bg-white shadow-md rounded-lg applyforajob">
    <div class="text-xl font-semibold text-center flex">
      <h2 class="text-2xl font-semibold mb-4 pr-48 pl-5">
        Cadastre seu Currículo
      </h2>
      <span
        class="material-icons text-white bold pl-8 hover:text-red-600 hover:cursor-pointer"
        @click="closeModal"
        >close</span
      >
    </div>
    <form @submit.prevent="submitForm" enctype="multipart/form-data">
      <div class="flex flex-col space-y-2">
        <label
          for="full_Name"
          class="text-sm font-medium text-gray-700 text-start"
          >Nome Completo</label
        >
        <input
          type="text"
          id="full_Name"
          v-model="formData.full_Name"
          required
          class="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div class="flex flex-col space-y-2">
        <label for="email" class="text-sm font-medium text-gray-700"
          >Email</label
        >
        <input
          type="email"
          id="email"
          v-model="formData.email"
          required
          class="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <div class="flex flex-col space-y-2">
        <label for="phone" class="text-sm font-medium text-gray-700"
          >Telefone</label
        >
        <input
          type="tel"
          id="phone"
          v-model="formData.phone"
          required
          class="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div class="flex flex-col space-y-2">
        <label for="skills" class="text-sm font-medium text-gray-700 text-start"
          >Habilidades</label
        >
        <input
          type="text"
          id="skills"
          v-model="formData.skills"
          class="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <div class="flex flex-col space-y-2 h-40">
        <label
          for="additional_info"
          class="text-sm font-medium text-gray-700 text-start"
          >Informações Adicionais</label
        >
        <textarea
          id="additional_info"
          v-model="formData.additional_info"
          class="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Digite informações adicionais aqui..."
        ></textarea>
      </div>

      <div class="flex flex-col space-y-2">
        <label
          for="curriculum"
          class="text-sm font-medium text-gray-700 text-start"
          >Currículo</label
        >
        <input
          type="file"
          id="curriculum"
          @change="handleFileChange($event, 'curriculum')"
          class="flex-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 py-2 px-3 text-sm"
          placeholder="Escolha um arquivo"
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
        email: "",
        phone: "",
        additional_info: "",
        skills: "",
        curriculum: null,
      },
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

        // Adicionando os campos do formulário
        form.append("full_Name", this.formData.full_Name);
        form.append("email", this.formData.email);
        form.append("phone", this.formData.phone);
        form.append("additional_info", this.formData.additional_info);
        form.append("skills", this.formData.skills);

        // Adicionando o arquivo
        if (this.formData.curriculum) {
          form.append("curriculum", this.formData.curriculum);
        }

        // Enviando a solicitação POST com FormData
        const response = await axios.post(`${this.api}sendcurriculum`, form, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        console.log(response.data);
        console.log("curriculo cadastrado com sucesso");
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
}
</style>
