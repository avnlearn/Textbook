<!-- VPageView.vue -->

<script setup lang="ts">
import { useData, withBase } from "vitepress";
import { computed } from "vue";
import PostNav from "../components/PostNav.vue";
import PDFViewer from "../components/PDFViewer.vue";
import Breadcrumbs from "../helpers/Breadcrumbs.vue"; // [NEW]
import "../css/typography.css";

const { frontmatter, page } = useData();

// --- SEO: JSON-LD Schema (Using ebook.avnlearn.com) ---
const jsonLd = computed(() => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BlogPosting",
      "headline": frontmatter.value.title,
      "description": frontmatter.value.description,
      "image": frontmatter.value.image ? `https://ebook.avnlearn.com/${withBase(frontmatter.value.image)}` : undefined,
      "datePublished": frontmatter.value.date ? new Date(frontmatter.value.date).toISOString() : undefined,
      "author": { "@type": "Organization", "name": "AvN Learn" }
    }
  ]
}));
</script>

<template>
  <component :is="'script'" type="application/ld+json" v-html="JSON.stringify(jsonLd)" />

  <article class="max-w-7xl mx-auto px-6 py-12 lg:py-20 animate-in fade-in duration-700">
    <header class="mb-12">

      <!-- [NEW] Breadcrumbs Component replaced manual nav -->
      <Breadcrumbs />

      <!-- Meta Info -->
      <div class="flex items-center gap-4 mb-6">
        <time v-if="frontmatter.date"
          class="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded">
          {{ new Date(frontmatter.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })
          }}
        </time>
        <span v-if="frontmatter.category"
          class="text-[10px] font-black uppercase tracking-widest text-slate-400 border-l border-slate-200 dark:border-slate-800 pl-4">
          {{ frontmatter.category }}
        </span>
      </div>

      <h1
        class="text-4xl sm:text-5xl lg:text-7xl font-black text-slate-900 dark:text-white leading-[1.05] mb-8 tracking-tighter">
        {{ frontmatter.title }}
      </h1>

      <!-- Featured Image -->
      <div v-if="frontmatter.image"
        class="aspect-21/9 rounded-4xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-2xl shadow-blue-500/5">
        <img :src="withBase(frontmatter.image)" class="size-full object-cover" :alt="frontmatter.title" />
      </div>
    </header>

    <div class="max-w-none">
      <Content />
    </div>

  </article>
</template>
