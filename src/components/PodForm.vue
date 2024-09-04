<template>
  <div class="pod-form">
    <!-- Toolbar -->
    <div class="toolbar">
      <button @click="showComponent('A')">Simple Pod Create</button>
      <button @click="showComponent('B')">Advanced Pod Create</button>
    </div>

    <!-- Form Bileşenleri -->
    <div v-if="currentComponent === 'A'">
      <SimplePodForm />
    </div>
    <div v-if="currentComponent === 'B'">
      <AdvancedPodForm />
    </div>
  </div>
</template>

<script>
import AdvancedPodForm from './PodAdvancedForm.vue';
import SimplePodForm from './PodSimpleForm.vue';

export default {
  components: {
    SimplePodForm,
    AdvancedPodForm,
  },
  data() {
    return {
      currentComponent: 'A', // Main component
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
  border-bottom: 1px solid #ddd;
  margin-bottom: 10px;
}

.toolbar button {
  margin: 0 10px;
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
}
</style>
