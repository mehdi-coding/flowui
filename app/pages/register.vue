<template>
    <div class="card">
        <div class="card-body">
            <div class="text-center mb-6">
                <img src="/logo.png" alt="Logo" class="h-10 mx-auto mb-4" />
                <h2 class="h3">{{ $t('auth.register_title') }}</h2>
            </div>

            <form @submit.prevent="handleRegister" class="flex flex-col gap-4">
                <div>
                    <label class="label">{{ $t('auth.name') }}</label>
                    <input type="text" class="input" required v-model="name" />
                </div>
                <div>
                    <label class="label">{{ $t('auth.email') }}</label>
                    <input type="email" class="input" required v-model="email" />
                </div>
                <div>
                    <label class="label">{{ $t('auth.password') }}</label>
                    <input type="password" class="input" required v-model="password" />
                </div>
                <div>
                    <label class="label">{{ $t('auth.registration_code') }}</label>
                    <input type="text" class="input" required v-model="companyCode" />
                </div>

                <button type="submit" class="btn primary w-full mt-2">
                    {{ $t('auth.register_btn') }}
                </button>
            </form>

            <div class="text-center mt-6 text-sm text-muted">
                {{ $t('auth.has_account') }}
                <NuxtLink to="/login" class="a">{{ $t('auth.login_link') }}</NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
definePageMeta({ layout: 'auth' })

const name = ref('')
const email = ref('')
const password = ref('')
const companyCode = ref('')

const handleRegister = () => { /* ... */ }
</script>