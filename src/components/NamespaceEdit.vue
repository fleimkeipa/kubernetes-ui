<template>
    <div class="namespace-edit">
        <h2>Edit Namespace: {{ namespaceName }}</h2>
        <div v-if="namespace">
            <form @submit.prevent="updateNamespace">
                <!-- Namespace Metadata Fields -->
                <div>
                    <label for="namespace">Namespace:</label>
                    <input type="text" id="namespace" v-model="namespace.metadata.namespace" readonly/>
                </div>

                <div>
                    <label for="name">Namespace Name:</label>
                    <input type="text" id="name" v-model="namespace.metadata.name" readonly/>
                </div>

                <div>
                    <label for="status">Status:</label>
                    <select id="status" v-model="namespace.status.phase">
                        <option>Pending</option>
                        <option>Running</option>
                        <option>Succeeded</option>
                        <option>Failed</option>
                        <option>Unknown</option>
                    </select>
                </div>

                <!-- Update Button -->
                <button type="submit">Update Namespace</button>
            </form>
        </div>
        <div v-else>
            <p>Loading Namespace data...</p>
        </div>
    </div>
</template>

<script>
import axios from '../axios';

export default {
    props: {
        namespaceName: String
    },
    data() {
        return {
            namespace: null
        };
    },
    created() {
        this.fetchNamespace();
    },
    methods: {
        // Fetch the specific namespace data for editing
        async fetchNamespace() {
            try {
                const response = await axios.get(`/namespaces/${this.namespaceName}`);
                this.namespace = response.data.data;
            } catch (error) {
                console.error('Error fetching namespace data:', error);
            }
        },
        // Update namespace details
        async updateNamespace() {
            try {
                await axios.put(`/namespaces/${this.namespace.metadata.name}`, this.namespace);
                this.$router.push({ name: 'NamespaceList' }); // Return to namespace list or other relevant route
            } catch (error) {
                console.error('Error updating namespace:', error);
            }
        }
    }
};
</script>

<style scoped>
.namespace-edit {
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

input, select {
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
