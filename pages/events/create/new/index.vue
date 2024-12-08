<script setup>
import * as yup from "yup";

definePageMeta({
  middleware: "auth",
});

const state = reactive({
  event: {
    name: null,
    description: null,
    visibility: null,
    date: null,
    time_start: null,
    time_end: null,
    items: [];
  },
});

const schema = yup.object({
  event: yup.object({
    name: yup.string().nonNullable("Name cannot be null"),
    description: yup.string(),
    visibility: yup.number(),
    date: yup.date(),
    time_start: yup.date(),
    time_end: yup.date(),
    items: yup.array(),
  }),
});

const router = useRouter();
const loading = ref(false);
const error = ref(null);
const onSubmit = (event) => {
  loading.value = true;
  useApi("/events", {
    afterFetch: () => {
      loading.value = false;
      router.push("/events");
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
    <h1 class="text-2xl font-bold">Create Event</h1>
    <UForm @submit="onSubmit" style="display: flex; flex-direction: column; gap: 20px" novalidate :state="state"
      :schema="schema" class="mt-8 flex items-start">
      <UFormGroup label="Name" name="event.name">
        <UInput type="text" placeholder="Name" v-model="state.event.name" />
      </UFormGroup>
      <UFormGroup label="Description" name="event.description">
        <UInput type="text" placeholder="Description" v-model="state.event.description" />
      </UFormGroup>
      <UFormGroup label="Visibility" name="event.visibility">
        <UInput type="number" placeholder="Visibility" v-model="state.event.visibility" />
      </UFormGroup>
      <UFormGroup label="Date" name="event.date">
        <UInput type="date" placeholder="Date" v-model="state.event.date" />
      </UFormGroup>
      <UFormGroup label="TimeStart" name="event.time_start">
        <UInput type="date" placeholder="Time Start" v-model="state.event.time_start" />
      </UFormGroup>
      <UFormGroup label="TimeEnd" name="event.time_end">
        <UInput type="date" placeholder="Time End" v-model="state.event.time_end" />
      </UFormGroup>

      <UButton :loading="loading" type="submit">Submit</UButton>
      <div v-if="error" class="flex items-center gap-x-2 rounded-lg border px-2 py-1">
        <span @click="error = null" class="cursor-pointer">X</span>
        <span class="text-sm text-red-500">{{ error }}</span>
      </div>
    </UForm>
  </div>
</template>
