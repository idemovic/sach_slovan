import PageHeader from '../components/PageHeader'

const DL = 'https://download.slovan-bratislava.com'
const OLD = 'https://www.slovan-bratislava.com'

const documents = [
  { label: 'História klubu (PDF)', href: `${DL}/Historia/Klub/Historia.pdf` },
  { label: 'Fotografie klubu (PDF)', href: `${DL}/Historia/Klub/Slovanfoto.pdf` },
  { label: 'Stanovy klubu z roku 1925 (PDF)', href: `${DL}/Historia/Klub/1925Stanovy.pdf` },
  { label: 'Zápisnica z roku 1945 (PDF)', href: `${DL}/Historia/Klub/1945Zapisnica.pdf` },
]

// TODO: obsah profilov zatial zije na povodnom webe - po zozrkadleni presunut pod /files
const personalities = [
  { name: 'Gustáv Šturc', href: `${OLD}/Osobnosti/SturcG.htm` },
  { name: 'Peter Petrán', href: `${OLD}/Osobnosti/Petran.htm` },
  { name: 'Tadeáš Nemec', href: `${OLD}/Osobnosti/NemecZiv.htm` },
  { name: 'Anton Kramárik', href: `${OLD}/Osobnosti/Kramarik.htm` },
  { name: 'Ján Báňas', href: `${OLD}/Osobnosti/Banas.htm` },
  { name: 'Miroslav Malác', href: `${OLD}/Osobnosti/Malac.htm` },
  { name: 'Július Kozma', href: `${OLD}/Osobnosti/Kozma.htm` },
  { name: 'Miloš Hebelka', href: `${OLD}/Osobnosti/Hebelka.pdf` },
]

export default function History() {
  return (
    <>
      <PageHeader
        eyebrow="História"
        title="Príbeh klubu"
        lead="Korene klubu siahajú až do roku 1891, k Bratislavskému šachovému klubu - predchodcovi dnešného ŠK Slovan Bratislava."
      />
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-7 md:py-16">
        <section>
          <h2 className="font-condensed text-3xl font-extrabold uppercase text-navy md:text-4xl">Klubové dokumenty</h2>
          <p className="mt-3 max-w-2xl text-slate-600">
            Historické dokumenty klubu vrátane pôvodných stanov a zápisníc.
          </p>
          <div className="mt-6 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
            {documents.map((d) => (
              <a
                key={d.href}
                href={d.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border border-slate-200 bg-white p-4 font-semibold text-navy shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <span className="mb-2 block text-2xl">📄</span>
                {d.label}
              </a>
            ))}
          </div>
        </section>

        <section className="mt-14">
          <h2 className="font-condensed text-3xl font-extrabold uppercase text-navy md:text-4xl">
            Galéria osobností
          </h2>
          <p className="mt-3 max-w-2xl text-slate-600">
            Hráči a osobnosti, ktoré formovali históriu klubu.
          </p>
          <div className="mt-6 grid grid-cols-2 gap-3.5 sm:grid-cols-3 lg:grid-cols-4">
            {personalities.map((p) => (
              <a
                key={p.name}
                href={p.href}
                target="_blank"
                rel="noreferrer"
                className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="photo-placeholder mb-4 grid aspect-square place-items-center rounded-xl">
                  <span className="font-condensed text-4xl font-extrabold text-slate-300">
                    {p.name.split(' ').map((n) => n[0]).join('')}
                  </span>
                </div>
                <div className="font-condensed text-xl font-bold uppercase leading-tight text-navy group-hover:text-blue">
                  {p.name}
                </div>
                <div className="mt-1 text-sm font-semibold text-slate-400">profil →</div>
              </a>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}
