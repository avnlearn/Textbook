<!-- .vitepress/theme/components/DownloadLink.vue -->
<script setup lang="ts">
import { computed } from 'vue'
import { withBase } from 'vitepress'

interface Props {
  href: string
  /** style variant: primary, outline, ghost, danger */
  type?: "primary" | "outline" | "ghost" | "danger"
  /** SEO: Provide a clean filename for the saved file */
  filename?: string
  /** SEO/UX: Manually specify file extension (e.g., PDF, ZIP) */
  ext?: string
  /** SEO/UX: Display file size (e.g., 1.2 MB) */
  size?: string
}

const props = withDefaults(defineProps<Props>(), {
  type: "outline"
})

// 1. VitePress Path Normalization
const normalizedHref = computed(() => withBase(props.href))

// 2. SEO Meta: Extract extension for screen readers & search crawlers
const fileExtension = computed(() => {
  if (props.ext) return props.ext.toUpperCase()
  const parts = props.href.split('.')
  return parts.length > 1 ? parts.pop()?.toUpperCase() : 'FILE'
})
</script>

<template>
  <a
    :href="normalizedHref"
    :download="filename || true"
    :class="`btn-${props.type}`"
    style="display: inline-flex; align-items: center; gap: 12px; transition: all 0.2s ease; text-decoration: none;"
    type="application/octet-stream"
  >
    <!-- Left Icon (Unicode 📥) -->
    <slot name="left">
      <span style="font-size: 20px; line-height: 1; filter: saturate(0.8);">
        &#x1F4E5;
      </span>
    </slot>

    <!-- Content Container -->
    <div style="display: flex; flex-direction: column; align-items: flex-start; line-height: 1.2;">
      <span style="font-weight: 700; font-size: 15px;">
        <slot>Download Resource</slot>
      </span>
      
      <!-- Metadata Row: Helpful for accessibility and crawlers -->
      <span style="font-size: 10px; opacity: 0.6; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600; margin-top: 2px;">
        {{ fileExtension }} <span v-if="size" style="margin: 0 4px;">•</span> {{ size }}
      </span>
    </div>

    <!-- Hidden text for Screen Readers (SEO/Accessibility) -->
    <span style="position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); border: 0;">
      (Download {{ fileExtension }} file, {{ size || 'various sizes' }})
    </span>

    <slot name="right" />
  </a>
</template>
