<template>
    <div class="pod-detail">
        <h2>Pod Details: {{ podName }}</h2>
        <div v-if="pod">
            <p><strong>Namespace:</strong> {{ pod.metadata.namespace }}</p>
            <p><strong>UID:</strong> {{ pod.metadata.uid }}</p>
            <p><strong>Status:</strong> {{ pod.status.phase }}</p>
            <p><strong>Start Time:</strong> {{ pod.status.startTime }}</p>


            <h3>Container Info</h3>
            <ul>
                <li v-for="(container, containerIndex) in pod.spec.containers" :key="containerIndex">
                    <p>Name: {{ container.name }}</p>
                    <p>Image: {{ container.image }}</p>
                    <p>Image Pull Policy: {{ container.imagePullPolicy }}</p>
                </li>
            </ul>
        </div>
        <div v-else>
            <p>Not found any pod</p>
        </div>
    </div>
</template>

<script>
import axios from '../axios';

export default {
    data() {
        return {
            pod: null, // keep pod details
        };
    },
    computed: {
        podName() {
            return this.$route.params.podName; // Gets the pod name from the dynamic route parameter
        }
    },
    created() {
        this.fetchPodDetail(); // Gets the pod detail when the component is created
    },
    methods: {
        async fetchPodDetail() {
            try {
                const response = await axios.get(`/pods/${this.podName}`); // Gets details using pod name
                this.pod = response.data.data;
            } catch (error) {
                console.error('Error fetching pods data:', error);
            }
        }
    }
};
</script>

<style scoped>
.pod-detail {
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 5px;
    margin-top: 20px;
}
</style>
