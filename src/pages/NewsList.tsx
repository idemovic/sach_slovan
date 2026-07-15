import { posts } from '../lib/news'
import PostCard from '../components/PostCard'
import PageHeader from '../components/PageHeader'

export default function NewsList() {
  return (
    <>
      <PageHeader eyebrow="Novinky" title="Zo života klubu" />
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-7 md:py-16">
        {posts.length === 0 ? (
          <p className="text-lg text-slate-600">Zatiaľ žiadne novinky.</p>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        )}
      </div>
    </>
  )
}
