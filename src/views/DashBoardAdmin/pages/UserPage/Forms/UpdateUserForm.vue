<template>
  <div v-if="show" class="mt-6 bg-white text-gray-700 newuser" key="">
    <div class="text-xl font-semibold text-center flex">
      <h3 class="pr-11">Adicionar Novo Usuário</h3>
      <span
        class="material-icons bold pl-8 hover:text-red-600 hover:cursor-pointer text-gray-700"
        @click="closeModal()"
        >close</span
      >
    </div>

    <div class="mt-4">
      <label for="named" class="block text-sm font-medium text-gray-700"
        >Nome</label
      >
      <input
        type="text"
        id="named"
        v-model="form.named"
        class="mt-1 block w-fullborder border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 py-2 px-3 text-sm"
        placeholder="Digite seu nome"
      />
    </div>
    <div class="mt-2">
      <label for="email" class="block text-sm font-medium text-gray-700"
        >Email</label
      >
      <input
        type="email"
        id="email"
        v-model="form.email"
        class="mt-1 block w-fullborder border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 py-2 px-3 text-sm"
        placeholder="Digite o email"
      />
    </div>

    <div class="mt-2">
      <label for="password" class="block text-sm font-medium text-gray-700"
        >Senha</label
      >
      <input
        type="password"
        id="password"
        v-model="form.password"
        class="mt-1 block w-fullborder border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 py-2 px-3 text-sm"
        placeholder="Digite a senha"
      />
    </div>
    <button
      @click="submitForm"
      class="w-full py-2 px-4 mt-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:ring-blue-500"
    >
      Salvar
    </button>
  </div>
</template>
    
<script>
import axios from "axios";

export default {
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    idFromUser: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      form: {
        named: "",
        password: "",
        email: "",
        is_admin: 0,
      },
      api: process.env.VUE_APP_API_URL,
    };
  },
  methods: {
    async submitForm() {
      let form = {
        named: this.named,
        email: this.email,
        password: this.password,
        is_admin: this.is_admin,
      };
      try {
        const response = await axios.put(
          `${this.api}users/${this.idFromUser}`,
          form
        );
        console.log(response);

        this.closeModal();
      } catch (error) {
        console.log(error);
      }
    },
    async getUserById() {
      try {
        let response = await axios.get(`${this.api}users/${this.idFromUser}`);
        this.form = response.data;
      } catch (error) {
        console.log(error);
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
  mounted() {
    window.addEventListener("keydown", this.handleKeydown);
    this.getUserById();
  },
  beforeUnmount() {
    window.removeEventListener("keydown", this.handleKeydown);
  },
};
</script>
  <style lang="scss">
.newuser {
  width: 15rem;
  padding: 10px;
  label {
    text-align: start;
  }
  input {
    height: 2.5rem;
    width: 20rem;
    padding: 10px;
  }
  button {
    width: 20rem;
  }
}
</style>
    