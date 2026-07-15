import { parseFrontmatter } from './markdown'

export interface NewsPost {
  slug: string
  title: string
  date: Date
  tag?: string
  excerpt: string
  body: string
  hero?: string
  gallery: string[]
}

// Konvencie: content/news/<slug>/index.md + volitelny hero.(jpg|jpeg|png|webp)
// + volitelny priecinok gallery/ - vsetko sa nacita pri builde cez import.meta.glob.
const mdModules = import.meta.glob('/content/news/*/index.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

const imageModules = import.meta.glob('/content/news/*/*.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default',
}) as Record<string, string>

const galleryModules = import.meta.glob('/content/news/*/gallery/*.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default',
}) as Record<string, string>

function firstParagraph(body: string): string {
  const block = body
    .split(/\r?\n\r?\n/)
    .map((b) => b.trim())
    .find((b) => b && !b.startsWith('#') && !b.startsWith('!['))
  return block ? block.replace(/[*_`>#]/g, '') : ''
}

export const posts: NewsPost[] = Object.entries(mdModules)
  .map(([path, raw]) => {
    const slug = path.split('/')[3]
    const { meta, body } = parseFrontmatter(raw)
    const hero = Object.entries(imageModules).find(([p]) =>
      p.startsWith(`/content/news/${slug}/hero.`),
    )?.[1]
    const gallery = Object.entries(galleryModules)
      .filter(([p]) => p.startsWith(`/content/news/${slug}/gallery/`))
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([, url]) => url)
    return {
      slug,
      title: meta.title ?? slug,
      date: new Date(meta.date ?? 0),
      tag: meta.tag || undefined,
      excerpt: meta.excerpt || firstParagraph(body),
      body,
      hero,
      gallery,
    }
  })
  .sort((a, b) => b.date.getTime() - a.date.getTime())

export function getPost(slug: string): NewsPost | undefined {
  return posts.find((p) => p.slug === slug)
}

// Obrazok vlozeny v markdown texte relativnou cestou (napr. ![popis](foto.jpg))
// sa hlada v priecinku clanku.
export function resolvePostImage(slug: string, src: string): string | undefined {
  return imageModules[`/content/news/${slug}/${src}`]
}

// Fotky do sekcie Galeria na homepage - z galerii najnovsich clankov.
export const latestGalleryImages: string[] = posts.flatMap((p) => p.gallery)

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('sk-SK', { day: 'numeric', month: 'long', year: 'numeric' }).format(date)
}
