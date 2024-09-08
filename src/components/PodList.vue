<template>
    <div>
        <h4>Namespace List: <!-- Namespace select box -->
            <select v-if="namespaces.length" v-model="selectedNamespace" @change="onNamespaceChange">
                <option v-for="(namespace, index) in namespaces" :key="index" :value="namespace">
                    {{ namespace }}
                </option>
            </select>
            <p v-else>Not found any namespace</p>
        </h4>

        <div class="pod-list">
            <h2>Pod List</h2>
            <!-- Pod list -->
            <div v-if="pods && pods.length">
                <ul>
                    <li v-for="(pod, index) in pods" :key="index" class="pod-item">
                        <div class="pod-info">
                            <h2>
                                <router-link :to="{ name: 'PodDetail', params: { podName: pod.metadata.name } }">
                                    {{ pod.metadata.name }}
                                </router-link>
                            </h2>
                            <p>Namespace: {{ pod.metadata.namespace }}</p>
                            <p>UID: {{ pod.metadata.uid }}</p>
                            <p>Status: {{ pod.status.phase }}</p>
                            <p>Start Time: {{ pod.status.startTime }}</p>

                            <h3>Container Info</h3>
                            <ul>
                                <li v-for="(container, containerIndex) in pod.spec.containers" :key="containerIndex">
                                    <p>Name: {{ container.name }}</p>
                                    <p>Image: {{ container.image }}</p>
                                    <p>Image Pull Policy: {{ container.imagePullPolicy }}</p>
                                </li>
                            </ul>
                        </div>
                        <!-- CRUD buttons -->
                        <div class="pod-actions">
                            <i class="fas fa-edit" @click="editPod(pod.metadata.name)" title="Edit"></i>
                            <i class="fas fa-info-circle" @click="goToDetail(pod.metadata.name)" title="Detail"></i>
                            <i class="fas fa-trash" @click="deletePod(pod.metadata.name)" title="Delete"></i>
                        </div>
                    </li>
                </ul>
            </div>
            <div v-else>
                <p>Not found any pod</p>
            </div>
        </div>
    </div>
</template>

<script>
import axios from '../axios';

export default {
    data() {
        return {
            namespaces: [], // keep namespaces list
            selectedNamespace: '', // selected namespace
            pods: [], // keep pods list
        };
    },
    mounted() {
        this.fetchNamespaces(); // fetch namespace when component load
        this.loadSelectedNamespace(); // load selected namespace on cache
    },
    methods: {
        // method for fetch namespace
        async fetchNamespaces() {
            try {
                const response = await axios.get('/namespaces');
                this.namespaces = response.data.data.items.map((item) => item.metadata.name);
            } catch (error) {
                console.error('Error fetching namespaces data:', error);
            }
        },
        // method for fetch pods
        async fetchPods() {
            if (!this.selectedNamespace) return; // return if not found any pod
            try {
                const response = await axios.get(`/pods?namespace=${this.selectedNamespace}`);
                this.pods = response.data.data.items || []; // send pods inside the list
            } catch (error) {
                console.error('Error fetching pods data:', error);
            }
        },
        // trigger when namespace changed
        onNamespaceChange() {
            this.saveSelectedNamespace();
            this.fetchPods();
        },
        // save selected namespace on cache
        saveSelectedNamespace() {
            localStorage.setItem('selectedNamespace', this.selectedNamespace);
        },
        // load selected namespace on cache
        loadSelectedNamespace() {
            const cachedNamespace = localStorage.getItem('selectedNamespace');
            if (cachedNamespace) {
                this.selectedNamespace = cachedNamespace;
                this.fetchPods(); // fetch pods selected namespace
            }
        },
        // Edit Pod method
        editPod(podName) {
            this.$router.push({ name: 'PodEdit', params: { podName } });
        },
        // Go to Pod Detail method
        goToDetail(podName) {
            this.$router.push({ name: 'PodDetail', params: { podName } });
        },
        // Delete Pod method
        async deletePod(podName) {
            try {
                await axios.delete(`/pods/${podName}`);
                this.fetchPods(); // Refresh pod list after deletion
            } catch (error) {
                console.error(`Error deleting pod ${podName}:`, error);
            }
        },
    }
};
</script>

<style scoped>
.pod-list {
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 5px;
    margin-top: 20px;
}

.pod-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid #ddd;
}

.pod-info {
    flex-grow: 1;
}

.pod-actions {
    display: flex;
    align-items: center;
}

.pod-actions i {
    font-size: 20px;
    margin-left: 10px;
    cursor: pointer;
}

.pod-actions i:hover {
    color: #007bff;
}
</style>
