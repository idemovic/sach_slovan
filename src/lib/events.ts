import { parseFrontmatter } from './markdown'

export interface ClubEvent {
  title: string
  date: Date
  type?: string
  location?: string
  tag?: string
}

// Konvencia: jeden .md subor v content/events/ = jedna udalost (staci frontmatter).
const mdModules = import.meta.glob('/content/events/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

export const events: ClubEvent[] = Object.values(mdModules)
  .map((raw) => {
    const { meta } = parseFrontmatter(raw)
    return {
      title: meta.title ?? '',
      date: new Date(meta.date ?? 0),
      type: meta.type || undefined,
      location: meta.location || undefined,
      tag: meta.tag || undefined,
    }
  })
  .filter((e) => e.title && !Number.isNaN(e.date.getTime()))
  .sort((a, b) => a.date.getTime() - b.date.getTime())
