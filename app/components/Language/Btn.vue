<template>
    <LanguageModal ref="langModal" />
    <button class="btn btn-sm btn-outline" @click="$refs.langModal.show()">
        <Globe class="icon-sm" /> {{ localeProperties.name }}
    </button>
</template>

<script setup>
import { Globe } from '@lucide/vue'
import { useI18n } from '#i18n'
const { localeProperties } = useI18n()
</script>