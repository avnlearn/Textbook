<script setup lang="ts">
import { ref } from 'vue'
import { withBase } from 'vitepress'

interface BreadcrumbItem { text: string; link?: string }
defineProps<{ items: BreadcrumbItem[] }>()

const hoverIdx = ref<number | null>(null)


</script>

<template>
  <nav aria-label="Breadcrumb" style="margin-bottom: 1.5rem;">
    <ol itemscope itemtype="https://schema.org"
      style="display: flex; flex-wrap: wrap; align-items: center; gap: 4px; list-style: none; padding: 0; font-size: 14px;">

      <li v-for="(item, index) in items" :key="index" itemprop="itemListElement" itemscope itemtype="https://schema.org"
        style="display: flex; align-items: center; gap: 4px;">

        <template v-if="item.link && index < items.length - 1">
          <a itemprop="item" :href="withBase(item.link)" @mouseenter="hoverIdx = index" @mouseleave="hoverIdx = null"
            class="btn-ghost">
            <span itemprop="name">{{ item.text }}</span>
          </a>
          <!-- Unicode Separator -->
          <span aria-hidden="true" style="opacity: 0.4; user-select: none;">›</span>
        </template>

        <template v-else>
          <span style="font-weight: 600; padding: 4px 8px;" aria-current="page">
            <span itemprop="name">{{ item.text }}</span>
          </span>
        </template>

        <meta itemprop="position" :content="(index + 1).toString()" />
      </li>
    </ol>
  </nav>
</template>
