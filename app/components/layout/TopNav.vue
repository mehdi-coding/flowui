<template>
    <header class="h-16 flex items-center justify-between px-6 border-b bg-surface">
        <!-- Left -->
        <div class="flex items-center gap-3">
            <button class="btn ghost" @click="toggle">☰</button>
            <span class="font-semibold">Dashboard</span>
        </div>

        <!-- Right -->
        <div class="flex items-center gap-4">
            <button class="btn ghost">🔔</button>
            <span class="badge success">Online</span>

            <div class="flex items-center gap-2">
                <div class="avatar"></div>
                <span>Admin</span>
            </div>
        </div>
    </header>
</template>

<script setup>
import { useSidebar } from '@/composables/useSidebar'

const { toggle } = useSidebar()
</script>