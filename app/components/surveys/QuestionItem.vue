<template>
    <div class="card border-l-4  shadow-sm hover:shadow-md transition-shadow">
        <div class="card-body">
            <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
                <div class="flex items-center justify-between w-full lg:w-auto lg:justify-start lg:gap-3">
                    <div class="flex items-center gap-3">
                        <span
                            class="w-7 h-7 flex-shrink-0 flex items-center justify-center bg-primary text-on-primary rounded-full text-xs font-bold">
                            {{ index + 1 }}
                        </span>
                        <span
                            class="text-xs font-bold uppercase tracking-widest text-muted bg-gray-100 px-2 py-1 rounded">
                            {{ modelValue.type.replace('_', ' ') }}
                        </span>
                    </div>

                    <label class="flex items-center gap-2 cursor-pointer lg:ml-4">
                        <span class="text-xs font-bold text-muted uppercase">{{ $t('surveys.required') }}</span>
                        <input type="checkbox" class="switch btn-xs" v-model="modelValue.required" />
                    </label>
                </div>

                <div class="flex items-center justify-end gap-2 pt-3 border-t border-gray-100 lg:pt-0 lg:border-none">
                    <div class="h-8 w-px bg-gray-200 mx-2 hidden lg:block"></div>

                    <button type="button" @click="$emit('move-up')" :disabled="index === 0"
                        class="btn btn-icon btn-sm disabled:opacity-30">
                        <ChevronUp size="18" />
                    </button>
                    <button type="button" @click="$emit('move-down')" :disabled="index === total - 1"
                        class="btn btn-icon btn-sm disabled:opacity-30">
                        <ChevronDown size="18" />
                    </button>
                    <button type="button" @click="$emit('remove')" class="btn btn-icon btn-sm btn-outline danger">
                        <Trash2 size="18" />
                    </button>
                </div>
            </div>

            <div class="bg-surface-sunken p-4 rounded-lg">
                <Tabs v-model="activeLang" :tabs="langTabs">

                    <template #en>
                        <div class="mt-4 flex flex-col gap-6" dir="ltr">
                            <div>
                                <label class="label text-xs font-bold uppercase text-muted mb-1">{{
                                    $t('surveys.question_label') }} (EN)</label>
                                <input v-model="modelValue.title.en"
                                    class="input font-medium text-lg bg-surface border-gray-200"
                                    :placeholder="`${$t('surveys.question_placeholder')}...`" />
                            </div>

                            <div v-if="['single_choice', 'multiple_choice'].includes(modelValue.type)"
                                class="space-y-3">
                                <label class="label text-xs font-bold uppercase text-muted">{{
                                    $t('surveys.options_label') }} (EN)</label>

                                <div v-for="(opt, oIdx) in modelValue.options" :key="oIdx"
                                    class="flex items-center gap-3 group">
                                    <div
                                        class="w-5 h-5 flex-shrink-0 flex items-center justify-center rounded-full border-2 border-gray-300 text-[10px] font-bold text-muted">
                                        {{ oIdx + 1 }}</div>
                                    <input v-model="opt.en" class="input btn-sm bg-surface"
                                        :placeholder="`${$t('surveys.option')} ${oIdx + 1}`" />
                                    <button type="button" @click="removeOption(oIdx)"
                                        class="text-muted hover:text-danger p-1 transition-colors"
                                        title="Remove option">
                                        <X size="16" />
                                    </button>
                                </div>

                                <button type="button" @click="addOption"
                                    class="btn btn-xs btn-outline bg-surface text-primary mt-2">
                                    <Plus size="14" /> {{ $t('surveys.add_option') }}
                                </button>
                            </div>

                            <div v-if="modelValue.type === 'rating' && modelValue.settings"
                                class="flex items-center gap-6 p-4 bg-primary/5 rounded-lg w-fit">
                                <div class="flex items-center gap-2">
                                    <label class="text-xs font-bold text-primary uppercase">Min</label>
                                    <input type="number" v-model="modelValue.settings.min"
                                        class="input btn-sm w-16 bg-surface" />
                                </div>
                                <div class="flex items-center gap-2">
                                    <label class="text-xs font-bold text-primary uppercase">Max</label>
                                    <input type="number" v-model="modelValue.settings.max"
                                        class="input btn-sm w-16 bg-surface" />
                                </div>
                            </div>
                        </div>
                    </template>

                    <template #fr>
                        <div class="mt-4 flex flex-col gap-6" dir="ltr">
                            <div>
                                <label class="label text-xs font-bold uppercase text-muted mb-1">{{
                                    $t('surveys.question_label') }} (FR)</label>
                                <input v-model="modelValue.title.fr"
                                    class="input font-medium text-lg bg-surface border-gray-200"
                                    :placeholder="`${$t('surveys.question_placeholder')}...`" />
                            </div>

                            <div v-if="['single_choice', 'multiple_choice'].includes(modelValue.type)"
                                class="space-y-3">
                                <label class="label text-xs font-bold uppercase text-muted">{{
                                    $t('surveys.options_label') }} (FR)</label>

                                <div v-for="(opt, oIdx) in modelValue.options" :key="oIdx"
                                    class="flex items-center gap-3 group">
                                    <div
                                        class="w-5 h-5 flex-shrink-0 flex items-center justify-center rounded-full border-2 border-gray-300 text-[10px] font-bold text-muted">
                                        {{ oIdx + 1 }}</div>
                                    <input v-model="opt.fr" class="input btn-sm bg-surface"
                                        :placeholder="`${$t('surveys.option')} ${oIdx + 1}`" />
                                    <button type="button" @click="removeOption(oIdx)"
                                        class="text-muted hover:text-danger p-1 transition-colors"
                                        title="Remove option">
                                        <X size="16" />
                                    </button>
                                </div>

                                <button type="button" @click="addOption"
                                    class="btn btn-xs btn-outline bg-surface text-primary mt-2">
                                    <Plus size="14" /> {{ $t('surveys.add_option') }}
                                </button>
                            </div>

                            <div v-if="modelValue.type === 'rating' && modelValue.settings"
                                class="flex items-center gap-6 p-4 bg-primary/5 rounded-lg w-fit">
                                <div class="flex items-center gap-2">
                                    <label class="text-xs font-bold text-primary uppercase">Min</label>
                                    <input type="number" v-model="modelValue.settings.min"
                                        class="input btn-sm w-16 bg-surface" />
                                </div>
                                <div class="flex items-center gap-2">
                                    <label class="text-xs font-bold text-primary uppercase">Max</label>
                                    <input type="number" v-model="modelValue.settings.max"
                                        class="input btn-sm w-16 bg-surface" />
                                </div>
                            </div>
                        </div>
                    </template>

                    <template #ar>
                        <div class="mt-4 flex flex-col gap-6" dir="rtl">
                            <div>
                                <label class="label text-xs font-bold uppercase text-muted mb-1">{{
                                    $t('surveys.question_label') }} (AR)</label>
                                <input v-model="modelValue.title.ar"
                                    class="input font-medium text-lg bg-surface border-gray-200"
                                    :placeholder="`${$t('surveys.question_placeholder')}...`" />
                            </div>

                            <div v-if="['single_choice', 'multiple_choice'].includes(modelValue.type)"
                                class="space-y-3">
                                <label class="label text-xs font-bold uppercase text-muted">{{
                                    $t('surveys.options_label') }} (AR)</label>

                                <div v-for="(opt, oIdx) in modelValue.options" :key="oIdx"
                                    class="flex items-center gap-3 group">
                                    <div
                                        class="w-5 h-5 flex-shrink-0 flex items-center justify-center rounded-full border-2 border-gray-300 text-[10px] font-bold text-muted">
                                        {{ oIdx + 1 }}</div>
                                    <input v-model="opt.ar" class="input btn-sm bg-surface"
                                        :placeholder="`${$t('surveys.option')} ${oIdx + 1}`" />
                                    <button type="button" @click="removeOption(oIdx)"
                                        class="text-muted hover:text-danger p-1 transition-colors"
                                        title="Remove option">
                                        <X size="16" />
                                    </button>
                                </div>

                                <button type="button" @click="addOption"
                                    class="btn btn-xs btn-outline bg-surface text-primary mt-2">
                                    <Plus size="14" /> {{ $t('surveys.add_option') }}
                                </button>
                            </div>

                            <div v-if="modelValue.type === 'rating' && modelValue.settings"
                                class="flex items-center gap-6 p-4 bg-primary/5 rounded-lg w-fit">
                                <div class="flex items-center gap-2">
                                    <label class="text-xs font-bold text-primary uppercase">Min</label>
                                    <input type="number" v-model="modelValue.settings.min"
                                        class="input btn-sm w-16 bg-surface" />
                                </div>
                                <div class="flex items-center gap-2">
                                    <label class="text-xs font-bold text-primary uppercase">Max</label>
                                    <input type="number" v-model="modelValue.settings.max"
                                        class="input btn-sm w-16 bg-surface" />
                                </div>
                            </div>
                        </div>
                    </template>

                </Tabs>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { Trash2, ChevronUp, ChevronDown, Plus, X } from '@lucide/vue'

const props = defineProps(['modelValue', 'index', 'total'])
const emit = defineEmits(['update:modelValue', 'remove', 'move-up', 'move-down'])

const activeLang = ref('en')
const langTabs = [
    { id: 'en', label: 'English' },
    { id: 'fr', label: 'Français' },
    { id: 'ar', label: 'العربية' }
]

const addOption = () => {
    props.modelValue.options.push({ en: '', fr: '', ar: '' })
}

const removeOption = (idx) => {
    if (props.modelValue.options.length > 1) {
        props.modelValue.options.splice(idx, 1)
    }
}
</script>