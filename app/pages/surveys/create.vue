<script setup>
const formData = ref({
    title: { en: '', fr: '', ar: '' },
    description: { en: '', fr: '', ar: '' },
    status: 'draft',
    allowAnonymous: false,
    isTemplate: false
})

const handleCreate = (data) => {
    console.log('API POST Call:', data)
}
</script>

<template>
    <SurveysSurveyForm v-model="formData" :title="$t('surveys.create_title')"
        subtitle="Create a new survey from scratch" @submit="handleCreate" />
</template>