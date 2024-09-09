<template>
  <div class="namespace-list">
    <h2>Kubernetes Namespace List</h2>
    <!-- The data will automatically load when the component is mounted -->
    <div v-if="namespaces && namespaces.length">
      <!-- Check if namespaces is defined and has items -->
      <ul>
        <li v-for="(namespace, index) in namespaces" :key="index">
          <div class="namespace-info">
            <h3>
              <router-link :to="{ name: 'NamespaceDetail', params: { namespaceName: namespace.metadata.name } }">
                {{ namespace.metadata.name }}
              </router-link>
            </h3>
            <p><strong>UID:</strong> {{ namespace.metadata.uid }}</p>
            <p><strong>Resource Version:</strong> {{ namespace.metadata.resourceVersion }}</p>
            <p><strong>Creation Timestamp:</strong> {{ namespace.metadata.creationTimestamp }}</p>
            <p><strong>Labels:</strong> {{ namespace.metadata.labels['kubernetes.io/metadata.name'] }}</p>
            <p><strong>Status:</strong> {{ namespace.status.phase }}</p>
          </div>
          <!-- CRUD buttons -->
          <div class="namespace-actions">
            <i class="fas fa-edit" @click="editNamespace(namespace.metadata.name)" title="Edit"></i>
            <i class="fas fa-info-circle" @click="goToDetail(namespace.metadata.name)" title="Detail"></i>
            <i class="fas fa-trash" @click="deleteNamespace(namespace.metadata.name)" title="Delete"></i>
          </div>
          <hr />
        </li>
      </ul>
    </div>
    <div v-else>
      <p>No data loaded or data is empty.</p>
    </div>
  </div>
</template>

<script>
import axios from '../axios';

export default {
  data() {
    return {
      namespaces: [], // Initialize namespaces as an empty array
    };
  },
  methods: {
    async fetchNamespaces() {
      try {
        // Fetch data from the endpoint
        const response = await axios.get('/namespaces');
        this.namespaces = response.data.data.items || []; // Use empty array if items is undefined
      } catch (error) {
        console.error('Error fetching namespace data:', error); // Error handling
      }
    },
    // Edit Namespace method
    editNamespace(namespaceName) {
      this.$router.push({ name: 'NamespaceEdit', params: { namespaceName: namespaceName } });
    },
    // Go to Namespace Detail method
    goToDetail(namespaceName) {
      this.$router.push({ name: 'NamespaceDetail', params: { namespaceName: namespaceName } });
    },
    // Delete Namespace method
    async deleteNamespace(namespaceName) {
      try {
        await axios.delete(`/namespaces/${namespaceName}`);
        this.fetchNamespaces(); // Refresh Namespace list after deletion
      } catch (error) {
        console.error(`Error deleting namespace ${namespaceName}:`, error);
      }
    },
  },
  mounted() {
    // Automatically fetch data when the component is mounted
    this.fetchNamespaces();
  },
};
</script>

<style scoped>
.namespace-list {
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-top: 20px;
}

button {
  margin-bottom: 20px;
  padding: 8px 16px;
  font-size: 16px;
  cursor: pointer;
}

.namespace-info {
  flex-grow: 1;
}

.namespace-actions {
  display: flex;
  align-items: center;
}

.namespace-actions i {
  font-size: 20px;
  margin-left: 10px;
  cursor: pointer;
}

.namespace-actions i:hover {
  color: #007bff;
}
</style>
