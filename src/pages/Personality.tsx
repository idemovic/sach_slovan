import { Link, useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { getPersonality } from '../lib/personalities'

export default function Personality() {
  const { slug = '' } = useParams()
  const person = getPersonality(slug)

  if (!person) {
    return (
      <div className="mx-auto max-w-7xl px-7 py-32 text-center">
        <div className="font-condensed text-5xl font-extrabold uppercase text-navy">Profil sa nenašiel</div>
        <Link to="/history" className="mt-6 inline-block font-bold text-blue hover:text-blue-dark">
          ← Späť na históriu
        </Link>
      </div>
    )
  }

  return (
    <article>
      <div className="bg-navy text-white">
        <div className="mx-auto max-w-3xl px-5 pb-12 pt-14 sm:px-7 md:pb-14 md:pt-18">
          <Link to="/history" className="text-sm font-bold text-sky-light hover:text-white">
            ← Galéria osobností
          </Link>
          <h1 className="mt-5 font-condensed text-4xl font-extrabold uppercase leading-[1.02] sm:text-5xl">
            {person.title && <span className="mr-3 text-sky">{person.title}</span>}
            {person.name}
          </h1>
          {(person.born || person.died) && (
            <div className="mt-3 text-sm font-semibold text-slate-400">
              {person.born && <>* {person.born}</>}
              {person.born && person.died && ' - '}
              {person.died && <>† {person.died}</>}
            </div>
          )}
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-5 py-10 sm:px-7">
        <div className="prose prose-slate max-w-none prose-headings:font-condensed prose-headings:font-bold prose-headings:uppercase prose-headings:text-navy prose-a:text-blue">
          <ReactMarkdown>{person.body}</ReactMarkdown>
        </div>
        {person.source && (
          <div className="mt-10 border-t border-slate-200 pt-6">
            <a
              href={person.source}
              target="_blank"
              rel="noreferrer"
              className="inline-block font-semibold text-blue hover:text-blue-dark"
            >
              Pôvodný dokument (PDF) →
            </a>
          </div>
        )}
      </div>
    </article>
  )
}
