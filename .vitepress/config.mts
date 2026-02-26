import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vitepress'
import markdownItSubSup from "./lib/markdown-it-sub-sup";
import markdownItFormatting from './lib/markdown-it-formatting';
import { googleServicesPlugin } from './plugins/google-services'

export default defineConfig({
  title: "AvN Learn Docs",
  description: "A avnlearn docs",
  // base: '/Textbook/',
  appearance: 'dark',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
  ],
  sitemap: {
    hostname: "https://ebook.avnlearn.com"
    // hostname: 'https://avnlearn.github.io/Textbook' // Replace with your production URL
  },
  cleanUrls: true,
  rewrites: {
    'posts/(.*)': '(.*)',
    'bseb/(.*)': 'bseb/(.*)'
  },
  markdown: {
    config: (md) => {
      // use more markdown-it plugins!
      md.use(markdownItSubSup)
      md.use(markdownItFormatting)
    }

  },
  lastUpdated: true,
  themeConfig: {
    logo: "/assets/logo.o.svg",
    nav: [
      { text: 'Home', link: "https://www.avnlearn.com" },
      { text: 'Bihar Board', link: '/bihar-board' },
    ],

    search: {
      provider: 'local'
    }
  },
  srcDir: "docs",
  srcExclude: ['**/README.md', '**/TODO.md'],
  outDir: 'dist',
  vite: {
    plugins: [
      tailwindcss()
    ],
    ssr: {
      // Prevents "window is not defined" errors during build
      noExternal: ['vue-pdf-embed', 'pdfjs-dist']
    }
  },
  ...googleServicesPlugin({
    gaId: 'G-NHCE9C7TQ3',
    searchConsoleId: 'ftjLgS6JkV3lI2iH5fRAvHi88wGzNYuIuOUTDjwK3W8'
  })
})
