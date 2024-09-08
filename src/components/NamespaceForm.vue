<template>
  <div class="namespace-form">
    <!-- Toolbar -->
    <div class="toolbar">
      <button @click="showComponent('A')">Namespace List</button>
      <button @click="showComponent('B')">Namespace Create</button>
    </div>

    <!-- Form Bileşenleri -->
    <div v-if="currentComponent === 'A'">
      <NamespaceList />
    </div>
    <div v-if="currentComponent === 'B'">
      <NamespaceCreate />
    </div>
  </div>
</template>

<script>
import NamespaceCreate from './NamespaceCreateSimple.vue';
import NamespaceList from './NamespaceList.vue';

export default {
  components: {
    NamespaceList,
    NamespaceCreate,
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
