import { Link } from 'react-router-dom'
import { posts } from '../../lib/news'
import PostCard from '../PostCard'

export default function NewsSection() {
  const latest = posts.slice(0, 3)
  return (
    <section id="novinky" className="scroll-mt-20 bg-navy text-white">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-7 md:py-22">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="font-condensed text-[15px] font-bold uppercase tracking-[2.5px] text-sky">Novinky</span>
            <h2 className="mt-2.5 font-condensed text-4xl font-extrabold uppercase leading-none md:text-5xl">
              Zo života klubu
            </h2>
          </div>
          <Link to="/news" className="font-bold text-sky-light hover:text-white">
            Všetky novinky →
          </Link>
        </div>
        {latest.length === 0 ? (
          <p className="mt-8 text-slate-300">Zatiaľ žiadne novinky.</p>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {latest.map((p) => (
              <PostCard key={p.slug} post={p} variant="dark" />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
