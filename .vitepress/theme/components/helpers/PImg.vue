<!-- .vitepress/theme/components/PImg.vue -->
<script setup lang="ts">
import { ref, computed, useSlots } from 'vue'
import { withBase } from 'vitepress'

interface Props {
  src: string
  alt?: string
  title?: string
  width?: string | number
  height?: string | number
  align?: 'left' | 'center' | 'right'
  inline?: boolean // New inline prop
  loading?: "lazy" | "eager"
}

const props = withDefaults(defineProps<Props>(), {
  loading: "lazy",
  align: 'center',
  inline: false
})

const slots = useSlots()
const hasCaption = computed(() => !!slots.default)

// --- AUTOMATIC META ---
const autoAlt = computed(() => {
  if (props.alt) return props.alt;
  const filename = props.src.split('/').pop()?.split('.')[0] || '';
  return filename ? `Image of ${filename.replace(/[-_]/g, ' ').trim()}` : 'Image description not available';
});


const autoTitle = computed(() => props.title || autoAlt.value)

// --- DIMENSION DETECTION ---
const autoWidth = ref<number | string | undefined>(props.width)
const autoHeight = ref<number | string | undefined>(props.height)

const handleLoad = (event: Event) => {
  const img = event.target as HTMLImageElement
  if (!props.width) autoWidth.value = img.naturalWidth
  if (!props.height) autoHeight.value = img.naturalHeight
}

// --- INLINE STYLES ---
const containerStyle = computed(() => ({
  display: props.inline ? 'inline-flex' : 'flex',
  flexDirection: 'column' as const,
  alignItems: props.align === 'left' ? 'flex-start' : props.align === 'right' ? 'flex-end' : 'center',
  width: props.inline ? 'auto' : '100%',
  margin: props.inline ? '0 0.5rem' : '1.5rem 0',
  verticalAlign: 'middle'
}))

const imgStyle = computed(() => ({
  maxWidth: '100%',
  height: 'auto',
  borderRadius: '0.75rem',
  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
  aspectRatio: autoWidth.value && autoHeight.value ? `${autoWidth.value}/${autoHeight.value}` : 'auto',
  display: 'block',
  objectFit: 'cover' as const,
}))

const captionStyle = {
  marginTop: '0.5rem',
  fontSize: '0.85rem',
  color: '#666666',
  fontStyle: 'italic'
}
</script>

<template>
  <figure :style="containerStyle" itemscope itemtype="https://schema.org/ImageObject">
    <img :src="withBase(src)" :alt="autoAlt" :title="autoTitle" :width="autoWidth" :height="autoHeight"
      :loading="loading" @load="handleLoad" :style="imgStyle" itemprop="image" />

    <figcaption v-if="hasCaption && !inline" :style="captionStyle" itemprop="caption">
      <slot />
    </figcaption>

    <meta itemprop="contentUrl" :content="withBase(src)">
    <meta itemprop="name" content="Image Title" />
    <meta itemprop="description" content="A brief description of the image." />
    <meta itemprop="author" content="AvN Learn" />
    <meta itemprop="dateCreated" content="2026-03-14" />
  </figure>
</template>
