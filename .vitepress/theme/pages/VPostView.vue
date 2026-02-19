<script setup lang="ts">
import { useData, withBase, useRoute } from "vitepress";
import { computed, ref, onMounted, onUnmounted, watch } from "vue";
import PostNav from "../components/PostNav.vue";
import "../css/typography.css"
const { frontmatter, site } = useData();
const route = useRoute();


// --- 4. Enhanced SEO Schema ---
const jsonLd = computed(() => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": frontmatter.value.title,
  "description": frontmatter.value.description || frontmatter.value.excerpt,
  "image": frontmatter.value.image ? withBase(frontmatter.value.image) : undefined,
  "datePublished": frontmatter.value.date ? new Date(frontmatter.value.date).toISOString() : undefined,
  "author": { "@type": "Person", "name": "AvN Learn" },
  "publisher": {
    "@type": "Organization",
    "name": "AvN Learn",
    "logo": { "@type": "ImageObject", "url": withBase('/logo.png') }
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": `${site.value.base}${route.path}`
  }
}));


</script>

<template>
  <!-- JSON-LD for Search Engines -->
  <component :is="'script'" type="application/ld+json" v-html="JSON.stringify(jsonLd)" />
  <article class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 print:p-0 print:m-0 print:max-w-none">
    <header class="mb-10 print:hidden">
      <time v-if="frontmatter.date" class="text-sm font-medium text-zinc-500 dark:text-zinc-400">
        {{ new Date(frontmatter.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) }}
      </time>

      <div class="group flex items-center gap-4 mt-4">
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
          {{ frontmatter.title }}
        </h1>
      </div>
      <div v-if="frontmatter.description || frontmatter.excerpt" class="my-2">
        <div>
          {{ frontmatter.description || frontmatter.excerpt }}
        </div>
      </div>
      <!-- Featured Image -->
      <div v-if="frontmatter.image"
        class="mt-8 group/img relative overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800">
        <img :src="frontmatter.image" :alt="frontmatter.title" loading="lazy" class="w-full aspect-video object-cover" />
      </div>

      <!-- Tags Section -->
      <div v-if="frontmatter.tags" class="group flex flex-wrap items-center gap-2 mt-8">
        <span v-for="tag in frontmatter.tags" :key="tag" class="tag-pill">#{{ tag }}</span>
      </div>

    </header>


    <div class="prose max-w-none">
      <div id="article__container__prose">
        <Content />
      </div>
    </div>

    <PostNav />


    <footer class="mt-12 text-center border-t border-zinc-100 dark:border-zinc-800 pt-8 print:hidden">
      <a href="/posts"
        class="text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 transition-colors">
        ← Back to Post List
      </a>
    </footer>
  </article>
</template>

<style scoped>
@reference "../style.css";

.action-btn {
  @apply flex items-center gap-1.5 px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 rounded-full text-[10px] font-bold uppercase tracking-wider hover:bg-indigo-600 hover:text-white active:scale-95 shadow-sm transition-all;
}

.tag-pill {
  @apply rounded-full bg-zinc-100 dark:bg-zinc-800 px-3 py-1 text-xs font-medium text-zinc-600 dark:text-zinc-300;
}

/* Image Download Pop Effect */
:deep(.img-pop-wrapper) {
  position: relative;
  display: inline-block;
  width: 100%;

  &::after {
    content: attr(data-tooltip);
    position: absolute;
    bottom: calc(100% + 10px);
    left: 50%;
    transform: translateX(-50%) scale(0.8);
    opacity: 0;
    pointer-events: none;
    background: #18181b;
    color: #ffffff;
    padding: 6px 12px;
    border-radius: 8px;
    font-size: 0.75rem;
    font-weight: 600;
    white-space: nowrap;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3);
    z-index: 100;
    transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  &:hover {
    &::after {
      opacity: 1;
      transform: translateX(-50%) scale(1);
    }

    img {
      transform: scale(1.01);
      filter: brightness(1.05);
      cursor: pointer;
    }
  }

  img {
    transition: transform 0.3s ease, filter 0.3s ease;
    display: block;
    margin: 0 auto;
  }
}
</style>
