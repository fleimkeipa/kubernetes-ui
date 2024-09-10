<template>
  <div>PodUpdate</div>
  <div v-if="error">Something went wrong.</div>
  <form
    v-else
    @submit="onSubmit"
    style="display: flex; flex-direction: column; gap: 20px"
    novalidate
  >
    <div>
      <label for="pod.metadata.name">Name</label>
      <Field type="text" name="pod.metadata.name" placeholder="Name" />
      <ErrorMessage name="pod.metadata.name" />
    </div>

    <div>
      <label for="pod.metadata.namespace">Namespace</label>
      <Field
        type="text"
        name="pod.metadata.namespace"
        placeholder="Namespace"
      />
      <ErrorMessage name="pod.metadata.namespace" />
    </div>

    <div>
      <label for="pod.spec.containers">Containers</label>
      <button type="button" @click="push({ name: '', image: '' })">
        Add Container
      </button>
      <div :key="container.key" v-for="(container, idx) in containers">
        <label for="`pod.spec.containers[${idx}].name`">Name</label>
        <Field :name="`pod.spec.containers[${idx}].name`" type="text" />
        <ErrorMessage :name="`pod.spec.containers[${idx}].name`" />

        <label for="`pod.spec.containers[${idx}].image`">Image</label>
        <Field :name="`pod.spec.containers[${idx}].image`" type="text" />
        <ErrorMessage :name="`pod.spec.containers[${idx}].image`" />

        <button type="button" @click="remove(idx)">Remove Container</button>
      </div>
    </div>

    <button type="submit">Submit</button>
  </form>
</template>

<script setup>
import useApi from "@/composables/useApi";
import { Field, ErrorMessage, useForm, useFieldArray } from "vee-validate";
import { useRoute } from "vue-router";
import * as yup from "yup";

const { handleSubmit, setValues } = useForm({
  validationSchema: yup.object().shape({
    pod: yup.object({
      metadata: yup.object({
        name: yup.string(),
        namespace: yup.string().optional(),
      }),
      spec: yup.object({
        containers: yup.array().of(
          yup.object({
            name: yup.string(),
            image: yup.string(),
          })
        ),
      }),
    }),
  }),
});
const {
  push,
  remove,
  fields: containers,
} = useFieldArray("podRequest.pod.spec.containers");

const route = useRoute();

const onSubmit = handleSubmit((values, ctx) => {
  // console.log(values);
  const { data, error } = useApi(`/pods/${route.params.podName}`).put(
    ctx.controlledValues
  );

  console.log({ data, error });
});

const { error } = useApi(`/pods/${route.params.podName}`, {
  afterFetch: (ctx) => {
    setValues({ pod: ctx.data.data }, true);
    push();
  },
}).json();
</script>
