<template>
    <div class="deployment-detail">
        <h2 class="deployment-title">Deployment Details: {{ deploymentName }}</h2>
        <div v-if="deployment">
            <div class="info-section">
                <h3>Basic Information</h3>
                <p><strong>Name:</strong> {{ deployment.metadata.name }}</p>
                <p><strong>Namespace:</strong> {{ deployment.metadata.namespace }}</p>
                <p><strong>UID:</strong> {{ deployment.metadata.uid }}</p>
                <p><strong>Creation Timestamp:</strong> {{ deployment.metadata.creationTimestamp }}</p>
                <p><strong>Labels:</strong> {{ formatObject(deployment.metadata.labels) }}</p>
                <p><strong>Annotations:</strong> {{ formatObject(deployment.metadata.annotations) }}</p>
            </div>

            <div class="info-section">
                <h4>Specification</h4>
                <p><strong>Replicas:</strong> {{ deployment.spec.replicas }}</p>
                <p><strong>Strategy Type:</strong> {{ deployment.spec.strategy.type }}</p>
                <p><strong>Max Unavailable:</strong> {{ deployment.spec.strategy.rollingUpdate.maxUnavailable }}
                </p>
                <p><strong>Max Surge:</strong> {{ deployment.spec.strategy.rollingUpdate.maxSurge }}</p>
                <p><strong>Container Image:</strong> {{ deployment.spec.template.spec.containers[0].image }}</p>
            </div>

            <div class="info-section">
                <h4>Status</h4>
                <p><strong>Observed Generation:</strong> {{ deployment.status.observedGeneration }}</p>
                <p><strong>Replicas:</strong> {{ deployment.status.replicas }}</p>
                <p><strong>Ready Replicas:</strong> {{ deployment.status.readyReplicas }}</p>
                <p><strong>Available Replicas:</strong> {{ deployment.status.availableReplicas }}</p>
                <ul class="conditions-list">
                    <li v-for="(condition, index) in deployment.status.conditions" :key="index">
                        <strong>{{ condition.type }}:</strong> {{ condition.status }} - {{ condition.reason }}
                    </li>
                </ul>
            </div>
        </div>
        <div v-else>
            <p>No deployment data available.</p>
        </div>
    </div>
</template>

<script>
import axios from '../axios';

export default {
    data() {
        return {
            deployment: null, // keep deployment details
        };
    },
    computed: {
        deploymentName() {
            return this.$route.params.deploymentName; // Gets the deployment name from the dynamic route parameter
        }
    },
    created() {
        this.fetchDeploymentDetail(); // Gets the deployment detail when the component is created
    },
    methods: {
        async fetchDeploymentDetail() {
            try {
                const response = await axios.get(`/deployments/${this.deploymentName}`); // Gets details using deployment name
                this.deployment = response.data.data; // Adjusted based on new JSON structure
            } catch (error) {
                console.error('Error fetching deployments data:', error);
            }
        },
        formatObject(obj) {
            if (!obj) return 'No data';
            return Object.entries(obj).map(([key, value]) => `${key}: ${value}`).join(', ');
        },
    }
};
</script>

<style scoped>
.deployment-detail {
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 5px;
    margin-top: 20px;
    background-color: #f9f9f9;
}

.deployment-title {
    text-align: center;
    margin-bottom: 20px;
}

.info-section {
    margin-bottom: 20px;
    padding: 15px;
    border: 1px solid #ddd;
    border-radius: 5px;
    background-color: #fff;
}

.info-section h3 {
    margin-top: 0;
    color: #333;
}
</style>
