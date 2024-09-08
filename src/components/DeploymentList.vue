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

        <div class="deployment-list">
            <h2 class="list-title">Deployments List</h2>
            <ul class="deployment-items">
                <li v-for="(deployment, index) in deployments" :key="index" class="deployment-item">
                    <div class="info-section">
                        <h2>
                            <router-link
                                :to="{ name: 'DeploymentDetail', params: { deploymentName: deployment.metadata.name } }">
                                {{ deployment.metadata.name }}
                            </router-link>
                        </h2>
                        <p><strong>Namespace:</strong> {{ deployment.metadata.namespace }}</p>
                        <p><strong>UID:</strong> {{ deployment.metadata.uid }}</p>
                        <p><strong>Creation Timestamp:</strong> {{ deployment.metadata.creationTimestamp }}</p>
                        <p><strong>Labels:</strong> {{ formatObject(deployment.metadata.labels) }}</p>
                        <p><strong>Annotations:</strong> {{ formatObject(deployment.metadata.annotations) }}</p>
                    </div>
                </li>
            </ul>
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
            deployments: [], // keep deployments list
        };
    },
    mounted() {
        this.fetchNamespaces(); // fetch namespace when component load
        this.loadSelectedNamespace(); // load selected namespace on cache
    },
    methods: {
        async fetchDeployments() {
            if (!this.selectedNamespace) return; // return if not found any deployment
            try {
                const response = await axios.get(`/deployments?namespace=${this.selectedNamespace}`);
                this.deployments = response.data.data.items || []; // send deployments inside the list
            } catch (error) {
                console.error('Error fetching deployments data:', error);
            }
        },
        formatObject(obj) {
            if (!obj) return 'No data';
            return Object.entries(obj).map(([key, value]) => `${key}: ${value}`).join(', ');
        },
        // method for fetch namespace
        async fetchNamespaces() {
            try {
                const response = await axios.get('/namespaces');
                this.namespaces = response.data.data.items.map((item) => item.metadata.name);
            } catch (error) {
                console.error('Error fetching namespaces data:', error);
            }
        },
        // trigger when namespace changed
        onNamespaceChange() {
            this.saveSelectedNamespace();
            this.fetchDeployments();
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
                this.fetchDeployments(); // fetch deployments selected namespace
            }
        }

    }
};
</script>

<style scoped>
.deployment-list {
    padding: 20px;
    margin-top: 20px;
    background-color: #f9f9f9;
    border-radius: 5px;
    border: 1px solid #ddd;
}

.list-title {
    text-align: center;
    margin-bottom: 20px;
}

.deployment-items {
    list-style: none;
    padding: 0;
}

.deployment-item {
    margin-bottom: 20px;
    padding: 15px;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 5px;
}

.info-section {
    margin-bottom: 15px;
}
</style>
