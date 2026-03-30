<template>
    <div class="card text-center">
        <div class="card-body flex flex-col items-center py-8">
            <div class="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 class="text-success" size="32" />
            </div>
            <h2 class="h3 mb-2">{{ $t('auth.verify_success_title') }}</h2>
            <p class="text-muted mb-8">{{ $t('auth.verify_success_msg') }}</p>

            <NuxtLink to="/login" class="btn primary w-full">
                {{ $t('auth.continue_login') }}
            </NuxtLink>
        </div>
    </div>
</template>

<script setup>
import { CheckCircle2 } from '@lucide/vue'
definePageMeta({ layout: 'auth' })
</script>