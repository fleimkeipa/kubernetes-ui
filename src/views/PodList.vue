<template>
  <div>PodList</div>
  <router-link to="/pods/create/new">Create New Pod</router-link>

  <div v-if="error">Something went wrong.</div>
  <div v-else-if="isFetching">Loading...</div>
  <div v-else-if="data">
    <div :key="idx" v-for="(item, idx) of data.data.items">
      <h1 @click="$router.push(`/pods/${item.metadata.name}`)">
        {{ item.metadata.name }}
      </h1>
      <div>
        <h2>Containers</h2>
        <div
          :key="idxContainer"
          v-for="(container, idxContainer) of item.spec.containers"
          style="display: flex; flex-direction: column"
        >
          <span>Name: {{ container.name }}</span>
          <span>Image: {{ container.image }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import useApi from "@/composables/useApi";

const { data, error, isFetching } = useApi("/pods").json();
</script>
