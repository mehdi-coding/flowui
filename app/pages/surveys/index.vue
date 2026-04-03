<script setup>
definePageMeta({
    title: 'Surveys' // This is the text the layout will pick up
})
</script>
<template>


    <p>This is the main page content.</p>
    <p>Test the edit</p>
    <NuxtLink to="/surveys/123456789/edit" class="btn secondary">Edit </NuxtLink>
    <br>
    <NuxtLink to="/surveys/123456789/take" class="btn">Take Survey</NuxtLink>
    <br>
    <NuxtLink to="/surveys/123456789/results" class="btn success">Take Survey</NuxtLink>

</template>