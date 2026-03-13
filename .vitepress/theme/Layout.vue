<script setup lang="ts">
import './css/style.css'
import { useData } from "vitepress"
import VHeader from "./partials/VHeader.vue"
import VFooter from "./partials/VFooter.vue"
import VPostView from "./pages/VPostView.vue"
import PostList from "./components/PostList.vue" // Your Bento Grid
import BackToTop from './helpers/BackToTop.vue'

// https://vitepress.dev/reference/runtime-api#usedata
const { site, frontmatter, page } = useData()
</script>

<template>
  <!-- Main Wrapper with Tailwind v4 background vars -->
  <div
    class="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-blue-100 dark:selection:bg-blue-900/30">

    <VHeader />

    <main class="transition-opacity duration-300">

      <!-- 1. Dynamic Home / Category Layout -->
      <!-- If frontmatter.home is true, or if it's a category landing page -->
      <div v-if="frontmatter.home || frontmatter.layout === 'category'">
        <PostList :path="frontmatter.category" :posts-per-page="7" />
      </div>

      <!-- 2. Single Post Layout (Article View) -->
      <VPostView v-else-if="frontmatter.layout === 'post'" />

      <!-- 3. Standard Page Layout (e.g., About, Contact) -->
      <div v-else-if="frontmatter.layout === 'page'" class="max-w-7xl mx-auto py-16 px-6 sm:px-8">
        <Content />
      </div>

      <!-- 4. Default / Fallback Layout -->
      <div v-else class="max-w-4xl mx-auto py-16 px-6">
        <nav class="mb-8">
          <a href="/"
            class="group inline-flex items-center text-sm font-bold text-slate-400 hover:text-blue-600 transition-colors">
            <svg class="mr-2 size-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </a>
        </nav>
        <article class="prose max-w-none">
          <Content />
        </article>
      </div>

    </main>

    <VFooter />
    <BackToTop />
  </div>
</template>
