<template>
  <section class="dark:bg-gray-900 login">
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
            Entre em sua conta
          </h1>
          <form @submit.prevent="handleLogin" class="space-y-4 md:space-y-6">
            <div class="mb-4">
              <label
                for="email"
                class="flex mb-2 text-sm font-medium justify-start text-gray-900 dark:text-white"
                >Login</label
              >
              <input
                type="email"
                id="email"
                v-model="email"
                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Digite seu email"
                required
              />
            </div>
            <div class="mb-4">
              <label
                for="password"
                class="flex mb-2 text-sm justify-start font-medium text-gray-900 dark:text-white"
                >Senha</label
              >
              <input
                type="password"
                id="password"
                v-model="password"
                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="••••••••"
                required
              />
            </div>
            <button
              type="submit"
              class="w-full text-white signin hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Entrar
            </button>
            <p v-if="error" class="text-sm text-red-600">{{ error }}</p>
            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
              Não tem uma conta?
              <a
                href="/register"
                class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >Cadastre-se</a
              >
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      email: "",
      password: "",
      error: null,
    };
  },
  methods: {
    ...mapActions("auth", ["login"]),
    async handleLogin() {
      const credentials = { email: this.email, password: this.password };
      try {
        const success = await this.login(credentials);
        if (success) {
          this.$router.push("/admin"); // Redireciona para a página administrativa
        } else {
          this.error = "Credenciais incorretas. Tente novamente.";
        }
      } catch (error) {
        this.error = "Erro ao tentar realizar o login.";
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/views/loginview";
</style>
