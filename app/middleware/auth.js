// app/middleware/auth.js
export default defineNuxtRouteMiddleware(async (to, from) => {
    const { isAuthenticated, user, fetchUser } = useAuth()

    // If the flag is false, immediately redirect to login
    if (!isAuthenticated.value) {
        return navigateTo('/login')
    }

    // If the flag is true but user data isn't loaded (e.g., hard refresh)
    if (isAuthenticated.value && !user.value) {
        await fetchUser()
        
        if (!user.value) {
            return navigateTo('/login')
        }
    }
})