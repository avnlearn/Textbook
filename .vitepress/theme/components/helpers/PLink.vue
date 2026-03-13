<!-- .vitepress/theme/component/PLink.vue -->
<script setup lang="ts">
import { computed, useSlots } from 'vue'
import { withBase } from 'vitepress'

interface Props {
    href?: string
    /** Button style variant. "cta" maps to .btn-call-to-action */
    type?: "cta" | "primary" | "outline" | "ghost" | "danger"
    /** HTML target (e.g., _blank) */
    target?: string
    /** SEO rel attribute (e.g., nofollow) */
    rel?: string
    /** Link language code */
    hreflang?: string
}

const props = withDefaults(defineProps<Props>(), {
    type: "primary"
})

const slots = useSlots()

// 1. Tag Logic: Use <a> if href exists, otherwise <button>
const tag = computed(() => (props.href ? 'a' : 'button'))

// 2. Link Normalization: Use withBase to handle sub-directory hosting (e.g., /docs/)
const normalizedHref = computed(() => (props.href ? withBase(props.href) : undefined))

// 3. External Link Detection for SEO
const isExternal = computed(() => props.href && /^(https?:|mailto:|tel:)/.test(props.href))

// 4. Automated SEO Security (rel="noopener noreferrer")
const computedRel = computed(() => {
    if (props.rel) return props.rel
    return isExternal.value || props.target === '_blank' ? 'noopener noreferrer' : undefined
})

// 5. CSS Class Mapping (Maps "cta" -> "btn-call-to-action")
const buttonClasses = computed(() => [
    props.type === 'cta' ? 'btn-call-to-action' : `btn-${props.type}`,
    (slots.left || slots.right) ? 'flex items-center gap-2' : ''
])
</script>

<template>
    <component :is="tag" :href="normalizedHref" :target="target ?? (isExternal ? '_blank' : undefined)"
        :rel="computedRel" :hreflang="hreflang" :class="buttonClasses" class="cursor-pointer">
        <!-- Left Icon Slot -->
        <slot name="left" />

        <!-- Main Content -->
        <span>
            <slot />
        </span>

        <!-- Right Icon Slot -->
        <slot name="right" />

        <!-- Screen Reader Help for External Links -->
        <span v-if="isExternal && !target" class="sr-only">(opens in new tab)</span>
    </component>
</template>
