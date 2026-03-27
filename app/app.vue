<!-- app/app.vue -->
<script setup>
import { useI18n } from '#i18n'
import { useHead } from '#app'

const { localeProperties } = useI18n()

// Set HTML dir attribute on first load and when locale changes
useHead({
  htmlAttrs: {
    dir: localeProperties.value.dir,
    lang: localeProperties.value.iso || localeProperties.value.code
  }
})

// Optional: Watch for locale changes to update dir
watch(() => localeProperties.value.dir, (newDir) => {
  if (process.client) {
    document.documentElement.setAttribute('dir', newDir)
  }
}, { immediate: true })
</script>
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
