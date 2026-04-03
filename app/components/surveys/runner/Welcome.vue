<template>
    <div class="card shadow-lg border-t-4 border-t-primary">
        <div class="card-body p-8 sm:p-12 text-center">
            <h2 class="text-3xl font-bold text-main mb-6">{{ survey.title[lang] }}</h2>

            <div class="tiptap-content text-left mb-10 mx-auto max-w-2xl" :class="{ 'text-right': lang === 'ar' }"
                v-html="survey.description[lang]">
            </div>

            <button type="button" @click="$emit('start')"
                class="btn primary px-8 py-3 text-lg w-full sm:w-auto shadow-md hover:shadow-lg transition-all">
                {{ $t('survey_runner.start_btn') }}
                <ArrowRight v-if="lang !== 'ar'" class="ml-2 icon-sm" />
                <ArrowLeft v-else class="mr-2 icon-sm" />
            </button>
        </div>
    </div>
</template>

<script setup>
import { ArrowRight, ArrowLeft } from '@lucide/vue'
defineProps(['survey', 'lang'])
defineEmits(['start'])
</script>

<style scoped>
/* Scoped styles applied ONLY to the TipTap injected HTML */
.tiptap-content :deep(h1),
.tiptap-content :deep(h2),
.tiptap-content :deep(h3) {
    color: var(--color-main, #111827);
    font-weight: 700;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
}

.tiptap-content :deep(h1) {
    font-size: 2rem;
}

.tiptap-content :deep(h2) {
    font-size: 1.5rem;
}

.tiptap-content :deep(h3) {
    font-size: 1.25rem;
}

.tiptap-content :deep(p) {
    color: var(--color-muted, #4B5563);
    line-height: 1.6;
    margin-bottom: 1rem;
}

.tiptap-content :deep(ul) {
    list-style-type: disc;
    padding-inline-start: 1.5rem;
    margin-bottom: 1rem;
    color: var(--color-muted, #4B5563);
}

.tiptap-content :deep(ol) {
    list-style-type: decimal;
    padding-inline-start: 1.5rem;
    margin-bottom: 1rem;
}

.tiptap-content :deep(li) {
    margin-bottom: 0.5rem;
}

.tiptap-content :deep(strong) {
    font-weight: 600;
    color: var(--color-main, #111827);
}
</style>