<template>
  <section class="dark:bg-gray-900 create-account">
    <div
      class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 section"
    >
      <div
        class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
      >
        <a
          href="#"
          class="flex items-center m-4 text-2xl justify-center font-semibold text-gray-900 dark:text-white"
        >
          <img
            class="mr-2 logo w-1/2 h-w-1/2"
            src="@/assets/image/logo-sgbr.png"
            alt="logo"
          />
        </a>
        <div class="p-4 space-y-4 md:space-y-6 sm:p-8">
          <h1
            class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
          >
            Crie sua conta
          </h1>
          <form class="space-y-4 md:space-y-6" action="#">
            <div class="">
              <label
                for="email"
                class="flex mb-2 text-sm font-medium justify-start text-gray-900 dark:text-white"
                >Login</label
              >
              <input
                type="email"
                name="email"
                id="email"
                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Digite seu email"
                required=""
                :value="email"
              />
            </div>
            <div>
              <label
                for="password"
                class="flex mb-2 text-sm justify-start font-medium text-gray-900 dark:text-white"
                >Senha</label
              >
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
                :value="password"
              />
            </div>
            <div>
              <label
                for="retrypassword"
                class="flex mb-2 text-sm justify-start font-medium text-gray-900 dark:text-white"
              >
                Repetir Senha
              </label>
              <input
                type="password"
                name="retrypassword"
                id="retrypassword"
                placeholder="••••••••"
                v-model="retrypassword"
                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
              />
              <p v-if="passwordError" class="text-sm text-red-500 mt-1">
                As senhas não coincidem.
              </p>
            </div>

            <button
              @click="createUser"
              type="submit"
              class="w-full bg-slate-500 text-white signin hover:bg-slate-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Cadastre-se
            </button>
            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
              Ja tem conta ?
              <a
                href="/login"
                class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >Faça seu login</a
              >
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import axios from "axios";

export default {
  name: "CreateAccountView",
  data() {
    return {
      email: "",
      password: "",
      retrypassword: "",
      passwordError: false,
      isAdmin: 0,
      api: process.env.API_URL,
    };
  },
  methods: {
    async createUser(event) {
      event.preventDefault();
      if (this.password !== this.retrypassword) {
        this.passwordError = true;
        return;
      }
      this.passwordError = false;

      try {
        const data = {
          email: this.email,
          password: this.password,
          isAdmin: this.isAdmin,
        };
        const response = await axios.post(`${this.api}add-user`, data);
        console.log("Usuário criado com sucesso:", response.data);
      } catch (error) {
        console.error("Erro ao criar usuário:", error);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/views/createaccountview";
</style>
