<!-- .vitepress/theme/components/VButton.vue -->
<script setup lang="ts">
import { useData } from 'vitepress'
import { computed } from 'vue'

const props = defineProps<{ href: string,  }>()
const { page } = useData()

// Check if this button's link matches the current page URL
const isActive = computed(() => {
  const currentPath = page.value.relativePath.replace(/\.md$/, '').replace(/\/index$/, '')
  const targetPath = props.href.replace(/^\//, '').replace(/\/$/, '')
  return currentPath === targetPath || (currentPath === '' && targetPath === 'index')
})
</script>

<template>
  <a :href="href" :class="[
    'px-5 py-2.5 text-[10px] font-black uppercase tracking-widest transition-all border-r border-zinc-200 last:border-r-0 dark:border-zinc-800 shrink-0 no-underline!',
    isActive
      ? 'bg-zinc-900 text-white! dark:bg-white dark:text-zinc-900!'
      : 'bg-white text-zinc-500! hover:bg-zinc-50 dark:bg-zinc-900/50 dark:hover:bg-zinc-800'
  ]">
    <slot />
  </a>
</template>