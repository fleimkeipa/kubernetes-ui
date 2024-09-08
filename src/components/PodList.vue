<template>
    <div>
        <h1>Namespace List</h1>
        <!-- Namespace select box -->
        <select v-if="namespaces.length" v-model="selectedNamespace" @change="onNamespaceChange">
            <option v-for="(namespace, index) in namespaces" :key="index" :value="namespace">
                {{ namespace }}
            </option>
        </select>
        <p v-else>Not found any namespace</p>

        <div class="pod-list">
            <h2>Pod List</h2>
            <!-- Pod list -->
            <div v-if="pods && pods.length">
                <ul>
                    <li v-for="(pod, index) in pods" :key="index">
                        <h2>Pod Name: {{ pod.metadata.name }}</h2>
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
import axios from 'axios';

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
        // method for fetch namepsace
        async fetchNamespaces() {
            try {
                const response = await axios.get('http://localhost:8080/namespace');
                this.namespaces = response.data.data.items.map((item) => item.metadata.name);
            } catch (error) {
                console.error('Error fetching namespaces data:', error);
            }
        },
        // method for fetch pods
        async fetchPods() {
            if (!this.selectedNamespace) return; // return if not found any pod
            try {
                const response = await axios.get(`http://localhost:8080/pods?namespace=${this.selectedNamespace}`);
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
        }
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

button {
    margin-bottom: 20px;
    padding: 8px 16px;
    font-size: 16px;
    cursor: pointer;
}
</style>
