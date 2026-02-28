<script setup lang="ts">
import { withBase } from 'vitepress'

interface Props {
  href?: string
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  icon?: string
}

withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md'
})
</script>

<template>
  <component :is="href ? 'a' : 'button'" :href="href ? withBase(href) : undefined"
    class="v-btn group inline-flex items-center justify-center font-bold tracking-tight transition-all duration-300 active:scale-95 disabled:opacity-50"
    :class="[variant, size]">
    <!-- Slot for text or custom icons -->
    <slot />

    <!-- Specific icon logic for the "Ghost" variant -->
    <svg v-if="variant === 'ghost'" class="ml-2 size-4 transition-transform group-hover:translate-x-1" fill="none"
      viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
  </component>
</template>

<style scoped>
/* Reference your main tailwind file to use @apply without duplicating CSS */
@reference "../css/style.css";

.v-btn {
  @apply rounded-2xl cursor-pointer select-none;
}

/* Variants - Using Tailwind v4 syntax */
.primary {
  @apply bg-blue-600 text-white shadow-lg shadow-blue-500/20 hover:bg-blue-500 hover:shadow-blue-500/40;
}

.secondary {
  @apply bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700;
}

.outline {
  @apply border-2 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-blue-500 hover:text-blue-600;
}

.ghost {
  /* IMPORTANT: In v4, the ! must be at the START of the utility class */
  @apply text-blue-600 dark:text-blue-400 px-0! hover:text-blue-700 dark:hover:text-blue-300;
}


</style>
