<script setup lang="ts">
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'

const { page, frontmatter } = useData()

const breadcrumbs = computed(() => {
    const url = page.value.relativePath
    const list = [{ name: 'Home', url: '/' }]

    if (url.includes('bihar-board/')) list.push({ name: 'Bihar Board', url: '/bihar-board/' })
    else if (url.includes('ncert/')) list.push({ name: 'NCERT', url: '/ncert/' })
    else if (url.includes('posts/')) list.push({ name: 'Articles', url: '/posts/' })
    else if (url.includes('p/')) list.push({ name: 'Page', url: '/p/' })
    else list.push({ name: 'page', url: '/' })

    return list
})
</script>

<template>
    <nav class="flex items-center gap-2 mb-8 overflow-hidden whitespace-nowrap" aria-label="Breadcrumb">
        <template v-for="(crumb, i) in breadcrumbs" :key="i">
            <a :href="withBase(crumb.url)"
                class="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-colors">
                {{ crumb.name }}
            </a>
            <span class="text-slate-300 dark:text-slate-800 text-[10px]">/</span>
        </template>
        <span
            class="text-[10px] font-black uppercase tracking-widest text-slate-900 dark:text-white truncate opacity-60">
            {{ frontmatter.title }}
        </span>
    </nav>
</template>
