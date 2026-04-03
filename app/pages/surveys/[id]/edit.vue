<template>
    <div class="max-w-5xl mx-auto flex flex-col gap-6 pb-12">

        <SurveysSurveyForm v-model="survey" :title="$t('surveys.edit_header')" :subtitle="$t('surveys.edit_subtitle')"
            :is-edit="true" @submit="handleSaveInfo" />

        <hr class="border-gray-200" />

        <h3 class="h4 m-0 px-2">{{ $t('surveys.tab_questions') }} ({{ survey.questions.length }})</h3>

        <div v-if="survey.questions.length === 0"
            class="text-center py-12 bg-surface-sunken rounded-xl border-2 border-dashed border-gray-300">
            <p class="text-muted">{{ $t('surveys.no_questions') }}</p>
        </div>

        <div class="flex flex-col gap-6">
            <SurveysQuestionItem v-for="(question, index) in survey.questions" :key="question.id"
                v-model="survey.questions[index]" :index="index" :total="survey.questions.length"
                @remove="removeQuestion(index)" @move-up="moveQuestion(index, -1)"
                @move-down="moveQuestion(index, 1)" />
        </div>

        <div class="card border-dashed border-2 bg-surface-sunken hover:border-primary/40 transition-all group">
            <div class="card-body">
                <h4
                    class="text-xs font-bold uppercase text-muted mb-4 text-center group-hover:text-primary transition-colors">
                    {{ $t('surveys.add_new_question') }}
                </h4>
                <div class="flex flex-wrap justify-center gap-2">
                    <button type="button" v-for="type in questionTypes" :key="type"
                        class="btn btn-sm btn-outline shadow-sm" @click="addQuestion(type)">
                        <Plus class="icon-xs" /> {{ type.replace('_', ' ') }}
                    </button>
                </div>
            </div>
        </div>

        <div class="flex justify-end gap-3 mt-2">
            <button type="button" class="btn btn-outline px-6">{{ $t('common.cancel') }}</button>
            <button type="button" class="btn primary px-8" @click="handleSaveQuestions">
                <Save class="icon-sm" /> {{ $t('surveys.save_questions') }}
            </button>
        </div>

    </div>
</template>

<script setup>
import { ref } from 'vue'
import { Plus, Save } from '@lucide/vue'

const questionTypes = ["text", "textarea", "single_choice", "multiple_choice", "rating", "yes_no", "date", "number"]

// --- Dummy Data ---
const survey = ref({
    id: '123-abc',
    title: { en: 'Customer Satisfaction 2026', fr: 'Satisfaction Client 2026', ar: 'رضا العملاء ٢٠٢٦' },
    description: { en: '<p>Help us improve!</p>', fr: '', ar: '' },
    status: 'draft',
    allowAnonymous: true,
    isTemplate: false,
    questions: [
        {
            id: 'q1',
            title: { en: 'How did you hear about us?', fr: 'Comment avez-vous entendu parler de nous?', ar: 'كيف سمعت عنا؟' },
            type: 'single_choice',
            required: true,
            options: [
                { en: 'Social Media', fr: 'Réseaux Sociaux', ar: 'وسائل التواصل الاجتماعي' },
                { en: 'Friend', fr: 'Ami', ar: 'صديق' }
            ],
            settings: {}
        },
        {
            id: 'q2',
            title: { en: 'Please rate your experience', fr: 'Veuillez évaluer votre expérience', ar: 'يرجى تقييم تجربتك' },
            type: 'rating',
            required: true,
            options: null,
            settings: { min: 1, max: 5 }
        }
    ]
})

// --- Logic ---
const addQuestion = (type) => {
    survey.value.questions.push({
        id: Math.random().toString(36).substr(2, 9),
        title: { en: '', fr: '', ar: '' },
        type: type,
        required: true,
        options: ['single_choice', 'multiple_choice'].includes(type) ? [{ en: '', fr: '', ar: '' }] : null,
        settings: type === 'rating' ? { min: 1, max: 5 } : {}
    })
}

const removeQuestion = (index) => survey.value.questions.splice(index, 1)

const moveQuestion = (index, direction) => {
    const newIndex = index + direction
    if (newIndex < 0 || newIndex >= survey.value.questions.length) return
    const item = survey.value.questions.splice(index, 1)[0]
    survey.value.questions.splice(newIndex, 0, item)
}

const handleSaveInfo = () => console.log('Saving Info:', survey.value)
const handleSaveQuestions = () => console.log('Saving Questions:', survey.value.questions)
</script>