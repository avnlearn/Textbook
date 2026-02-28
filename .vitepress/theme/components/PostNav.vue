<script setup lang="ts">
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'
import { data as allPosts } from '../composables/posts.data'

const { page } = useData()

const control = computed(() => {
  // Normalize current URL: remove .md/index.md and ensure leading slash
  const curUrl = `/${page.value.relativePath
    .replace(/(\/index)?\.md$/, '')
    .replace(/^\//, '')}`

  const index = allPosts.findIndex(p => p.url === curUrl || p.url === withBase(curUrl))

  return {
    // In a list sorted [Newest -> Oldest]:
    // Index - 1 is the Newer post (Next in time)
    // Index + 1 is the Older post (Previous in time)
    newer: index > 0 ? allPosts[index - 1] : null,
    older: index < allPosts.length - 1 && index !== -1 ? allPosts[index + 1] : null
  }
})
</script>

<template>
  <nav v-if="control.newer || control.older"
    class="grid sm:grid-cols-2 gap-6 my-16 border-t border-slate-200 dark:border-slate-800 pt-10">

    <!-- Older Post (Left) -->
    <div class="flex">
      <a v-if="control.older" :href="withBase(control.older.url)"
        class="group flex flex-1 flex-col p-6 rounded-3xl border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900/50 hover:border-blue-500/30 transition-all duration-300">
        <span class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3 flex items-center group-hover:text-blue-500 transition-colors">
          <svg class="mr-2 size-3 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M15 19l-7-7 7-7" />
          </svg>
          Older Post
        </span>
        <span class="text-sm font-bold text-slate-900 dark:text-white line-clamp-2 leading-snug">
          {{ control.older.title }}
        </span>
      </a>
    </div>

    <!-- Newer Post (Right) -->
    <div class="flex">
      <a v-if="control.newer" :href="withBase(control.newer.url)"
        class="group flex flex-1 flex-col p-6 text-right rounded-3xl border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900/50 hover:border-blue-500/30 transition-all duration-300">
        <span class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3 flex items-center justify-end group-hover:text-blue-500 transition-colors">
          Newer Post
          <svg class="ml-2 size-3 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M9 5l7 7-7 7" />
          </svg>
        </span>
        <span class="text-sm font-bold text-slate-900 dark:text-white line-clamp-2 leading-snug">
          {{ control.newer.title }}
        </span>
      </a>
    </div>
  </nav>
</template>
