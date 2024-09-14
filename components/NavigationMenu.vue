<script setup lang="ts">
const links = [
  {
    label: "Home",
    icon: "i-heroicons-home",
    to: "/",
  },
  {
    label: "Deployments",
    icon: "i-heroicons-circle-stack",
    to: "/deployments",
  },
  {
    label: "Pods",
    icon: "i-heroicons-cube",
    to: "/pods",
  },
  {
    label: "Namespaces",
    icon: "i-heroicons-folder-open",
    to: "/namespaces",
  },
];
</script>

<template>
  <div>
    <UHorizontalNavigation
      :links="links"
      class="border-b border-gray-200 dark:border-gray-800"
    />
  </div>
</template>
