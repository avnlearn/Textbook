import { writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { Feed } from 'feed'
import { createContentLoader, type SiteConfig, type ContentData } from 'vitepress'

export async function generateFeed(config: SiteConfig) {
  const hostname = 'https://ebook.avnlearn.com'
  const feed = new Feed({
    title: 'AvN Learn',
    id: hostname,
    link: hostname,
    copyright: `Copyright ${new Date().getFullYear()}, AvN Learn`,
  })

  // Explicitly type the loaded content
  const pages: ContentData[] = await createContentLoader('**/*.md', { excerpt: true }).load()
  
  pages.sort((a, b) => +new Date(b.frontmatter.date || 0) - +new Date(a.frontmatter.date || 0))

  for (const page of pages) {
    if (page.url.includes('README')) continue
    feed.addItem({
      title: (page.frontmatter.title as string) || 'Ebook Update',
      id: `${hostname}${page.url}`,
      link: `${hostname}${page.url}`,
      description: (page.frontmatter.description as string) || (page.excerpt as string) || '',
      date: new Date(page.frontmatter.date || Date.now()),
    })
  }

  writeFileSync(join(config.outDir, 'feed.xml'), feed.rss2())
}
