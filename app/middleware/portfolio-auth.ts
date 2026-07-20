export default defineNuxtRouteMiddleware((to) => {
  const { loggedIn } = useDirectusAuth()

  if (!loggedIn.value) {
    return navigateTo('/portfolio/login')
  }
})
