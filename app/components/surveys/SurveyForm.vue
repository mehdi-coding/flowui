<script setup>
import { ref } from 'vue'
import { Download, Save } from '@lucide/vue'
import { useI18n } from '#i18n'

const { t } = useI18n()

const props = defineProps({
    // The survey data object
    modelValue: {
        type: Object,
        required: true
    },
    title: {
        type: String,
        default: ''
    },
    subtitle: {
        type: String,
        default: ''
    },
    isEdit: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['update:modelValue', 'submit', 'import'])

// Internal state for the Tabs
const activeLang = ref('en')
const languageTabs = [
    { id: 'en', label: t('surveys.lang_en') },
    { id: 'fr', label: t('surveys.lang_fr') },
    { id: 'ar', label: t('surveys.lang_ar') }
]

// Handle form submission
const handleSubmit = () => {
    emit('submit', props.modelValue)
}
</script>

<template>
    <div>
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
                <h2 class="h3 mb-1">{{ title }}</h2>
                <p class="text-muted text-sm">{{ subtitle }}</p>
            </div>

            <button v-if="!isEdit" type="button" class="btn btn-outline" @click="emit('import')">
                <Download class="icon-sm" /> {{ $t('surveys.import_template') }}
            </button>
        </div>

        <form @submit.prevent="handleSubmit" class="grid grid-cols-1 lg:grid-cols-3 gap-6">

            <div class="lg:col-span-2 flex flex-col gap-6">
                <div class="card">
                    <div class="card-header border-b border-gray-200">
                        <h4 class="h5 m-0">{{ $t('surveys.basic_info') }}</h4>
                    </div>

                    <div class="card-body !pt-2">
                        <Tabs v-model="activeLang" :tabs="languageTabs">
                            <template #en>
                                <div class="flex flex-col gap-4 mt-2">
                                    <div>
                                        <label class="label">{{ $t('surveys.title_label') }} (EN) <span
                                                class="text-danger">*</span></label>
                                        <input type="text" class="input" v-model="modelValue.title.en" required
                                            :placeholder="$t('surveys.title_placeholder')" />
                                    </div>
                                    <div>
                                        <label class="label">{{ $t('surveys.desc_label') }} (EN)</label>
                                        <RichTextEditor v-model="modelValue.description.en" />
                                    </div>
                                </div>
                            </template>

                            <template #fr>
                                <div class="flex flex-col gap-4 mt-2">
                                    <div>
                                        <label class="label">{{ $t('surveys.title_label') }} (FR) <span
                                                class="text-danger">*</span></label>
                                        <input type="text" class="input" v-model="modelValue.title.fr" required
                                            :placeholder="$t('surveys.title_placeholder')" />
                                    </div>
                                    <div>
                                        <label class="label">{{ $t('surveys.desc_label') }} (FR)</label>
                                        <RichTextEditor v-model="modelValue.description.fr" />
                                    </div>
                                </div>
                            </template>

                            <template #ar>
                                <div class="flex flex-col gap-4 mt-2" dir="rtl">
                                    <div>
                                        <label class="label">{{ $t('surveys.title_label') }} (AR) <span
                                                class="text-danger">*</span></label>
                                        <input type="text" class="input" v-model="modelValue.title.ar" required
                                            :placeholder="$t('surveys.title_placeholder')" dir="rtl" />
                                    </div>
                                    <div>
                                        <label class="label">{{ $t('surveys.desc_label') }} (AR)</label>
                                        <RichTextEditor v-model="modelValue.description.ar" dir="rtl" />
                                    </div>
                                </div>
                            </template>
                        </Tabs>
                    </div>
                </div>
            </div>

            <div class="flex flex-col gap-6">
                <div class="card">
                    <div class="card-header border-b border-gray-200">
                        <h4 class="h5 m-0">{{ $t('surveys.settings_title') }}</h4>
                    </div>
                    <div class="card-body">
                        <div>
                            <label class="label">{{ $t('surveys.status') }}</label>
                            <select class="select" v-model="modelValue.status">
                                <option value="draft">{{ $t('surveys.status_draft') }}</option>
                                <option value="published">{{ $t('surveys.status_published') }}</option>
                                <option value="archived">{{ $t('surveys.status_archived') }}</option>
                            </select>
                        </div>

                        <hr class="border-gray-200 my-2" />

                        <label class="selection-group w-full justify-between">
                            <span class="text-sm font-500">{{ $t('surveys.allow_anonymous') }}</span>
                            <input type="checkbox" class="switch" v-model="modelValue.allowAnonymous" />
                        </label>

                        <label class="selection-group w-full justify-between mt-2">
                            <span class="text-sm font-500">{{ $t('surveys.save_as_template') }}</span>
                            <input type="checkbox" class="switch" v-model="modelValue.isTemplate" />
                        </label>
                    </div>
                    <div class="card-footer">
                        <button type="submit" class="btn primary w-full">
                            <Save class="icon-sm" /> {{ isEdit ? $t('common.save_changes') : $t('surveys.submit_btn') }}
                        </button>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>