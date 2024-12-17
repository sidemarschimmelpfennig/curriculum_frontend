<template>
  <div class="p-6 max-w-sm mx-auto bg-white rounded-lg shadow-lg">
    <p class="text-lg mb-4">{{ labelText }}</p>
    <div class="flex justify-around w-full py-4">
      <button
        @click="deleteThisroute()"
        class="px-5 py-2 rounded-md w-1/2 mr-5 transition duration-300 bg-gray-200 text-gray-700 hover:bg-blue-500 hover:text-white p-4 border-none"
      >
        Sim
      </button>
      <button
        @click="closeModal"
        class="px-5 py-2 rounded-md w-1/2 transition duration-300 hover:text-white hover:bg-red-500 bg-gray-200 text-gray-700 border-none"
      >
        Não
      </button>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  props: {
    labelText: {
      type: String,
      require: true,
    },
    routeText: {
      type: String,
      require: true,
    },
  },
  methods: {
    async deleteThisroute() {
      try {
        let response = await axios.delete(`${this.routeText}`);
        if ((response.status = 200)) {
          this.closeModal();
        }
      } catch (err) {
        console.log(err);
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
  },
  beforeUnmount() {
    window.removeEventListener("keydown", this.handleKeydown);
  },
};
</script>

<style lang="scss"  scoped>
</style>