<script setup>
import * as yup from "yup";

definePageMeta({
  middleware: "auth",
});

const state = reactive({
  era: {
    name: null,
    color: null,
    time_start: null,
    time_end: null,
  },
});

const schema = yup.object({
  era: yup.object({
    name: yup.string().nonNullable("Name cannot be null"),
    color: yup.string(),
    time_start: yup.date().required("Start time cannot be empty"),
    time_end: yup.date().required("End time cannot be empty"),
  }),
});

const router = useRouter();
const loading = ref(false);
const error = ref(null);
const onSubmit = (eras) => {
  loading.value = true;
  useApi("/eras", {
    afterFetch: () => {
      loading.value = false;
      router.push("/eras");
    },
    onFetchError: ({ error: fetchErr }) => {
      loading.value = false;
      error.value = fetchErr;
    },
  }).post(eras.data);
};
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold">Create Era</h1>
    <UForm @submit="onSubmit" style="display: flex; flex-direction: column; gap: 20px" novalidate :state="state"
      :schema="schema" class="mt-8 flex items-start">
      <UFormGroup label="Name" name="era.name">
        <UInput type="text" placeholder="Name" v-model="state.era.name" />
      </UFormGroup>

      <UFormGroup label="Color" name="era.color">
        <UInput type="text" placeholder="Color" v-model="state.era.color" />
      </UFormGroup>

      <UFormGroup label="TimeStart" name="era.time_start">
        <UInput type="text" placeholder="Time Start" v-model="state.era.time_start" />
      </UFormGroup>
      <UFormGroup label="TimeEnd" name="era.time_end">
        <UInput type="text" placeholder="Time End" v-model="state.era.time_end" />
      </UFormGroup>

      <UButton :loading="loading" type="submit">Submit</UButton>
      <div v-if="error" class="flex items-center gap-x-2 rounded-lg border px-2 py-1">
        <span @click="error = null" class="cursor-pointer">X</span>
        <span class="text-sm text-red-500">{{ error }}</span>
      </div>
    </UForm>
  </div>
</template>
