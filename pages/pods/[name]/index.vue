<script setup>
import * as yup from "yup";

definePageMeta({
  middleware: "auth",
});

const route = useRoute();
const { isFetching } = useApi(`/pods/${route.params.name}`, {
  afterFetch: (ctx) => {
    state.pod = ctx.data.data;
  },
}).json();

const state = reactive({
  pod: {
    metadata: {
      name: null,
      namespace: null,
    },
    spec: {
      containers: [],
    },
  },
});

const schema = yup.object({
  pod: yup.object({
    metadata: yup.object({
      name: yup.string().required("Name cannot be empty"),
      namespace: yup.string().nullable().optional(),
    }),
    spec: yup.object({
      containers: yup.array().of(
        yup.object({
          name: yup.string().required("Container name cannot be empty"),
          image: yup.string().required("Container name cannot be empty"),
        }),
      ),
    }),
  }),
});

// const { push, remove } = useFieldArray("podRequest.pod.spec.containers");
const push = () => {
  state.pod.spec.containers.push({ name: null, image: null });
};
const remove = (idx) => {
  state.pod.spec.containers.splice(idx, 1);
};

const router = useRouter();
const loading = ref(false);
const error = ref(null);
const onSubmit = (event) => {
  loading.value = true;
  useApi(`/pods/${route.params.name}`, {
    afterFetch: () => {
      loading.value = false;
      router.push("/pods");
    },
    onFetchError: ({ error: fetchErr }) => {
      loading.value = false;
      error.value = fetchErr;
    },
  }).put(event.data);
};
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold">Update Pod</h1>
    <div v-if="isFetching">Loading...</div>
    <UForm
      @submit="onSubmit"
      style="display: flex; flex-direction: column; gap: 20px"
      novalidate
      :state="state"
      :schema="schema"
      v-else
      class="mt-8 flex items-start"
    >
      <UFormGroup label="Name" name="pod.metadata.name">
        <UInput
          type="text"
          placeholder="Name"
          v-model="state.pod.metadata.name"
        />
      </UFormGroup>

      <UFormGroup label="Namespace" name="pod.metadata.namespace">
        <UInput
          type="text"
          placeholder="Namespace"
          v-model="state.pod.metadata.namespace"
        />
      </UFormGroup>

      <div>
        <div class="mb-4 flex flex-row items-center gap-x-4">
          <h1 class="text-xl">Containers</h1>
          <UButton
            @click="push()"
            size="sm"
            :ui="{ rounded: 'rounded-full' }"
            color="blue"
            icon="i-heroicons-plus"
          >
            Add Container
          </UButton>
        </div>
        <div
          class="mb-4 flex flex-col gap-y-4"
          v-if="state.pod.spec.containers.length"
        >
          <div
            :key="container.key"
            v-for="(container, idx) in state.pod.spec.containers"
            class="flex flex-row items-start justify-center gap-x-6"
          >
            <UFormGroup label="Name" :name="`pod.spec.containers[${idx}].name`">
              <UInput type="text" v-model="container.name" />
            </UFormGroup>

            <UFormGroup
              label="Image"
              :name="`pod.spec.containers[${idx}].image`"
            >
              <UInput
                type="text"
                placeholder="Type an image..."
                v-model="container.image"
              />
            </UFormGroup>

            <UButton
              @click="remove(idx)"
              size="sm"
              :ui="{ rounded: 'rounded-full' }"
              color="red"
              icon="i-heroicons-trash"
              class="self-end"
            />
          </div>
        </div>
        <div v-else>
          <span class="text-md font-bold">No container</span>
        </div>
      </div>

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
