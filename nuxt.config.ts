// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: ["@vueuse/nuxt", "@vee-validate/nuxt", "@nuxt/ui"],
  runtimeConfig: {
    API_BASE_URL: process.env.NUXT_API_BASE_URL || "http://localhost:8080",
  },
  devServer: {
    port: 8081,
  },
});
