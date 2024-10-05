<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});

type Row = {
  metadata: {
    uid: string;
    name: string;
  };
};

const columns = [
  {
    key: "metadata.uid",
    label: "UID",
  },
  {
    key: "metadata.name",
    label: "Name",
  },
  {
    key: "actions",
  },
];

const {
  data: items,
  error,
  isFetching,
  execute: fetchNamespaces,
} = useApi<{ data: { items: Row[] } }>("/namespaces").json();

const router = useRouter();

const actions = (row: Row) => [
  [
    {
      label: "Edit",
      icon: "i-heroicons-pencil-square-20-solid",
      click: () => router.push(`/namespaces/${row.metadata.name}`),
    },
    {
      label: "Delete",
      icon: "i-heroicons-trash-20-solid",
      click: () => handleDelete(row.metadata.name),
    },
  ],
];

const handleDelete = async (uid: string) => {
  useApi(`/namespaces/${uid}`, {
    afterFetch: () => fetchNamespaces(),
  }).delete();
};
</script>

<template>
  <div v-if="!!error || !items">{{ error }}</div>
  <div v-else>
    <div class="flex flex-row items-center justify-between">
      <UButton icon="i-heroicons-plus">
        <NuxtLink to="/namespaces/create/new">Create New</NuxtLink>
      </UButton>
      <UButton
        icon="i-heroicons-arrow-path"
        :loading="isFetching"
        @click="fetchNamespaces"
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
