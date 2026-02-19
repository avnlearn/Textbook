import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vitepress'
import markdownItSubSup from "./lib/markdown-it-sub-sup";
import markdownItFormatting from './lib/markdown-it-formatting';
// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "AvN Learn Docs",
  description: "A avnlearn docs",
  appearance: 'dark',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
  ],
  sitemap: {
    hostname: 'https://avnlearn.github.io/Textbook' // Replace with your production URL
  },
  cleanUrls: true,
  // rewrites: {
  //   'posts/(.*)': '(.*)'
  // },
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
      { text: 'Home', link: '/' },
      {
        text: 'AvN Learn',
        items: [
          { text: 'Posts', link: '/posts' },
          { text: 'Book', link: '/books' },
          { text: 'Exam', link: '/exam' }
        ]
      },
      { text: 'Guide', link: '/guide' }
    ],
    search: {
      provider: 'local'
    }
  },
  srcDir: "docs",
  srcExclude: ['**/README.md', '**/TODO.md'],
  outDir: 'public',
  vite: {
    plugins: [
      tailwindcss()
    ]
  }
})
