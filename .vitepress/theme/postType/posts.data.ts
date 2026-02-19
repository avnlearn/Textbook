import { createContentLoader, type ContentData } from 'vitepress'
import path from 'node:path'
import { PostIgnore } from './ignorefile'
export interface Post {
  title: string
  slug?: string
  description?: string
  categories: string[]
  url: string
  tags: string[]
  image?: string
  date: { time: number; string: string }
  excerpt?: string
}

export type Data = Record<string, Post[]>
declare const data: Data
export { data }

export default createContentLoader(['posts/**/*.md', "!en/posts/index.md"], {
  excerpt: true,
  transform(raw: ContentData[]): Data {
    const grouped: Data = {}
    raw
      .filter(({ url, frontmatter }) => {
        const isIndex = url.endsWith('/') || url.endsWith('index.html')
        const isDraft = frontmatter.draft === true
        return !isIndex && !isDraft
      })
      .forEach((item) => {
        const { url, frontmatter, excerpt } = item

        // --- Locale Logic ---
        // /hi/posts/my-post -> ['hi', 'posts', 'my-post']
        // /posts/my-post -> ['posts', 'my-post']
        const parts = url.split('/').filter(Boolean)
        const locale = parts[0] === 'hi' ? 'hi' : 'en'

        // --- Image Path Resolution ---
        let image = frontmatter.image
        if (image && (image.startsWith('./') || image.startsWith('../'))) {
          image = path.join(path.dirname(url), image).replace(/\\/g, '/')
        }
        try {
          const post: Post = {
            title: frontmatter.title || 'Untitled',
            description: frontmatter.description,
            categories: Array.isArray(frontmatter.categories) ? frontmatter.categories : [],
            tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : [],
            image,
            excerpt,
            url,
            slug: parts.pop()?.replace(/\.html$/, '') || '',
            date: formatDate(frontmatter.date, locale),
          }

          if (!grouped[locale]) grouped[locale] = []
          grouped[locale].push(post)
        } catch (e) {
          console.log(e, url)
        }
      })

    // Sort each locale group by date
    Object.keys(grouped).forEach(key => {
      grouped[key].sort((a, b) => b.date.time - a.date.time)
    })

    return grouped
  },
  globOptions: {
    ignore: PostIgnore
  }
})

function formatDate(raw: any, locale: string): Post['date'] {
  const date = new Date(raw || Date.now())
  return {
    time: +date,
    string: new Intl.DateTimeFormat(locale === 'hi' ? 'hi-IN' : 'en-US', {
      year: 'numeric', month: 'long', day: 'numeric'
    }).format(date)
  }
}
