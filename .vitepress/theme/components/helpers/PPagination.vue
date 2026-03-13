<script setup lang="ts">
import { ref } from 'vue'
import { withBase } from 'vitepress'

interface Props {
  prev?: string
  next?: string
  prevText?: string
  nextText?: string
}

withDefaults(defineProps<Props>(), {
  prevText: 'Previous',
  nextText: 'Next'
})

// State for hover animations
const isHoverPrev = ref(false)
const isHoverNext = ref(false)

const baseBtnStyle = "display: inline-flex; align-items: center; transition: color 0.2s;"
const arrowStyle = "display: inline-block; transition: transform 0.2s;"
</script>

<template>
  <nav aria-label="Pagination" style="margin-top: 3rem; display: flex; justify-content: center;">
    <div class="btn-group btn-g-bar" style="display: inline-flex;">

      <!-- Previous Page -->
      <a v-if="prev" :href="withBase(prev)" rel="prev" class="btn-primary" :style="baseBtnStyle"
        @mouseenter="isHoverPrev = true" @mouseleave="isHoverPrev = false">
        <span aria-hidden="true"
          :style="[arrowStyle, { transform: isHoverPrev ? 'translateX(-4px)' : 'translateX(0)', marginRight: '4px' }]">‹</span>
        {{ prevText }}
      </a>

      <!-- Next Page -->
      <a v-if="next" :href="withBase(next)" rel="next" class="btn-primary" :style="baseBtnStyle"
        @mouseenter="isHoverNext = true" @mouseleave="isHoverNext = false">
        {{ nextText }}
        <span aria-hidden="true"
          :style="[arrowStyle, { transform: isHoverNext ? 'translateX(4px)' : 'translateX(0)', marginLeft: '4px' }]">›</span>
      </a>

    </div>
  </nav>
</template>
