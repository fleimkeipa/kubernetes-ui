<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});

type Row = {
  name: string;
  color: string;
  time_start: date;
  time_end: date;
};

const columns = [
  {
    key: "name",
    label: "Name",
  },
  {
    key: "color",
    label: "Color",
  },
  {
    key: "time_start",
    label: "Time Start",
  },
  {
    key: "time_end",
    label: "Time End",
  },
];

const {
  data: items,
  error,
  isFetching,
  execute: fetchPods,
} = useApi<{ data: { items: Row[] } }>("/eras").json();

const router = useRouter();

const actions = (row: Row) => [
  [
    {
      label: "Edit",
      icon: "i-heroicons-pencil-square-20-solid",
      click: () => router.push(`/pods/${row.metadata.name}`),
    },
    {
      label: "Delete",
      icon: "i-heroicons-trash-20-solid",
      click: () => handleDelete(row.metadata.name),
    },
  ],
];

const handleDelete = async (uid: string) => {
  useApi(`/eras/${uid}`, {
    afterFetch: () => fetchPods(),
  }).delete();
};
</script>

<template>
  <div v-if="!!error || !items">{{ error }}</div>
  <div v-else>
    <div class="flex flex-row items-center justify-between">
      <UButton icon="i-heroicons-plus">
        <NuxtLink to="/eras/create/new">Create New</NuxtLink>
      </UButton>
      <UButton
        icon="i-heroicons-arrow-path"
        :loading="isFetching"
        @click="fetchPods"
      ></UButton>
    </div>
    <UTable
      :columns="columns"
      :rows="items.data.items"
      :loading="isFetching"
      :loading-state="{
        icon: 'i-heroicons-arrow-path-20-solid',
        label: 'Loading...',
      }"
    >
      <template #expand="{ row }">
        <div class="p-4">
          <b>Containers:</b>
          <pre>{{ row.spec.containers }}</pre>
        </div>
      </template>

      <template #actions-data="{ row }">
        <UDropdown :items="actions(row)">
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-ellipsis-horizontal-20-solid"
          />
        </UDropdown>
      </template>
    </UTable>
  </div>
</template>
