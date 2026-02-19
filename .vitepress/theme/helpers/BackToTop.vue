<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isVisible = ref(false)

// Show button after scrolling down 300px
const toggleVisibility = () => {
    isVisible.value = window.scrollY > 300
}

const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => window.addEventListener('scroll', toggleVisibility))
onUnmounted(() => window.removeEventListener('scroll', toggleVisibility))
</script>

<template>
    <button v-show="isVisible" @click="scrollToTop"
        class="fixed bottom-8 right-8 z-50 p-3 rounded-full bg-indigo-600 text-white shadow-xl hover:bg-indigo-700 focus:outline-none transition-all duration-300 hover:scale-110 active:scale-95 print:hidden"
        aria-label="Back to top">
        <svg xmlns="http://www.w3.org" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
    </button>
</template>
