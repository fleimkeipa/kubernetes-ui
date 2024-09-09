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
      <div v-for="(container, cIndex) in podRequest.pod.spec.containers" :key="cIndex" class="container-form">
        <label>Container {{ cIndex + 1 }} Name:</label>
        <input type="text" v-model="container.name" placeholder="Container name (ex: cont-1)" />

        <label>Container {{ cIndex + 1 }} Image:</label>
        <input type="text" v-model="container.image" placeholder="Container image (ex: nginx:latest)" />

        <!-- Spec - Containers Ports Inputs -->
        <div class="ports-section">
          <h3>Ports</h3>
          <div v-for="(port, pIndex) in container.ports" :key="pIndex" class="port-form">
            <div class="port-item">
              <div class="port-details">
                <label>Port {{ pIndex + 1 }} Name:</label>
                <input type="text" v-model="port.name" placeholder="Port name (ex: http)" />

                <label>Port {{ pIndex + 1 }} Container Port:</label>
                <input type="number" v-model="port.containerPort" placeholder="Port number (ex: 80)" />
              </div>
              <button class="delete-btn" @click="removePort(cIndex, pIndex)">Delete</button>
            </div>
          </div>

          <button class="add-btn" @click="addPort(cIndex)">Add new port</button>
        </div>

        <button class="delete-btn" @click="removeContainer(cIndex)">Delete Container</button>
      </div>

      <button class="add-btn" @click="addContainer">Add new container</button>
    </div>

    <!-- Create options -->
    <div>
      <h3>Create options (optional)</h3>
      <div>
        <label>Field Manager:</label>
        <input type="text" v-model="podRequest.opts.fieldManager" placeholder="Field Manager (ex: default)" />
      </div>
      <div>
        <label>Field Validation:</label>
        <input type="text" v-model="podRequest.opts.fieldValidation" placeholder="Field Validation (ex: default)" />
      </div>
      <!-- Dry run -->
      <div>
        <label>Dry run:</label>
        <div v-for="(annotation, index) in podRequest.opts.dryRun" :key="index" class="dryrun-form">
          <input type="text" v-model="podRequest.opts.dryRun[index]" placeholder="Dry run (ex: none, client, server)" />
          <button @click="removeDryRun(index)">Delete</button>
        </div>
        <button @click="addDryRun">Add new dry run</button>
      </div>
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
              {
                name: '',
                image: '',
                ports: [
                  {
                    name: '',
                    containerPort: '',
                  },
                ],
              },
            ],
          },
        },
        opts: {
          fieldManager: '',
          fieldValidation: '',
          dryRun: [
            '',
          ],
        }
      },
      sendStatus: '',
    };
  },
  methods: {
    addContainer() {
      this.podRequest.pod.spec.containers.push({
        name: '',
        image: '',
        ports: [{ name: '', containerPort: '' }]
      });
    },
    removeContainer(index) {
      this.podRequest.pod.spec.containers.splice(index, 1);
    },
    addPort(containerIndex) {
      this.podRequest.pod.spec.containers[containerIndex].ports.push({ name: '', containerPort: '' });
    },
    removePort(containerIndex, portIndex) {
      this.podRequest.pod.spec.containers[containerIndex].ports.splice(portIndex, 1);
    },
    addDryRun() {
      // Add new dry run
      this.podRequest.opts.dryRun.push('');
    },
    removeDryRun(index) {
      // Delete specific dry run
      this.podRequest.opts.dryRun.splice(index, 1);
    },
    async sendJson() {
      // Send JSON to /pods endpoint
      try {
        await axios.post('/pods', this.podRequest, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        this.sendStatus = 'Pod created successfully!';
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

.dryrun-form,
.container-form,
.port-form {
  margin-bottom: 15px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
}

.port-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.port-details {
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-right: 10px;
}

.ports-section {
  background-color: #fff;
  padding: 10px;
  border: 1px solid #eaeaea;
  border-radius: 6px;
  margin-top: 10px;
}
</style>
