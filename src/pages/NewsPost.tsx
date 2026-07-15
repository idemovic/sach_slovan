import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { formatDate, getPost, resolvePostImage } from '../lib/news'
import Lightbox from '../components/Lightbox'

export default function NewsPost() {
  const { slug = '' } = useParams()
  const post = getPost(slug)
  const [lightbox, setLightbox] = useState<number | null>(null)

  if (!post) {
    return (
      <div className="mx-auto max-w-7xl px-7 py-32 text-center">
        <div className="font-condensed text-5xl font-extrabold uppercase text-navy">Článok sa nenašiel</div>
        <Link to="/news" className="mt-6 inline-block font-bold text-blue hover:text-blue-dark">
          ← Späť na novinky
        </Link>
      </div>
    )
  }

  return (
    <article>
      <div className="bg-navy text-white">
        <div className="mx-auto max-w-3xl px-5 pb-12 pt-14 sm:px-7 md:pb-14 md:pt-18">
          <Link to="/news" className="text-sm font-bold text-sky-light hover:text-white">
            ← Všetky novinky
          </Link>
          <div className="mt-5 flex items-center gap-3">
            {post.tag && (
              <span className="rounded-[5px] bg-red px-2.5 py-1 text-xs font-bold tracking-wide text-white">{post.tag}</span>
            )}
            <span className="text-sm font-semibold text-slate-400">{formatDate(post.date)}</span>
          </div>
          <h1 className="mt-4 font-condensed text-4xl font-extrabold uppercase leading-[1.02] sm:text-5xl">
            {post.title}
          </h1>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-5 py-10 sm:px-7">
        {post.hero && (
          <img src={post.hero} alt="" className="mb-10 w-full rounded-2xl border border-slate-200 object-cover" />
        )}
        <div className="prose prose-slate max-w-none prose-headings:font-condensed prose-headings:font-bold prose-headings:uppercase prose-headings:text-navy prose-a:text-blue">
          <ReactMarkdown
            components={{
              img: ({ src, alt }) => {
                const s = typeof src === 'string' ? src : ''
                const resolved = s && !/^(https?:)?\//.test(s) ? (resolvePostImage(post.slug, s) ?? s) : s
                return <img src={resolved} alt={alt ?? ''} className="rounded-xl" />
              },
            }}
          >
            {post.body}
          </ReactMarkdown>
        </div>

        {post.gallery.length > 0 && (
          <div className="mt-12 border-t border-slate-200 pt-8">
            <h2 className="font-condensed text-3xl font-extrabold uppercase text-navy">Fotogaléria</h2>
            <div className="mt-5 grid grid-cols-2 gap-3.5 sm:grid-cols-3">
              {post.gallery.map((src, i) => (
                <button
                  type="button"
                  key={src}
                  onClick={() => setLightbox(i)}
                  aria-label={`Otvoriť fotografiu ${i + 1}`}
                  className="block cursor-pointer overflow-hidden rounded-xl border border-slate-200"
                >
                  <img
                    src={src}
                    alt={`${post.title} - fotografia ${i + 1}`}
                    className="aspect-[4/3] w-full object-cover transition hover:scale-105"
                  />
                </button>
              ))}
            </div>
            {lightbox !== null && (
              <Lightbox images={post.gallery} index={lightbox} onClose={() => setLightbox(null)} onIndex={setLightbox} />
            )}
          </div>
        )}
      </div>
    </article>
  )
}
