<!-- VFooter.vue -->
<template>
  <footer class="mt-20 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 py-12 px-6 print:hidden">
    <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
      
      <!-- Branding & Copyright -->
      <div class="flex flex-col items-center md:items-start">
        <p class="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500">
          © {{ new Date().getFullYear() }} My Company
        </p>
        <p class="text-xs font-bold text-slate-900 dark:text-white mt-1 uppercase tracking-widest">
          All Rights Reserved
        </p>
      </div>

      <!-- Links (SEO Friendly) -->
      <nav class="flex gap-8">
        <a href="/" class="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-colors">Home</a>
        <a href="/about" class="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-colors">About</a>
        <a href="/privacy" class="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-colors">Privacy</a>
      </nav>

    </div>
  </footer>
</template>

<script setup lang="ts">
// Logic for dynamic date is handled in template
</script>
