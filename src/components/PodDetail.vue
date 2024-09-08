<template>
    <div class="pod-detail">
        <h2 class="pod-title">Pod Details: {{ podName }}</h2>
        <div v-if="pod">
            <div class="info-section">
                <h3>Basic Information</h3>
                <p><strong>Namespace:</strong> {{ pod.metadata.namespace }}</p>
                <p><strong>UID:</strong> {{ pod.metadata.uid }}</p>
                <p><strong>Status:</strong> {{ pod.status.phase }}</p>
                <p><strong>Start Time:</strong> {{ pod.status.startTime }}</p>
                <p><strong>Host IP:</strong> {{ pod.status.hostIP }}</p>
                <p><strong>Pod IP:</strong> {{ pod.status.podIP }}</p>
                <p><strong>Resource Version:</strong> {{ pod.metadata.resourceVersion }}</p>
                <p><strong>Creation Timestamp:</strong> {{ pod.metadata.creationTimestamp }}</p>
            </div>

            <div class="info-section">
                <h3>Container Info</h3>
                <ul class="container-list">
                    <li v-for="(container, containerIndex) in pod.spec.containers" :key="containerIndex" class="container-item">
                        <p><strong>Name:</strong> {{ container.name }}</p>
                        <p><strong>Image:</strong> {{ container.image }}</p>
                        <p><strong>Image Pull Policy:</strong> {{ container.imagePullPolicy }}</p>
                        <p><strong>Termination Message Path:</strong> {{ container.terminationMessagePath }}</p>
                        <div v-if="container.volumeMounts.length">
                            <h4>Volume Mounts</h4>
                            <ul class="volume-mounts">
                                <li v-for="(volumeMount, mountIndex) in container.volumeMounts" :key="mountIndex">
                                    <p><strong>Name:</strong> {{ volumeMount.name }}</p>
                                    <p><strong>Mount Path:</strong> {{ volumeMount.mountPath }}</p>
                                    <p><strong>Read Only:</strong> {{ volumeMount.readOnly }}</p>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>

            <div class="info-section">
                <h3>Pod Conditions</h3>
                <ul class="conditions-list">
                    <li v-for="(condition, conditionIndex) in pod.status.conditions" :key="conditionIndex">
                        <p><strong>Type:</strong> {{ condition.type }}</p>
                        <p><strong>Status:</strong> {{ condition.status }}</p>
                        <p><strong>Last Transition Time:</strong> {{ condition.lastTransitionTime }}</p>
                    </li>
                </ul>
            </div>

            <div class="info-section">
                <h3>Pod IPs</h3>
                <ul class="ips-list">
                    <li v-for="(ip, ipIndex) in pod.status.podIPs" :key="ipIndex">
                        <p><strong>IP:</strong> {{ ip.ip }}</p>
                    </li>
                </ul>
            </div>

            <div class="info-section">
                <h3>Container Statuses</h3>
                <ul class="statuses-list">
                    <li v-for="(status, statusIndex) in pod.status.containerStatuses" :key="statusIndex">
                        <p><strong>Name:</strong> {{ status.name }}</p>
                        <p><strong>State:</strong> {{ status.state.running ? 'Running' : 'Not Running' }}</p>
                        <p><strong>Image:</strong> {{ status.image }}</p>
                        <p><strong>Container ID:</strong> {{ status.containerID }}</p>
                        <p><strong>Started:</strong> {{ status.started ? 'Yes' : 'No' }}</p>
                    </li>
                </ul>
            </div>
        </div>
        <div v-else>
            <p>No pod data available.</p>
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
                this.pod = response.data.data; // Adjusted based on new JSON structure
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
    background-color: #f9f9f9;
}

.pod-title {
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

.container-list, .conditions-list, .ips-list, .statuses-list {
    list-style: none;
    padding: 0;
}

.container-item, .conditions-list li, .ips-list li, .statuses-list li {
    border-bottom: 1px solid #ddd;
    padding: 10px 0;
}

.container-item:last-child, .conditions-list li:last-child, .ips-list li:last-child, .statuses-list li:last-child {
    border-bottom: none;
}

.volume-mounts, .container-statuses {
    padding-left: 20px;
}

.volume-mounts li {
    margin-bottom: 10px;
}

</style>
