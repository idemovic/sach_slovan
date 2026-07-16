import data from '../../../content/data/players.json'
import teamAData from '../../../content/data/team-a.json'
import { formatDate } from '../../lib/news'

// hostujuci hraci A-timu nemusia byt v matrike klubu, preto maju sszId volitelne
type Player = {
  name: string
  title?: string | null
  elo: number
  fideId?: string
  sszId?: string
}

const players = data.players as Player[]
const teamA = teamAData.players as Player[]
// prazdna supiska A-timu -> docasny fallback na top 8 hracov z matriky
const cards = teamA.length > 0 ? teamA : players.slice(0, 8)

function initials(name: string): string {
  const parts = name.split(/\s+/)
  return ((parts[0]?.[0] ?? '') + (parts[parts.length - 1]?.[0] ?? '')).toUpperCase()
}

function fideUrl(fideId: string): string {
  return `https://ratings.fide.com/profile/${fideId}`
}

// osobna karta hraca na chess.sk: /clen-<sszId>-<slug>; server berie do uvahy
// len ciselne ID, ale bez slugu vracia 404
function sszUrl(sszId: string, name: string): string {
  const slug = name
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
  return `https://www.chess.sk/clen-${sszId}-${slug}`
}

export default function Team() {
  return (
    <section id="tim" className="scroll-mt-20 border-y border-slate-200 bg-mist">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-7 md:py-22">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <span className="font-condensed text-[15px] font-bold uppercase tracking-[2.5px] text-red">Súpiska</span>
            <h2 className="mt-2.5 font-condensed text-4xl font-extrabold uppercase leading-none text-navy md:text-5xl">
              Naši hráči
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-slate-600">
            {teamA.length > 0 ? (
              <>Súpiska A-tímu. Zdroj: {teamAData.source}, stav k {formatDate(new Date(teamAData.updated))}.</>
            ) : (
              <>Najvyššie hodnotení hráči klubu. Zdroj: {data.source}, stav k {formatDate(new Date(data.updated))}.</>
            )}
          </p>
        </div>
        <div className="mt-9 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((p) => (
            <article
              key={p.sszId || p.fideId || p.name}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="photo-placeholder relative grid h-48 place-items-center">
                <span className="font-condensed text-5xl font-extrabold text-slate-300">{initials(p.name)}</span>
                {p.title && (
                  <span className="absolute left-3 top-3 rounded-md bg-navy px-2.5 py-1 font-condensed text-[13px] font-bold tracking-wide text-white">
                    {p.title}
                  </span>
                )}
                <span className="absolute right-3 top-3 rounded-md bg-red px-2.5 py-1 font-condensed text-[15px] font-extrabold text-white">
                  {p.elo}
                </span>
              </div>
              <div className="px-4 pb-4.5 pt-4">
                <div className="font-condensed text-[22px] font-bold uppercase leading-[1.05] text-navy">{p.name}</div>
                {p.fideId && (
                  <a
                    href={fideUrl(p.fideId)}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 inline-block text-sm font-semibold text-blue hover:text-blue-dark"
                  >
                    FIDE profil →
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>

        <details className="group mt-8">
          <summary className="cursor-pointer list-none font-condensed text-lg font-bold uppercase tracking-wide text-blue hover:text-blue-dark">
            <span className="mr-2 inline-block transition group-open:rotate-90">▶</span>
            Kompletná súpiska klubu ({players.length} hráčov)
          </summary>
          <div className="mt-4 overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full text-left text-[15px]">
              <thead>
                <tr className="border-b border-slate-200 font-condensed text-sm uppercase tracking-wide text-slate-400">
                  <th className="px-4 py-3 font-bold">#</th>
                  <th className="px-4 py-3 font-bold">Hráč</th>
                  <th className="px-4 py-3 text-right font-bold">Rating</th>
                  <th className="px-4 py-3 font-bold">FIDE</th>
                  <th className="px-4 py-3 font-bold">SŠZ</th>
                </tr>
              </thead>
              <tbody>
                {players.map((p, i) => (
                  <tr key={p.sszId} className="border-b border-slate-100 last:border-0 hover:bg-mist">
                    <td className="px-4 py-2 text-slate-400">{i + 1}</td>
                    <td className="px-4 py-2 font-semibold text-navy">
                      {p.title && <span className="mr-1.5 font-condensed font-bold text-blue">{p.title}</span>}
                      {p.name}
                    </td>
                    <td className="px-4 py-2 text-right font-bold text-navy">{p.elo}</td>
                    <td className="px-4 py-2">
                      {p.fideId && (
                        <a href={fideUrl(p.fideId)} target="_blank" rel="noreferrer" className="font-semibold text-blue hover:text-blue-dark">
                          {p.fideId}
                        </a>
                      )}
                    </td>
                    <td className="px-4 py-2">
                      {p.sszId && (
                        <a href={sszUrl(p.sszId, p.name)} target="_blank" rel="noreferrer" className="font-semibold text-blue hover:text-blue-dark">
                          {p.sszId}
                        </a>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </details>
      </div>
    </section>
  )
}
