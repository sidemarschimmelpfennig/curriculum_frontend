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
        :id-for-job="selectedJobId"
      />
    </div>
    <div
      class="w-full px-10 my-4 py-6 bg-white rounded-lg shadow-md job-component"
      v-for="(jobs, id) in joblisting"
      :key="id"
    >
      <div class="flex justify-between items-center job-header">
        <span class="bg-blue-700 text-white font-bold rounded px-2 py-1">
          {{ jobs.department }}
        </span>
        <label class="px-2 py-1 bg-gray-600 text-gray-100 font-bold rounded">
          {{ jobs.department_categories }}
        </label>
      </div>
      <div class="mt-2 job-content">
        <a
          class="text-2xl text-gray-700 font-bold hover:text-gray-600"
          href="#"

          >{{ jobs.name }}</a
        >
        <p class="mt-2 text-gray-600">{{ jobs.description }}</p>
      </div>
      <div class="flex justify-between items-center mt-4">

        <a class="readmore hover:cursor-pointer" @click="openModal(jobs.id)"
          >Candidatar</a
        >

        <div>
          <h1 class="text-gray-700 font-bold">{{ jobs.modalities }}</h1>
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

.applyanewjob {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  padding: 2rem;
  width: 100%;
  max-width: 600px;
  z-index: 50;
}
</style>
