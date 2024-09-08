<template>
    <div class="namespace-detail">
        <h2 class="namespace-title">Namespace Details: {{ namespaceName }}</h2>
        <div v-if="namespace">
            <div class="info-section">
                <h3>Basic Information</h3>
                <p><strong>Name:</strong> {{ namespace.metadata.name }}</p>
                <p><strong>UID:</strong> {{ namespace.metadata.uid }}</p>
                <p><strong>Resource Version:</strong> {{ namespace.metadata.resourceVersion }}</p>
                <p><strong>Creation Timestamp:</strong> {{ namespace.metadata.creationTimestamp }}</p>
                <p><strong>Labels:</strong> {{ formatLabels(namespace.metadata.labels) }}</p>
            </div>

            <div class="info-section">
                <h3>Status</h3>
                <p><strong>Phase:</strong> {{ namespace.status.phase }}</p>
            </div>

            <div class="info-section">
                <h3>Finalizers</h3>
                <ul class="finalizers-list">
                    <li v-for="(finalizer, index) in namespace.spec.finalizers" :key="index">
                        <p>{{ finalizer }}</p>
                    </li>
                </ul>
            </div>
        </div>
        <div v-else>
            <p>No namespace data available.</p>
        </div>
    </div>
</template>

<script>
import axios from '../axios';

export default {
    data() {
        return {
            namespace: null, // keep namespace details
        };
    },
    computed: {
        namespaceName() {
            return this.$route.params.namespaceName; // Gets the namespace name from the dynamic route parameter
        }
    },
    created() {
        this.fetchNamespaceDetail(); // Gets the namespace detail when the component is created
    },
    methods: {
        async fetchNamespaceDetail() {
            try {
                const response = await axios.get(`/namespaces/${this.namespaceName}`); // Gets details using namespace name
                this.namespace = response.data.data; // Adjusted based on new JSON structure
            } catch (error) {
                console.error('Error fetching namespace data:', error);
            }
        },
        formatLabels(labels) {
            if (!labels) return 'No labels';
            return Object.entries(labels).map(([key, value]) => `${key}: ${value}`).join(', ');
        }
    }
};
</script>

<style scoped>
.namespace-detail {
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 5px;
    margin-top: 20px;
    background-color: #f9f9f9;
}

.namespace-title {
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

.finalizers-list {
    list-style: none;
    padding: 0;
}

.finalizers-list li {
    border-bottom: 1px solid #ddd;
    padding: 10px 0;
}

.finalizers-list li:last-child {
    border-bottom: none;
}
</style>
