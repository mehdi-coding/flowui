// app/middleware/guest.js
export default defineNuxtRouteMiddleware((to, from) => {
    const { isAuthenticated } = useAuth()

    // If they are logged in, send them to the dashboard
    if (isAuthenticated.value) {
        return navigateTo('/') 
    }
})