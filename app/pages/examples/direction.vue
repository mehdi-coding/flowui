<script setup>
const direction = ref('ltr')

const toggleDirection = () => {
    direction.value = direction.value === 'ltr' ? 'rtl' : 'ltr'
}
</script>

<template>
    <div class="fixed top-4 right-4 z-50">
        <button @click="toggleDirection" class="btn secondary">
            Switch to {{ direction === 'ltr' ? 'RTL (Arabic)' : 'LTR (English/French)' }}
        </button>

    </div>
    <div :dir="direction" class="min-h-screen bg-gray-50 p-8 transition-all duration-300">

        <div class="max-w-4xl mx-auto space-y-8">

            <header class="flex items-center justify-between border-b pb-4">
                <div>
                    <h1 class="text-2xl font-bold text-gray-900">Direction Test Bench</h1>
                    <p class="text-gray-500">Current Mode: <span class="uppercase font-mono font-bold text-primary">{{
                        direction }}</span></p>
                </div>

            </header>

            <section class="space-y-4">
                <h2 class="text-lg font-semibold border-s-4 border-primary ps-3">1. Opinionated Buttons</h2>
                <div class="flex flex-wrap gap-4">
                    <button class="btn">Default Solid</button>
                    <button class="btn danger">Solid Danger</button>
                    <button class="btn btn-outline">Default Outline</button>
                    <button class="btn btn-outline success ms-auto">Aligned to End (ms-auto)</button>
                </div>
            </section>

            <section class="space-y-4">
                <h2 class="text-lg font-semibold border-s-4 border-primary ps-3">2. Layout & Logical Properties</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="bg-white p-6 rounded-xl shadow-sm border-e-8 border-orange">
                        <h3 class="font-bold">Border End (border-e-8)</h3>
                        <p class="text-sm text-gray-600">This thick border should switch sides when toggling RTL.</p>
                    </div>
                    <div class="bg-white p-6 rounded-xl shadow-sm text-start">
                        <h3 class="font-bold text-start">Text Start (text-start)</h3>
                        <p class="text-sm text-gray-600">This text alignment should flip automatically.</p>
                    </div>
                </div>
            </section>

            <section class="space-y-4">
                <h2 class="text-lg font-semibold border-s-4 border-primary ps-3">3. Directional Icons (Tailwind 4
                    Modifiers)</h2>
                <div class="flex items-center gap-4 bg-white p-4 rounded-lg">
                    <span>Directional Arrow:</span>
                    <span class="text-2xl inline-block transition-transform duration-300 rtl:-scale-x-100">
                        ➔
                    </span>
                    <p class="text-xs text-gray-400">(The arrow should point left in RTL mode)</p>
                </div>
            </section>

            <section class="space-y-4">

                <div class="space-y-1">
                    <label class="text-sm font-medium">Username</label>
                    <input type="text" class="input" placeholder="Enter username..." />
                </div>

                <div class="space-y-1">
                    <label class="text-sm font-medium">Password</label>
                    <input type="password" class="input error" value="123" />
                    <p class="text-xs text-error">Password too short</p>
                </div>

                <div class="space-y-1">
                    <label class="text-sm font-medium">Coupon Code</label>
                    <input type="text" class="input success" value="SAVE20" />
                </div>

            </section>

            <section class="space-y-4">
                <h2 class="text-lg font-semibold border-s-4 border-primary ps-3">5. Uniform Height Test (RTL/LTR)</h2>

                <div class="flex items-end gap-2 bg-white p-6 rounded-xl shadow-sm">
                    <div class="flex-1">
                        <label class="input-label">Search</label>
                        <input type="text" class="input" placeholder="Type here..." />
                    </div>

                    <button class="btn accent">
                        Search / بحث
                    </button>
                </div>
            </section>

            <section class="space-y-8 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <h2 class="text-xl font-bold text-gray-800 mb-6">Complete Form Test</h2>

                <div class="grid grid-cols-1 gap-6">
                    <div>
                        <label class="label">Full Name / الاسم</label>
                        <input type="text" class="input" placeholder="John Doe" />
                    </div>

                    <div>
                        <label class="label">Department / القسم</label>
                        <select class="select">
                            <option value="">Select an option...</option>
                            <option value="hr">Human Resources</option>
                            <option value="it">IT Department</option>
                        </select>
                    </div>

                    <div>
                        <label class="label">Feedback / ملاحظات</label>
                        <textarea class="textarea" placeholder="How can we improve?"></textarea>
                    </div>

                    <div class="flex justify-end gap-3">
                        <button class="btn btn-outline">Cancel</button>
                        <button class="btn primary">Submit Form</button>
                    </div>
                </div>
            </section>

            <section class="p-8 space-y-8 bg-white rounded-xl shadow-sm border border-gray-100">
                <h2 class="text-xl font-bold mb-4">Color Variants</h2>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">

                    <div class="space-y-4">
                        <h3 class="text-sm font-bold uppercase text-gray-400">Checkboxes</h3>
                        <label class="selection-group">
                            <input type="checkbox" class="checkbox" checked />
                            <span>Primary (Default) / أساسي</span>
                        </label>

                        <label class="selection-group">
                            <input type="checkbox" class="checkbox secondary" checked />
                            <span>Secondary / ثانوي</span>
                        </label>

                        <label class="selection-group">
                            <input type="checkbox" class="checkbox danger" checked />
                            <span>Danger / خطر</span>
                        </label>
                    </div>

                    <div class="space-y-4">
                        <h3 class="text-sm font-bold uppercase text-gray-400">Switches</h3>
                        <label class="selection-group">
                            <input type="checkbox" class="switch success" checked />
                            <span>Success / نجاح</span>
                        </label>

                        <label class="selection-group">
                            <input type="checkbox" class="switch warning" checked />
                            <span>Warning / تحذير</span>
                        </label>

                        <label class="selection-group">
                            <input type="checkbox" class="switch accent" checked />
                            <span>Accent / تمييز</span>
                        </label>
                    </div>

                </div>
            </section>
            <section class="space-y-6 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <h2 class="text-xl font-bold">Radio Selection</h2>

                <div class="flex flex-col gap-4">
                    <p class="text-sm font-bold text-gray-500 uppercase">Select an option / اختر خياراً</p>

                    <div class="flex flex-wrap gap-6">
                        <label class="selection-group">
                            <input type="radio" name="test-group" class="radio" checked />
                            <span class="text-sm font-medium">Option One (Primary)</span>
                        </label>

                        <label class="selection-group">
                            <input type="radio" name="test-group" class="radio secondary" />
                            <span class="text-sm font-medium">Option Two (Secondary)</span>
                        </label>

                        <label class="selection-group">
                            <input type="radio" name="test-group" class="radio danger" />
                            <span class="text-sm font-medium">Option Three (Danger)</span>
                        </label>
                    </div>
                </div>
            </section>
            <section class="space-y-6 bg-gray-50 p-8 rounded-2xl border border-dashed border-gray-300">
                <h2 class="text-xl font-bold text-gray-400">Disabled States / حالات التعطيل</h2>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div class="space-y-4">
                        <button class="btn primary" disabled>Disabled Button</button>
                        <input type="text" class="input" disabled value="Read only data" />
                        <select class="select" disabled>
                            <option>Disabled Select</option>
                        </select>
                    </div>

                    <div class="space-y-4">
                        <label class="selection-group opacity-60">
                            <input type="checkbox" class="checkbox" disabled checked />
                            <span class="text-sm">Disabled Checkbox</span>
                        </label>

                        <label class="selection-group opacity-60">
                            <input type="checkbox" class="switch" disabled checked />
                            <span class="text-sm">Disabled Switch</span>
                        </label>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>