<script setup lang="ts">
import { ref, computed } from 'vue'
import { withBase, inBrowser } from 'vitepress'
import { data as allPosts } from "../composables/posts.data"

const props = defineProps<{ path?: string; postsPerPage?: number }>()

const filteredPosts = computed(() => {
  if (!props.path) return allPosts
  return allPosts.filter(post => post.category === props.path)
})

const currentPage = ref(1)
const perPage = props.postsPerPage || 6
const totalPages = computed(() => Math.ceil(filteredPosts.value.length / perPage))

const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * perPage
  return filteredPosts.value.slice(start, start + perPage)
})

const changePage = (step: number) => {
  currentPage.value += step
  if (inBrowser) window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <section class="max-w-7xl mx-auto px-6 py-12">
    <header class="mb-12 border-b border-slate-100 dark:border-slate-800 pb-8 flex justify-between items-end">
      <div>
        <h1 class="text-5xl font-black text-slate-900 dark:text-white tracking-tighter capitalize">
          {{ props.path || 'Latest' }}
        </h1>
      </div>
      <p class="text-[10px] font-black uppercase tracking-widest text-slate-400">
        {{ filteredPosts.length }} Results
      </p>
    </header>

    <div class="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
      <article v-for="post in paginatedPosts" :key="post.url"
        class="group relative flex flex-col transition-all duration-500 hover:-translate-y-2">
        <a :href="withBase(post.url)" class="flex flex-col h-full">
          <div v-if="post.image"
            class="aspect-video rounded-[2rem] overflow-hidden bg-slate-100 dark:bg-slate-800 mb-6">
            <img :src="withBase(post.image)" loading="lazy"
              class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" />
          </div>
          <time class="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 mb-3">{{ post.date.string
            }}</time>
          <h2
            class="text-2xl font-black text-slate-900 dark:text-white leading-tight mb-4 group-hover:text-blue-600 transition-colors">
            {{ post.title }}
          </h2>
          <p class="text-sm text-slate-500 line-clamp-2 leading-relaxed">{{ post.description }}</p>
        </a>
      </article>
    </div>

    <!-- Simple Pagination -->
    <nav v-if="totalPages > 1" class="mt-20 flex justify-center gap-4">
      <button :disabled="currentPage === 1" @click="changePage(-1)"
        class="p-4 rounded-full border border-slate-200 disabled:opacity-20">←</button>
      <button :disabled="currentPage === totalPages" @click="changePage(1)"
        class="p-4 rounded-full border border-slate-200 disabled:opacity-20">→</button>
    </nav>
  </section>
</template>
