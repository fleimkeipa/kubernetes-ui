<template>
  <div class="deployment-form">
    <h2>Deployment Create</h2>
    <!-- ObjectMeta Girdisi -->
    <div>
      <label>Name:</label>
      <input type="text" v-model="podRequest.object_meta.name" placeholder="Pod ismi (ex: my-pod)" />
    </div>

    <div>
      <label>Namespace:</label>
      <input type="text" v-model="podRequest.object_meta.namespace"
        placeholder="Namespace (optional, default value: default)" />
    </div>

    <!-- Spec - Containers Girdisi -->
    <div>
      <h3>Containers</h3>
      <div v-for="(container, index) in podRequest.spec.containers" :key="index" class="container-form">
        <label>Container {{ index + 1 }} Name:</label>
        <input type="text" v-model="container.name" placeholder="Container name" />

        <label>Container {{ index + 1 }} Image:</label>
        <input type="text" v-model="container.image" placeholder="Container image (ex: nginx:latest)" />

        <button @click="removeContainer(index)">Delete</button>
      </div>

      <button @click="addContainer">Add new container</button>
    </div>

    <!-- Create options -->
    <div>
      <h3>Create options</h3>
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
          <input type="text" v-model="podRequest.opts.dryRun[index]" placeholder="Dry run (ex: default)" />
          <button @click="removeAnnotation(index)">Delete</button>
        </div>
        <button @click="addAnnotation">Add new dry run</button>
      </div>
    </div>

    <!-- JSON'u Oluşturma ve Gönderme -->
    <button @click="sendJson">JSON'u Gönder</button>

    <!-- Gönderim Durumu -->
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
      // Yeni bir container eklemek için kullanılır
      this.podRequest.spec.containers.push({ name: '', image: '' });
    },
    removeContainer(index) {
      // Belirli bir container'ı kaldırmak için kullanılır
      this.podRequest.spec.containers.splice(index, 1);
    },
    addAnnotation() {
      // Yeni bir annotation eklemek için kullanılır
      this.podRequest.annotations.push('');
    },
    removeAnnotation(index) {
      // Belirli bir annotation'ı kaldırmak için kullanılır
      this.podRequest.annotations.splice(index, 1);
    },
    async sendJson() {
      // JSON verisini /pods endpointine gönderme
      try {
        console.log(this.podRequest)
        const response = await axios.post('http://localhost:8080/pods', this.podRequest, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        this.sendStatus = 'Veri başarıyla gönderildi!';
        console.log(response)
      } catch (error) {
        console.error(error);
        this.sendStatus = 'Veri gönderilirken bir hata oluştu.';
      }
    },
  },
};
</script>

<style scoped>
.deployment-form {
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

.dryrun-form,
.container-form {
  margin-bottom: 15px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
}
</style>
