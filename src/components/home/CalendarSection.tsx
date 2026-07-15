import { events } from '../../lib/events'

const monthFmt = new Intl.DateTimeFormat('sk-SK', { month: 'short' })

export default function CalendarSection() {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const upcoming = events.filter((e) => e.date.getTime() >= today.getTime())

  return (
    <section id="kalendar" className="mx-auto max-w-7xl scroll-mt-20 px-5 py-16 sm:px-7 md:py-22">
      <span className="font-condensed text-[15px] font-bold uppercase tracking-[2.5px] text-red">Kalendár</span>
      <h2 className="mb-7 mt-2.5 font-condensed text-4xl font-extrabold uppercase leading-none text-navy md:text-5xl">
        Nadchádzajúce podujatia
      </h2>
      {upcoming.length === 0 ? (
        <p className="text-lg text-slate-600">Momentálne nie sú naplánované žiadne podujatia.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {upcoming.map((e, i) => {
            const next = i === 0
            const tag = next ? ['▶ Najbližšie', e.tag].filter(Boolean).join(' · ') : e.tag
            return (
              <div
                key={e.date.toISOString() + e.title}
                className={`grid grid-cols-[80px_1fr] items-center gap-4 rounded-xl border p-4 sm:grid-cols-[96px_1fr_auto] sm:gap-5 sm:px-5 ${
                  next ? 'border-blue/30 bg-blue/5' : 'border-slate-200 bg-white'
                }`}
              >
                <div className="border-r border-slate-200 pr-3 text-center">
                  <div className={`font-condensed text-3xl font-extrabold leading-none sm:text-[34px] ${next ? 'text-blue' : 'text-navy'}`}>
                    {String(e.date.getDate()).padStart(2, '0')}
                  </div>
                  <div className="text-[13px] font-bold uppercase tracking-[1.5px] text-slate-400">
                    {monthFmt.format(e.date).replace('.', '')}
                  </div>
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="font-condensed text-xl font-bold uppercase text-navy sm:text-[22px]">{e.title}</span>
                    {e.type && (
                      <span className="rounded-md bg-blue/10 px-2 py-0.5 text-xs font-bold tracking-wide text-blue">{e.type}</span>
                    )}
                  </div>
                  {e.location && <div className="mt-1 text-[15px] font-semibold text-slate-500">📍 {e.location}</div>}
                </div>
                {tag && (
                  <div className={`col-span-2 font-condensed text-sm font-bold uppercase tracking-wide sm:col-span-1 ${next ? 'text-blue' : 'text-slate-400'}`}>
                    {tag}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </section>
  )
}
