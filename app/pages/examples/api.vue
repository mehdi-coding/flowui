<script setup lang="ts">
// pages/api-tester.vue
// Full CRUD tester for https://api.codingmehdi.com/items
// Each item: { id: number, name: string }

const BASE = 'https://api.codingmehdi.com/items'

// ── State ────────────────────────────────────────────────────────
interface Item { id: number; name: string }
interface LogEntry { id: number; time: string; method: string; url: string; status: number | null; duration: number | null; body: string | null; response: string; ok: boolean }

const items = ref<Item[]>([])
const loading = ref(false)
const newName = ref('')
const editId = ref<number | null>(null)
const editName = ref('')
const deleteId = ref<number | null>(null)
const modalOpen = ref(false)
const confirmDeleteModal = ref(false)
const log = ref<LogEntry[]>([])
let logCounter = 0

// ── HTTP helper ──────────────────────────────────────────────────
async function request(method: string, url: string, body?: object): Promise<{ data: any; status: number; duration: number }> {
    const start = performance.now()
    const options: RequestInit = {
        method,
        headers: { 'Content-Type': 'application/json' },
    }
    if (body) options.body = JSON.stringify(body)

    let status = 0
    let data: any = null
    try {
        const res = await fetch(url, options)
        status = res.status
        const text = await res.text()
        try { data = JSON.parse(text) } catch { data = text }
    } catch (e: any) {
        data = { error: e.message }
        status = 0
    }

    const duration = performance.now() - start

    log.value.unshift({
        id: ++logCounter,
        time: new Date().toLocaleTimeString(),
        method,
        url,
        status,
        duration: Math.round(duration),
        body: body ? JSON.stringify(body, null, 2) : null,
        response: JSON.stringify(data, null, 2),
        ok: status >= 200 && status < 300,
    })
    // Keep last 30 entries
    if (log.value.length > 30) log.value.pop()

    return { data, status, duration }
}

// ── CRUD actions ─────────────────────────────────────────────────
async function fetchAll() {
    loading.value = true
    const { data } = await request('GET', BASE)
    if (Array.isArray(data)) items.value = data
    loading.value = false
}

async function createItem() {
    const name = newName.value.trim()
    if (!name) return
    loading.value = true
    const { data, status } = await request('POST', BASE, { name })
    if (status >= 200 && status < 300) {
        newName.value = ''
        await fetchAll()
    }
    loading.value = false
}

function openEdit(item: Item) {
    editId.value = item.id
    editName.value = item.name
    modalOpen.value = true
}

async function updateItem() {
    if (!editId.value) return
    const name = editName.value.trim()
    if (!name) return
    loading.value = true
    await request('PUT', `${BASE}/${editId.value}`, { name })
    modalOpen.value = false
    await fetchAll()
    loading.value = false
}

function confirmDelete(id: number) {
    deleteId.value = id
    confirmDeleteModal.value = true
}

async function deleteItem() {
    if (!deleteId.value) return
    loading.value = true
    await request('DELETE', `${BASE}/${deleteId.value}`)
    confirmDeleteModal.value = false
    deleteId.value = null
    await fetchAll()
    loading.value = false
}

function clearLog() { log.value = [] }

// ── Method badge color ───────────────────────────────────────────
function methodStyle(method: string) {
    const map: Record<string, string> = {
        GET: 'background:#009a8e;color:#fff',
        POST: 'background:#fd8b1f;color:#fff',
        PUT: 'background:#ffc22f;color:#000',
        DELETE: 'background:#e83a23;color:#fff',
    }
    return map[method] ?? 'background:#3f3f46;color:#fff'
}

definePageMeta({
    title: 'Items API Tester -> https://api.codingmehdi.com/items'
})

// ── Init ─────────────────────────────────────────────────────────
onMounted(fetchAll)
</script>

<template>
    <div class="min-h-screen bg-[--color-surface-sunken]">



        <main class="max-w-6xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-5 gap-6">

            <!-- Left column: CRUD controls + Items list -->
            <div class="lg:col-span-2 flex flex-col gap-6">
                <button class="btn btn-sm secondary btn-outline shrink-0" :disabled="loading" @click="fetchAll">
                    <svg class="w-4 h-4" :class="{ 'animate-spin': loading }" fill="none" stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Refresh
                </button>
                <!-- Create -->
                <div class="card">
                    <div class="card-header" style="--ui-color: var(--color-primary)">
                        <div class="flex items-center gap-2">
                            <span class="text-xs font-bold px-2 py-0.5 rounded text-white"
                                style="background:#fd8b1f">POST</span>
                            <span class="h6 mb-0 text-white">/items</span>
                        </div>
                    </div>
                    <div class="card-body">
                        <label class="label">Item name</label>
                        <input v-model="newName" class="input" placeholder="e.g. Buy groceries"
                            @keydown.enter="createItem" />
                    </div>
                    <div class="card-footer flex justify-end">
                        <button class="btn" :disabled="loading || !newName.trim()" @click="createItem">
                            + Create Item
                        </button>
                    </div>
                </div>

                <!-- Items List -->
                <div class="card" style="flex:1">
                    <div class="card-header flex items-center justify-between">
                        <div class="flex items-center gap-2">
                            <span class="text-xs font-bold px-2 py-0.5 rounded text-white"
                                style="background:#009a8e">GET</span>
                            <span class="h6 mb-0">/items</span>
                        </div>
                        <span class="text-xs text-[--color-text-muted] font-mono">
                            {{ items.length }} item{{ items.length !== 1 ? 's' : '' }}
                        </span>
                    </div>
                    <div class="card-body" style="gap: 0; padding: 0;">

                        <!-- Loading skeleton -->
                        <template v-if="loading && items.length === 0">
                            <div v-for="i in 3" :key="i"
                                class="flex items-center gap-3 px-6 py-4 border-b border-gray-100 last:border-0">
                                <div class="h-3 bg-gray-200 rounded animate-pulse flex-1"></div>
                                <div class="h-6 w-14 bg-gray-200 rounded animate-pulse"></div>
                                <div class="h-6 w-14 bg-gray-200 rounded animate-pulse"></div>
                            </div>
                        </template>

                        <!-- Empty state -->
                        <template v-else-if="items.length === 0">
                            <div class="px-6 py-10 text-center">
                                <p class="text-2xl mb-2">📭</p>
                                <p class="text-sm text-[--color-text-muted]">No items yet. Create one above.</p>
                            </div>
                        </template>

                        <!-- Items -->
                        <template v-else>
                            <div v-for="item in items" :key="item.id"
                                class="flex items-center gap-3 px-6 py-4 border-b border-gray-100 last:border-0 hover:bg-[--color-surface-sunken] transition-colors">
                                <span class="text-xs font-mono text-[--color-text-muted] w-6 shrink-0 text-right">#{{
                                    item.id }}</span>
                                <span class="flex-1 text-sm text-[--color-text-main] font-medium truncate">{{ item.name
                                    }}</span>
                                <button class="btn btn-xs secondary btn-outline shrink-0"
                                    @click="openEdit(item)">Edit</button>
                                <button class="btn btn-xs danger btn-outline shrink-0"
                                    @click="confirmDelete(item.id)">Del</button>
                            </div>
                        </template>

                    </div>
                </div>

            </div>

            <!-- Right column: Request log -->
            <div class="lg:col-span-3 flex flex-col gap-6">

                <div class="card" style="flex: 1">
                    <div class="card-header flex items-center justify-between">
                        <h2 class="h5 mb-0">Request Log</h2>
                        <button class="btn btn-xs btn-outline" :disabled="log.length === 0" @click="clearLog">
                            Clear
                        </button>
                    </div>

                    <!-- Empty log -->
                    <div v-if="log.length === 0" class="card-body items-center justify-center py-16">
                        <p class="text-3xl mb-2">🔌</p>
                        <p class="text-sm text-[--color-text-muted]">No requests yet. Try creating or fetching items.
                        </p>
                    </div>

                    <!-- Log entries -->
                    <div v-else class="divide-y divide-gray-100">
                        <details v-for="entry in log" :key="entry.id" class="group">
                            <summary
                                class="flex items-center gap-3 px-6 py-3 cursor-pointer hover:bg-[--color-surface-sunken] transition-colors list-none">
                                <!-- Method badge -->
                                <span class="text-xs font-bold px-2 py-0.5 rounded font-mono shrink-0 w-14 text-center"
                                    :style="methodStyle(entry.method)">
                                    {{ entry.method }}
                                </span>

                                <!-- URL -->
                                <span class="flex-1 text-xs font-mono text-[--color-text-muted] truncate min-w-0">
                                    {{ entry.url.replace('https://api.codingmehdi.com', '') }}
                                </span>

                                <!-- Status -->
                                <span class="text-xs font-bold font-mono shrink-0 px-2 py-0.5 rounded"
                                    :class="entry.ok ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'">
                                    {{ entry.status || 'ERR' }}
                                </span>

                                <!-- Duration -->
                                <span class="text-xs text-[--color-text-muted] font-mono shrink-0 w-14 text-right">
                                    {{ entry.duration }}ms
                                </span>

                                <!-- Time -->
                                <span
                                    class="text-xs text-[--color-text-muted] shrink-0 w-16 text-right hidden sm:block">
                                    {{ entry.time }}
                                </span>

                                <!-- Chevron -->
                                <svg class="w-3 h-3 text-gray-400 shrink-0 transition-transform group-open:rotate-180"
                                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M19 9l-7 7-7-7" />
                                </svg>
                            </summary>

                            <!-- Expanded detail -->
                            <div class="px-6 pb-4 bg-[--color-surface-sunken] space-y-3">
                                <div v-if="entry.body">
                                    <p
                                        class="text-xs font-semibold text-[--color-text-muted] uppercase tracking-wider mb-1">
                                        Request
                                        Body</p>
                                    <pre
                                        class="text-xs font-mono bg-[--color-surface] border border-gray-200 rounded-xl p-3 overflow-x-auto text-[--color-text-main] leading-relaxed">
                            {{ entry.body }}</pre>
                                </div>
                                <div>
                                    <p
                                        class="text-xs font-semibold text-[--color-text-muted] uppercase tracking-wider mb-1">
                                        Response</p>
                                    <pre class="text-xs font-mono bg-[--color-surface] border rounded-xl p-3 overflow-x-auto leading-relaxed"
                                        :class="entry.ok ? 'border-emerald-200 text-emerald-800' : 'border-red-200 text-red-800'">{{
                                            entry.response }}</pre>
                                </div>
                            </div>
                        </details>
                    </div>
                </div>

                <!-- Endpoint reference card -->
                <div class="card">
                    <div class="card-header">
                        <h2 class="h6 mb-0 text-[--color-text-muted]">Endpoint Reference</h2>
                    </div>
                    <div class="card-body" style="gap: 0.5rem; padding-top: 1rem; padding-bottom: 1rem;">
                        <div v-for="ep in [
                            { method: 'GET', path: '/items', desc: 'List all items' },
                            { method: 'POST', path: '/items', desc: 'Create item  { name }' },
                            { method: 'GET', path: '/items/:id', desc: 'Get one item' },
                            { method: 'PUT', path: '/items/:id', desc: 'Update item  { name }' },
                            { method: 'DELETE', path: '/items/:id', desc: 'Delete item' },
                        ]" :key="ep.path + ep.method" class="flex items-center gap-3 text-xs">
                            <span class="font-bold font-mono px-2 py-0.5 rounded w-14 text-center shrink-0"
                                :style="methodStyle(ep.method)">
                                {{ ep.method }}
                            </span>
                            <span class="font-mono text-[--color-text-main] w-32 shrink-0">{{ ep.path }}</span>
                            <span class="text-[--color-text-muted]">{{ ep.desc }}</span>
                        </div>
                    </div>
                </div>

            </div>
        </main>

        <!-- Edit Modal -->
        <dialog class="modal" :open="modalOpen">
            <div class="modal-header">
                <div class="flex items-center gap-2">
                    <span class="text-xs font-bold px-2 py-0.5 rounded text-black" style="background:#ffc22f">PUT</span>
                    <h2 class="h4 mb-0">Edit Item #{{ editId }}</h2>
                </div>
                <button class="btn btn-sm btn-outline" @click="modalOpen = false">✕</button>
            </div>
            <div class="modal-body">
                <label class="label">Name</label>
                <input v-model="editName" class="input" placeholder="New name…" @keydown.enter="updateItem" />
            </div>
            <div class="modal-footer">
                <button class="btn btn-outline" @click="modalOpen = false">Cancel</button>
                <button class="btn warning" :disabled="!editName.trim() || loading" @click="updateItem">Save
                    Changes</button>
            </div>
        </dialog>

        <!-- Confirm Delete Modal -->
        <dialog class="modal" :open="confirmDeleteModal">
            <div class="modal-header">
                <div class="flex items-center gap-2">
                    <span class="text-xs font-bold px-2 py-0.5 rounded text-white"
                        style="background:#e83a23">DELETE</span>
                    <h2 class="h4 mb-0">Delete Item #{{ deleteId }}</h2>
                </div>
                <button class="btn btn-sm btn-outline" @click="confirmDeleteModal = false">✕</button>
            </div>
            <div class="modal-body">
                <p class="p mb-0">Are you sure you want to delete item <strong>#{{ deleteId }}</strong>? This cannot be
                    undone.
                </p>
            </div>
            <div class="modal-footer">
                <button class="btn btn-outline" @click="confirmDeleteModal = false">Cancel</button>
                <button class="btn danger" :disabled="loading" @click="deleteItem">Yes, Delete</button>
            </div>
        </dialog>

    </div>
</template>