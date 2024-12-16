<template>
  <div class="bg-blue-200 userpage">
    <div
      class="grid grid-cols-1 gap-4 p-6 max-w-3xl mx-auto bg-white rounded-lg shadow-md"
    >
      <div class="flex items-center justify-between">
        <button
          class="bg-blue-600 text-white rounded-md p-2 hover:bg-blue-700"
          @click="showModal = true"
        >
          Novo Usuário
        </button>
        <NewUserAdmin
          v-if="showModal"
          :show="showModal"
          @close="showModal = false"
          class="addnewuser"
        />
        <h2 class="text-2xl font-semibold text-center flex-1">
          Usuários no Sistema
        </h2>
      </div>

      <div v-if="users.length" class="overflow-x-auto">
        <table class="min-w-full bg-white border border-gray-200">
          <thead class="bg-gray-100 border-b rounded-xl">
            <tr>
              <th class="px-4 py-2 text-left text-sm font-medium text-gray-600">
                Nome
              </th>
              <th class="px-4 py-2 text-left text-sm font-medium text-gray-600">
                Email
              </th>
              <th class="px-4 py-2 text-left text-sm font-medium text-gray-600">
                Nível
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="user in users"
              :key="user.id"
              class="border-b text-start"
            >
              <td class="px-4 py-2 text-sm text-gray-700">{{ user.named }}</td>
              <td class="px-4 py-2 text-sm text-gray-700">{{ user.email }}</td>
              <td class="px-4 py-2 text-sm text-gray-700">
                {{
                  user.is_admin === 0
                    ? "Usuário não administrador"
                    : "Administrador"
                }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else class="text-center text-gray-600">
        Nenhum usuário encontrado.
      </div>
    </div>
  </div>
</template>

<script>
import NewUserAdmin from "./Forms/NewUserAdmin.vue";
export default {
  name: "UserManagement",
  data() {
    return {
      users: [
        {
          named: "Sidemar",
          email: "sidemarschi@gmail.com",
          password: "1123",
          is_admin: "0",
        },
      ],
      showModal: false,
      api: process.env.VUE_APP_API_URL,
    };
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await fetch(`${this.api}`);
        if (!response.ok) {
          throw new Error("Erro ao buscar usuários.");
        }
        this.users = await response.json();
      } catch (error) {
        alert(error.message);
      }
    },
    async submitForm() {
      try {
        const response = await fetch("http://localhost:8000/api/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.form),
        });
        if (!response.ok) {
          throw new Error("Erro ao salvar os dados.");
        }
        alert("Usuário cadastrado com sucesso!");
        this.fetchUsers();
        this.resetForm();
      } catch (error) {
        alert(error.message);
      }
    },
    resetForm() {
      this.form = {
        email: "",
        password: "",
        is_admin: "0",
      };
    },
  },
  mounted() {},
  components: {
    NewUserAdmin,
  },
};
</script>

<style  lang="scss" scoped>
.userpage {
  height: 100vh;
  padding-top: 2rem;
}
.addnewuser {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  width: 25rem;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  overflow-y: auto;
  max-height: 60vh;
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
</style>