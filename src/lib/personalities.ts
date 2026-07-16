import { parseFrontmatter } from './markdown'

export interface Personality {
  slug: string
  name: string
  title?: string
  born?: string
  died?: string
  source?: string
  body: string
  order: number
}

// Konvencia: content/personalities/<slug>.md, telo v Markdowne + frontmatter
// (name povinne; title/born/died/source/order volitelne). source je odkaz na
// povodny dokument (PDF v public/files/).
const mdModules = import.meta.glob('/content/personalities/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

export const personalities: Personality[] = Object.entries(mdModules)
  .map(([path, raw]) => {
    const slug = path.split('/').at(-1)!.replace(/\.md$/, '')
    const { meta, body } = parseFrontmatter(raw)
    return {
      slug,
      name: meta.name ?? slug,
      title: meta.title || undefined,
      born: meta.born || undefined,
      died: meta.died || undefined,
      source: meta.source || undefined,
      body,
      order: Number(meta.order) || 999,
    }
  })
  .sort((a, b) => a.order - b.order || a.name.localeCompare(b.name, 'sk'))

export function getPersonality(slug: string): Personality | undefined {
  return personalities.find((p) => p.slug === slug)
}
