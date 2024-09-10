<template>
  <div>PodView</div>

  <div v-if="error">Something went wrong.</div>
  <div v-else-if="isFetching">Loading...</div>
  <div v-else-if="item">
    <h1>{{ item.data.metadata.name }}</h1>
    <button @click="handleDelete">Delete Pod</button>
    <div>
      <h2>Containers</h2>
      <div
        :key="idxContainer"
        v-for="(container, idxContainer) of item.data.spec.containers"
        style="display: flex; flex-direction: column"
      >
        <span>Name: {{ container.name }}</span>
        <span>Image: {{ container.image }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import useApi from "@/composables/useApi";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const {
  data: item,
  error,
  isFetching,
} = useApi(`/pods/${route.params.podName}`).json();

const router = useRouter();
const handleDelete = () => {
  useApi(`/pods/${route.params.podName}`, {
    afterFetch: () => router.push("/pods"),
  }).delete();
};
</script>
