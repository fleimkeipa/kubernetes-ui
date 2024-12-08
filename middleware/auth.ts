export default defineNuxtRouteMiddleware((to, from) => {
  const isAuthenticated = () => false;
  if (isAuthenticated() === false) {
    return navigateTo("/login");
  }
});
