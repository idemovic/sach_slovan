import sponsors from '../../../content/data/sponsors.json'

interface Sponsor {
  name: string
  url?: string
  logo?: string
}

export default function Sponsors() {
  const list = sponsors as Sponsor[]
  if (list.length === 0) return null

  return (
    <section id="sponzori" className="border-t border-slate-200 bg-mist">
      <div className="mx-auto max-w-7xl px-5 py-14 text-center sm:px-7">
        <div className="font-condensed text-sm font-bold uppercase tracking-[2.5px] text-slate-400">Podporujú nás</div>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4.5">
          {list.map((s) => (
            <a
              key={s.name}
              href={s.url}
              target="_blank"
              rel="noreferrer"
              className="grid h-[74px] min-w-40 place-items-center rounded-xl border border-slate-200 bg-white px-6"
            >
              {s.logo ? (
                <img src={s.logo} alt={s.name} className="max-h-12 object-contain" />
              ) : (
                <span className="font-bold text-slate-500">{s.name}</span>
              )}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
