<template>
    <div class="min-h-screen flex flex-col p-4 bg-surface-sunken" :dir="localeProperties.dir">

        <div class="w-full flex justify-end">
            <LanguageBtn />
        </div>

        <div class="grow flex items-center justify-center py-6">
            <div class="w-full max-w-md">
                <NuxtPage />
            </div>
        </div>

    </div>
</template>

<script setup>
import { useI18n } from '#i18n'
const { localeProperties } = useI18n()
</script>

<style scoped>
.bg-surface-sunken {
    background-color: var(--color-surface-sunken);
}
</style>