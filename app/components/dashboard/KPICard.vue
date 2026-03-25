<template>
    <div class="card p-4">
        <p class="text-muted">{{ title }}</p>
        <h2 class="text-2xl font-bold">{{ value }}</h2>
    </div>
</template>

<script setup>
defineProps({
    title: String,
    value: String
})
</script>