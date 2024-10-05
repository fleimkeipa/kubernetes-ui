<script setup>
import * as yup from "yup";

definePageMeta({
  middleware: "auth",
});

const state = reactive({
  namespace: {
    metadata: {
      name: null,
    },
  },
});

const schema = yup.object({
  namespace: yup.object({
    metadata: yup.object({
      name: yup.string().nonNullable("Name cannot be null"),
    }),
  }),
});

const router = useRouter();
const loading = ref(false);
const error = ref(null);
const onSubmit = (event) => {
  loading.value = true;
  useApi("/namespaces", {
    afterFetch: () => {
      loading.value = false;
      router.push("/namespaces");
    },
    onFetchError: ({ error: fetchErr }) => {
      loading.value = false;
      error.value = fetchErr;
    },
  }).post(event.data);
};
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold">Create Namespace</h1>
    <UForm
      @submit="onSubmit"
      style="display: flex; flex-direction: column; gap: 20px"
      novalidate
      :state="state"
      :schema="schema"
      class="mt-8 flex items-start"
    >
      <UFormGroup label="Name" name="namespace.metadata.name">
        <UInput
          type="text"
          placeholder="Name"
          v-model="state.namespace.metadata.name"
        />
      </UFormGroup>

      <UButton :loading="loading" type="submit">Submit</UButton>
      <div
        v-if="error"
        class="flex items-center gap-x-2 rounded-lg border px-2 py-1"
      >
        <span @click="error = null" class="cursor-pointer">X</span>
        <span class="text-sm text-red-500">{{ error }}</span>
      </div>
    </UForm>
  </div>
</template>
