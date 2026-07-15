import { Link } from 'react-router-dom'
import { formatDate, type NewsPost } from '../lib/news'

export default function PostCard({ post, variant = 'light' }: { post: NewsPost; variant?: 'light' | 'dark' }) {
  const dark = variant === 'dark'
  return (
    <Link to={`/news/${post.slug}`} className="group block">
      <article
        className={`h-full overflow-hidden rounded-2xl border transition group-hover:-translate-y-1 group-hover:shadow-xl ${
          dark ? 'border-white/10 bg-navy-800' : 'border-slate-200 bg-white shadow-sm'
        }`}
      >
        {post.hero ? (
          <img src={post.hero} alt="" className="h-44 w-full object-cover" />
        ) : (
          <div className={`grid h-44 place-items-center ${dark ? 'photo-placeholder-dark' : 'photo-placeholder'}`}>
            <span className={`font-condensed text-4xl ${dark ? 'text-white/20' : 'text-slate-300'}`}>♞</span>
          </div>
        )}
        <div className="p-5">
          <div className="flex items-center gap-2.5">
            {post.tag && (
              <span className="rounded-[5px] bg-red px-2 py-0.5 text-xs font-bold tracking-wide text-white">{post.tag}</span>
            )}
            <span className={`text-[13px] font-semibold ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
              {formatDate(post.date)}
            </span>
          </div>
          <h3
            className={`mt-3 font-condensed text-[23px] font-bold uppercase leading-tight ${
              dark ? 'text-white' : 'text-navy'
            }`}
          >
            {post.title}
          </h3>
          <p className={`mt-2.5 text-[15px] leading-relaxed ${dark ? 'text-slate-300' : 'text-slate-600'}`}>
            {post.excerpt}
          </p>
        </div>
      </article>
    </Link>
  )
}
