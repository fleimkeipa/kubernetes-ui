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
                            <i class="fas fa-trash" @click="confirmDelete(pod.metadata.name)" title="Delete"></i>

                            <!-- Confirm Delete Alert -->
                            <div v-if="confirmDeleteAlert && alertPodName === pod.metadata.name" class="confirm-alert">
                                Are you sure you want to delete this pod?
                                <button @click="deletePod(pod.metadata.name)">Yes</button>
                                <button @click="cancelDelete">No</button>
                            </div>

                            <!-- Delete Success Alert -->
                            <div v-if="showAlert && alertPodName === pod.metadata.name" class="alert-msg">
                                Pod {{ pod.metadata.name }} has been deleted!
                            </div>
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
            showAlert: false, // alert visibility
            alertPodName: '', // pod name for alert
            confirmDeleteAlert: false, // confirm delete visibility
        };
    },
    mounted() {
        this.fetchNamespaces(); // fetch namespace when component load
        this.loadSelectedNamespace(); // load selected namespace on cache
    },
    methods: {
        // Fetch namespace method
        async fetchNamespaces() {
            try {
                const response = await axios.get('/namespaces');
                this.namespaces = response.data.data.items.map((item) => item.metadata.name);
            } catch (error) {
                console.error('Error fetching namespaces data:', error);
            }
        },
        // Fetch pods method
        async fetchPods() {
            if (!this.selectedNamespace) return; // return if no namespace selected
            try {
                const response = await axios.get(`/pods?namespace=${this.selectedNamespace}`);
                this.pods = response.data.data.items || []; // update pod list
            } catch (error) {
                console.error('Error fetching pods data:', error);
            }
        },
        // Trigger when namespace is changed
        onNamespaceChange() {
            this.saveSelectedNamespace();
            this.fetchPods();
        },
        // Save selected namespace to cache
        saveSelectedNamespace() {
            localStorage.setItem('selectedNamespace', this.selectedNamespace);
        },
        // Load selected namespace from cache
        loadSelectedNamespace() {
            const cachedNamespace = localStorage.getItem('selectedNamespace');
            if (cachedNamespace) {
                this.selectedNamespace = cachedNamespace;
                this.fetchPods(); // fetch pods for selected namespace
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

        // Confirm delete method
        confirmDelete(podName) {
            this.alertPodName = podName; // Set pod name for alert
            this.confirmDeleteAlert = true; // Show confirm delete alert
        },

        // Cancel delete method
        cancelDelete() {
            this.confirmDeleteAlert = false; // Hide confirm delete alert
        },

        // Delete Pod method with alert
        async deletePod(podName) {
            try {
                await axios.delete(`/pods/${podName}`); // Delete pod
                this.confirmDeleteAlert = false; // hide confirmation message
                await this.fetchPods(); // Fetch pods

                this.showAlert = true; // Show that the deletion was successful
                setTimeout(() => {
                    this.showAlert = false; // Hide alert after 3 seconds
                }, 3000);
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
    position: relative;
    /* Relative positioning for the alert message */
}

.pod-info {
    flex-grow: 1;
}

.pod-actions {
    display: flex;
    align-items: center;
    position: relative;
}

.pod-actions i {
    font-size: 20px;
    margin-left: 10px;
    cursor: pointer;
}

.pod-actions i:hover {
    color: #007bff;
}

.alert-msg,
.confirm-alert {
    position: absolute;
    top: -20px;
    /* Position above the icons */
    right: 0;
    background-color: #f8d7da;
    color: #721c24;
    padding: 5px 10px;
    border: 1px solid #f5c6cb;
    border-radius: 4px;
    font-size: 12px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.confirm-alert {
    background-color: #fff3cd;
    color: #856404;
}

.alert-msg {
    animation: fadeOut 3s forwards;
    /* Animation to fade out the success alert */
}

@keyframes fadeOut {
    0% {
        opacity: 1;
    }

    80% {
        opacity: 1;
    }

    100% {
        opacity: 0;
    }
}
</style>
