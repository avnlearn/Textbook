<script setup lang="ts">
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'
import { data as allPosts } from '../composables/posts.data'

const { page } = useData()

const control = computed(() => {
  // Normalize current URL to match our cleaned data URLs
  const curUrl = page.value.relativePath
    .replace(/(\/index)?\.md$/, '')
    .replace(/^\/?/, '/')

  const index = allPosts.findIndex(p => p.url === curUrl)

  return {
    prev: index > 0 ? allPosts[index - 1] : null,
    next: index < allPosts.length - 1 ? allPosts[index + 1] : null
  }
})
</script>

<template>
  <nav v-if="control.prev || control.next"
    class="grid sm:grid-cols-2 gap-4 my-12 border-t border-slate-100 dark:border-slate-800 pt-8">

    <!-- Previous Post -->
    <a v-if="control.prev" :href="withBase(control.prev.url)"
      class="group flex flex-col p-6 rounded-2xl border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all duration-300">
      <span class="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 flex items-center">
        <svg class="mr-2 w-3 h-3 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor"
          viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M15 19l-7-7 7-7"></path>
        </svg>
        Previous
      </span>
      <span
        class="text-base font-bold text-slate-900 dark:text-white line-clamp-1 group-hover:text-blue-600 transition-colors">
        {{ control.prev.title }}
      </span>
    </a>
    <div v-else></div>

    <!-- Next Post -->
    <a v-if="control.next" :href="withBase(control.next.url)"
      class="group flex flex-col p-6 text-right rounded-2xl border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all duration-300">
      <span class="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 flex items-center justify-end">
        Next
        <svg class="ml-2 w-3 h-3 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor"
          viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M9 5l7 7-7 7"></path>
        </svg>
      </span>
      <span
        class="text-base font-bold text-slate-900 dark:text-white line-clamp-1 group-hover:text-blue-600 transition-colors">
        {{ control.next.title }}
      </span>
    </a>
  </nav>
</template>
