<template>
  <div class="relative w-full job">
    <div
      v-if="showModal"
      class="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50"
    >
      <ApplyForaJobForm
        :show="showModal"
        @close="showModal = false"
        class="applyanewjob"
        :idForJob="selectedJobId"
      />
    </div>
    <div
      class="w-full px-10 my-4 py-6 bg-white rounded-lg shadow-md job-component"
      v-for="(jobs, id) in joblisting"
      :key="id"
    >
      <div class="flex justify-between items-center job-header">
        <span class="bg-blue-600 text-white font-bold rounded px-2 py-1">
          {{ jobs.department }}
        </span>
        <label class="px-2 py-1 bg-blue-200 text-blue-800 font-bold rounded">
          {{ jobs.department_categories }}
        </label>
      </div>
      <div class="mt-2 job-content">
        <a
          class="text-2xl text-blue-800 font-bold hover:text-blue-600"
          href="#"
          >{{ jobs.name }}</a
        >
        <p class="mt-2 text-gray-600">{{ jobs.description }}</p>
      </div>
      <div class="mt-2 job-content">
        <h3 class="text-blue-700 mb-4 font-bold">Requisitos:</h3>
        <span
          class="bg-blue-500 text-white font-bold rounded px-4 py-1 mx-4"
          v-for="skill in jobs.skills"
          :key="skill"
        >
          {{ skill }}
        </span>
      </div>
      <div class="flex justify-between items-center mt-4">
        <a
          class="readmore text-white hover:cursor-pointer"
          @click="openModal(jobs.id)"
          >Candidatar</a
        >

        <div>
          <h1 class="text-blue-700 font-bold">{{ jobs.mobilities }}</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ApplyForaJobForm from "./ApplyForaJobForm.vue";
export default {
  data() {
    return {
      joblist: [],
      showModal: false,
      selectedJobId: 1,
    };
  },
  props: {
    joblisting: {
      type: Array,
      required: true,
    },
  },
  components: {
    ApplyForaJobForm,
  },
  methods: {
    openModal(jobid) {
      this.selectedJobId = jobid;
      this.showModal = true;
    },
  },

  mounted() {
    this.joblist = this.joblisting;
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/joblistingcomponent";
</style>
