export default defineNuxtRouteMiddleware((to, from) => {
  const store = useMyAuthStore();

  // If no user and no token, redirect to login
  if (!store.user || !store.token) {
    if (to.path !== "/logIn") {
      return navigateTo("/logIn");
    }
  } else {
    // If user is authenticated, redirect to the home page
    if (to.path === "/logIn") {
      return navigateTo("/"); // Prevent logged-in users from accessing the login page
    }
  }
});
