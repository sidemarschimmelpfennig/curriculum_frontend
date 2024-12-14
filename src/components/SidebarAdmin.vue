<template>
  <div
    class="absolute h-full w-52 bg-blue-600 text-white sidebar-admin flex flex-col"
  >
    <router-link to="/admin">
      <img :src="logo" alt="Logo" class="flex m-auto p-4 h-24 w-auto" />
    </router-link>
    <ul class="flex-grow flex flex-col text-start">
      <li v-for="(item, index) in menuItems" :key="index">
        <router-link
          :to="item.to"
          class="block w-full p-4 hover:bg-blue-700 cursor-pointer"
        >
          {{ item.label }}
        </router-link>
      </li>
    </ul>
    <button
      class="flex items-center justify-start w-full p-4 hover:bg-blue-700"
    >
      <span class="material-icons pr-2 text-white">logout</span>Sair da Conta
    </button>
  </div>
</template>

<script>
export default {
  name: "SidebarAdmin",
  data() {
    return {
      logo: require("@/assets/image/logo-sgbr.png"),
      menuItems: [
        { label: "Vagas em Aberto", to: "/admin/joblistpage" },
        { label: "Usuários", to: "/admin/userpage" },
        { label: "Dados de Registro", to: "/admin/register_data" },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.sidebar-admin {
  display: flex;
  flex-direction: column;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
  flex-grow: 1; /* Faz com que a lista ocupe o espaço restante */
}

button {
  margin-top: auto; /* Empurra o botão para o final */
}
</style>
