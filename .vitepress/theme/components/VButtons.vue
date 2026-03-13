<!-- .vitepress/theme/components/VButtons.vue -->
<script setup lang="ts">
interface Props {
    layout?: 'bar' | 'grid' | 'list'
}
withDefaults(defineProps<Props>(), { layout: 'bar' })

</script>

<template>
    <nav :class="[
        'v-buttons overflow-hidden mb-8',
        // BAR: Joined horizontal scrolling bar
        layout === 'bar' && 'inline-flex w-full overflow-x-auto flex-nowrap rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-xs no-scrollbar',
        // GRID: 2 columns on mobile, 4 on desktop
        layout === 'grid' && 'grid grid-cols-2 sm:grid-cols-4 gap-2',
        // LIST: Stacked vertically
        layout === 'list' && 'flex flex-col gap-1'
    ]">
        <slot />
    </nav>
</template>

<style scoped>
@reference "../css/style.css";

.v-buttons :deep(a),
.v-buttons :deep(button) {
    @apply px-5 py-3 text-[10px] font-black uppercase tracking-widest transition-all shrink-0 no-underline!;
    @apply bg-white text-zinc-500! hover:bg-zinc-50 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800;
}

/* BAR Layout Specifics: Add dividers */
.v-buttons :deep(a:not(:last-child)),
.v-buttons :deep(button:not(:last-child)) {
    @apply border-r border-zinc-200 dark:border-zinc-800;
}

/* GRID/LIST Layout Specifics: Add rounded corners to individual items */
.v-buttons:not(.inline-flex) :deep(a),
.v-buttons:not(.inline-flex) :deep(button) {
    @apply rounded-lg border border-zinc-200 dark:border-zinc-800 border-r!;
}

.no-scrollbar::-webkit-scrollbar {
    display: none;
}

.no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>
