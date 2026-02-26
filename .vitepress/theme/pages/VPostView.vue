<script setup lang="ts">
import { useData, withBase, useRoute } from "vitepress";
import { computed } from "vue";
import PostNav from "../components/PostNav.vue";
import "../css/typography.css"
const { frontmatter, site, page } = useData();
const route = useRoute();

// --- SEO: Breadcrumb Logic ---
const breadcrumbs = computed(() => {
  const path = page.value.relativePath;
  const isExample = path.startsWith('example/');
  const list = [{ name: 'Home', url: '/' }];
  
  if (isExample) list.push({ name: 'Example', url: '/example/' });
  else list.push({ name: 'Library', url: '/posts' });
  
  return list;
});

// --- SEO: JSON-LD Schema ---
const jsonLd = computed(() => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BlogPosting",
      "headline": frontmatter.value.title,
      "description": frontmatter.value.description,
      "image": frontmatter.value.image ? withBase(frontmatter.value.image) : undefined,
      "datePublished": frontmatter.value.date ? new Date(frontmatter.value.date).toISOString() : undefined,
      "author": { "@type": "Person", "name": "AvN Learn" }
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbs.value.map((b, i) => ({
        "@type": "ListItem",
        "position": i + 1,
        "name": b.name,
        "item": `https://yourdomain.com${withBase(b.url)}`
      }))
    }
  ]
}));
</script>

<template>
  <component :is="'script'" type="application/ld+json" v-html="JSON.stringify(jsonLd)" />

  <article class="max-w-4xl mx-auto px-6 py-12 lg:py-20">
    <header class="mb-12">
      <!-- SEO Breadcrumbs -->
      <nav class="flex items-center gap-2 mb-8 overflow-hidden">
        <div v-for="(crumb, i) in breadcrumbs" :key="i" class="flex items-center gap-2">
          <a :href="withBase(crumb.url)" class="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-colors">
            {{ crumb.name }}
          </a>
          <span class="text-slate-300 dark:text-slate-700 text-[10px]">/</span>
        </div>
        <span class="text-[10px] font-black uppercase tracking-widest text-slate-900 dark:text-white truncate">
          {{ frontmatter.title }}
        </span>
      </nav>

      <!-- Meta Row -->
      <div class="flex items-center gap-4 mb-6">
        <time v-if="frontmatter.date" class="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
          {{ new Date(frontmatter.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) }}
        </time>
        <span v-if="frontmatter.readingTime" class="text-slate-300 dark:text-slate-700">•</span>
        <span v-if="frontmatter.readingTime" class="text-[10px] font-black uppercase tracking-widest text-slate-400">
          {{ frontmatter.readingTime }}
        </span>
      </div>

      <h1 class="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white leading-[1.1] mb-8 tracking-tighter">
        {{ frontmatter.title }}
      </h1>

      <div v-if="frontmatter.image" class="aspect-video rounded-[2.5rem] overflow-hidden border border-slate-100 dark:border-slate-800 shadow-2xl shadow-blue-500/5">
        <img :src="withBase(frontmatter.image)" class="w-full h-full object-cover" :alt="frontmatter.title" />
      </div>
    </header>

    <!-- Content Area -->
    <div class="prose prose-slate dark:prose-invert max-w-none prose-headings:font-black prose-headings:tracking-tighter prose-img:rounded-3xl">
      <Content />
    </div>

    <PostNav />
  </article>
</template>
