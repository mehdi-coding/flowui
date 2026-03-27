<template>
    <div class="card p-6">
        <Tabs v-model="activeTab" :tabs="myTabs" class="primary">

            <template #account>
                <h4 class="h4">Account Settings</h4>
                <p class="p text-muted">Manage your personal information here.</p>

                <label class="label">Username</label>
                <input type="text" class="input mb-4" placeholder="Enter username..." />
                <button class="btn primary">Save Account</button>
            </template>

            <template #security>
                <h4 class="h4">Security Preferences</h4>

                <label class="selection-group mt-4">
                    <input type="checkbox" class="switch" checked>
                    <span>Enable Two-Factor Authentication</span>
                </label>
            </template>

            <template #cheking>
                <h4 class="h4">Security Preferences</h4>

                <label class="selection-group mt-4">

                    <span>Checking</span>
                </label>
            </template>

            <template #annother>
                <h4 class="h4">Account Settings</h4>
                <p class="p text-muted">Another</p>

                <label class="label">Username</label>
                <input type="text" class="input mb-4" placeholder="Enter username..." />
                <button class="btn primary">Save Account</button>
            </template>

        </Tabs>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { User, ShieldCheck } from '@lucide/vue'

// 1. Define which tab is open by default
const activeTab = ref('account')

// 2. Define the tab objects (id maps to the slot name)
const myTabs = [
    { id: 'account', label: 'Account', icon: User },
    { id: 'security', label: 'Security', icon: ShieldCheck },
    { id: 'cheking', label: 'Checking', icon: ShieldCheck },
    { id: 'annother', label: 'Annother', icon: ShieldCheck }
]
</script>