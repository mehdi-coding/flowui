<template>
    <dialog ref="modalRef" class="modal modal_down">
        <div class="modal-header">
            <h4 class="margin-0">Select Language</h4>
            <button @click="close">
                <X class="cursor-pointer" />
            </button>
        </div>
        <div class="modal-body">
            <div class="flex flex-col">
                <label class="selection-group flex-row py-1 cursor-pointer">
                    <input type="radio" v-model="selectedLang" value="ar" class="radio">
                    <span>🇩🇿 العربية</span>
                </label>

                <label class="selection-group flex-row py-1 cursor-pointer">
                    <input type="radio" v-model="selectedLang" value="en" class="radio">
                    <span>🇬🇧 English</span>
                </label>

                <label class="selection-group flex-row py-1 cursor-pointer">
                    <input type="radio" v-model="selectedLang" value="fr" class="radio">
                    <span>🇫🇷 Français</span>
                </label>
            </div>
        </div>
        <div class="modal-footer">
            <button class="btn btn-sm primary" @click="applyLanguageChange">Apply Changes</button>
        </div>
    </dialog>
</template>

<script setup>
import { ref } from 'vue'
import { X } from '@lucide/vue'

const { locale, setLocale } = useI18n()
const modalRef = ref(null)

// Local state for the radio buttons
const selectedLang = ref(locale.value)

// Opens the modal (called from the parent)
const show = () => {
    // Reset the radio button to the currently active language every time it opens
    selectedLang.value = locale.value
    modalRef.value?.showModal()
}

// Closes the modal
const close = () => {
    modalRef.value?.close()
}

// Applies the language and closes
const applyLanguageChange = async () => {
    await setLocale(selectedLang.value)
    close()
}

// Expose the 'show' and 'close' methods to parent components
defineExpose({
    show,
    close
})
</script>