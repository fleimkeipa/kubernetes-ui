import { createFetch } from "@vueuse/core";

export default createFetch({
  baseUrl: process.env.NUXT_API_BASE_URL || "http://localhost:8080",
  fetchOptions: {
    headers: {
      "Content-Type": "application/json",
    },
  },
});
