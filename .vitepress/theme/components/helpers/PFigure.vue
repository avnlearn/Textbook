<!-- .vitepress/theme/components/PFigure.vue -->
<script setup lang="ts">
import { withBase } from 'vitepress'

interface Props {
  src: string
  alt: string
  caption?: string
  credit?: string
}

defineProps<Props>()
</script>

<template>
  <figure 
    itemscope 
    itemtype="https://schema.org" 
    class="not-prose my-8 flex flex-col items-center"
  >
    <!-- Image with Schema.org Link -->
    <img
      itemprop="contentUrl"
      :src="withBase(src)"
      :alt="alt"
      loading="lazy"
      class="rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-800 max-w-full h-auto"
    />

    <!-- SEO Friendly Caption -->
    <figcaption 
      v-if="caption || $slots.default" 
      class="mt-3 text-center"
    >
      <span itemprop="caption" class="text-sm text-slate-600 dark:text-slate-400 italic">
        <slot>{{ caption }}</slot>
      </span>
      
      <!-- Optional Credit Line -->
      <span v-if="credit" class="block text-[10px] uppercase tracking-widest opacity-50 mt-1">
        Photo by {{ credit }}
      </span>
    </figcaption>
  </figure>
</template>
