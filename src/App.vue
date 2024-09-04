<template>
  <div>
    <!-- Toolbar -->
    <div class="toolbar">
      <button @click="showComponent('A')">Deployment Create</button>
      <button @click="showComponent('B')">Pod Create</button>
    </div>

    <!-- Form Bileşenleri -->
    <div v-if="currentComponent === 'A'">
      <DeploymentForm />
    </div>
    <div v-if="currentComponent === 'B'">
      <PodForm />
    </div>
  </div>
</template>

<script>
import DeploymentForm from './components/DeploymentForm.vue';
import PodForm from './components/PodForm.vue';

export default {
  components: {
    DeploymentForm,
    PodForm,
  },
  data() {
    return {
      currentComponent: 'B', // Main component
    };
  },
  methods: {
    showComponent(component) {
      this.currentComponent = component;
    },
  },
};
</script>

<style scoped>
.toolbar {
  display: flex;
  justify-content: center;
  padding: 10px;
  background-color: #f0f0f0;
  border-bottom: 1px solid #ddd;
  margin-bottom: 20px;
}

.toolbar button {
  margin: 0 10px;
  padding: 8px 16px;
  font-size: 16px;
  cursor: pointer;
}
</style>
