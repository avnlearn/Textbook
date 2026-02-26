<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { defineClientComponent } from 'vitepress'

// Define the client-side only component for SSR compatibility
const VuePdfEmbed = defineClientComponent(() => {
  return import('vue-pdf-embed').then((mod) => mod.default)
})

const props = defineProps<{ 
  url: string
  download?: boolean
  hrefs?: { name: string, href: string }[]
}>()

const containerRef = ref<HTMLElement | null>(null)
const pdfWidth = ref<number>(800)
const currentPage = ref(1)
const pageCount = ref(1)
const isLoading = ref(true)

// --- Navigation Logic ---
const handleDocumentLoad = (pdf: any) => { 
  pageCount.value = pdf.numPages 
  isLoading.value = false
}
const prevPage = () => { if (currentPage.value > 1) currentPage.value-- }
const nextPage = () => { if (currentPage.value < pageCount.value) currentPage.value++ }

// --- Keyboard Navigation ---
const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'ArrowLeft') prevPage()
  if (e.key === 'ArrowRight') nextPage()
}

// --- Gesture Logic (Touch & Mouse) ---
let startX = 0
let startY = 0
const minSwipeDistance = 50

const onStart = (e: TouchEvent | MouseEvent) => {
  startX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX
  startY = 'touches' in e ? e.touches[0].clientY : (e as MouseEvent).clientY
}

const onEnd = (e: TouchEvent | MouseEvent) => {
  const endX = 'changedTouches' in e ? e.changedTouches[0].clientX : (e as MouseEvent).clientX
  const endY = 'changedTouches' in e ? e.changedTouches[0].clientY : (e as MouseEvent).clientY
  
  const diffX = startX - endX
  const diffY = startY - endY

  // Ensure horizontal swipe is dominant to avoid page turns while scrolling vertically
  if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > minSwipeDistance) {
    diffX > 0 ? nextPage() : prevPage()
  }
}

// --- Responsive & Lifecycle ---
let observer: ResizeObserver | null = null
onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
  if (containerRef.value) {
    observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        // Limit max width for better readability on large screens
        pdfWidth.value = Math.min(entry.contentRect.width - 48, 1000)
      }
    })
    observer.observe(containerRef.value)
  }
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
  observer?.disconnect()
})
</script>

<template>
  <div class="my-8 flex flex-col overflow-hidden rounded-2xl border border-gray-700 bg-[#323639] shadow-2xl transition-all">
    <!-- Toolbar -->
    <div class="flex flex-col gap-3 border-b border-white/10 bg-[#202124] p-3 sm:flex-row sm:items-center sm:justify-between sm:px-8">
      
      <!-- Pager Controls -->
      <div class="flex items-center gap-4 text-white">
        <button 
          @click="prevPage" 
          :disabled="currentPage <= 1" 
          class="rounded-full p-2 hover:bg-white/10 disabled:opacity-20 transition-opacity"
          aria-label="Previous Page"
        >
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <span class="text-sm font-medium tabular-nums">
          Page {{ currentPage }} <span class="opacity-50">/ {{ pageCount }}</span>
        </span>

        <button 
          @click="nextPage" 
          :disabled="currentPage >= pageCount" 
          class="rounded-full p-2 hover:bg-white/10 disabled:opacity-20 transition-opacity"
          aria-label="Next Page"
        >
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <!-- Action Buttons (Links & Download) -->
      <div class="flex flex-wrap items-center gap-2">
        <template v-if="hrefs && hrefs.length">
          <a 
            v-for="link in hrefs" 
            :key="link.href"
            :href="link.href"
            target="_blank"
            rel="noopener noreferrer"
            class="rounded-lg border border-white/20 px-3 py-1.5 text-xs font-medium text-gray-300 hover:bg-white/5 hover:text-white transition-all"
          >
            {{ link.name }}
          </a>
        </template>

        <a 
          :href="url" 
          download 
          class="rounded-lg bg-blue-600 px-4 py-1.5 text-sm font-semibold text-white hover:bg-blue-500 transition-colors"
        >
          Download
        </a>
      </div>
    </div>

    <!-- Viewer Area -->
    <div 
      ref="containerRef"
      @mousedown="onStart"
      @mouseup="onEnd"
      @touchstart="onStart"
      @touchend="onEnd"
      class="relative flex min-h-[400px] justify-center overflow-auto p-6 scrollbar-hide cursor-grab active:cursor-grabbing"
    >
      <!-- Simple Loading Skeleton -->
      <div v-if="isLoading" class="absolute inset-0 flex items-center justify-center bg-[#323639] z-10">
        <div class="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
      </div>

      <div :style="{ width: pdfWidth + 'px' }" class="shadow-lg transition-transform duration-300 ease-out">
        <VuePdfEmbed
          :source="url"
          :page="currentPage"
          @loaded="handleDocumentLoad"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Utility to hide scrollbars while maintaining functionality */
.scrollbar-hide::-webkit-scrollbar { display: none; }
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
</style>
