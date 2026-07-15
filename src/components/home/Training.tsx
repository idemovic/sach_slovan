// TODO: overit s klubom realnu ponuku treningov - kategorie nizsie su z navrhu (PLAN.md sekcia 8)
const tiers = [
  {
    label: 'Prípravka',
    name: 'Deti 5-10',
    desc: 'Hravé základy, mat v jednom ťahu a prvé turnaje. 1× týždenne.',
    items: ['♟ 60 min / týždeň', '♟ malé skupiny', '♟ školské turnaje'],
    featured: false,
  },
  {
    label: 'Mládežnícka akadémia',
    name: 'Mládež 11-18',
    desc: 'Systematická príprava s trénermi-majstrami, rozbory partií a súťaže.',
    items: ['♞ 2× týždenne', '♞ individuálne rozbory', '♞ účasť na extralige'],
    featured: true,
  },
  {
    label: 'Dospelí',
    name: 'Rekreačne',
    desc: 'Klubové večery, bleskový šach a možnosť hrať za nižšie družstvá.',
    items: ['♜ otvorené klubové večery', '♜ FIDE turnaje', '♜ online liga'],
    featured: false,
  },
]

export default function Training() {
  return (
    <section id="trening" className="scroll-mt-20 border-t border-slate-200 bg-mist">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-7 md:py-22">
        <div className="mx-auto max-w-2xl text-center">
          <span className="font-condensed text-[15px] font-bold uppercase tracking-[2.5px] text-red">
            Tréning & členstvo
          </span>
          <h2 className="mb-3 mt-2.5 font-condensed text-4xl font-extrabold uppercase leading-none text-navy md:text-5xl">
            Pridaj sa na svojej úrovni
          </h2>
          <p className="text-[17px] leading-relaxed text-slate-600">
            Tréningy prebiehajú počas celého školského roka v klubovni. Prvá hodina je vždy zadarmo.
          </p>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
          {tiers.map((t) => (
            <div
              key={t.label}
              className={`relative rounded-2xl border p-7 ${
                t.featured
                  ? 'border-navy bg-navy text-white shadow-2xl shadow-navy/25'
                  : 'border-slate-200 bg-white'
              }`}
            >
              {t.featured && (
                <span className="absolute right-4 top-4 rounded-md bg-red px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-white">
                  Najobľúbenejšie
                </span>
              )}
              <div
                className={`max-w-[180px] font-condensed text-[15px] font-bold uppercase tracking-[1.5px] ${
                  t.featured ? 'text-sky-light' : 'text-blue'
                }`}
              >
                {t.label}
              </div>
              <div className={`mb-0.5 mt-2 font-condensed text-4xl font-extrabold ${t.featured ? '' : 'text-navy'}`}>
                {t.name}
              </div>
              <p className={`text-[15px] leading-relaxed ${t.featured ? 'text-slate-300' : 'text-slate-500'}`}>
                {t.desc}
              </p>
              <ul
                className={`mt-4.5 flex flex-col gap-2 text-[15px] font-semibold ${
                  t.featured ? 'text-slate-200' : 'text-slate-600'
                }`}
              >
                {t.items.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
