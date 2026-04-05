<template>
    <div class="max-w-6xl mx-auto py-8 px-4">

        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
                <div class="flex items-center gap-2 text-sm text-muted mb-2">
                    <NuxtLink to="/surveys" class="hover:text-primary transition-colors">{{ $t('surveys.surveys') }}
                    </NuxtLink>
                    <ChevronRight v-if="currentLang !== 'ar'" class="icon-xs" />
                    <ChevronLeft v-else class="icon-xs" />
                    <span>{{ survey.title[currentLang] }}</span>
                </div>
                <h1 class="text-2xl font-bold text-main flex items-center gap-3">
                    {{ survey.title[currentLang] }}
                    <span class="badge bg-green-100 text-success text-xs px-2 py-1 rounded-md">{{
                        $t('surveys.status_published') }}</span>
                </h1>
            </div>
            <div class="flex items-center gap-3">
                <button class="btn btn-outline">
                    <Download class="icon-sm" /> {{ $t('survey_results.export_csv') }}
                </button>
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div class="card bg-surface">
                <div class="card-body flex items-center gap-4 p-6">
                    <div class="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                        <Users size="24" />
                    </div>
                    <div>
                        <p class="text-sm text-muted font-bold uppercase">{{ $t('survey_results.total_responses') }}</p>
                        <p class="text-2xl font-bold text-main">{{ summary.totalResponses }}</p>
                    </div>
                </div>
            </div>
            <div class="card bg-surface">
                <div class="card-body flex items-center gap-4 p-6">
                    <div class="w-12 h-12 rounded-full bg-green-100 text-success flex items-center justify-center">
                        <CheckCircle2 size="24" />
                    </div>
                    <div>
                        <p class="text-sm text-muted font-bold uppercase">{{ $t('survey_results.completion_rate') }}</p>
                        <p class="text-2xl font-bold text-main">{{ summary.completionRate }}%</p>
                    </div>
                </div>
            </div>
            <div class="card bg-surface">
                <div class="card-body flex items-center gap-4 p-6">
                    <div class="w-12 h-12 rounded-full bg-orange-100 text-warning flex items-center justify-center">
                        <Clock size="24" />
                    </div>
                    <div>
                        <p class="text-sm text-muted font-bold uppercase">{{ $t('survey_results.avg_time') }}</p>
                        <p class="text-2xl font-bold text-main">{{ summary.averageTime }}</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div v-for="(q, index) in survey.questions" :key="q.id" class="card bg-surface h-full flex flex-col">
                <div class="card-header border-b border-gray-100 p-5 flex justify-between items-start gap-4">
                    <h3 class="font-bold text-main leading-tight">
                        <span class="text-primary mr-1 rtl:ml-1">{{ index + 1 }}.</span> {{ q.title[currentLang] }}
                    </h3>
                    <span
                        class="badge bg-gray-100 text-muted text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded whitespace-nowrap">
                        {{ q.type.replace('_', ' ') }}
                    </span>
                </div>

                <div class="card-body p-6 flex-1 flex flex-col">

                    <div v-if="['text', 'textarea', 'date', 'number'].includes(q.type)" class="flex-1">
                        <p class="text-xs text-muted mb-3 font-bold uppercase">{{ $t('survey_results.latest_responses')
                        }}</p>
                        <div class="space-y-3 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                            <div v-for="(ans, i) in getMockTextAnswers(q.id, q.type)" :key="i"
                                class="p-3 bg-surface-sunken border border-gray-100 rounded-lg text-sm text-main">
                                {{ ans }}
                            </div>
                        </div>
                    </div>

                    <div v-else class="flex flex-col sm:flex-row items-center gap-8 flex-1">

                        <div class="relative w-32 h-32 shrink-0 rounded-full shadow-sm"
                            :style="{ background: generateConicGradient(getChartData(q)) }">
                            <div
                                class="absolute inset-4 bg-surface rounded-full flex items-center justify-center shadow-inner">
                                <span class="text-xs font-bold text-muted">{{ summary.totalResponses }}</span>
                            </div>
                        </div>

                        <div class="flex-1 w-full space-y-3">
                            <div v-for="(item, i) in getChartData(q)" :key="i" class="flex items-center gap-3 text-sm">
                                <div class="w-3 h-3 rounded-full shrink-0" :style="{ backgroundColor: item.color }">
                                </div>

                                <div class="flex-1 min-w-0">
                                    <div class="flex justify-between items-end mb-1">
                                        <span class="text-main truncate pr-2 font-medium" :title="item.label">{{
                                            item.label }}</span>
                                        <span class="text-muted font-bold text-xs">{{ item.percentage }}% <span
                                                class="font-normal text-[10px]">({{ item.count }})</span></span>
                                    </div>
                                    <div class="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                        <div class="h-full rounded-full"
                                            :style="{ width: `${item.percentage}%`, backgroundColor: item.color }">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
import { computed } from 'vue'
import { Download, ChevronRight, ChevronLeft, Users, CheckCircle2, Clock } from '@lucide/vue'

const { localeProperties } = useI18n()
const currentLang = computed(() => localeProperties.value.code || 'en')

// A professional color palette for the charts
const CHART_COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#ec4899', '#f97316']

// --- Dummy Global Stats ---
const summary = {
    totalResponses: 1248,
    completionRate: 92,
    averageTime: '3m 15s'
}

// --- Dummy Survey Data (Same as take.vue) ---
const survey = {
    id: 'srv_987xyz',
    title: { en: 'Annual Tech Stack Evaluation', fr: 'Évaluation Annuelle des Technologies', ar: 'التقييم السنوي للتقنيات' },
    questions: [
        { id: 'q1', type: 'text', title: { en: 'What is your current Job Title?', fr: 'Quel est votre poste actuel ?', ar: 'ما هو المسمى الوظيفي الخاص بك؟' } },
        { id: 'q3', type: 'single_choice', title: { en: 'Which framework do you prefer?', fr: 'Quel framework préférez-vous ?', ar: 'أي إطار عمل تفضل؟' }, options: [{ en: 'Vue / Nuxt', fr: 'Vue / Nuxt', ar: 'فيو / نكست' }, { en: 'React / Next', fr: 'React / Next', ar: 'رياكت / نكست' }, { en: 'Angular', fr: 'Angular', ar: 'أنجولار' }] },
        { id: 'q4', type: 'multiple_choice', title: { en: 'Which tools do you use daily?', fr: 'Quels outils utilisez-vous quotidiennement ?', ar: 'ما الأدوات التي تستخدمها يومياً؟' }, options: [{ en: 'VS Code', fr: 'VS Code', ar: 'في اس كود' }, { en: 'Figma', fr: 'Figma', ar: 'فيجما' }, { en: 'Docker', fr: 'Docker', ar: 'دوكر' }] },
        { id: 'q5', type: 'rating', title: { en: 'Rate your satisfaction', fr: 'Évaluez votre satisfaction', ar: 'قيم مدى رضاك' }, settings: { max: 5 } },
        { id: 'q6', type: 'yes_no', title: { en: 'Used AI tools this week?', fr: 'Utilisé l\'IA cette semaine ?', ar: 'استخدمت الذكاء الاصطناعي؟' } },
        { id: 'q2', type: 'textarea', title: { en: 'Describe your responsibilities.', fr: 'Décrivez vos responsabilités.', ar: 'صف مسؤولياتك.' } },
    ]
}

// --- Logic to Generate Mock Data for Visualizations ---
const getChartData = (question) => {
    let data = []

    if (question.type === 'single_choice' || question.type === 'multiple_choice') {
        data = question.options.map((opt, i) => ({
            label: opt[currentLang.value],
            count: Math.floor(Math.random() * 800) + 100, // Random count
            color: CHART_COLORS[i % CHART_COLORS.length]
        }))
    } else if (question.type === 'yes_no') {
        data = [
            { label: currentLang.value === 'ar' ? 'نعم' : (currentLang.value === 'fr' ? 'Oui' : 'Yes'), count: 850, color: '#10b981' }, // Green
            { label: currentLang.value === 'ar' ? 'لا' : (currentLang.value === 'fr' ? 'Non' : 'No'), count: 398, color: '#ef4444' } // Red
        ]
    } else if (question.type === 'rating') {
        const max = question.settings?.max || 5
        for (let i = 1; i <= max; i++) {
            data.push({
                label: `${i} Stars`,
                count: Math.floor(Math.random() * 400),
                color: CHART_COLORS[(i - 1) % CHART_COLORS.length]
            })
        }
    }

    // Calculate Percentages
    const totalCount = data.reduce((sum, item) => sum + item.count, 0)
    data = data.map(item => ({
        ...item,
        percentage: totalCount === 0 ? 0 : Math.round((item.count / totalCount) * 100)
    }))

    // Sort descending by percentage for better looking charts (optional)
    return data.sort((a, b) => b.percentage - a.percentage)
}

// --- Dynamic CSS Conic Gradient Builder ---
const generateConicGradient = (chartData) => {
    if (!chartData || chartData.length === 0) return 'conic-gradient(#e5e7eb 0% 100%)'

    let currentAngle = 0
    const stops = chartData.map(item => {
        const start = currentAngle
        currentAngle += item.percentage
        return `${item.color} ${start}% ${currentAngle}%`
    })

    return `conic-gradient(${stops.join(', ')})`
}

// --- Mock Data for Text Answers ---
const getMockTextAnswers = (id, type) => {
    if (type === 'number') return ['4', '12', '5', '8', '3']
    if (type === 'date') return ['2024-01-15', '2023-11-02', '2024-02-28']

    if (currentLang.value === 'fr') return ['Développeur Frontend', 'Manager de Projet', 'Je code des interfaces.', 'Supervise l\'équipe technique.']
    if (currentLang.value === 'ar') return ['مطور واجهات أمامية', 'مدير مشروع', 'أقوم بكتابة الأكواد', 'الإشراف على الفريق التقني']
    return ['Frontend Developer', 'Project Manager', 'Fullstack Engineer', 'I build UI components and connect APIs.', 'Managing the design team.']
}
</script>

<style scoped>
/* Custom subtle scrollbar for the text answers box */
.custom-scrollbar::-webkit-scrollbar {
    width: 4px;
}

.custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: var(--color-gray-200);
    border-radius: 4px;
}
</style>