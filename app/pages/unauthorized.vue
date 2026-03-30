<template>
    <div class="card text-center">
        <div class="card-body flex flex-col items-center py-8">
            <div class="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mb-6">
                <ShieldAlert class="text-warning" size="32" />
            </div>
            <h2 class="h3 mb-2">{{ $t('error.403_title') }}</h2>
            <p class="text-muted mb-8">{{ $t('error.403_msg') }}</p>

            <NuxtLink to="/" class="btn primary">
                {{ $t('error.back_home') }}
            </NuxtLink>
        </div>
    </div>
</template>

<script setup>
import { ShieldAlert } from '@lucide/vue'
definePageMeta({ layout: 'auth' })
</script>