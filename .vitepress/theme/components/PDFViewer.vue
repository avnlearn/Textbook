<!-- PDFViewer.vue -->
<script setup lang="ts">
import { ref, onMounted, onUnmounted, shallowRef } from 'vue'
import { withBase } from 'vitepress'

const props = defineProps<{ 
  url: string
  hrefs?: { name: string, href: string }[]
}>()

// Use shallowRef to hold the dynamic component
const PdfEngine = shallowRef<any>(null)

const containerRef = ref<HTMLElement | null>(null)
const pdfWidth = ref<number>(800)
const currentPage = ref(1)
const pageCount = ref(1)
const isLoading = ref(true)
const isScrollMode = ref(false)

// --- Navigation ---
const handleDocumentLoad = (pdf: any) => { 
  pageCount.value = pdf.numPages 
  isLoading.value = false
}
const prevPage = () => { if (currentPage.value > 1) currentPage.value-- }
const nextPage = () => { if (currentPage.value < pageCount.value) currentPage.value++ }

const toggleViewMode = () => {
  isScrollMode.value = !isScrollMode.value
  if (isScrollMode.value) currentPage.value = 1
}

let observer: ResizeObserver | null = null

onMounted(async () => {
  // CRITICAL: Dynamically import ONLY on the client
  try {
    const mod = await import('vue-pdf-embed')
    PdfEngine.value = mod.default
  } catch (e) {
    console.error('Failed to load PDF engine', e)
  }

  if (containerRef.value) {
    observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        pdfWidth.value = Math.min(entry.contentRect.width - 32, 900)
      }
    })
    observer.observe(containerRef.value)
  }
})

onUnmounted(() => observer?.disconnect())
</script>

<template>
  <ClientOnly>
    <div class="my-8 flex flex-col overflow-hidden rounded-3xl border border-slate-700 bg-[#323639] shadow-2xl transition-all">
      
      <!-- Toolbar -->
      <div class="flex flex-col gap-3 border-b border-white/10 bg-[#202124] p-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div class="flex items-center gap-3">
          <button 
            @click="toggleViewMode"
            class="flex items-center gap-2 rounded-lg px-3 py-1.5 text-[10px] font-black uppercase tracking-widest transition-all"
            :class="isScrollMode ? 'bg-blue-600 text-white' : 'bg-white/5 text-slate-400 hover:text-white'"
          >
            {{ isScrollMode ? 'Scrolling' : 'Paging' }}
          </button>

          <div v-if="!isScrollMode" class="flex items-center gap-2 text-white">
            <button @click="prevPage" :disabled="currentPage <= 1" class="disabled:opacity-20"><svg class="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-width="2" d="M15 19l-7-7 7-7" /></svg></button>
            <span class="text-[11px] font-bold tabular-nums">{{ currentPage }} / {{ pageCount }}</span>
            <button @click="nextPage" :disabled="currentPage >= pageCount" class="disabled:opacity-20"><svg class="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-width="2" d="M9 5l7 7-7 7" /></svg></button>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <a v-for="link in hrefs" :key="link.href" :href="withBase(link.href)" class="rounded-lg border border-white/10 px-3 py-1.5 text-[10px] font-bold text-slate-400 hover:bg-white/5 hover:text-white transition-all capitalize">
            {{ link.name }}
          </a>
          <a :href="withBase(url)" download class="rounded-lg bg-blue-600 px-4 py-1.5 text-[11px] font-black text-white hover:bg-blue-500 transition-colors shadow-lg shadow-blue-900/20 uppercase tracking-widest">
            Download
          </a>
        </div>
      </div>

      <!-- Viewer -->
      <div 
        ref="containerRef"
        class="relative flex justify-center overflow-y-auto bg-[#323639] p-4 sm:p-8 scrollbar-hide"
        :class="isScrollMode ? 'max-h-[800px]' : 'min-h-[500px]'"
      >
        <div v-if="isLoading" class="absolute inset-0 flex items-center justify-center z-10 bg-[#323639]">
          <div class="size-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
        </div>

        <div :style="{ width: pdfWidth + 'px' }" class="shadow-2xl transition-all duration-500">
          <!-- Render the component only when PdfEngine is loaded -->
          <component
            :is="PdfEngine"
            v-if="PdfEngine"
            :source="withBase(url)"
            :page="isScrollMode ? undefined : currentPage"
            @loaded="handleDocumentLoad"
            class="space-y-4"
          />
        </div>
      </div>
    </div>
  </ClientOnly>
</template>
