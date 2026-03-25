<script setup>
import { ref } from 'vue'

// ── Scroll spy ────────────────────────────────────────────
import { onMounted, onUnmounted } from 'vue'

const activeSection = ref('intro')

const sections = [
    { id: 'intro', label: 'Introduction' },
    { id: 'colors', label: 'Colors' },
    { id: 'buttons', label: 'Buttons' },
    { id: 'inputs', label: 'Inputs' },
    { id: 'selection', label: 'Selection' },
    { id: 'typography', label: 'Typography' },
]

let observer = null

onMounted(() => {
    observer = new IntersectionObserver(
        entries => {
            entries.forEach(e => { if (e.isIntersecting) activeSection.value = e.target.id })
        },
        { rootMargin: '-20% 0px -70% 0px' }
    )
    sections.forEach(s => {
        const el = document.getElementById(s.id)
        if (el) observer.observe(el)
    })
})

onUnmounted(() => observer?.disconnect())

function scrollTo(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

// ── Copy helper ──────────────────────────────────────────
const copyLabel = ref('Copy')
function copy(text) {
    navigator.clipboard.writeText(text).then(() => {
        copyLabel.value = 'Copied!'
        setTimeout(() => (copyLabel.value = 'Copy'), 1500)
    })
}

// ── Demo data ────────────────────────────────────────────
const palette = [
    { name: 'Primary (Orange)', cls: 'bg-orange', hex: '#fd8b1f', token: '--color-primary' },
    { name: 'Secondary (Teal)', cls: 'bg-verdigris', hex: '#009a8e', token: '--color-secondary' },
    { name: 'Danger', cls: 'bg-attention', hex: '#e83a23', token: '--color-danger' },
    { name: 'Accent (Dark Teal)', cls: 'bg-dark-teal', hex: '#00404c', token: '--color-accent' },
    { name: 'Warning (Amber)', cls: 'bg-amber', hex: '#ffc22f', token: '--color-warning' },
    { name: 'Coral', cls: 'bg-coral', hex: '#ff7b47', token: '--color-coral' },
]

const variants = ['primary', 'secondary', 'danger', 'accent', 'warning']

const inputVariants = [
    { cls: '', label: 'Default', placeholder: 'Default focus ring...' },
    { cls: 'secondary', label: 'Secondary', placeholder: 'Teal focus ring...' },
    { cls: 'danger', label: 'Danger', placeholder: 'Red focus ring...' },
]

const checkboxRows = [
    { cls: 'primary', label: 'Primary — checked', checked: true },
    { cls: 'secondary', label: 'Secondary — checked', checked: true },
    { cls: 'danger', label: 'Danger — unchecked', checked: false },
]

const switchRows = [
    { cls: 'primary', label: 'Notifications enabled', checked: true },
    { cls: 'secondary', label: 'Dark mode', checked: false },
    { cls: 'danger', label: 'Destructive mode', checked: true },
]

const radioRows = [
    { cls: 'primary', label: 'Option A', checked: true },
    { cls: 'primary', label: 'Option B', checked: false },
    { cls: 'danger', label: 'Option C', checked: false },
]
</script>

<template>

    <!-- ── Main content ─────────────────────────────────────── -->
    <main class="m-12">

        <!-- ── INTRO ──────────────────────────────────────────── -->
        <section id=" intro" class="scroll-mt-20">
            <div class="relative overflow-hidden  border border-zinc-200 bg-white p-10">
                <!-- decorative blobs -->
                <div class="pointer-events-none absolute -right-16 -top-16 h-56 w-56  opacity-10"
                    style="background: var(--color-primary); filter: blur(60px);" />
                <div class="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40  opacity-10"
                    style="background: var(--color-secondary); filter: blur(50px);" />

                <p class="mb-3 font-mono text-xs font-medium uppercase tracking-widest text-teal-600">v1.0 ·
                    Tailwind CSS v4</p>

                <h1 class="mb-4 font-black leading-none tracking-tight text-5xl text-zinc-900">
                    Design with<br>
                    <span
                        style="background: var(--color-gradient); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
                        Flow UI.
                    </span>
                </h1>

                <p class="mb-6 max-w-md text-lg text-zinc-500">
                    FlowUI extends Tailwind with semantic color tokens and a <code
                        class=" bg-zinc-100 px-1.5 py-0.5 font-mono text-sm text-orange-500">--ui-color</code>
                    cascade —
                    add a single modifier class to re-theme an entire component.
                </p>

                <div class="flex flex-wrap gap-2">
                    <span
                        v-for="chip in ['Tailwind v4', 'Semantic tokens', 'RTL ready', '@layer components', 'Zero JS']"
                        :key="chip"
                        class=" border border-zinc-200 bg-zinc-50 px-3 py-1 font-mono text-xs text-zinc-500">
                        {{ chip }}
                    </span>
                </div>
            </div>

            <!-- Install -->
            <div
                class="mt-6 flex items-center gap-3  border border-zinc-800 bg-zinc-950 px-5 py-3.5 font-mono text-sm text-zinc-200">
                <span class="text-teal-400">$</span>
                <span>import '@/assets/css/main.css'</span>
                <button
                    class="ml-auto  border border-zinc-700 bg-zinc-800 px-2.5 py-1 text-xs text-zinc-300 transition hover:bg-zinc-700"
                    @click="copy(`import '@/assets/css/main.css'`)">{{ copyLabel }}</button>
            </div>
        </section>

        <!-- ── COLORS ─────────────────────────────────────────── -->
        <section id="colors" class="scroll-mt-20">
            <h2 class="mb-1 font-black tracking-tight text-2xl text-zinc-900">Colors & Theme</h2>
            <p class="mb-6 text-zinc-500">All tokens are defined in the <code
                    class=" bg-zinc-100 px-1.5 py-0.5 font-mono text-sm text-orange-500">@theme</code> block
                and cascade through every component via <code
                    class=" bg-zinc-100 px-1.5 py-0.5 font-mono text-sm text-orange-500">--ui-color</code>.
            </p>

            <div class="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
                <div v-for="c in palette" :key="c.name" class="overflow-hidden  border border-zinc-200 bg-white">
                    <div class="h-14 bg-primary" />
                    <div class="p-2">
                        <p class="text-xs font-semibold text-zinc-800 leading-snug">{{ c.name.split(' ')[0] }}</p>
                        <p class="font-mono text-[0.65rem] text-zinc-400">{{ c.hex }}</p>
                        <p class="font-mono text-[0.6rem] text-zinc-400 truncate">{{ c.token }}</p>
                    </div>
                </div>
            </div>

            <!-- Gradient token -->
            <div class="mt-4 h-10 w-full " style="background: var(--color-gradient)" />
            <p class="mt-1 font-mono text-xs text-zinc-400">--color-gradient (verdigris → orange → amber)</p>
        </section>

        <!-- ── BUTTONS ────────────────────────────────────────── -->
        <section id="buttons" class="scroll-mt-20">
            <h2 class="mb-1 font-black tracking-tight text-2xl text-zinc-900">Buttons</h2>
            <p class="mb-6 text-zinc-500">Use <code
                    class=" bg-zinc-100 px-1.5 py-0.5 font-mono text-sm text-orange-500">.btn</code> as the
                base. A color modifier sets <code
                    class=" bg-zinc-100 px-1.5 py-0.5 font-mono text-sm text-orange-500">--ui-color</code>.
                Add <code class=" bg-zinc-100 px-1.5 py-0.5 font-mono text-sm text-orange-500">.btn-outline</code>
                for a ghost variant.</p>

            <!-- Solid -->
            <div class="mb-3 overflow-hidden  border border-zinc-200">
                <div class="flex items-center justify-between border-b border-zinc-200 bg-zinc-50 px-4 py-2.5">
                    <span class="text-sm font-bold text-zinc-700">Solid</span>
                    <span class="font-mono text-xs text-zinc-400">.btn .{variant}</span>
                </div>
                <div class="flex flex-wrap items-center gap-3 bg-white p-5">
                    <button v-for="v in variants" :key="v" class="btn" :class="v">
                        {{ v.charAt(0).toUpperCase() + v.slice(1) }}
                    </button>
                </div>
            </div>

            <!-- Outlined -->
            <div class="mb-3 overflow-hidden  border border-zinc-200">
                <div class="flex items-center justify-between border-b border-zinc-200 bg-zinc-50 px-4 py-2.5">
                    <span class="text-sm font-bold text-zinc-700">Outlined</span>
                    <span class="font-mono text-xs text-zinc-400">.btn .btn-outline .{variant}</span>
                </div>
                <div class="flex flex-wrap items-center gap-3 bg-white p-5">
                    <button v-for="v in variants" :key="v" class="btn btn-outline" :class="v">
                        {{ v.charAt(0).toUpperCase() + v.slice(1) }}
                    </button>
                </div>
            </div>

            <!-- Disabled -->
            <div class="overflow-hidden  border border-zinc-200">
                <div class="flex items-center justify-between border-b border-zinc-200 bg-zinc-50 px-4 py-2.5">
                    <span class="text-sm font-bold text-zinc-700">Disabled</span>
                    <span class="font-mono text-xs text-zinc-400">disabled</span>
                </div>
                <div class="flex flex-wrap items-center gap-3 bg-white p-5">
                    <button class="btn primary" disabled>Solid disabled</button>
                    <button class="btn btn-outline primary" disabled>Outline disabled</button>
                </div>
            </div>
        </section>

        <!-- ── INPUTS ─────────────────────────────────────────── -->
        <section id="inputs" class="scroll-mt-20">
            <h2 class="mb-1 font-black tracking-tight text-2xl text-zinc-900">Inputs</h2>
            <p class="mb-6 text-zinc-500">All form fields share the same vertical padding token as buttons,
                guaranteeing alignment when placed side by side.</p>

            <div class="overflow-hidden  border border-zinc-200">
                <div class="border-b border-zinc-200 bg-zinc-50 px-4 py-2.5">
                    <span class="text-sm font-bold text-zinc-700">Text · Textarea · Select</span>
                </div>
                <div class="grid grid-cols-1 gap-4 bg-white p-5 sm:grid-cols-2">

                    <!-- Input variants -->
                    <div v-for="iv in inputVariants" :key="iv.label">
                        <label class="label" :class="iv.cls">{{ iv.label }}</label>
                        <input class="input" :class="iv.cls" type="text" :placeholder="iv.placeholder" />
                    </div>

                    <!-- Select -->
                    <div>
                        <label class="label">Select</label>
                        <select class="select">
                            <option>Option A</option>
                            <option>Option B</option>
                            <option>Option C</option>
                        </select>
                    </div>

                    <!-- Disabled -->
                    <div>
                        <label class="label">Disabled</label>
                        <input class="input" type="text" value="Not editable" disabled />
                    </div>

                    <!-- Textarea -->
                    <div class="sm:col-span-2">
                        <label class="label">Textarea</label>
                        <textarea class="textarea" placeholder="Write something…" />
                    </div>

                    <!-- Button + input inline -->
                    <div class="sm:col-span-2">
                        <label class="label">Inline with button</label>
                        <div class="flex gap-2">
                            <input class="input" type="email" placeholder="you@example.com" />
                            <button class="btn primary shrink-0">Subscribe</button>
                        </div>
                    </div>

                </div>
            </div>
        </section>

        <!-- ── SELECTION ──────────────────────────────────────── -->
        <section id="selection" class="scroll-mt-20">
            <h2 class="mb-1 font-black tracking-tight text-2xl text-zinc-900">Selection Controls</h2>
            <p class="mb-6 text-zinc-500">Wrap each control in a <code
                    class=" bg-zinc-100 px-1.5 py-0.5 font-mono text-sm text-orange-500">.selection-group</code>
                label. The color modifier applies to the control and its focus ring.</p>

            <div class="grid gap-3 sm:grid-cols-3">

                <!-- Checkboxes -->
                <div class="overflow-hidden  border border-zinc-200">
                    <div class="border-b border-zinc-200 bg-zinc-50 px-4 py-2.5">
                        <span class="text-sm font-bold text-zinc-700">Checkboxes</span>
                        <span class="ml-2 font-mono text-xs text-zinc-400">.checkbox</span>
                    </div>
                    <div class="flex flex-col gap-3 bg-white p-5">
                        <label v-for="r in checkboxRows" :key="r.label" class="selection-group">
                            <input type="checkbox" class="checkbox" :class="r.cls" :checked="r.checked" />
                            {{ r.label }}
                        </label>
                        <label class="selection-group">
                            <input type="checkbox" class="checkbox primary" disabled checked />
                            <span class="text-zinc-400">Disabled</span>
                        </label>
                    </div>
                </div>

                <!-- Switches -->
                <div class="overflow-hidden  border border-zinc-200">
                    <div class="border-b border-zinc-200 bg-zinc-50 px-4 py-2.5">
                        <span class="text-sm font-bold text-zinc-700">Switches</span>
                        <span class="ml-2 font-mono text-xs text-zinc-400">.switch</span>
                    </div>
                    <div class="flex flex-col gap-3 bg-white p-5">
                        <label v-for="r in switchRows" :key="r.label" class="selection-group">
                            <input type="checkbox" class="switch" :class="r.cls" :checked="r.checked" />
                            {{ r.label }}
                        </label>
                        <label class="selection-group">
                            <input type="checkbox" class="switch primary" disabled checked />
                            <span class="text-zinc-400">Disabled</span>
                        </label>
                    </div>
                </div>

                <!-- Radios -->
                <div class="overflow-hidden  border border-zinc-200">
                    <div class="border-b border-zinc-200 bg-zinc-50 px-4 py-2.5">
                        <span class="text-sm font-bold text-zinc-700">Radios</span>
                        <span class="ml-2 font-mono text-xs text-zinc-400">.radio</span>
                    </div>
                    <div class="flex flex-col gap-3 bg-white p-5">
                        <label v-for="r in radioRows" :key="r.label" class="selection-group">
                            <input type="radio" class="radio" :class="r.cls" name="demo" :checked="r.checked" />
                            {{ r.label }}
                        </label>
                        <label class="selection-group">
                            <input type="radio" class="radio primary" name="demo" disabled />
                            <span class="text-zinc-400">Disabled</span>
                        </label>
                    </div>
                </div>

            </div>
        </section>

        <!-- ── TYPOGRAPHY ─────────────────────────────────────── -->
        <section id="typography" class="scroll-mt-20">
            <h2 class="mb-1 font-black tracking-tight text-2xl text-zinc-900">Typography</h2>
            <p class="mb-6 text-zinc-500">Headings, body copy, lead text, and links are all reset and sized via
                Tailwind's text-scale variables.</p>

            <div class="overflow-hidden  border border-zinc-200 bg-white">
                <div class="border-b border-zinc-200 bg-zinc-50 px-4 py-2.5">
                    <span class="text-sm font-bold text-zinc-700">Type scale</span>
                    <span class="ml-2 font-mono text-xs text-zinc-400">h1–h6 · p · .lead · .text-muted · a</span>
                </div>
                <div class="space-y-1 p-8">
                    <h1>Heading 1 — Display</h1>
                    <h2>Heading 2 — Section</h2>
                    <h3>Heading 3 — Subsection</h3>
                    <h4>Heading 4</h4>
                    <h5>Heading 5</h5>
                    <h6>Heading 6</h6>
                    <p>Body paragraph. FlowUI keeps consistent spacing through semantic tokens, so every element
                        aligns to the same baseline grid without extra utility classes.</p>
                    <p class="lead">Lead text. A slightly larger, muted paragraph style for introductions and
                        summaries at the top of a page section.</p>
                    <p class="text-muted">Muted text — for secondary or supporting information.</p>
                    <p><a href="#">Links</a> inherit <code
                            class=" bg-zinc-100 px-1 font-mono text-sm text-orange-500">--color-primary</code>
                        by default and underline on hover.</p>
                </div>
            </div>

            <!-- Tinted headings -->
            <div class="mt-3 overflow-hidden  border border-zinc-200 bg-white">
                <div class="border-b border-zinc-200 bg-zinc-50 px-4 py-2.5">
                    <span class="text-sm font-bold text-zinc-700">Tinted via variant modifier</span>
                    <span class="ml-2 font-mono text-xs text-zinc-400">.{variant} on a parent or the element
                        itself</span>
                </div>
                <div class="flex flex-wrap gap-5 p-8">
                    <h3 v-for="v in variants" :key="v" :class="v">
                        {{ v.charAt(0).toUpperCase() + v.slice(1) }}
                    </h3>
                </div>
            </div>
        </section>

        <!-- ── Footer ────────────────────────────────────────── -->
        <footer class="border-t border-zinc-200 pb-10 pt-8 text-sm text-zinc-400">
            <span class="font-bold"
                style="background: var(--color-gradient); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;">FlowUI</span>
            — Built on Tailwind CSS v4. MIT License.
        </footer>

    </main>

</template>