<template>
  <div class="deployment-form">
    <!-- Toolbar -->
    <div class="toolbar">
      <button @click="showComponent('A')" class="toolbar-link">List</button>
      <button @click="showComponent('B')" class="toolbar-link">Simple Create</button>
    </div>

    <!-- Forms -->
    <div v-if="currentComponent === 'A'">
      <DeploymentList />
    </div>
    <div v-if="currentComponent === 'B'">
      <DeploymentCreate />
    </div>
  </div>
</template>

<script>
import DeploymentList from '../components/DeploymentList.vue';
import DeploymentCreate from '../components/DeploymentCreate.vue';

export default {
  components: {
    DeploymentList,
    DeploymentCreate,
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
