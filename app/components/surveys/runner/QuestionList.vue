<!-- app/components/surveys/QuestionList.vue -->
<template>
    <div class="card shadow-lg">
        <div class="card-body p-6 sm:p-10">
            <form @submit.prevent="$emit('submit')" class="flex flex-col gap-10">
                <div v-for="(q, index) in survey.questions" :key="q.id" class="question-block">
                    <div class="mb-4">
                        <h3 class="text-lg font-medium text-main flex gap-2">
                            <span class="text-primary font-bold">{{ index + 1 }}.</span>
                            {{ q.title[lang] }}
                            <span v-if="q.required" class="text-danger ml-1">*</span>
                        </h3>
                    </div>

                    <!-- <div v-if="q.type === 'text'">
                        <input type="text" v-model="modelValue[q.id]" :required="q.required"
                            class="input w-full bg-surface-sunken border-gray-200" />
                    </div> -->

                    <div v-if="q.type === 'text'">
                        <input type="text" v-model="modelValue[q.id]" :required="q.required"
                            class="input w-full bg-surface-sunken border-gray-200"
                            :placeholder="$t('survey_runner.placeholder_text')" />
                    </div>

                    <div v-else-if="q.type === 'textarea'">
                        <textarea v-model="modelValue[q.id]" :required="q.required" rows="4"
                            class="input w-full bg-surface-sunken border-gray-200"
                            :placeholder="$t('survey_runner.placeholder_textarea')"></textarea>
                    </div>

                    <div v-else-if="q.type === 'single_choice'" class="space-y-3">
                        <label v-for="(opt, oIdx) in q.options" :key="oIdx"
                            class="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:bg-surface-sunken cursor-pointer transition-colors">
                            <input type="radio" :name="`q_${q.id}`" :value="opt[lang]" v-model="modelValue[q.id]"
                                :required="q.required"
                                class="w-4 h-4 text-primary focus:ring-primary border-gray-300" />
                            <span class="text-main">{{ opt[lang] }}</span>
                        </label>
                    </div>

                    <div v-else-if="q.type === 'multiple_choice'" class="space-y-3">
                        <label v-for="(opt, oIdx) in q.options" :key="oIdx"
                            class="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:bg-surface-sunken cursor-pointer transition-colors">
                            <input type="checkbox" :value="opt[lang]" v-model="modelValue[q.id]"
                                class="w-4 h-4 text-primary focus:ring-primary border-gray-300 rounded" />
                            <span class="text-main">{{ opt[lang] }}</span>
                        </label>
                    </div>

                    <div v-else-if="q.type === 'rating'" class="flex flex-wrap gap-2">
                        <button type="button" v-for="n in (q.settings?.max || 5)" :key="n" @click="modelValue[q.id] = n"
                            :class="['w-12 h-12 rounded-full font-bold transition-all border-2 flex items-center justify-center',
                                modelValue[q.id] === n ? 'bg-primary border-primary text-on-primary scale-110' : 'bg-surface border-gray-200 text-muted hover:border-primary/50']">
                            {{ n }}
                        </button>
                    </div>

                    <div v-else-if="q.type === 'yes_no'" class="flex gap-4">
                        <label
                            class="flex-1 flex items-center justify-center gap-2 p-4 rounded-lg border-2 cursor-pointer transition-all"
                            :class="modelValue[q.id] === 'yes' ? 'border-success bg-green-50 text-success' : 'border-gray-200 text-muted hover:bg-gray-50'">
                            <input type="radio" :name="`q_${q.id}`" value="yes" v-model="modelValue[q.id]"
                                :required="q.required" class="hidden" />
                            <CheckCircle2 class="icon-sm" /> <span class="font-bold">{{ $t('survey_runner.yes')
                            }}</span>
                        </label>
                        <label
                            class="flex-1 flex items-center justify-center gap-2 p-4 rounded-lg border-2 cursor-pointer transition-all"
                            :class="modelValue[q.id] === 'no' ? 'border-danger bg-red-50 text-danger' : 'border-gray-200 text-muted hover:bg-gray-50'">
                            <input type="radio" :name="`q_${q.id}`" value="no" v-model="modelValue[q.id]"
                                :required="q.required" class="hidden" />
                            <XCircle class="icon-sm" /> <span class="font-bold">{{ $t('survey_runner.no') }}</span>
                        </label>
                    </div>

                    <div v-else-if="q.type === 'date'">
                        <input type="date" v-model="modelValue[q.id]" :required="q.required"
                            class="input bg-surface-sunken border-gray-200 w-full sm:w-auto" />
                    </div>

                    <div v-else-if="q.type === 'number'">
                        <input type="number" v-model="modelValue[q.id]" :required="q.required"
                            class="input bg-surface-sunken border-gray-200 w-full sm:w-1/2"
                            :placeholder="$t('survey_runner.placeholder_number')" />
                    </div>
                </div>

                <div
                    class="pt-6 border-t border-gray-200 flex flex-col-reverse sm:flex-row justify-between items-center gap-4">
                    <button type="button" @click="$emit('back')"
                        class="btn btn-outline text-muted border-gray-300 w-full sm:w-auto">
                        <ArrowLeft v-if="lang !== 'ar'" class="mr-2 icon-sm" />
                        <ArrowRight v-else class="ml-2 icon-sm" /> {{ $t('common.cancel') }}
                    </button>

                    <button type="submit"
                        class="btn primary px-8 py-3 text-lg shadow-md hover:shadow-lg transition-all w-full sm:w-auto">
                        {{ $t('survey_runner.submit_btn') }}
                        <Send class="icon-sm ml-2 rtl:mr-2 rtl:ml-0" />
                    </button>
                </div>
            </form>

        </div>
    </div>
</template>

<script setup>
import { ArrowRight, ArrowLeft, Send, CheckCircle2, XCircle } from '@lucide/vue'
defineProps(['survey', 'lang', 'modelValue'])
defineEmits(['submit', 'back', 'update:modelValue'])
</script>