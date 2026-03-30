<script setup lang="ts">
// pages/static.vue
// This page is STATICALLY GENERATED at build time.
// Nuxt pre-renders this route to a plain .html file during `nuxt generate`.
// The server simply serves a static file — zero runtime computation.
//
// To pre-render this single page without going full static mode, add this
// route to nitro.prerender.routes in nuxt.config.ts:
//
//   nitro: {
//     prerender: {
//       routes: ['/static']
//     }
//   }
//
// Or use routeRules for granular control:
//   routeRules: {
//     '/static': { prerender: true }
//   }

definePageMeta({
    title: 'Static Dashboard Overview' // This is the text the layout will pick up
})
// Data is fetched ONCE at build time — baked into the static HTML.
// The browser receives the pre-computed value directly; no API calls made at runtime.
const buildTime = new Date().toISOString()
const stats = {
    users: 12_847,
    revenue: 98_430,
    orders: 3_291,
    growth: 14.7,
    renderTime: buildTime,
    renderMode: 'Static (Pre-rendered at Build Time)',
}

const activeTab = ref('overview')
const modalOpen = ref(false)
const notifications = ref(true)
const darkMode = ref(false)
const selectedRole = ref('admin')

const tabs = ['overview', 'analytics', 'users', 'settings']

const activities = [
    { id: 1, user: 'Sara M.', action: 'Created a new project', time: '2 min ago', avatar: 'SM', color: 'primary' },
    { id: 2, user: 'Karim B.', action: 'Submitted a report', time: '15 min ago', avatar: 'KB', color: 'secondary' },
    { id: 3, user: 'Leila H.', action: 'Updated settings', time: '1 hr ago', avatar: 'LH', color: 'accent' },
    { id: 4, user: 'Omar T.', action: 'Closed ticket #4821', time: '3 hr ago', avatar: 'OT', color: 'warning' },
]
</script>

<template>
    <div class="min-h-screen bg-[--color-surface-sunken]">

        <!-- Render Mode Banner -->
        <div class="text-center py-2 text-sm font-semibold tracking-wide" style="background: var(--color-gradient)">
            ⚡ STATIC — Pre-rendered at <strong>build time</strong> · Baked HTML served instantly · Build: {{
                stats.renderTime }}
        </div>

        <main class="max-w-7xl mx-auto px-6 py-8 space-y-8">

            <!-- Page Title -->
            <div>
                <h1 class="h1">Dashboard Overview</h1>
                <p class="lead">
                    This entire page was generated at <strong>build time</strong> and stored as a static HTML file.
                    The server does zero work at request time — it just sends the file.
                </p>
            </div>

            <!-- Stats Grid — values baked in at build time, no loading states -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <div class="card primary">
                    <div class="card-header">
                        <span class="text-xs font-semibold uppercase tracking-widest text-white opacity-80">Total
                            Users</span>
                    </div>
                    <div class="card-body">
                        <p class="text-3xl font-black text-[--color-primary]">{{ stats.users.toLocaleString() }}</p>
                        <span class="text-xs text-[--color-text-muted]">↑ 8.3% this month</span>
                    </div>
                </div>

                <div class="card secondary">
                    <div class="card-header">
                        <span
                            class="text-xs font-semibold uppercase tracking-widest text-white opacity-80">Revenue</span>
                    </div>
                    <div class="card-body">
                        <p class="text-3xl font-black text-[--color-secondary]">${{ stats.revenue.toLocaleString() }}
                        </p>
                        <span class="text-xs text-[--color-text-muted]">↑ {{ stats.growth }}% vs last month</span>
                    </div>
                </div>

                <div class="card accent">
                    <div class="card-header">
                        <span
                            class="text-xs font-semibold uppercase tracking-widest text-white opacity-80">Orders</span>
                    </div>
                    <div class="card-body">
                        <p class="text-3xl font-black text-[--color-accent]">{{ stats.orders.toLocaleString() }}</p>
                        <span class="text-xs text-[--color-text-muted]">↓ 2.1% this week</span>
                    </div>
                </div>

                <div class="card warning">
                    <div class="card-header">
                        <span class="text-xs font-semibold uppercase tracking-widest opacity-80"
                            style="color: #000">Alerts</span>
                    </div>
                    <div class="card-body">
                        <p class="text-3xl font-black text-[--color-warning]">7</p>
                        <span class="text-xs text-[--color-text-muted]">3 critical, 4 warnings</span>
                    </div>
                </div>
            </div>

            <!-- Tabs Section -->
            <div class="card">
                <div class="card-body" style="gap: 0; padding-bottom: 0;">
                    <div class="tabs-container">
                        <div class="tabs-nav-wrapper">
                            <div class="tabs-list">
                                <button v-for="tab in tabs" :key="tab" class="tab-btn"
                                    :class="{ 'tab-btn-active': activeTab === tab }" @click="activeTab = tab">
                                    {{ tab.charAt(0).toUpperCase() + tab.slice(1) }}
                                </button>
                            </div>
                        </div>
                        <div class="p-6">
                            <div v-if="activeTab === 'overview'">
                                <h3 class="h4">Overview Panel</h3>
                                <p class="p text-[--color-text-muted]">
                                    This page uses <code>defineRouteRules({ prerender: true })</code>. During
                                    <code>nuxt generate</code>,
                                    Nuxt visits this route, runs the setup script, captures the output as HTML, and
                                    saves it to disk.
                                    Every visitor gets the same pre-built file instantly — no server execution per
                                    request.
                                </p>
                                <div class="flex flex-wrap gap-3 mt-2">
                                    <span class="btn btn-xs secondary btn-outline">Vue 3</span>
                                    <span class="btn btn-xs btn-outline">Nuxt 4</span>
                                    <span class="btn btn-xs btn-outline"
                                        style="--ui-color: var(--color-verdigris)">Static Mode</span>
                                    <span class="btn btn-xs warning btn-outline">Tailwind v4</span>
                                </div>
                            </div>
                            <div v-if="activeTab === 'analytics'">
                                <h3 class="h4">Analytics</h3>
                                <p class="p text-[--color-text-muted]">
                                    Static analytics snapshot — frozen at build time.
                                    For live data, combine with client-side fetching after hydration.
                                </p>
                            </div>
                            <div v-if="activeTab === 'users'">
                                <h3 class="h4">User Management</h3>
                                <p class="p text-[--color-text-muted]">
                                    User list baked into the HTML at build time. Best suited for data that doesn't
                                    change often.
                                    Re-run <code>nuxt generate</code> to update.
                                </p>
                            </div>
                            <div v-if="activeTab === 'settings'">
                                <h3 class="h4">Settings</h3>
                                <p class="p text-[--color-text-muted]">
                                    Config values embedded at build time. Environment variables used here are build-time
                                    variables,
                                    not runtime secrets.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Two column layout -->
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

                <!-- Activity Feed -->
                <div class="card lg:col-span-2">
                    <div class="card-header">
                        <h2 class="h5 mb-0">Recent Activity</h2>
                    </div>
                    <div class="card-body" style="gap: 0.75rem">
                        <div v-for="item in activities" :key="item.id"
                            class="flex items-center gap-4 p-3 rounded-xl bg-[--color-surface-sunken]">
                            <div class="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                                :style="`background-color: var(--color-${item.color === 'primary' ? 'primary' : item.color === 'secondary' ? 'secondary' : item.color === 'accent' ? 'accent' : 'warning'})`">
                                {{ item.avatar }}
                            </div>
                            <div class="flex-1 min-w-0">
                                <p class="text-sm font-semibold text-[--color-text-main] truncate">{{ item.user }}</p>
                                <p class="text-xs text-[--color-text-muted]">{{ item.action }}</p>
                            </div>
                            <span class="text-xs text-[--color-text-muted] shrink-0">{{ item.time }}</span>
                        </div>
                    </div>
                </div>

                <!-- Settings Card -->
                <div class="card">
                    <div class="card-header">
                        <h2 class="h5 mb-0">Quick Settings</h2>
                    </div>
                    <div class="card-body">
                        <div class="space-y-5">
                            <div>
                                <label class="label">User Role</label>
                                <select v-model="selectedRole" class="select">
                                    <option value="admin">Administrator</option>
                                    <option value="editor">Editor</option>
                                    <option value="viewer">Viewer</option>
                                </select>
                            </div>
                            <div>
                                <label class="label">Search Users</label>
                                <input type="text" class="input" placeholder="Search by name or email…" />
                            </div>
                            <label class="selection-group">
                                <input type="checkbox" v-model="notifications" class="checkbox primary" />
                                <span class="text-sm text-[--color-text-main]">Email notifications</span>
                            </label>
                            <label class="selection-group">
                                <input type="checkbox" v-model="darkMode" class="checkbox secondary" />
                                <span class="text-sm text-[--color-text-main]">Dark mode</span>
                            </label>
                            <div>
                                <label class="label">Priority</label>
                                <div class="flex flex-col gap-2">
                                    <label class="selection-group">
                                        <input type="radio" name="priority-static" value="high" class="radio danger" />
                                        <span class="text-sm">High</span>
                                    </label>
                                    <label class="selection-group">
                                        <input type="radio" name="priority-static" value="medium" class="radio warning"
                                            checked />
                                        <span class="text-sm">Medium</span>
                                    </label>
                                    <label class="selection-group">
                                        <input type="radio" name="priority-static" value="low"
                                            class="radio secondary" />
                                        <span class="text-sm">Low</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer">
                        <button class="btn w-full secondary">Save Settings</button>
                    </div>
                </div>
            </div>

            <!-- Form Section -->
            <div class="card">
                <div class="card-header">
                    <h2 class="h5 mb-0">Submit a Report</h2>
                </div>
                <div class="card-body">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label class="label">First Name</label>
                            <input type="text" class="input" placeholder="John" />
                        </div>
                        <div>
                            <label class="label">Last Name</label>
                            <input type="text" class="input" placeholder="Doe" />
                        </div>
                        <div class="md:col-span-2">
                            <label class="label">Email</label>
                            <input type="email" class="input" placeholder="john@example.com" />
                        </div>
                        <div>
                            <label class="label">Category</label>
                            <select class="select">
                                <option>Bug Report</option>
                                <option>Feature Request</option>
                                <option>Performance</option>
                                <option>Security</option>
                            </select>
                        </div>
                        <div>
                            <label class="label">Priority</label>
                            <select class="select danger">
                                <option>Critical</option>
                                <option>High</option>
                                <option>Medium</option>
                                <option>Low</option>
                            </select>
                        </div>
                        <div class="md:col-span-2">
                            <label class="label">Description</label>
                            <textarea class="textarea" placeholder="Describe the issue in detail…"></textarea>
                        </div>
                    </div>
                </div>
                <div class="card-footer flex gap-3 justify-end">
                    <button class="btn btn-outline">Cancel</button>
                    <button class="btn">Submit Report</button>
                </div>
            </div>

            <!-- Alert Badges -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="card danger">
                    <div class="card-header"><span class="text-white text-sm font-bold">🔴 Critical Alert</span></div>
                    <div class="card-body">
                        <p class="text-sm text-[--color-text-muted]">Database connection pool exhausted. Immediate
                            action required.</p>
                        <button class="btn btn-sm danger mt-2">Resolve Now</button>
                    </div>
                </div>
                <div class="card warning">
                    <div class="card-header"><span class="text-sm font-bold" style="color:#000">⚠️ Warning</span></div>
                    <div class="card-body">
                        <p class="text-sm text-[--color-text-muted]">Memory usage at 82%. Consider scaling up the
                            instance.</p>
                        <button class="btn btn-sm warning mt-2">View Details</button>
                    </div>
                </div>
                <div class="card success">
                    <div class="card-header"><span class="text-white text-sm font-bold">✅ All Systems Go</span></div>
                    <div class="card-body">
                        <p class="text-sm text-[--color-text-muted]">API endpoints responding normally. Uptime: 99.98%.
                        </p>
                        <button class="btn btn-sm secondary mt-2">Status Page</button>
                    </div>
                </div>
            </div>

            <!-- Build info box -->
            <div class="card" style="border-color: var(--color-verdigris);">
                <div class="card-body">
                    <h3 class="h5">📦 Static Generation Notes</h3>
                    <p class="p text-sm text-[--color-text-muted]">
                        This page was generated with <code>prerender: true</code> via <code>defineRouteRules()</code>.
                        Alternatively, configure it globally in <code>nuxt.config.ts</code>:
                    </p>
                    <pre
                        class="bg-[--color-surface-muted] rounded-xl p-4 text-xs overflow-x-auto text-[--color-text-main]">// nuxt.config.ts
export default defineNuxtConfig({
  routeRules: {
    '/static': { prerender: true }
  }
  // OR for full static site:
  // nitro: { prerender: { crawlLinks: true } }
})</pre>
                    <p class="p text-sm text-[--color-text-muted] mb-0">
                        Data values on this page are frozen to build time: <strong>{{ stats.renderTime }}</strong>.
                        They won't change between requests unless you rebuild and redeploy.
                    </p>
                </div>
            </div>

        </main>

        <!-- Modal -->
        <dialog class="modal" :open="modalOpen">
            <div class="modal-header">
                <h2 class="h4 mb-0">Create New Report</h2>
                <button class="btn btn-sm btn-outline" @click="modalOpen = false">✕</button>
            </div>
            <div class="modal-body space-y-4">
                <div>
                    <label class="label">Report Title</label>
                    <input type="text" class="input" placeholder="Q2 Performance Summary" />
                </div>
                <div>
                    <label class="label">Type</label>
                    <select class="select">
                        <option>Financial</option>
                        <option>Operational</option>
                        <option>Marketing</option>
                    </select>
                </div>
                <div>
                    <label class="label">Notes</label>
                    <textarea class="textarea" placeholder="Optional notes…" style="min-height: 80px"></textarea>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-outline" @click="modalOpen = false">Cancel</button>
                <button class="btn" @click="modalOpen = false">Create</button>
            </div>
        </dialog>

    </div>
</template>