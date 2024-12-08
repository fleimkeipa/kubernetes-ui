<script setup lang="ts">
const links = [
  {
    label: "Home",
    icon: "i-heroicons-home",
    to: "/",
  },
  {
    label: "Events",
    icon: "i-heroicons-circle-stack",
    to: "/events",
  },
  {
    label: "Eras",
    icon: "i-heroicons-cube",
    to: "/eras",
  },
  {
    label: "Connects",
    icon: "i-heroicons-folder-open",
    to: "/connects",
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
