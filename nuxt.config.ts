// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['./app/assets/css/main.css','./assets/css/fonts.css'],

  vite: {
    plugins: [
      tailwindcss(),
    ],
    optimizeDeps: {
      include: [
        '@vue/devtools-core',
        '@vue/devtools-kit',
        '@lucide/vue',
      ]
    }
  },
  modules: ['@nuxtjs/i18n'],
  i18n: {
    defaultLocale: 'en',
    locales: [
      { code: 'en', iso: 'en-US', dir: 'ltr', name: 'English', file: 'en.json' },
      { code: 'fr', iso: 'fr-FR', dir: 'ltr', name: 'Français', file: 'fr.json' },
      { code: 'ar', iso: 'ar-DZ', dir: 'rtl', name: 'العربية',file: 'ar.json' }
    ],
    strategy: 'no_prefix', // Keeps URLs clean (e.g., /users instead of /en/users)
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      alwaysRedirect: true,
      redirectOn: 'root', // redirect only on root path
    }
  }
})