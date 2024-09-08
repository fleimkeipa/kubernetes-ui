<template>
  <div class="pod-form">
    <!-- Toolbar -->
    <div class="toolbar">
      <button @click="showComponent('A')" class="toolbar-link">List</button>
      <button @click="showComponent('B')" class="toolbar-link">Simple Create</button>
      <button @click="showComponent('C')" class="toolbar-link">Advanced Create</button>
    </div>

    <!-- Forms -->
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
import PodListForm from '../components/PodList.vue';
import AdvancedPodForm from '../components/PodCreateAdvanced.vue';
import SimplePodForm from '../components/PodCreateSimple.vue';

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
  background-color: #f0f0f0;
  border-bottom: 1px solid #ddd;
  margin-bottom: 20px;
}

.toolbar-link {
  display: inline-block;
  margin: 0 15px;
  padding: 10px 20px;
  font-size: 12px;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  color: #fff;
  background-color: #d800f5;
  border-radius: 5px;
  transition: background-color 0.3s, transform 0.3s;
}

.toolbar-link:hover,
.toolbar-link:focus {
  background-color: #7b0f94;
  transform: translateY(-2px);
}

.toolbar-link:active {
  background-color: #003d7a;
  transform: translateY(0);
}
</style>
