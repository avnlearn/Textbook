<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, watch } from 'vue'
import DarkModeToggle from "../helpers/DarkModeToggle.vue";
import { useData, withBase } from 'vitepress'
// @ts-ignore
import VPNavBarSearch from 'vitepress/dist/client/theme-default/components/VPNavBarSearch.vue'


const { site, theme, frontmatter } = useData()

const isSearchOpen = ref(false)
const isMobileMenuOpen = ref(false)
const windowWidth = ref(0)
const isMobile = computed(() => windowWidth.value < 768)

const updateWidth = () => {
    windowWidth.value = window.innerWidth
    if (!isMobile.value) isMobileMenuOpen.value = false
}

watch(isMobileMenuOpen, (val) => {
    document.body.style.overflow = val ? 'hidden' : ''
})

const handleKey = (e: KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        isSearchOpen.value = true
    }
    if (e.key === 'Escape') {
        isSearchOpen.value = false
        isMobileMenuOpen.value = false
    }
}

onMounted(() => {
    updateWidth()
    window.addEventListener('resize', updateWidth)
    window.addEventListener('keydown', handleKey)
})

onUnmounted(() => {
    window.removeEventListener('resize', updateWidth)
    window.removeEventListener('keydown', handleKey)
})
const { isDark } = useData()

function toggleDark() {
    isDark.value = !isDark.value
}
</script>

<template>
    <!-- ... (Desktop nav code removed for brevity) ... -->
    <nav class="sticky top-0 z-50 select-none transition-transform duration-300 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 print:hidden"
        :class="{ '-translate-y-full': frontmatter.navbar === false }">

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-16">

                <!-- Logo -->
                <div class="flex items-center gap-4 z-30">
                    <a :href="withBase('/')" class="flex items-center gap-3 hover:opacity-80 transition-opacity">
                        <img v-if="theme.logo" :src="withBase(theme.logo)" alt="Logo" class="h-12! w-auto" />
                        <span class="sr-only" v-show="!isSearchOpen || !isMobile">
                            {{ site.title }}
                        </span>
                    </a>
                </div>

                <!-- Right Side -->
                <div class="flex items-center gap-2">
                    <div v-show="!isMobile && !isSearchOpen" class="md:flex items-center mr-4 max-lg:hidden gap-5">
                        <!-- Desktop menu items here -->
                        <div v-for="item in theme.nav" :key="item.text" class="relative group">
                            <!-- 1. Standard Link (Single Item) -->
                            <a v-if="!item.items" :href="withBase(item.link)" @click="isMobileMenuOpen = false"
                                class="block font-bold lg:text-sm lg:font-medium text-slate-900 dark:text-white hover:text-blue-600 transition-colors">
                                {{ item.text }}
                            </a>

                            <!-- 2. Grouped Links (Dropdown/Accordion) -->
                            <details v-else class="group/details">
                                <summary
                                    class="flex items-center justify-between cursor-pointer list-none [&::-webkit-details-marker]:hidden gap-1">
                                    <span
                                        class="font-bold lg:font-medium text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                                        {{ item.text }}
                                    </span>
                                    <!-- Adaptive Chevron -->
                                    <svg xmlns="http://www.w3.org"
                                        class="size-4 text-slate-400 transition-transform duration-300 group-open/details:rotate-180"
                                        fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M19 9l-7 7-7-7" />
                                    </svg>
                                </summary>

                                <!-- Dropdown Container -->
                                <!-- Mobile: Vertical list | Desktop: Floating Menu -->
                                <div
                                    class="top-8 absolute left-0 w-40 lg:w-48 rounded-md border border-slate-200 bg-white p-2 shadow-lg dark:border-slate-800 dark:bg-slate-900 z-50">
                                    <div
                                        class="grid gap-4 pl-4 border-l-2 border-slate-200 dark:border-slate-800 lg:pl-0 lg:border-none">
                                        <a v-for="sub in item.items" :key="sub.link" :href="withBase(sub.link)"
                                            @click="isMobileMenuOpen = false"
                                            class="block font-medium lg:text-sm text-slate-600 dark:text-slate-400 hover:text-blue-500 lg:hover:bg-slate-50 lg:dark:hover:bg-slate-800 lg:px-4 lg:py-2 lg:rounded-md transition-colors">
                                            {{ sub.text }}
                                        </a>
                                    </div>
                                </div>
                            </details>
                        </div>

                    </div>
                    <div class="flex items-center gap-2">
                        <div :class="[
                            'transition-all duration-300 ease-in-out flex items-center',
                            isSearchOpen ? 'w-[200px] sm:w-[300px]' : 'w-0 overflow-hidden opacity-0'
                        ]">
                            <VPNavBarSearch class="w-full" />
                        </div>

                        <button @click="isSearchOpen = !isSearchOpen"
                            class="p-2 ml-1 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                            <svg v-if="!isSearchOpen" class="size-5" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor" stroke-width="2">
                                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <svg v-else class="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                                stroke-width="2">
                                <path d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <DarkModeToggle />
                    </div>

                    <!-- Mobile Menu Toggle -->
                    <button v-if="isMobile" @click="isMobileMenuOpen = !isMobileMenuOpen"
                        class="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
                        <svg class="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path v-if="!isMobileMenuOpen" d="M4 6h16M4 12h16M4 18h16" />
                            <path v-else d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </nav>

    <!-- Mobile Drawer Overlay -->
    <Transition enter-active-class="transition duration-300 ease-out" enter-from-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100" leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100 scale-100" leave-to-class="opacity-0 scale-95">
        <!-- Use inset-0 and size-full for complete screen coverage -->
        <div v-if="isMobileMenuOpen" class="fixed inset-0 z-100 md:hidden bg-white dark:bg-slate-950 flex flex-col">

            <!-- Header: Logo + Close -->
            <div
                class="flex items-center justify-between h-16 px-6 border-b border-slate-200 dark:border-slate-800 shrink-0">
                <a :href="withBase('/')" class="flex items-center gap-3" @click="isMobileMenuOpen = false">
                    <img v-if="theme.logo" :src="withBase(theme.logo)" alt="Logo" class="h-8 w-auto" />
                    <span class="font-bold text-xs tracking-tight dark:text-white">
                        {{ site.title }}
                    </span>
                </a>

                <button @click="isMobileMenuOpen = false"
                    class="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
                    aria-label="Close Menu">
                    <svg class="size-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <!-- Scrollable Navigation Body -->
            <div class="flex-1 overflow-y-auto px-6 py-8">
                <div class="flex flex-col gap-10">
                    <div v-for="item in theme.nav" :key="item.text" class="space-y-5">
                        <!-- Standard Link -->
                        <a v-if="!item.items" :href="withBase(item.link)" @click="isMobileMenuOpen = false"
                            class="block text-3xl font-bold text-slate-900 dark:text-white hover:text-blue-600 transition-colors">
                            {{ item.text }}
                        </a>

                        <!-- Grouped Links -->
                        <div v-else class="space-y-4">
                            <p class="text-sm font-black text-slate-400 uppercase tracking-[0.2em]">{{ item.text }}</p>
                            <div class="grid gap-4 pl-4 border-l-2 border-slate-200 dark:border-slate-800">
                                <a v-for="sub in item.items" :key="sub.link" :href="withBase(sub.link)"
                                    @click="isMobileMenuOpen = false"
                                    class="block text-xl font-medium text-slate-600 dark:text-slate-400 hover:text-blue-500 transition-colors">
                                    {{ sub.text }}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Optional Footer (e.g., Social Icons or Version) -->
            <div class="p-6 border-t border-slate-100 dark:border-slate-900 text-center">
                <p class="text-xs text-slate-400 font-medium">© {{ new Date().getFullYear() }} {{ site.title }}</p>
            </div>
        </div>
    </Transition>
</template>
