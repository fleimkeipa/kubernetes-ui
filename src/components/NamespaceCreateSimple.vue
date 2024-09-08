<template>
  <div class="namespace-create-form">
    <h2>Namespace Create</h2>
    <!-- ObjectMeta Inputs -->
    <div>
      <label>Name:</label>
      <input type="text" v-model="namespaceRequest.object_meta.name" placeholder="Name (ex: my-pod)" />
    </div>

    <!-- Meta data - Labels Inputs -->
    <div>
      <h3>Labels</h3>
      <div v-for="(label, index) in namespaceRequest.object_meta.labels" :key="index" class="label-form">
        <label>Label {{ index + 1 }} Name:</label>
        <input type="text" v-model="label.name" placeholder="Label name (ex: cont-1)" />

        <button @click="removeLabel(index)">Delete</button>
      </div>

      <button @click="addLabel">Add new label</button>
    </div>

    <!-- Create JSON and send -->
    <button @click="sendJson">Create Namespace</button>

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
      namespaceRequest: {
        object_meta: {
          name: '',
          labels: [
            { name: '' }
          ],
        },
      },
      sendStatus: '',
    };
  },
  methods: {
    addLabel() {
      // Add new label
      this.namespaceRequest.object_meta.labels.push({ name: '', image: '' });
    },
    removeLabel(index) {
      // Delete specify label
      this.namespaceRequest.object_meta.labels.splice(index, 1);
    },
    async sendJson() {
      // Send JSON to /namespace endpoint
      try {
        console.log(this.namespaceRequest)
        const response = await axios.post('/namespaces', this.namespaceRequest, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        this.sendStatus = 'Namespace created succesfully!';
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

.label-form {
  margin-bottom: 15px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
}
</style>
