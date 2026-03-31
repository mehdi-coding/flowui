<template>
    <div class="rich-text-wrapper" :dir="dir">
        <div v-if="editor" class="toolbar">

            <button type="button" @click="editor.chain().focus().undo().run()" :disabled="!editor.can().undo()"
                class="toolbar-btn" title="Undo">
                <Undo size="16" />
            </button>
            <button type="button" @click="editor.chain().focus().redo().run()" :disabled="!editor.can().redo()"
                class="toolbar-btn" title="Redo">
                <Redo size="16" />
            </button>

            <div class="divider"></div>

            <button type="button" @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
                :class="['toolbar-btn', { 'is-active': editor.isActive('heading', { level: 1 }) }]" title="Heading 1">
                <Heading1 size="16" />
            </button>
            <button type="button" @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
                :class="['toolbar-btn', { 'is-active': editor.isActive('heading', { level: 2 }) }]" title="Heading 2">
                <Heading2 size="16" />
            </button>

            <div class="divider"></div>

            <button type="button" @click="editor.chain().focus().toggleBold().run()"
                :class="['toolbar-btn', { 'is-active': editor.isActive('bold') }]" title="Bold">
                <Bold size="16" />
            </button>
            <button type="button" @click="editor.chain().focus().toggleItalic().run()"
                :class="['toolbar-btn', { 'is-active': editor.isActive('italic') }]" title="Italic">
                <Italic size="16" />
            </button>
            <button type="button" @click="editor.chain().focus().toggleUnderline().run()"
                :class="['toolbar-btn', { 'is-active': editor.isActive('underline') }]" title="Underline">
                <Underline size="16" />
            </button>
            <button type="button" @click="editor.chain().focus().toggleStrike().run()"
                :class="['toolbar-btn', { 'is-active': editor.isActive('strike') }]" title="Strikethrough">
                <Strikethrough size="16" />
            </button>

            <div class="divider"></div>

            <button type="button" @click="editor.chain().focus().setTextAlign('left').run()"
                :class="['toolbar-btn', { 'is-active': editor.isActive({ textAlign: 'left' }) }]" title="Align Left">
                <AlignLeft size="16" />
            </button>
            <button type="button" @click="editor.chain().focus().setTextAlign('center').run()"
                :class="['toolbar-btn', { 'is-active': editor.isActive({ textAlign: 'center' }) }]"
                title="Align Center">
                <AlignCenter size="16" />
            </button>
            <button type="button" @click="editor.chain().focus().setTextAlign('right').run()"
                :class="['toolbar-btn', { 'is-active': editor.isActive({ textAlign: 'right' }) }]" title="Align Right">
                <AlignRight size="16" />
            </button>
            <button type="button" @click="editor.chain().focus().setTextAlign('justify').run()"
                :class="['toolbar-btn', { 'is-active': editor.isActive({ textAlign: 'justify' }) }]" title="Justify">
                <AlignJustify size="16" />
            </button>

            <div class="divider"></div>

            <button type="button" @click="editor.chain().focus().toggleBulletList().run()"
                :class="['toolbar-btn', { 'is-active': editor.isActive('bulletList') }]" title="Bullet List">
                <List size="16" />
            </button>
            <button type="button" @click="editor.chain().focus().toggleOrderedList().run()"
                :class="['toolbar-btn', { 'is-active': editor.isActive('orderedList') }]" title="Numbered List">
                <ListOrdered size="16" />
            </button>
            <button type="button" @click="editor.chain().focus().toggleBlockquote().run()"
                :class="['toolbar-btn', { 'is-active': editor.isActive('blockquote') }]" title="Quote">
                <Quote size="16" />
            </button>
            <button type="button" @click="editor.chain().focus().setHorizontalRule().run()" class="toolbar-btn"
                title="Horizontal Rule">
                <Minus size="16" />
            </button>

            <div class="divider"></div>

            <button type="button" @click="setLink" :class="['toolbar-btn', { 'is-active': editor.isActive('link') }]"
                title="Add/Edit Link">
                <LinkIcon size="16" />
            </button>
            <button type="button" @click="editor.chain().focus().unsetLink().run()" :disabled="!editor.isActive('link')"
                class="toolbar-btn" title="Remove Link">
                <Unlink size="16" />
            </button>
        </div>

        <editor-content :editor="editor" class="editor-content-area" />
    </div>
</template>

<script setup>
import { watch, onBeforeUnmount } from 'vue'
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import UnderlineExtension from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import LinkExtension from '@tiptap/extension-link'

// Import all required icons from Lucide
import {
    Bold, Italic, Underline, Strikethrough,
    Heading1, Heading2,
    AlignLeft, AlignCenter, AlignRight, AlignJustify,
    List, ListOrdered, Quote, Minus,
    Undo, Redo, Link as LinkIcon, Unlink
} from '@lucide/vue'

const props = defineProps({
    modelValue: {
        type: String,
        default: ''
    },
    dir: {
        type: String,
        default: 'auto'
    }
})

const emit = defineEmits(['update:modelValue'])

const editor = useEditor({
    content: props.modelValue,
    extensions: [
        StarterKit,
        UnderlineExtension,
        TextAlign.configure({
            types: ['heading', 'paragraph'],
            defaultAlignment: 'start', // 'start' aligns perfectly with LTR/RTL automatically
        }),
        LinkExtension.configure({
            openOnClick: false, // Prevents accidental navigation while editing
            HTMLAttributes: {
                class: 'a', // Applies your global link style from typography.css
                target: '_blank',
                rel: 'noopener noreferrer'
            }
        })
    ],
    onUpdate: ({ editor }) => {
        emit('update:modelValue', editor.getHTML())
    },
})

// Watch for external changes (like clearing the form)
watch(() => props.modelValue, (newValue) => {
    const isSame = editor.value.getHTML() === newValue
    if (!isSame) {
        editor.value.commands.setContent(newValue, false)
    }
})

// Logic for adding/editing a link
const setLink = () => {
    const previousUrl = editor.value.getAttributes('link').href
    // Using native prompt for simplicity. You can replace this with your own Modal component later if desired.
    const url = window.prompt('URL', previousUrl || '')

    // cancelled
    if (url === null) {
        return
    }

    // empty url unsets the link
    if (url === '') {
        editor.value.chain().focus().extendMarkRange('link').unsetLink().run()
        return
    }

    // update link
    editor.value.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
}

onBeforeUnmount(() => {
    if (editor.value) {
        editor.value.destroy()
    }
})
</script>

<style scoped>
.rich-text-wrapper {
    border: 1px solid var(--color-gray-300);
    border-radius: var(--radius-ui);
    background-color: var(--color-input-bg);
    overflow: hidden;
    display: flex;
    flex-direction: column;
}

.rich-text-wrapper:focus-within {
    border-color: var(--color-primary);
    outline: 1px solid var(--color-primary);
}

.toolbar {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0.5rem;
    background-color: var(--color-surface-sunken);
    border-bottom: 1px solid var(--color-gray-200);
    flex-wrap: wrap;
}

.toolbar-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    border: none;
    background: transparent;
    border-radius: calc(var(--radius-ui) / 2);
    color: var(--color-text-muted);
    cursor: pointer;
    transition: all 0.2s;
}

.toolbar-btn:hover:not(:disabled) {
    background-color: var(--color-gray-200);
    color: var(--color-text-main);
}

.toolbar-btn.is-active {
    background-color: var(--color-primary);
    color: var(--color-on-primary);
}

.toolbar-btn:disabled {
    opacity: 0.4;
    cursor: not-allowed;
}

.divider {
    width: 1px;
    height: 1.25rem;
    background-color: var(--color-gray-300);
    margin-inline: 0.25rem;
}

/* --- Tiptap Content Styling --- */
:deep(.tiptap) {
    padding: 1rem;
    min-height: 150px;
    outline: none;
    color: var(--color-text-main);
    line-height: 1.6;
}

:deep(.tiptap p) {
    margin-bottom: 0.75rem;
}

:deep(.tiptap h1) {
    font-size: var(--text-2xl);
    font-weight: 700;
    margin-bottom: 1rem;
    line-height: 1.2;
}

:deep(.tiptap h2) {
    font-size: var(--text-xl);
    font-weight: 600;
    margin-bottom: 0.75rem;
    line-height: 1.2;
}

:deep(.tiptap ul) {
    list-style-type: disc;
    padding-inline-start: 1.5rem;
    margin-bottom: 0.75rem;
}

:deep(.tiptap ol) {
    list-style-type: decimal;
    padding-inline-start: 1.5rem;
    margin-bottom: 0.75rem;
}

:deep(.tiptap blockquote) {
    border-inline-start: 3px solid var(--color-gray-300);
    padding-inline-start: 1rem;
    color: var(--color-text-muted);
    font-style: italic;
    margin-block: 1rem;
}

:deep(.tiptap hr) {
    border: none;
    border-top: 1px solid var(--color-gray-200);
    margin: 1.5rem 0;
}

/* Link Styling - Inherits your global .a class variables */
:deep(.tiptap a) {
    color: var(--color-primary);
    text-decoration: underline;
    cursor: pointer;
}

/* Placeholder for empty state */
:deep(.tiptap p.is-editor-empty:first-child::before) {
    color: var(--color-text-muted);
    content: attr(data-placeholder);
    float: left;
    height: 0;
    pointer-events: none;
}
</style>