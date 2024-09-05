<template>
    <div class="namespace-list">
      <h2>Kubernetes Namespace List</h2>
      <!-- The data will automatically load when the component is mounted -->
      <div v-if="namespaces && namespaces.length">
        <!-- Check if namespaces is defined and has items -->
        <ul>
          <li v-for="(namespace, index) in namespaces" :key="index">
            <h3>{{ namespace.metadata.name }}</h3>
            <p><strong>UID:</strong> {{ namespace.metadata.uid }}</p>
            <p><strong>Resource Version:</strong> {{ namespace.metadata.resourceVersion }}</p>
            <p><strong>Creation Timestamp:</strong> {{ namespace.metadata.creationTimestamp }}</p>
            <p><strong>Labels:</strong> {{ namespace.metadata.labels['kubernetes.io/metadata.name'] }}</p>
            <p><strong>Status:</strong> {{ namespace.status.phase }}</p>
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
  import axios from 'axios';
  
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
          const response = await axios.get('http://localhost:8080/namespace');
          this.namespaces = response.data.data.items || []; // Use empty array if items is undefined
        } catch (error) {
          console.error('Error fetching namespace data:', error); // Error handling
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
  </style>
  