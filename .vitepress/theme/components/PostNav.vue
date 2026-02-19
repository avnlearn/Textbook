<!-- PostNav.vue -->
<script setup lang="ts">
import { useRoute, useData, withBase } from "vitepress";
import { computed } from "vue";
import { data as allPostsByLang } from "../postType/posts.data";

const route = useRoute();
const { lang: siteLang } = useData();

/**
 * 1. Identify the current language
 * Root maps to 'en', /hi/ maps to 'hi'
 */
const currentLang = computed(() => {
  return siteLang.value.toLowerCase().includes('hi') ? 'hi' : 'en';
});

/**
 * 2. Get the post list for the current language only
 */
const posts = computed(() => allPostsByLang[currentLang.value] || []);

/**
 * 3. Normalize paths for matching
 */
const normalize = (path: string) => {
  return decodeURIComponent(path)
    .replace(/\/index\.html$/, '/')
    .replace(/\.html$/, '')
    .replace(/\/$/, '')
    .toLowerCase() || '/';
};

const currentIndex = computed(() => {
  const currentPath = normalize(route.path);
  return posts.value.findIndex(p => normalize(p.url) === currentPath);
});

// Navigation logic (Data is sorted Newest -> Oldest)
// Newer = Index - 1 | Older = Index + 1
const nextPost = computed(() => {
  if (currentIndex.value > 0) return posts.value[currentIndex.value - 1];
  return null;
});

const prevPost = computed(() => {
  if (currentIndex.value !== -1 && currentIndex.value < posts.value.length - 1) {
    return posts.value[currentIndex.value + 1];
  }
  return null;
});

// UI Strings for i18n
const labels = computed(() => {
  return currentLang.value === 'hi' 
    ? { older: 'पुराना लेख', newer: 'नया लेख' }
    : { older: 'Older Post', newer: 'Newer Post' };
});
</script>

<template>
  <nav 
    v-if="prevPost || nextPost"
    class="mt-16 pt-8 border-t border-zinc-200 dark:border-zinc-800 grid grid-cols-1 sm:grid-cols-2 gap-4 print:hidden" 
    aria-label="Post navigation"
  >
    <!-- Older Post (Previous in Time) -->
    <div class="flex">
      <a 
        v-if="prevPost" 
        :href="withBase(prevPost.url)" 
        class="group flex flex-col items-start p-4 w-full rounded-xl border border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-all"
      >
        <span class="text-[10px] uppercase tracking-[0.2em] text-zinc-500 mb-2 font-semibold">
          {{ labels.older }}
        </span>
        <span class="text-sm font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2 text-left">
          ← {{ prevPost.title }}
        </span>
      </a>
    </div>

    <!-- Newer Post (Next in Time) -->
    <div class="flex justify-end text-right">
      <a 
        v-if="nextPost" 
        :href="withBase(nextPost.url)" 
        class="group flex flex-col items-end p-4 w-full rounded-xl border border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-all"
      >
        <span class="text-[10px] uppercase tracking-[0.2em] text-zinc-500 mb-2 font-semibold">
          {{ labels.newer }}
        </span>
        <span class="text-sm font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2 text-right">
          {{ nextPost.title }} →
        </span>
      </a>
    </div>
  </nav>
</template>
