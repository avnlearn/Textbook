<!-- .vitepress/theme/components/FileTree.vue -->
<script setup lang="ts">
interface FileItem { name: string; type: 'file' | 'dir'; depth?: number }
defineProps<{ items: FileItem[] }>()
</script>

<template>
  <div style="
    font-family: monospace; background: #f8fafc; 
    padding: 16px; border-radius: 8px; border: 1px solid #e2e8f0;
  ">
    <div v-for="item in items" :key="item.name"
      :style="{ paddingLeft: `${(item.depth || 0) * 20}px`, display: 'flex', gap: '8px', marginBottom: '4px' }">
      <span>{{ item.type === 'dir' ? '📁' : '📄' }}</span>
      <span :style="{ fontWeight: item.type === 'dir' ? 'bold' : 'normal' }">{{ item.name }}</span>
    </div>
  </div>
</template>
