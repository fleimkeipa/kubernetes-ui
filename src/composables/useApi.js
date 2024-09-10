import { API_BASE_URL } from "@/config";
import { createFetch } from "@vueuse/core";

export default createFetch({
  baseUrl: API_BASE_URL,
  fetchOptions: {
    headers: {
      "Content-Type": "application/json",
    },
  },
});
