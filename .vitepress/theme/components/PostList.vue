<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { withBase, inBrowser } from 'vitepress'
import { data as allPosts } from "../composables/posts.data"

const props = defineProps<{ path?: string; postsPerPage?: number }>()
const currentPage = ref(1)
const perPage = props.postsPerPage || 7

const filteredPosts = computed(() => {
  if (!props.path) return allPosts
  return allPosts.filter(post => post.category === props.path)
})

const totalPages = computed(() => Math.ceil(filteredPosts.value.length / perPage))
const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * perPage
  return filteredPosts.value.slice(start, start + perPage)
})

const setPage = (page: number) => {
  currentPage.value = page
  if (inBrowser) window.scrollTo({ top: 0, behavior: 'smooth' })
}

watch(() => props.path, () => { currentPage.value = 1 })
</script>

<template>
  <div class="max-w-7xl mx-auto px-6 py-16">
    <header class="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 border-b border-slate-200 dark:border-slate-800 pb-6 gap-4">
      <div>
        <h1 class="text-5xl font-black tracking-tighter text-slate-900 dark:text-white capitalize">
          {{ props.path?.replace('-', ' ') || 'Latest Updates' }}
        </h1>
        <p class="text-slate-500 mt-2 font-medium">Educational resources and board news.</p>
      </div>
      <span class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full shrink-0">
        {{ filteredPosts.length }} Articles
      </span>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <article 
        v-for="(post, index) in paginatedPosts" 
        :key="post.url"
        :class="[
          'group relative rounded-4xl overflow-hidden bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 transition-all duration-500 hover:shadow-bento hover:-translate-y-1',
          index === 0 && currentPage === 1 ? 'lg:col-span-2 lg:flex' : '' 
        ]"
      >
        <a :href="withBase(post.url)" class="flex flex-col w-full h-full">
          <div :class="['relative overflow-hidden shrink-0', (index === 0 && currentPage === 1) ? 'lg:w-1/2 h-72 lg:h-auto' : 'aspect-16/10']">
            <img v-if="post.image" :src="withBase(post.image)" class="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
            <div v-else class="w-full h-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-400">No Image</div>
          </div>

          <div :class="['p-8 flex flex-col justify-center', (index === 0 && currentPage === 1) ? 'lg:w-1/2' : 'flex-1']">
            <div class="flex items-center gap-3 mb-4">
              <span class="text-[10px] font-bold uppercase tracking-widest text-blue-600 bg-blue-50 dark:bg-blue-900/30 px-2.5 py-1 rounded-lg">{{ post.category }}</span>
              <time class="text-[10px] font-bold text-slate-400 uppercase">{{ post.date.string }}</time>
            </div>
            <h2 :class="['font-black text-slate-900 dark:text-white leading-tight mb-4 group-hover:text-blue-600 transition-colors', (index === 0 && currentPage === 1) ? 'text-3xl' : 'text-xl']">{{ post.title }}</h2>
            <p class="text-slate-500 dark:text-slate-400 line-clamp-2 text-sm mb-6">{{ post.description }}</p>
            <div class="mt-auto flex items-center text-blue-600 font-bold text-xs uppercase tracking-widest">
              Explore Article 
              <svg xmlns="http://www.w3.org" class="h-4 w-4 ml-2 group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </div>
          </div>
        </a>
      </article>
    </div>

    <nav v-if="totalPages > 1" class="mt-20 flex justify-center items-center gap-3">
      <button :disabled="currentPage === 1" @click="setPage(currentPage - 1)" class="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 disabled:opacity-20 hover:border-blue-500 transition-colors shadow-sm">
        <svg xmlns="http://www.w3.org" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
      </button>
      <div class="flex bg-slate-100 dark:bg-slate-800 p-1.5 rounded-3xl">
        <button v-for="page in totalPages" :key="page" @click="setPage(page)" :class="['w-12 h-12 rounded-xl text-sm font-bold transition-all', currentPage === page ? 'bg-white dark:bg-slate-700 text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white']">{{ page }}</button>
      </div>
      <button :disabled="currentPage === totalPages" @click="setPage(currentPage + 1)" class="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 disabled:opacity-20 hover:border-blue-500 transition-colors shadow-sm">
        <svg xmlns="http://www.w3.org" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
      </button>
    </nav>
  </div>
</template>
