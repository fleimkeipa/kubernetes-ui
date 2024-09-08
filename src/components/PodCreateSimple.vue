<template>
  <div class="pod-form">
    <h2>Pod Create</h2>
    <!-- ObjectMeta Inputs -->
    <div>
      <label>Name:</label>
      <input type="text" v-model="podRequest.object_meta.name" placeholder="Name (ex: my-pod)" />
    </div>

    <div>
      <label>Namespace (optional):</label>
      <input type="text" v-model="podRequest.object_meta.namespace" placeholder="Namespace (default value: default)" />
    </div>

    <!-- Spec - Containers Inputs -->
    <div>
      <h3>Containers</h3>
      <div v-for="(container, index) in podRequest.spec.containers" :key="index" class="container-form">
        <label>Container {{ index + 1 }} Name:</label>
        <input type="text" v-model="container.name" placeholder="Container name (ex: cont-1)" />

        <label>Container {{ index + 1 }} Image:</label>
        <input type="text" v-model="container.image" placeholder="Container image (ex: nginx:latest)" />

        <button @click="removeContainer(index)">Delete</button>
      </div>

      <button @click="addContainer">Add new container</button>
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
import axios from 'axios';

export default {
  data() {
    return {
      podRequest: {
        object_meta: {
          name: '',
          namespace: '',
        },
        spec: {
          containers: [
            { name: '', image: '' },
          ],
        },
      },
      sendStatus: '',
    };
  },
  methods: {
    addContainer() {
      // Add new container
      this.podRequest.spec.containers.push({ name: '', image: '' });
    },
    removeContainer(index) {
      // Delete specify container
      this.podRequest.spec.containers.splice(index, 1);
    },
    async sendJson() {
      // Send JSON to /pods endpoint
      try {
        console.log(this.podRequest)
        const response = await axios.post('http://localhost:8080/pods', this.podRequest, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        this.sendStatus = 'Pod created succesfully!';
        console.log(response)
      } catch (error) {
        console.error(error);
        this.sendStatus = 'An error occurred while sending data.';
      }
    },
  },
};
</script>

<style scoped>
.pod-form {
  margin: 20px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

input {
  margin: 5px 0;
  padding: 5px;
  width: calc(100% - 10px);
}

button {
  margin-top: 10px;
  padding: 5px 10px;
}

.container-form {
  margin-bottom: 15px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
}
</style>
