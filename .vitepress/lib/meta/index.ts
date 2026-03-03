import { type HeadConfig, type TransformContext } from 'vitepress'

export function generateMeta(context: TransformContext): HeadConfig[] {
  const { pageData } = context
  const { relativePath, title, description, frontmatter, headers } = pageData
  const hostname = 'https://ebook.avnlearn.com'

  // 1. Core SEO Data
  const pageTitle = frontmatter.title || title || 'AvN Learn'
  const pageDesc = frontmatter.description || description || "Expert academic ebooks for Bihar Board, NCERT, and CBSE."
  const cleanPath = relativePath.replace(/index\.md$/, '').replace(/\.md$/, '')
  const url = `${hostname}/${cleanPath}${cleanPath ? '.html' : ''}`

  // 2. Keywords Logic
  const defaultKeywords = ['AvN Learn', 'Bihar Board Ebooks', 'NCERT Solutions']
  const pageKeywords = Array.isArray(frontmatter.tags)
    ? [...frontmatter.tags, ...defaultKeywords].join(', ')
    : defaultKeywords.join(', ')

  // 3. Dynamic OG Image
  const ogImage = frontmatter.image
    ? `${hostname}${frontmatter.image.startsWith('/') ? '' : '/'}${frontmatter.image}`
    : `${hostname}/assets/og-default.png`

  // 4. Schema Components
  const isPost = frontmatter.layout === 'post'
  const isBook = !!frontmatter.isbn

  // Breadcrumb Schema
  const segments = relativePath.replace(/\.md$/, '').split('/').filter(Boolean)
  const breadcrumbSchema = {
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": hostname },
      ...segments.map((s, i) => ({
        "@type": "ListItem",
        "position": i + 2,
        "name": s.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        "item": `${hostname}/${segments.slice(0, i + 1).join('/')}.html`
      }))
    ]
  }

  // Table of Contents Schema
  const tocSchema = {
    "@type": "ItemList",
    "name": "Table of Contents",
    "itemListElement": headers
      .filter(h => h.level === 2)
      .map((header, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": header.title,
        "url": `${url}#${header.slug}`
      }))
  }

  // Unified Graph Schema (BlogPosting + Book)
  const graphSchema = {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumbSchema,
      tocSchema,
      isPost && {
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        "headline": pageTitle,
        "description": pageDesc,
        "image": ogImage,
        "datePublished": frontmatter.date || new Date().toISOString(),
        "author": { "@type": "Person", "name": frontmatter.author || "AvN Learn Team" },
        "publisher": {
          "@type": "Organization",
          "name": "AvN Learn",
          "logo": { "@type": "ImageObject", "url": `${hostname}/logo.png` }
        },
        "mainEntityOfPage": { "@type": "WebPage", "@id": url }
      },
      isBook && {
        "@type": "Book",
        "@id": `${url}#book`,
        "name": frontmatter.bookTitle || pageTitle,
        "isbn": frontmatter.isbn,
        "author": { "@type": "Person", "name": frontmatter.bookAuthor || "NCERT" },
        "workExample": {
          "@type": "Book",
          "bookEdition": frontmatter.edition || "2022-23",
          "bookFormat": "https://schema.org",
          "potentialAction": {
            "@type": "ReadAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": url,
              "actionPlatform": ["https://schema.org", "https://schema.org"]
            }
          }
        }
      }
    ].filter(Boolean)
  }

  // 5. Final Output
  const head: HeadConfig[] = [
    ['link', { rel: 'canonical', href: url }],
    ['meta', { name: 'description', content: pageDesc }],
    ['meta', { name: 'keywords', content: pageKeywords }],
    ['meta', { property: 'og:title', content: pageTitle }],
    ['meta', { property: 'og:description', content: pageDesc }],
    ['meta', { property: 'og:image', content: ogImage }],
    ['meta', { property: 'og:url', content: url }],
    ['meta', { property: 'og:type', content: isPost ? 'article' : 'website' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: pageTitle }],
    ['meta', { name: 'twitter:description', content: pageDesc }],
    ['meta', { name: 'twitter:image', content: ogImage }],
    ['script', { type: 'application/ld+json' }, JSON.stringify(graphSchema)]
  ]

  return head
}
