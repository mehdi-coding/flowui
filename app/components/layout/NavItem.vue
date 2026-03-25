<template>
    <button class="nav-item flex items-center gap-3 w-full">
        <span>{{ icon }}</span>
        <span v-if="isOpen">{{ label }}</span>
    </button>
</template>

<script setup>
import { useSidebar } from '@/composables/useSidebar'

defineProps({
    icon: String,
    label: String
})

const { isOpen } = useSidebar()
</script>