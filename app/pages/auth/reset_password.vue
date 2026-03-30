<template>
    <div class="card">
        <div class="card-body">
            <div class="text-center mb-6">
                <h2 class="h3">{{ $t('auth.reset_title') }}</h2>
                <p class="text-muted text-sm">{{ $t('auth.reset_subtitle') }}</p>
            </div>

            <form @submit.prevent="resetPassword" class="flex flex-col gap-4">
                <div>
                    <label class="label">{{ $t('auth.email') }}</label>
                    <input type="email" class="input" v-model="email" required>
                </div>
                <div>
                    <label class="label">{{ $t('auth.new_password') }}</label>
                    <input type="password" class="input" v-model="password" required>
                </div>
                <div>
                    <label class="label">{{ $t('auth.confirm_password') }}</label>
                    <input type="password" class="input" v-model="confirm_password" required>
                </div>

                <button type="submit" class="btn primary w-full mt-2">
                    {{ $t('auth.submit_reset') }}
                </button>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
definePageMeta({ layout: 'auth' })
const email = ref('')
const password = ref('')
const confirm_password = ref('')
const resetPassword = () => { }
</script>