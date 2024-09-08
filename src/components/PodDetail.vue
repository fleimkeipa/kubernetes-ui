<template>
    <div class="pod-detail">
        <h2>Pod Detayları: {{ podName }}</h2>
        <div v-if="pod">
            <p><strong>Namespace:</strong> {{ pod.metadata.namespace }}</p>
            <p><strong>UID:</strong> {{ pod.metadata.uid }}</p>
            <p><strong>Durum:</strong> {{ pod.status.phase }}</p>
            <p><strong>Başlangıç Zamanı:</strong> {{ pod.status.startTime }}</p>

            <h3>Konteyner Bilgileri</h3>
            <ul>
                <li v-for="(container, containerIndex) in pod.spec.containers" :key="containerIndex">
                    <p>İsim: {{ container.name }}</p>
                    <p>Görsel: {{ container.image }}</p>
                    <p>Image Pull Politikası: {{ container.imagePullPolicy }}</p>
                </li>
            </ul>
        </div>
        <div v-else>
            <p>Pod detayı yükleniyor...</p>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            pod: null, // Pod detayını saklar
        };
    },
    computed: {
        podName() {
            return this.$route.params.podName; // Dinamik rota parametresinden pod adını alır
        }
    },
    created() {
        this.fetchPodDetail(); // Bileşen oluşturulduğunda pod detayını getirir
    },
    methods: {
        async fetchPodDetail() {
            try {
                const response = await axios.get(`http://localhost:8080/pods/${this.podName}`); // Pod adını kullanarak detay alır
                this.pod = response.data.data;
            } catch (error) {
                console.error('Pod detayı alınırken bir hata oluştu:', error);
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
