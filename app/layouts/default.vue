<template>
    <div class="flex h-screen bg-base">
        <!-- Sidebar -->
        <Sidebar />

        <!-- Main Area -->
        <div class="flex flex-col flex-1 overflow-hidden">
            <TopNav />

            <main class="p-6 overflow-y-auto bg-muted flex-1">
                <slot />
            </main>
        </div>
    </div>
</template>

<script setup>
import Sidebar from '@/components/layout/Sidebar.vue'
import TopNav from '@/components/layout/TopNav.vue'
</script>