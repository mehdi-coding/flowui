<template>
    <div class="card">
        <div class="card-body">
            <div class="text-center mb-6">
                <div class="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <KeyRound class="text-primary" size="24" />
                </div>
                <h2 class="h3">{{ $t('auth.forgot_title') }}</h2>
                <p class="text-muted text-sm">{{ $t('auth.forgot_subtitle') }}</p>
            </div>

            <form @submit.prevent="submitForgot" class="flex flex-col gap-4">
                <div>
                    <label class="label">{{ $t('auth.email') }}</label>
                    <input type="email" class="input" required v-model="email" />
                </div>

                <button type="submit" class="btn primary w-full mt-2">
                    {{ $t('auth.send_reset_link') }}
                </button>
            </form>

            <div class="text-center mt-6">
                <NuxtLink to="/login" class="a text-sm flex items-center justify-center gap-2">
                    <ArrowLeft size="16" /> {{ $t('auth.back_to_login') }}
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { KeyRound, ArrowLeft } from '@lucide/vue'
definePageMeta({ layout: 'auth' })
const email = ref('')
const submitForgot = () => { }
</script>