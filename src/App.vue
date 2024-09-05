<template>
  <div>
    <!-- Toolbar -->
    <div class="toolbar">
      <button @click="showComponent('A')">Deployment Create</button>
      <button @click="showComponent('B')">Pod Create</button>
      <button @click="showComponent('C')">Namespace list</button>
    </div>

    <!-- Form Bileşenleri -->
    <div v-if="currentComponent === 'A'">
      <DeploymentForm />
    </div>
    <div v-if="currentComponent === 'B'">
      <PodForm />
    </div>
    <div v-if="currentComponent === 'C'">
      <NamespaceListForm />
    </div>
  </div>
</template>

<script>
import DeploymentForm from './components/DeploymentForm.vue';
import PodForm from './components/PodForm.vue';
import NamespaceListForm from './components/NamespaceList.vue';

export default {
  components: {
    DeploymentForm,
    PodForm,
    NamespaceListForm,
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
