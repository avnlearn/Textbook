import { createContentLoader, type ContentData } from 'vitepress'
import { fileExclude } from "./ignorefile"

export interface Post {
  title: string
  url: string
  date: { time: number; string: string }
  description?: string
  excerpt?: string
  image?: string
  tags?: string[]
  category: string
}

declare const data: Post[]
export { data }

export default createContentLoader(['posts/**/*.md', 'bihar-board/**/*.md', 'ncert/**/*.md'], {
  excerpt: true,
  transform(raw: ContentData[]): Post[] {
    return raw
      .filter(({ frontmatter }) => frontmatter.draft !== true)
      .map((item) => {
        const { url, frontmatter, excerpt } = item

        // 1. Map category based on folder path
        let category = 'post'
        if (url.includes('/bihar-board/')) category = 'bihar-board'
        else if (url.includes('/ncert/')) category = 'ncert'

        // 2. Slug & URL logic: removes folder prefix for "posts", keeps it for others
        const filename = url.split('/').filter(Boolean).pop()?.replace(/(\/index)?\.html$/, '') || 'index'
        const slug = frontmatter.slug || filename

        let finalUrl = `/${slug}`
        if (category === 'bihar-board') {
          finalUrl = `/bihar-board/${slug}`
        } else if (category === 'ncert') {
          finalUrl = `/ncert/${slug}`
        }

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
  globOptions: { ignore: fileExclude } // Uses fast-glob ignore patterns
})

function formatDate(raw: any): Post['date'] {
  const date = new Date(raw || Date.now())
  return {
    time: +date,
    string: new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date)
  }
}
