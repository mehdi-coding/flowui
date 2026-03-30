<template>
    <div class="card text-center">
        <div class="card-body flex flex-col items-center py-8">
            <div class="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-6">
                <XCircle class="text-danger" size="32" />
            </div>
            <h2 class="h3 mb-2">{{ $t('auth.verify_error_title') }}</h2>
            <p class="text-muted mb-8">{{ $t('auth.verify_error_msg') }}</p>

            <button class="btn primary w-full mb-3">
                {{ $t('auth.resend_link') }}
            </button>
            <NuxtLink to="/login" class="btn btn-outline w-full">
                {{ $t('auth.back_to_login') }}
            </NuxtLink>
        </div>
    </div>
</template>

<script setup>
import { XCircle } from '@lucide/vue'
definePageMeta({ layout: 'auth' })
</script>