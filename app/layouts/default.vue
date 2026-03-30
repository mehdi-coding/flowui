<!-- app/layouts/default.vue -->
<template>
    <div class="app-wrapper">

        <div v-if="isMobileOpen" class="mobile-backdrop" @click="toggleMobileSidebar" aria-hidden="true">
        </div>

        <aside class="sidebar" :class="{ 'collapsed': isCollapsed, 'mobile-open': isMobileOpen }">
            <div class="sidebar-header">
                <div class="logo-area">
                    <img :src="isCollapsed ? '/logo_Reduced.png' : '/logo.png'" :class="isCollapsed ? 'h-8' : 'h-10'" />
                </div>

                <button class="hidden-mobile cursor-pointer" @click="toggleSidebar">
                    <Menu v-if="!isCollapsed" />
                    <ChevronRight v-if="isCollapsed && selectedLang != 'ar'" size="20"
                        class="fixed top-4 ms-3 toggle-icon-collapsed border text-gray-400 rounded-sm bg-surface"
                        :strokeWidth="3" />
                    <ChevronLeft v-if="isCollapsed && selectedLang == 'ar'" size="20"
                        class="fixed top-4 ms-3 toggle-icon-collapsed border text-gray-400 rounded-sm bg-surface"
                        :strokeWidth="3" />

                </button>
            </div>
            <nav class="sidebar-nav">
                <div class="nav-group" v-for="item in navItems" :key="item.to">
                    <button class="nav-item w-full" @click="toggleNavComponent(item)" v-if="item.children"
                        :class="{ 'parent-active': isChildActive(item) }">
                        <component :is="item.icon" class="icon" />
                        <span class="nav-label" v-show="!isCollapsed">{{ $t(item.label) }}</span>

                        <ChevronDown v-show="!isCollapsed" class="icon-sm ms-auto transition-transform"
                            :class="{ 'rotate-180': item.isComponentsOpen }" v-if="item.children" />
                    </button>
                    <NuxtLink :to="item.to" class="nav-item a" @click="isMobileOpen = false" v-else>
                        <component :is="item.icon" class="icon" />
                        <span class="nav-label" v-show="!isCollapsed">{{ $t(item.label) }}</span>
                    </NuxtLink>

                    <div class="sub-nav" v-if="item.isComponentsOpen && !isCollapsed && item.children">
                        <NuxtLink :to="child.to" class="sub-nav-item" v-for="child in item.children" :key="child.to"
                            @click="isMobileOpen = false">{{
                                $t(child.label) }}
                        </NuxtLink>
                    </div>
                </div>
            </nav>

            <div class="sidebar-footer">
                <div v-show="isUserMenuOpen" class="user-dropdown card">
                    <button class="footer-item w-full" @click="openLanguageModal">
                        <Globe class="icon-sm" />
                        <span class="nav-label">{{ $t('language') }}</span>
                    </button>
                    <button class="footer-item w-full">
                        <Settings class="icon-sm" />
                        <span class="nav-label">{{ $t('settings') }}</span>
                    </button>
                    <hr class="dropdown-divider">
                    <button class="footer-item w-full text-danger">
                        <LogOut class="icon-sm" />
                        <span class="nav-label">{{ $t('logout') }}</span>
                    </button>
                </div>

                <button class="nav-item user-trigger w-full" @click="isUserMenuOpen = !isUserMenuOpen">
                    <div class="avatar">
                        <User class="icon-sm" />
                    </div>
                    <div class="user-info" v-show="!isCollapsed">
                        <span class="font-600 text-sm">Admin User</span>
                        <span class="text-xs text-muted">admin@company.com</span>
                    </div>
                    <ChevronUp class="icon-sm ms-auto" v-show="!isCollapsed" />
                </button>
            </div>
        </aside>

        <main class="main-content">
            <header class="content-header">
                <slot name="header">
                    <div class="flex items-center">
                        <img src="/logo_Reduced.png" class="mobile-menu-btn h-8 me-2" />
                        <!-- Display custom title from page meta, or fallback to default -->
                        <h3 class=" font-bold text-lg">{{ route.meta.title || 'Default Header' }}</h3>
                    </div>
                </slot>

                <button class="mobile-menu-btn" @click="toggleMobileSidebar">
                    <Menu class=" cursor-pointer" />
                </button>
            </header>

            <div class="content-scroll">
                <slot />
            </div>
        </main>

        <LanguageModal ref="languageModalRef" />

    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import {
    Menu, LayoutDashboard, Users, ClipboardList,
    Settings, LogOut, Globe, User, ChevronUp, ChevronDown, ChevronRight, ChevronLeft, Layers, BookOpen, FingerprintPattern
} from '@lucide/vue';
const { locale } = useI18n()

/* ---------------- NAVIGATION ---------------- */
const navItems = ref([
    {
        label: 'dashboard',
        icon: LayoutDashboard,
        to: '/',
        isComponentsOpen: false
    },
    {
        label: 'users',
        icon: Users,
        to: '/users',
        isComponentsOpen: false
    },
    {
        label: 'surveys',
        icon: ClipboardList,
        to: '/surveys',
        isComponentsOpen: false
    },
    {
        label: 'components',
        icon: Layers,
        children: [
            { label: 'tabs', to: '/components/tabs' },
            { label: 'modals', to: '/components/modals' }
        ],
        isComponentsOpen: false
    },
    {
        label: 'examples',
        icon: BookOpen,
        children: [
            { label: 'Api', to: '/examples/api' },
            { label: 'ssr', to: '/examples/ssr' },
            { label: 'csr', to: '/examples/csr' },
            { label: 'static', to: '/examples/static' },
            { label: 'direction', to: '/examples/direction' },
        ],
        isComponentsOpen: false
    },
    {
        label: 'Auth',
        icon: FingerprintPattern,
        children: [
            { label: 'Login', to: '/login' },
            { label: 'Register', to: '/register' },
            { label: 'unauthorized', to: '/unauthorized' },
            { label: '404', to: '/something' },
            { label: 'forgot_password', to: '/auth/forgot_password' },
            { label: 'reset_password', to: '/auth/reset_password' },
            { label: 'verify_email_success', to: 'auth/verify_email_success' },
            { label: 'verify_email_error', to: 'auth/verify_email_error' },
        ],
        isComponentsOpen: false
    }
])

// Component ref
const languageModalRef = ref(null)

const route = useRoute()
// Helper function to check if any child of a nav item is currently active
const isChildActive = (item) => {
    if (!item.children) return false;
    return item.children.some(child => route.path === child.to);
}

const selectedLang = computed(() => locale.value);

const isCollapsed = ref(false);
const isMobileOpen = ref(false);
const isUserMenuOpen = ref(false);

const toggleSidebar = () => isCollapsed.value = !isCollapsed.value;
const toggleMobileSidebar = () => {
    isCollapsed.value = false
    isMobileOpen.value = !isMobileOpen.value;
    isUserMenuOpen.value = false;
}

const openLanguageModal = () => {
    isUserMenuOpen.value = false;   // Close dropdown
    isMobileOpen.value = false;     // Close sidebar
    // Trigger the 'show' method exposed by the child component
    languageModalRef.value?.show();
};

const toggleNavComponent = (item) => {
    if (isCollapsed.value) {
        isCollapsed.value = false
        item.isComponentsOpen = true
    }
    else item.isComponentsOpen = !item.isComponentsOpen
}

</script>

<style scoped>
/* --- Layout Foundation --- */
.app-wrapper {
    display: flex;
    height: 100vh;
    width: 100%;
    overflow: hidden;
    background-color: var(--color-surface-sunken);
    color: var(--color-text-main);
}

/* --- Sidebar Base (Desktop First) --- */
.sidebar {
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 16rem;
    /* 256px */
    background-color: var(--color-surface);
    border-inline-end: 1px solid var(--color-gray-200);
    /* RTL Aware Border */
    transition: width 0.3s ease, transform 0.3s ease;
    z-index: 40;
    position: relative;
}

/* Reduced Mode */
.sidebar.collapsed {
    width: 5rem;
    /* 80px */
}

/* Hide text gracefully when collapsing */
.nav-label,
.user-info {
    white-space: nowrap;
    opacity: 1;
    transition: opacity 0.2s;
}

/* --- Sidebar Internal Layout --- */
.sidebar-header {
    flex-shrink: 0;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-inline: 1.25rem;
    border-bottom: 1px solid var(--color-gray-200);
}

.sidebar-nav {
    flex-grow: 1;
    padding: 1rem 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    overflow-y: auto;
    overflow-x: hidden;
}

/* --- Navigation Items --- */
.footer-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.75rem 1rem;
    border-radius: var(--radius-ui);
    color: var(--color-text-muted);
    text-decoration: none;
    background: transparent;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease;
    text-align: start;
}

.nav-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.75rem 1rem;
    border-radius: var(--radius-ui);
    color: var(--color-text-muted);
    text-decoration: none;
    background: transparent;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease;
    text-align: start;
    justify-content: flex-start;
    /* RTL Aware */
}

.sub-item {
    font-size: 0.9rem;
    padding: 0.5rem 0.75rem;
}


/* Specific overrides for Collapsed State */
.collapsed .nav-item {
    justify-content: center;
    /* Centers the icon perfectly */
    padding-inline: 0;
    /* Removes the side padding */
    gap: 0;
    /* Removes the space meant for the text */
}

/* Ensure the icon itself doesn't have stray margins */
.collapsed .nav-item .icon {
    margin: 0;
}

.router-link-active {
    background-color: var(--color-primary);
    color: var(--color-on-primary)
}

/* --- Sidebar Footer & User Menu --- */
.sidebar-footer {
    padding: 0.5rem;
    border-top: 1px solid var(--color-gray-200);
    position: relative;
}

.user-trigger {
    gap: 0.75rem;
}

.avatar {
    min-width: 2rem;
    height: 2rem;
    border-radius: 50%;
    background-color: var(--color-gray-200);
    display: grid;
    place-content: center;
}

.user-info {
    display: flex;
    flex-direction: column;
    line-height: 1.2;
}

/* User Dropdown Popover */
.user-dropdown {
    position: absolute;
    bottom: calc(100% + 0.5rem);
    inset-inline-start: 0.5rem;
    /* RTL Aware positioning */
    inset-inline-end: 0.5rem;
    padding: 0.5rem;
    box-shadow: 0 10px 25px -5px rgb(0 0 0 / 0.15);
}

.collapsed .user-dropdown {
    inset-inline-start: 0.5rem;
    width: 14rem;
    /* Fixed width when popping out of collapsed sidebar */
}

.dropdown-divider {
    border: none;
    border-top: 1px solid var(--color-gray-100);
    margin-block: 0.25rem;
}

/* --- Main Content --- */
.main-content {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    min-width: 0;
    /* Prevents flexbox overflow bugs */
}

.content-scroll {
    flex-grow: 1;
    padding: 2rem;
    overflow-y: auto;
}

.content-header {
    flex-shrink: 0;
    height: 3rem;
    padding-inline: 1.25rem;
    border-bottom: 1px solid var(--color-gray-200);
    display: flex;
    align-items: center;
    justify-content: space-between;
}

/* --- Utilities --- */
.mobile-menu-btn {
    display: none;
}

.ms-auto {
    margin-inline-start: auto;
}

/* --- The Wrapper for Parent + Children --- */
.nav-group {
    display: flex;
    flex-direction: column;
    /* Stacks the button and the sub-menu */
    width: 100%;
}

/* --- The Sub-Nav Container --- */
.sub-nav {
    display: flex;
    flex-direction: column;
    width: calc(100% - 2.25rem);
    margin-inline-start: 2.25rem;

    /* Indentation: Indent only when the sidebar is NOT collapsed */
    margin-inline-start: 2.25rem;
    padding-inline-start: 0.75rem;
    border-inline-start: 1px solid var(--color-gray-200);

    /* Spacing between sub-items */
    gap: 0.25rem;
    padding-block: 0.5rem;

    /* Ensure internal items don't cause overflow */
    box-sizing: border-box;
}

/* --- Individual Sub-Links --- */
.sub-nav-item {
    display: flex;
    /* Ensures it fills the width */
    width: 100%;
    align-items: center;
    padding: 0.5rem 0.75rem;
    border-radius: var(--radius-ui);

    font-size: 0.875rem;
    /* Slightly smaller than main nav */
    color: var(--color-text-muted);
    text-decoration: none;
    /* FIX: Allow text to shrink or truncate if space is tight */
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    /* Prevents text from wrapping to a second line */
}

/* --- THE DESKTOP COLLAPSE FIX --- */
/* If the sidebar is collapsed (isCollapsed = true), hide the sub-menu 
           to prevent UI breakage in the small 80px sidebar. */
.sidebar.collapsed .sub-nav {
    display: none !important;
}

/* Active State for Sub-Link */
.sub-nav-item.router-link-active {
    color: var(--color-on-primary);
    background-color: var(--color-primary);
    font-weight: 600;
}

/* --- Parent Active Style --- */
/* This styles the parent button when a child is selected */
.parent-active {
    color: var(--color-primary) !important;
    background-color: color-mix(in srgb, var(--color-primary) 10%, transparent) !important;
}

/* Optional: Make the icon color change too */
.parent-active .icon {
    color: var(--color-primary);
}

/* --- Mobile Breakpoint --- */
@media (max-width: 768px) {
    .hidden-mobile {
        display: none;
    }

    .sidebar {
        position: fixed;
        inset-inline-start: 0;
        /* Left in LTR, Right in RTL */
        /* Transform to hide. We use 100% for LTR, but in RTL it flips natively in most browsers, 
       otherwise we use [dir="rtl"] targeted transforms */
        transform: translateX(-100%);
        width: 18rem;
    }

    [dir="rtl"] .sidebar {
        transform: translateX(100%);
    }

    .sidebar.mobile-open {
        transform: translateX(0) !important;
    }

    .mobile-backdrop {
        position: fixed;
        inset: 0;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 30;
        backdrop-filter: blur(2px);
    }

    .mobile-menu-btn {
        display: block;
    }
}

/* --- Desktop ONLY Hover States --- */
/* This prevents the "sticky hover" bug on mobile touch screens */
@media (hover: hover) {
    .nav-item:hover:not(.router-link-active) {
        background-color: color-mix(in srgb, var(--color-primary) 10%, transparent);
        color: var(--color-primary);
    }

    /* Add this here too so sub-items don't get stuck on mobile either */
    .sub-nav-item:hover:not(.router-link-active) {
        color: var(--color-primary);
        background-color: color-mix(in srgb, var(--color-primary) 5%, transparent);
    }
}
</style>