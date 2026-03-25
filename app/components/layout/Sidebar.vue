<template>
    <aside :class="[
        'h-full transition-all duration-300 flex flex-col bg-surface border-r',
        isOpen ? 'w-64' : 'w-16'
    ]">
        <!-- Top -->
        <div class="flex items-center justify-between p-4">
            <span v-if="isOpen" class="text-lg font-bold">Admin</span>
            <button class="btn ghost" @click="toggle">☰</button>
        </div>

        <!-- Navigation -->
        <nav class="flex-1 px-2 space-y-2">
            <NavItem icon="🏠" label="Dashboard" />
            <NavItem icon="📊" label="Analytics" />
            <NavItem icon="👥" label="Users" />

            <!-- Submenu -->
            <div>
                <button class="nav-item w-full text-left" @click="toggleSurvey">
                    📋 <span v-if="isOpen">Surveys</span>
                </button>

                <div v-if="surveyOpen && isOpen" class="ml-6 mt-2 space-y-1">
                    <NavSubItem label="Create Survey" />
                    <NavSubItem label="All Surveys" />
                    <NavSubItem label="Survey Responses" />
                </div>
            </div>

            <NavItem icon="📅" label="Appointments" />
        </nav>

        <!-- Bottom -->
        <div class="p-4 border-t space-y-2">
            <select class="input w-full">
                <option>EN</option>
                <option>FR</option>
            </select>

            <button class="btn soft w-full">Settings</button>
            <button class="btn danger w-full">Logout</button>
        </div>
    </aside>
</template>

<script setup>
import { ref } from 'vue'
import { useSidebar } from '@/composables/useSidebar'
import NavItem from './NavItem.vue'
import NavSubItem from './NavSubItem.vue'

const { isOpen, toggle } = useSidebar()
const surveyOpen = ref(false)

const toggleSurvey = () => {
    surveyOpen.value = !surveyOpen.value
}
</script>