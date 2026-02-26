<script setup lang="ts">
import './style.css'
import { useData } from "vitepress";
import VHeader from "./partials/VHeader.vue";
import VFooter from "./partials/VFooter.vue";
import VPostView from "./pages/VPostView.vue";
import BackToTop from './helpers/BackToTop.vue';
// https://vitepress.dev/reference/runtime-api#usedata
const { site, frontmatter } = useData();
</script>

<template>

  <div class="print:min-h-screen dark:bg-background-dark bg-background text-foreground dark:text-foreground-dark">
    <VHeader />
    <!-- Home Layout -->
    <div v-if="frontmatter.home" class="max-w-3xl mx-auto py-10">
      <h1 class="text-4xl font-bold bg-amber-300 p-2">{{ site.title }}</h1>
      <p class="mt-4 text-xl text-zinc-600">{{ site.description }}</p>
    </div>
    <!-- Post Layout -->
    <VPostView v-else-if="frontmatter.layout === 'post'" />
    <div v-else-if="frontmatter.layout === 'page'" class="max-w-7xl  mx-auto py-12 px-6">
      <Content />
    </div>
    <!-- Default / Page Layout -->
    <div v-else class="max-w-3xl mx-auto py-10 px-4">
      <nav class="mb-4">
        <a href="/" class="text-zinc-500 hover:text-zinc-900">Home</a>
      </nav>
      <Content />
    </div>
    <VFooter />
    <BackToTop />
  </div>
  
</template>
