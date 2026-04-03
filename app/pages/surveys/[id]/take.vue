<!-- app/pages/surveys/[id]/take.vue -->
<template>
    <div class="min-h-screen bg-surface-sunken font-sans flex flex-col" :dir="currentLang === 'ar' ? 'rtl' : 'ltr'">

        <header class="sticky top-0 z-50 bg-surface shadow-sm border-b border-gray-200 w-full transition-all">
            <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                <h1 class="text-lg font-bold text-main truncate">{{ survey.title[currentLang] }}</h1>

                <LanguageBtn />
            </div>

            <div v-if="step === 'questions'" class="h-1.5 w-full bg-gray-100">
                <div class="h-full bg-primary transition-all duration-500 ease-out"
                    :style="{ width: `${progressPercentage}%` }"></div>
            </div>
        </header>

        <main class="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-6 lg:p-8 py-8 sm:py-12">
            <Transition name="fade" mode="out-in">
                <SurveysRunnerWelcome v-if="step === 'welcome'" :survey="survey" :lang="currentLang"
                    @start="step = 'questions'" />

                <SurveysRunnerQuestionList v-else-if="step === 'questions'" :survey="survey" :lang="currentLang"
                    v-model="answers" @back="step = 'welcome'" @submit="submitSurvey" />

                <SurveysRunnerSuccess v-else-if="step === 'success'" :lang="currentLang" />
            </Transition>
        </main>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
const { localeProperties } = useI18n()

// 1. Remove admin layout
definePageMeta({ layout: false }) // Or 'empty' depending on your nuxt setup

const currentLang = computed(() => localeProperties.value.code)
const step = ref('welcome')
const answers = ref({})

// --- DUMMY DATA: Simulating an API Fetch ---
const survey = ref({
    id: 'srv_987xyz',
    title: {
        en: 'Annual Tech Stack Evaluation',
        fr: 'Évaluation Annuelle des Technologies',
        ar: 'التقييم السنوي للتقنيات'
    },
    // Simulated TipTap Rich Text Output
    description: {
        en: `<h3>Welcome to our 2026 Survey!</h3><p>Your feedback helps us decide our future tooling. Please take <strong>3 minutes</strong> to complete this.</p><ul><li>Be honest</li><li>No wrong answers</li></ul><p>Thank you for your time!</p>`,
        fr: `<h3>Bienvenue à notre sondage 2026 !</h3><p>Vos commentaires nous aident à choisir nos futurs outils. Veuillez prendre <strong>3 minutes</strong> pour y répondre.</p><ul><li>Soyez honnête</li><li>Pas de mauvaises réponses</li></ul><p>Merci pour votre temps !</p>`,
        ar: `<h3>مرحباً بك في استبيان 2026!</h3><p>تساعدنا ملاحظاتك في تحديد أدواتنا المستقبلية. يرجى أخذ <strong>3 دقائق</strong> لإكمال هذا.</p><ul><li>كن صادقاً</li><li>لا توجد إجابات خاطئة</li></ul><p>شكراً لوقتك!</p>`
    },
    questions: [
        {
            id: 'q1', type: 'text', required: true,
            title: { en: 'What is your current Job Title?', fr: 'Quel est votre poste actuel ?', ar: 'ما هو المسمى الوظيفي الحالي الخاص بك؟' }
        },
        {
            id: 'q2', type: 'textarea', required: false,
            title: { en: 'Describe your daily responsibilities.', fr: 'Décrivez vos responsabilités quotidiennes.', ar: 'صف مسؤولياتك اليومية.' }
        },
        {
            id: 'q3', type: 'single_choice', required: true,
            title: { en: 'Which framework do you prefer?', fr: 'Quel framework préférez-vous ?', ar: 'أي إطار عمل تفضل؟' },
            options: [
                { en: 'Vue / Nuxt', fr: 'Vue / Nuxt', ar: 'فيو / نكست' },
                { en: 'React / Next', fr: 'React / Next', ar: 'رياكت / نكست' },
                { en: 'Angular', fr: 'Angular', ar: 'أنجولار' }
            ]
        },
        {
            id: 'q4', type: 'multiple_choice', required: false,
            title: { en: 'Which tools do you use daily? (Select all)', fr: 'Quels outils utilisez-vous quotidiennement ? (Sélectionnez tout)', ar: 'ما الأدوات التي تستخدمها يومياً؟ (اختر كل ما ينطبق)' },
            options: [
                { en: 'VS Code', fr: 'VS Code', ar: 'في اس كود' },
                { en: 'Figma', fr: 'Figma', ar: 'فيجما' },
                { en: 'Docker', fr: 'Docker', ar: 'دوكر' }
            ]
        },
        {
            id: 'q5', type: 'rating', required: true,
            title: { en: 'Rate your satisfaction with the current UI.', fr: 'Évaluez votre satisfaction avec l\'interface actuelle.', ar: 'قيم مدى رضاك عن واجهة المستخدم الحالية.' },
            settings: { max: 15 }
        },
        {
            id: 'q6', type: 'yes_no', required: true,
            title: { en: 'Have you used AI tools this week?', fr: 'Avez-vous utilisé des outils d\'IA cette semaine ?', ar: 'هل استخدمت أدوات الذكاء الاصطناعي هذا الأسبوع؟' }
        },
        {
            id: 'q7', type: 'date', required: false,
            title: { en: 'When did you join the company?', fr: 'Quand avez-vous rejoint l\'entreprise ?', ar: 'متى انضممت إلى الشركة؟' }
        },
        {
            id: 'q8', type: 'number', required: true,
            title: { en: 'How many years of experience do you have?', fr: 'Combien d\'années d\'expérience avez-vous ?', ar: 'كم عدد سنوات الخبرة لديك؟' }
        }
    ]
})

// ✨ Init multiple choice arrays safely
onMounted(() => {
    survey.value.questions.forEach(q => {
        if (q.type === 'multiple_choice') answers.value[q.id] = []
    })
})

// Calculate Progress
const progressPercentage = computed(() => {
    const total = survey.value.questions.length
    if (total === 0) return 0
    let answered = 0

    survey.value.questions.forEach(q => {
        const val = answers.value[q.id]
        if (Array.isArray(val) && val.length > 0) answered++
        else if (!Array.isArray(val) && val !== undefined && val !== null && val !== '') answered++
    })

    return Math.round((answered / total) * 100)
})

const submitSurvey = () => {
    console.log("Submitted:", answers.value)
    step.value = 'success'
    window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: translateY(10px);
}
</style>