import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vitepress'
import markdownItSubSup from "./lib/markdown-it-sub-sup";
import markdownItFormatting from './lib/markdown-it-formatting';
import { googleServicesPlugin } from './plugins/google-services'

export default defineConfig({
  title: "AvN Learn: Comprehensive Ebooks for Bihar, NCERT, and CBSE",
  description: "AvN Learn is your ultimate resource for academic success. Offering a wide range of ebooks tailored for Bihar Board, NCERT, and CBSE students, we provide model papers, previous year questions, and detailed examples. Our ebooks are designed to enhance your learning experience and help you excel in your exams. Join us today to access expert-curated content that aligns with your curriculum and boosts your confidence. AvN Learn: Where learning meets excellence!",
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
    // Maps 'posts/my-article.md' to 'my-article.html'
    'posts/:slug*': ':slug*',
    // Keeps 'bihar-board/topic.md' as 'bihar-board/topic.html'
    'bihar-board/:slug*': 'bihar-board/:slug*',
    // Maps 'ncert/math.md' to 'math.html' (or keep it as /ncert/ if you prefer)
    'ncert/:slug*': 'ncert/:slug*' 
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
      { text: 'NCERT', link: '/ncert' },
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
