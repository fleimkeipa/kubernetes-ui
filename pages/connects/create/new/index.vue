<script setup>
import * as yup from "yup";

definePageMeta({
  middleware: "auth",
});

const state = reactive({
  connect: {
    friend_id: null,
  },
});

const schema = yup.object({
  connect: yup.object({
    friend_id: yup.string().required("Friend cannot be empty"),
  }),
});


const router = useRouter();
const loading = ref(false);
const error = ref(null);
const onSubmit = (connect) => {
  loading.value = true;
  useApi("/connects", {
    afterFetch: () => {
      loading.value = false;
      router.push("/connects");
    },
    onFetchError: ({ error: fetchErr }) => {
      loading.value = false;
      error.value = fetchErr;
    },
  }).post(connect.data);
};
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold">Create Connect</h1>
    <UForm @submit="onSubmit" style="display: flex; flex-direction: column; gap: 20px" novalidate :state="state"
      :schema="schema" class="mt-8 flex items-start">
      <UFormGroup label="Name" name="connect.metadata.name">
        <UInput type="text" placeholder="Name" v-model="state.connect.metadata.name" />
      </UFormGroup>

      <UFormGroup label="Namespace" name="connect.metadata.namespace">
        <UInput type="text" placeholder="Namespace" v-model="state.connect.metadata.namespace" />
      </UFormGroup>

      <UButton :loading="loading" type="submit">Submit</UButton>
      <div v-if="error" class="flex items-center gap-x-2 rounded-lg border px-2 py-1">
        <span @click="error = null" class="cursor-pointer">X</span>
        <span class="text-sm text-red-500">{{ error }}</span>
      </div>
    </UForm>
  </div>
</template>
