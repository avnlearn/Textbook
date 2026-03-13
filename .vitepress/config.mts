// config.mts
import { loadEnv, type UserConfig } from 'vitepress'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'
import markdownItSubSup from "./lib/markdown-it-sub-sup"
import markdownItFormatting from './lib/markdown-it-formatting'
import { googleServicesPlugin } from './plugins/google-services'
import { generateMeta } from './lib/meta'
import { generateFeed } from './lib/feed'

const config: any = async ({ mode }: { mode: string }): Promise<UserConfig> => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    title: "AvN Learn: Ebooks for Bihar, NCERT, and CBSE",

    head: [
      ['link', { rel: 'icon', href: '/favicon.ico' }],
      ['link', { rel: 'manifest', href: '/manifest.json' }],
      ['meta', { name: 'theme-color', content: '#2563eb' }],
      ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
      ['link', { rel: 'apple-touch-icon', href: 'apple-touch-icon.png' }]
    ],

    sitemap: { hostname: env.VITE_HOSTNAME || "https://ebook.avnlearn.com" },
    rewrites: {
      // Maps 'posts/my-article.md' to 'my-article.html'
      'posts/:slug*': ':slug*',
      // Keeps 'bihar-board/topic.md' as 'bihar-board/topic.html'
      'bihar-board/:slug*': 'bihar-board/:slug*',
      // Maps 'ncert/math.md' to 'math.html' (or keep it as /ncert/ if you prefer)
      'ncert/:slug*': 'ncert/:slug*'
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
    transformHead: (context) => generateMeta(context),
    buildEnd: (config) => generateFeed(config),

    cleanUrls: true,
    srcExclude: ['**/README.md', '**/TODO.md'],
    srcDir: "docs",
    outDir: 'dist',

    markdown: {
      config: (md) => {
        md.use(markdownItSubSup)
        md.use(markdownItFormatting)
      }
    },

    vite: {
      plugins: [
        tailwindcss(),
        VitePWA({
          registerType: 'autoUpdate',
          workbox: {
            maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
            globPatterns: ['**/*.{js,css,html,svg,png}'],
            runtimeCaching: [
              {
                urlPattern: ({ url }: { url: URL }) => url.pathname.endsWith('.pdf'),
                handler: 'CacheFirst',
                options: {
                  cacheName: 'ebook-cache',
                  expiration: { maxEntries: 100, maxAgeSeconds: 2592000 }
                }
              }
            ]
          }
        })
      ],
      optimizeDeps: { include: ['mark.js/src/vanilla.js'] },
      ssr: {
        // CRITICAL: Tells Vite not to bundle these for the Node.js build
        noExternal: ['vue-pdf-embed', 'pdfjs-dist']
      },
      build: {
        chunkSizeWarningLimit: 3000,
        rollupOptions: {
          onwarn(warning, warn) {
            if (warning.code === 'DYNAMIC_IMPORT_VAR') return
            warn(warning)
          },
          output: {
            manualChunks(id: string) {
              if (id.includes('node_modules/pdfjs-dist')) return 'pdf-worker'
            }
          }
        }
      }
    },

    ...(googleServicesPlugin({
      gaId: env.VITE_GA_ID || 'G-DEFAULT',
      searchConsoleId: env.VITE_SEARCH_CONSOLE_ID || ''
    }) as any)
  }
}

export default config
