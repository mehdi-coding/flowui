<template>
    <div class="card">
        <div class="card-body">
            <div class="text-center mb-6">
                <img src="/logo.png" alt="Logo" class="h-12 mx-auto mb-4" />
                <h2 class="h3">{{ $t('auth.login_title') }}</h2>
                <p class="text-muted">{{ $t('auth.login_subtitle') }}</p>
            </div>

            <form @submit.prevent="handleLogin" class="flex flex-col gap-4">
                <div>
                    <label class="label" for="email">{{ $t('auth.email') }}</label>
                    <input id="email" type="email" class="input" required v-model="email"
                        placeholder="you@example.com" />
                </div>

                <div>
                    <div class="flex justify-between items-center mb-1.5">
                        <label class="label mb-0" for="password">{{ $t('auth.password') }}</label>
                        <NuxtLink to="/auth/forgot_password" class="a text-sm">{{ $t('auth.forgot_password') }}
                        </NuxtLink>
                    </div>
                    <input id="password" type="password" class="input" required v-model="password"
                        placeholder="••••••••" />
                </div>

                <button type="submit" class="btn primary w-full mt-2">
                    {{ $t('auth.login_btn') }}
                </button>
            </form>

            <div class="text-center mt-6 text-sm text-muted">
                {{ $t('auth.no_account') }}
                <NuxtLink to="/register" class="a">{{ $t('auth.register_link') }}</NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
definePageMeta({ layout: 'auth' })

const email = ref('')
const password = ref('')

const handleLogin = () => {
    console.log('Login attempt', email.value)
}
</script>