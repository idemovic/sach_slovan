import data from '../../content/data/standings.json'

type Standing = { league: string; team: string; rank: number; teams: number; url: string }

const standings = data.standings as Standing[]

// "ŠK Slovan Bratislava F" -> "F-tím"; bez pripony (extraliga) -> "A-tím"
function teamLabel(fullName: string): string {
  const suffix = fullName.replace(/^.*Bratislava\s*/, '').trim()
  return suffix ? `${suffix}-tím` : 'A-tím'
}

// slovenske sklonovanie podla poctu: 1 / 2-4 / 0,5+
function plural(n: number, one: string, few: string, many: string): string {
  if (n === 1) return one
  if (n >= 2 && n <= 4) return few
  return many
}

const PODIUM: Record<number, { medal: string; card: string; badge: string; rankText: string }> = {
  1: {
    medal: '🥇',
    card: 'border-amber-300 bg-gradient-to-br from-amber-100 to-white ring-2 ring-amber-400/70 shadow-md',
    badge: 'bg-amber-200',
    rankText: 'text-amber-600',
  },
  2: {
    medal: '🥈',
    card: 'border-slate-400 bg-gradient-to-br from-slate-300 to-white ring-2 ring-slate-400 shadow-md',
    badge: 'bg-slate-300',
    rankText: 'text-slate-600',
  },
  3: {
    medal: '🥉',
    card: 'border-orange-300 bg-gradient-to-br from-orange-100 to-white ring-2 ring-orange-300/70 shadow-md',
    badge: 'bg-orange-200',
    rankText: 'text-orange-700',
  },
}

export default function SeasonStandings() {
  const titles = standings.filter((s) => s.rank === 1).length
  const leagues = new Set(standings.map((s) => s.league)).size
  const stats = [
    { value: standings.length, label: plural(standings.length, 'družstvo', 'družstvá', 'družstiev') },
    { value: leagues, label: plural(leagues, 'súťaž', 'súťaže', 'súťaží') },
    { value: titles, label: plural(titles, 'titul majstra ligy', 'tituly majstra ligy', 'titulov majstra ligy') },
  ]

  return (
    <section>
      <div className="flex flex-wrap gap-x-10 gap-y-3">
        {stats.map((s) => (
          <div key={s.label}>
            <span className="font-condensed text-3xl font-extrabold text-navy">{s.value}</span>
            <span className="ml-2 text-sm font-semibold text-slate-500">{s.label}</span>
          </div>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-3 lg:grid-cols-2">
        {standings.map((s) => {
          const p = PODIUM[s.rank]
          return (
            <a
              key={s.team}
              href={s.url}
              target="_blank"
              rel="noreferrer"
              className={`flex items-center gap-4 rounded-xl border p-4 pr-5 transition hover:-translate-y-0.5 ${
                p ? `${p.card} hover:shadow-lg` : 'border-slate-200 bg-white shadow-sm hover:shadow-md'
              }`}
            >
              <div
                className={`grid shrink-0 place-items-center rounded-full ${
                  p ? `h-14 w-14 ${p.badge}` : 'h-12 w-12 bg-mist'
                }`}
              >
                {p ? (
                  <span className="text-3xl leading-none">{p.medal}</span>
                ) : (
                  <span className="font-condensed text-xl font-bold text-slate-500">{s.rank}</span>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-condensed text-lg font-bold uppercase leading-tight text-navy">{s.league}</div>
                <div className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-semibold text-slate-500">
                  <span>{teamLabel(s.team)}</span>
                  {s.rank === 1 && (
                    <span className="inline-flex items-center gap-1 rounded bg-amber-400 px-2 py-0.5 font-condensed text-[12px] font-bold uppercase tracking-wide text-amber-950">
                      🏆 Majster ligy
                    </span>
                  )}
                </div>
              </div>
              <div className="shrink-0 text-right">
                <div className={`font-condensed font-extrabold leading-none ${p ? `text-3xl ${p.rankText}` : 'text-2xl text-navy'}`}>
                  {s.rank}.
                </div>
                <div className="text-xs font-semibold text-slate-400">z {s.teams}</div>
              </div>
            </a>
          )
        })}
      </div>

      <p className="mt-6 text-sm text-slate-400">
        Zdroj: {data.source}, stav k {data.updated}.
      </p>
    </section>
  )
}
