<template>
  <div>

    <!-- Toolbar -->
    <div class="toolbar">
      <router-link to="/deployments" class="toolbar-link">Deployment</router-link>
      <router-link to="/pods" class="toolbar-link">Pod</router-link>
      <router-link to="/namespaces" class="toolbar-link">Namespace</router-link>
    </div>

    <!-- Show router views -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
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
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  color: #fff;
  background-color: #007bff;
  border-radius: 5px;
  transition: background-color 0.3s, transform 0.3s;
}

.toolbar-link:hover,
.toolbar-link:focus {
  background-color: #0056b3;
  transform: translateY(-2px);
}

.toolbar-link:active {
  background-color: #003d7a;
  transform: translateY(0);
}
</style>
