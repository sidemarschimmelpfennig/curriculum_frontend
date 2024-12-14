<template>
  <div class="absolute h-full w-52 bg-blue-600 text-white sidebar-admin">
    <router-link to="/admin">
      <img :src="logo" alt="Logo" class="flex m-auto p-4 h-24 w-auto" />
    </router-link>
    <ul
      class="flex flex-col text-start"
      v-for="(item, index) in menuItems"
      :key="index"
    >
      <router-link
        :to="item.to"
        class="block w-full p-4 hover:bg-blue-700 cursor-pointer"
      >
        {{ item.label }}
      </router-link>
    </ul>
    <router-link
      to="/"
      class="flex text-start justify-items-end p-4 hover:bg-blue-700 bottom-1"
      ><span class="material-icons pr-2 text-white">logout</span>Sair da Conta
    </router-link>
  </div>
</template>

<script>
export default {
  name: "SidebarAdmin",
  data() {
    return {
      logo: require("@/assets/image/logo-sgbr.png"), // Corrige caminho da imagem
      menuItems: [
        { label: "Vagas em Aberto", to: "/admin/joblistpage" },
        { label: "Usuários", to: "/admin/userpage" },
        { label: "Configurações", to: "/admin/configuration" },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.sidebar-admin {
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>
