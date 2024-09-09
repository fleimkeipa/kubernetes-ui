<template>
  <div class="pod-form">
    <h2>Pod Create</h2>
    <!-- ObjectMeta Inputs -->
    <div>
      <label>Name:</label>
      <input type="text" v-model="podRequest.pod.metadata.name" placeholder="Name (ex: my-pod)" />
    </div>

    <div>
      <label>Namespace (optional):</label>
      <input type="text" v-model="podRequest.pod.metadata.namespace" placeholder="Namespace (default value: default)" />
    </div>

    <!-- Spec - Containers Inputs -->
    <div>
      <h3>Containers</h3>
      <div v-for="(container, index) in podRequest.pod.spec.containers" :key="index" class="container-form">
        <label>Container {{ index + 1 }} Name:</label>
        <input type="text" v-model="container.name" placeholder="Container name (ex: cont-1)" />

        <label>Container {{ index + 1 }} Image:</label>
        <input type="text" v-model="container.image" placeholder="Container image (ex: nginx:latest)" />

        <button class="delete-btn" @click="removeContainer(index)">Delete Container</button>
      </div>

      <button class="add-btn" @click="addContainer">Add new container</button>
    </div>

    <!-- Create JSON and send -->
    <button @click="sendJson">Create Pod</button>

    <!-- Send status -->
    <div v-if="sendStatus">
      <p>{{ sendStatus }}</p>
    </div>
  </div>
</template>

<script>
import axios from '../axios';

export default {
  data() {
    return {
      podRequest: {
        pod: {
          metadata: {
            name: '',
            namespace: '',
          },
          spec: {
            containers: [
              { name: '', image: '' },
            ],
          },
        },
      },
      sendStatus: '',
    };
  },
  methods: {
    addContainer() {
      // Add new container
      this.podRequest.pod.spec.containers.push({ name: '', image: '' });
    },
    removeContainer(index) {
      // Delete specify container
      this.podRequest.pod.spec.containers.splice(index, 1);
    },
    async sendJson() {
      // Send JSON to /pods endpoint
      try {
        await axios.post('/pods', this.podRequest, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        this.sendStatus = 'Pod created succesfully!';
      } catch (error) {
        console.error(error);
        this.sendStatus = 'An error occurred while sending data.' + error;
      }
    },
  },
};
</script>

<style scoped>
.pod-form {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

input {
  margin: 5px 0;
  padding: 8px;
  width: calc(100% - 16px);
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
}

button {
  margin-top: 10px;
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  color: #fff;
  background-color: #007bff;
  transition: background-color 0.3s ease;
}


button:hover {
  background-color: #0056b3;
}

.add-btn {
  background-color: #28a745;
  margin-bottom: 10px;
}

.add-btn:hover {
  background-color: #218838;
}

.delete-btn {
  background-color: #dc3545;
}

.delete-btn:hover {
  background-color: #c82333;
}

.container-form {
  margin-bottom: 15px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
}
</style>
