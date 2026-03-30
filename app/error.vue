<template>
    <div class="min-h-screen flex flex-col items-center justify-center p-4 bg-surface-sunken">
        <div class="text-center max-w-md">
            <h1 class="text-9xl font-bold text-primary mb-4">{{ error.statusCode }}</h1>
            <h2 class="h2 mb-4">{{ t('error.404_title') }}</h2>
            <p class="text-muted mb-8 lead">{{ t('error.404_msg') }}</p>

            <button @click="handleError" class="btn primary">
                {{ t('error.back_home') }}
            </button>
        </div>
    </div>
</template>

<script setup>
import { useI18n } from '#i18n'

// error.vue is a special standalone page, so it's safer to explicitly import 't'
const { t } = useI18n()

const props = defineProps({
    error: Object
})

const handleError = () => clearError({ redirect: '/' })
</script>