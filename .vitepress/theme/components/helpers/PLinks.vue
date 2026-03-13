<!-- .vitepress/theme/components/PLinks.vue -->
<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  /** Layout style: bar (horizontal), grid (2x2), or list (vertical) */
  layout?: "bar" | "grid" | "list"
}

const props = withDefaults(defineProps<Props>(), {
  layout: "bar"
})

const groupClasses = computed(() => {
  const base = "btn-group"
  const variants = {
    bar: "btn-g-bar",   // Horizontal flex-row
    grid: "btn-g-grid", // 2-column grid
    list: "btn-g-list"  // Vertical flex-col
  }
  return [base, variants[props.layout]]
})
</script>

<template>
  <nav :class="groupClasses">
    <slot />
  </nav>
</template>
