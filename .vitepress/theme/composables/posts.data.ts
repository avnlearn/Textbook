import { createContentLoader, type ContentData } from 'vitepress'
import { FileExclude } from "./ignorefile"
export interface Post {
  title: string
  url: string
  date: { time: number; string: string }
  description?: string
  excerpt?: string
  image?: string
  tags?: string[]
  category: string
  slug?: string
}

declare const data: Post[]
export { data }

export default createContentLoader(['posts/**/*.md', 'bihar-board/**/*.md'], {
  excerpt: true,
  transform(raw: ContentData[]): Post[] {
    return raw
      .filter(({ frontmatter }) => frontmatter.draft !== true)
      .map((item) => {
        const { url, frontmatter, excerpt } = item

        // 1. Map category based on folder
        const category = url.includes('/bihar-board/') ? 'bihar-board' : 'posts'

        // 2. Slug Logic: Priority to frontmatter, fallback to filename
        const fileName = url.split('/').filter(Boolean).pop()?.replace(/(\/index)?\.html$/, '') || ''
        const slug = frontmatter.slug || fileName

        // Final URL: Rewrites handle 'posts/' removal, 'example/' stays
        const finalUrl = category === 'bihar-board' ? `/bihar-board/${slug}` : `/${slug}`

        return {
          title: frontmatter.title || 'Untitled Post',
          url: finalUrl,
          excerpt,
          description: frontmatter.description,
          image: frontmatter.image,
          tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : [],
          date: formatDate(frontmatter.date),
          category
        }
      })
      .sort((a, b) => b.date.time - a.date.time)
  },
  globOptions : {
    ignore : FileExclude
  }
})

function formatDate(raw: any): Post['date'] {
  const date = new Date(raw || Date.now())
  return {
    time: +date,
    string: new Intl.DateTimeFormat('en-US', {
      year: 'numeric', month: 'long', day: 'numeric'
    }).format(date)
  }
}
