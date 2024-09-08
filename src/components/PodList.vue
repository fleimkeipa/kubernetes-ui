<template>
    <div class="pod-list">
        <h2>Pod List</h2>
        <!-- The data will automatically load when the component is mounted -->
        <div v-if="pods && pods.length">
            <!-- Check if pods is defined and has items -->
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
            <p>No data loaded or data is empty.</p>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            pods: [], // Initialize pods as an empty array
        };
    },
    methods: {
        async fetchPods() {
            try {
                // Fetch data from the endpoint
                const response = await axios.get('http://localhost:8080/pods');
                this.pods = response.data.data.items || []; // Use empty array if items is undefined
            } catch (error) {
                console.error('Error fetching pods data:', error); // Error handling
            }
        },
    },
    mounted() {
        // Automatically fetch data when the component is mounted
        this.fetchPods();
    },
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