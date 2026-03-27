<template>
    <div class="tabs-container">
        <div class="tabs-list" role="tablist">
            <button v-for="tab in tabs" :key="tab.id" class="tab-btn" :class="{ 'active': modelValue === tab.id }"
                @click="$emit('update:modelValue', tab.id)" role="tab">
                <component :is="tab.icon" v-if="tab.icon" size="18" />
                <span>{{ tab.label }}</span>
            </button>
        </div>

        <div class="tabs-panel">
            <slot :name="modelValue"></slot>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps(['modelValue', 'tabs']);
// const emit = defineEmits(['update:modelValue']);

// const scrollContainer = ref(null);
// const isOverflowing = ref(false);

// Logic to check if tabs exceed the container width
// const checkOverflow = () => {
//     if (scrollContainer.value) {
//         const { scrollWidth, clientWidth } = scrollContainer.value;
//         isOverflowing.value = scrollWidth > clientWidth;
//     }
// };

// Handle window resizing
// let resizeObserver;
// onMounted(() => {
//     checkOverflow();
//     resizeObserver = new ResizeObserver(checkOverflow);
//     resizeObserver.observe(scrollContainer.value);
// });

// onUnmounted(() => resizeObserver?.disconnect());
</script>