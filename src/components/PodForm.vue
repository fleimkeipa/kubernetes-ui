<template>
  <div class="pod-form">
    <!-- Toolbar -->
    <div class="toolbar">
      <button @click="showComponent('A')">List</button>
      <button @click="showComponent('B')">Simple Create</button>
      <button @click="showComponent('C')">Advanced Create</button>
    </div>

    <!-- Form Bileşenleri -->
    <div v-if="currentComponent === 'A'">
      <PodListForm />
    </div>
    <div v-if="currentComponent === 'B'">
      <SimplePodForm />
    </div>
    <div v-if="currentComponent === 'C'">
      <AdvancedPodForm />
    </div>
  </div>
</template>

<script>
import PodListForm from './PodList.vue';
import AdvancedPodForm from './PodCreateAdvanced.vue';
import SimplePodForm from './PodCreateSimple.vue';

export default {
  components: {
    SimplePodForm,
    AdvancedPodForm,
    PodListForm
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
