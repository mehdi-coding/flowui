<template>
    <div class="card shadow-lg border-t-4 border-t-success">
        <div class="card-body p-12 text-center flex flex-col items-center">
            <div
                class="w-20 h-20 bg-green-100 text-success rounded-full flex items-center justify-center mb-6 shadow-inner">
                <Check size="40" />
            </div>
            <h2 class="text-3xl font-bold text-main mb-4">{{ $t('survey_runner.success_title') }}</h2>
            <p class="text-muted text-lg">{{ $t('survey_runner.success_desc') }}</p>
        </div>
    </div>
</template>

<script setup>
import { Check } from '@lucide/vue'
defineProps(['lang'])
</script>