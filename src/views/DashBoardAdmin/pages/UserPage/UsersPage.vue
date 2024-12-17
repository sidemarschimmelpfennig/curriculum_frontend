<template>
  <div
    class="bg-blue-200 userpage"
    :class="{ activeModalClass: showModal || showModalDelete }"
  >
    <div
      class="grid grid-cols-1 gap-4 p-6 mx-auto bg-white rounded-lg shadow-md"
    >
      <div class="flex items-center justify-between">
        <button
          class="material-icons text-gray-600 hover:text-white px-4 py-2 rounded-md hover:bg-gray-600 shadow-md"
          @click="showModal = true"
        >
          add
        </button>
        <CreateUserForm
          v-if="showModal"
          :show="showModal"
          @close="closeModal()"
          class="openModal"
        />
        <DeleteMessage
          v-if="showModalDelete"
          :show="showModalDelete"
          @close="closeModal()"
          :labelText="textDelete"
          :routeText="textRouteDelete"
          class="openModal"
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
              <th class="px-4 py-2 text-left text-sm font-medium text-gray-600">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="user in users"
              :key="user.id"
              class="border-b text-start"
            >
              <UpdateUserForm
                v-if="showModalUpdate"
                :show="showModalUpdate"
                @close="closeModal()"
                :idFromUser="idUser"
                class="openModal"
              />
              <td class="px-4 py-2 text-sm text-gray-700">{{ user.named }}</td>
              <td class="px-4 py-2 text-sm text-gray-700">{{ user.email }}</td>
              <td class="px-4 py-2 text-sm text-gray-700">
                {{ user.is_admin === 0 ? "Padrão" : "Administrador" }}
              </td>
              <td class="px-4 py-2 text-sm text-gray-700">
                <button
                  class="material-icons text-red-600 hover:text-red-800 pr-4 border-none outline-none"
                  @click="deleteUser(user.id)"
                >
                  delete
                </button>
                <button
                  class="material-icons text-blue-600 hover:text-blue-800 pr-4 border-none outline-none"
                  @click="updateUser(user.id)"
                >
                  edit
                </button>
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
import DeleteMessage from "@/components/DeleteMessage.vue";
import CreateUserForm from "./Forms/CreateUserForm.vue";
import axios from "axios";
import UpdateUserForm from "./Forms/UpdateUserForm.vue";

export default {
  name: "UserManagement",
  data() {
    return {
      users: [],
      showModal: false,
      showModalDelete: false,
      showModalUpdate: false,
      textDelete: "",
      idUser: "",
      textRouteDelete: "",
      api: process.env.VUE_APP_API_URL,
    };
  },
  methods: {
    closeModal() {
      this.showModalUpdate = false;
      this.showModal = false;
      this.showModalDelete = false;
      this.getAllUsers();
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
    deleteUser(id) {
      this.showModalDelete = true;
      this.textDelete = "Deseja excluir este usuário?";
      this.textRouteDelete = `${this.api}users/${id}`;
    },
    updateUser(id) {
      this.showModalUpdate = true;
      this.idUser = id;
      this.getAllUsers();
    },

    async getAllUsers() {
      try {
        let response = await axios.get(`${this.api}users`);
        let data = response.data;
        this.users = data;
      } catch (error) {
        console.log(error.message);
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
  mounted() {
    this.getAllUsers();
  },
  components: {
    CreateUserForm,
    DeleteMessage,
    UpdateUserForm,
  },
};
</script>

<style  lang="scss" scoped>
.userpage {
  height: 100vh;
  padding-top: 2rem;

  .grid {
    width: 70rem;
  }
}
.openModal {
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

.activ::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(
    #2222,
    0.5
  ); /* Cor com opacidade para sobrepor a imagem */
  z-index: 1;
  @media (max-width: 500px) {
    height: 100%;
  }
}
</style>