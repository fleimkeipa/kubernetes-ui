<template>
  <div>

    <!-- Toolbar -->
    <div class="toolbar">
      <router-link to="/deployments" class="toolbar-button">Deployment -</router-link>
      <router-link to="/pods" class="toolbar-button">- Pod -</router-link>
      <router-link to="/namespaces" class="toolbar-button">- Namespace</router-link>
    </div>

    <router-view></router-view> <!-- Show router views -->
  </div>
</template>

<script>
export default {
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
