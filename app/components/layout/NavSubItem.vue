<template>
    <div class="text-sm text-muted hover:text-primary cursor-pointer">
        {{ label }}
    </div>
</template>

<script setup>
defineProps({
    label: String
})
</script>