<!-- PostList.vue -->
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useData, withBase } from 'vitepress'
import { data as allPosts } from '../postType/posts.data'

const props = defineProps<{
  lang?: string
  postsPerPage?: number
}>()

const { lang: siteLang } = useData()

// Determine Locale
const currentLang = computed(() => {
  if (props.lang) return props.lang
  return siteLang.value.toLowerCase().includes('hi') ? 'hi' : 'en'
})

const posts = computed(() => allPosts[currentLang.value] || [])
const perPage = props.postsPerPage || 6
const currentPage = ref(1)
const totalPages = computed(() => Math.ceil(posts.value.length / perPage))

const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * perPage
  return posts.value.slice(start, start + perPage)
})
</script>

<template>
  <div class="max-w-6xl mx-auto px-4 py-8">
    <!-- Empty State -->
    <div v-if="posts.length === 0" class="text-center py-20 text-gray-500 italic">
      {{ currentLang === 'hi' ? 'कोई पोस्ट नहीं मिली।' : 'No posts found.' }}
    </div>

    <!-- Post Grid -->
    <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      <article 
        v-for="post in paginatedPosts" 
        :key="post.url" 
        class="flex flex-col bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-md transition-shadow"
      >
        <a :href="withBase(post.url)" class="flex flex-col h-full">
          <div v-if="post.image" class="aspect-video w-full overflow-hidden">
            <img 
              :src="withBase(post.image)" 
              class="w-full h-full object-cover hover:scale-105 transition-transform duration-300" 
              alt="" 
            />
          </div>
          
          <div class="p-6 flex flex-col grow">
            <time class="text-sm text-blue-600 dark:text-blue-400 font-medium mb-2">
              {{ post.date.string }}
            </time>
            <h2 class="text-xl font-bold text-slate-900 dark:text-white mb-3 line-clamp-2">
              {{ post.title }}
            </h2>
            <div 
              v-if="post.excerpt" 
              v-html="post.excerpt" 
              class="text-slate-600 dark:text-slate-400 text-sm line-clamp-3 mb-4"
            ></div>
            
            <div class="mt-auto pt-4 flex items-center text-sm font-semibold text-blue-600 dark:text-blue-400">
              {{ currentLang === 'hi' ? 'और पढ़ें' : 'Read more' }} →
            </div>
          </div>
        </a>
      </article>
    </div>

    <!-- Pagination -->
    <nav v-if="totalPages > 1" class="flex items-center justify-center space-x-4 mt-12">
      <button 
        :disabled="currentPage === 1" 
        @click="currentPage--"
        class="px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
      >
        ←
      </button>
      
      <span class="text-sm font-medium text-slate-700 dark:text-slate-300">
        {{ currentLang === 'hi' ? `पृष्ठ ${currentPage} / ${totalPages}` : `Page ${currentPage} of ${totalPages}` }}
      </span>

      <button 
        :disabled="currentPage === totalPages" 
        @click="currentPage++"
        class="px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
      >
        →
      </button>
    </nav>
  </div>
</template>
