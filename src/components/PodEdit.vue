<template>
    <div class="pod-edit">
        <h2>Edit Pod: {{ podName }}</h2>
        <div v-if="pod">
            <form @submit.prevent="updatePod">
                <!-- Pod Metadata Fields -->
                <div>
                    <label for="namespace">Namespace:</label>
                    <input type="text" id="namespace" v-model="pod.metadata.namespace" readonly />
                </div>

                <div>
                    <label for="name">Pod Name:</label>
                    <input type="text" id="name" v-model="pod.metadata.name" readonly />
                </div>

                <div>
                    <label for="status">Status:</label>
                    <select id="status" v-model="pod.status.phase">
                        <option>Pending</option>
                        <option>Running</option>
                        <option>Succeeded</option>
                        <option>Failed</option>
                        <option>Unknown</option>
                    </select>
                </div>

                <!-- Container Info -->
                <h3>Container Info</h3>
                <div v-for="(container, index) in pod.spec.containers" :key="index">
                    <label for="container-name">Container Name:</label>
                    <input type="text" id="container-name" v-model="container.name" readonly />

                    <label for="container-image">Container Image:</label>
                    <input type="text" id="container-image" v-model="container.image" />
                </div>

                <!-- Update Button -->
                <button type="submit">Update Pod</button>
            </form>
        </div>
        <div v-else>
            <p>Loading pod data...</p>
        </div>
    </div>
</template>

<script>
import axios from '../axios';

export default {
    props: {
        podName: String
    },
    data() {
        return {
            pod: null,
            podRequest: {
                pod: null,
                opts: null
            }
        };
    },
    created() {
        this.fetchPod();
    },
    methods: {
        // Fetch the specific pod data for editing
        async fetchPod() {
            try {
                const response = await axios.get(`/pods/${this.podName}`);
                this.pod = response.data.data;
            } catch (error) {
                console.error('Error fetching pod data:', error);
            }
        },
        // Update pod details
        async updatePod() {
            try {
                this.podRequest.pod = this.pod
                await axios.put(`/pods/${this.pod.metadata.name}`, this.podRequest);
                this.$router.push({ name: 'PodList' }); // Return to pod list or other relevant route
            } catch (error) {
                console.error('Error updating pod:', error);
            }
        }
    }
};
</script>

<style scoped>
.pod-edit {
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 5px;
    max-width: 600px;
    margin: 20px auto;
}

form div {
    margin-bottom: 15px;
}

label {
    display: block;
    font-weight: bold;
}

input,
select {
    width: 100%;
    padding: 8px;
    margin-top: 5px;
    box-sizing: border-box;
}

button {
    padding: 10px 15px;
    font-size: 16px;
    cursor: pointer;
}
</style>
