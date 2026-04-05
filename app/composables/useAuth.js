// app/composables/useAuth.js
export const useAuth = () => {
    // We only use this as a flag. The actual secure JWT is handled by Fastify's HttpOnly cookie.
    const isAuthenticated = useCookie('is_logged_in', { maxAge: 60 * 60 * 24 * 7 }) 
    
    const user = useState('auth_user', () => null) 
    const config = useRuntimeConfig()
    const apiBaseUrl = config.public.apiBaseUrl 

    const login = async (credentials) => {
        try {
            const response = await $fetch(`${apiBaseUrl}/auth/login`, {
                method: 'POST',
                body: credentials,
                credentials: 'include' 
            })
            
            // Fastify sets the real cookie. We just tell Nuxt "Yes, we have a session"
            isAuthenticated.value = 'true' 
            
            await fetchUser()
            return response
        } catch (error) {
            console.error('Login failed', error)
            throw error
        }
    }

    const fetchUser = async () => {
        if (!isAuthenticated.value) return

        // 👈 CRITICAL FIX: Forward cookies from the Nuxt server to Fastify during SSR
        const headers = import.meta.server ? useRequestHeaders(['cookie']) : {}

        try {
            const response = await $fetch(`${apiBaseUrl}/auth/me`, {
                method: 'GET',
                headers, // Pass the headers here
                credentials: 'include', 
            })
            
            // Note: Based on your Fastify code, the user is likely inside response.data
            // If your API returns the user directly, change this back to `response`
            user.value = response.data || response 
        } catch (error) {
            console.error('Failed to fetch user', error)
            isAuthenticated.value = null
            user.value = null
        }
    }

    const logout = async () => {
        try {
            // Optional: Call your backend logout to clear the HttpOnly cookie
            await $fetch(`${apiBaseUrl}/auth/logout`, {
                method: 'POST',
                credentials: 'include'
            })
        } catch (e) {
            console.error('Backend logout failed', e)
        }
        
        isAuthenticated.value = null
        await navigateTo('/login')
        user.value = null
        
    }

    return { isAuthenticated, user, login, fetchUser, logout }
}