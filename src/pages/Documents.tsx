import PageHeader from '../components/PageHeader'

const DL = 'https://download.slovan-bratislava.com'

interface DocGroup {
  title: string
  note?: string
  items: { label: string; href: string }[]
}

const groups: DocGroup[] = [
  {
    title: 'Klubové dokumenty',
    items: [
      { label: 'Stanovy klubu (2011)', href: `${DL}/Historia/Klub/2011Stanovy.pdf` },
      { label: 'Vedenie klubu', href: `${DL}/Historia/Klub/Vedenie.pdf` },
      { label: 'Zoznam členov', href: `${DL}/Historia/Klub/Clenovia.pdf` },
      { label: 'Adresa a mapy', href: `${DL}/Historia/Klub/Adresa.pdf` },
      { label: 'Klubové štvrtky', href: `${DL}/Historia/Klub/Klubovna.pdf` },
    ],
  },
  {
    title: 'Formuláre pre organizátorov',
    note: 'Tlačivá na organizáciu turnajov a súťaží.',
    items: [
      { label: 'Čísla hráčov na turnaj (XLS)', href: `${DL}/Tlac/Cisla_hracov.xls` },
      { label: 'Čísla stolov (DOC)', href: `${DL}/Tlac/Cisla_stolov.doc` },
      { label: 'Tabuľka pre 14 hráčov (XLS)', href: `${DL}/Tlac/Kruhovy14.xls` },
      { label: 'Tabuľka pre 20 hráčov (XLS)', href: `${DL}/Tlac/Kruhovy20.xls` },
      { label: 'Tabuľka na maratón (XLS)', href: `${DL}/Tlac/Maraton.xls` },
      { label: 'Partiár na 30 ťahov (XLS)', href: `${DL}/Tlac/Partiar30.xls` },
      { label: 'Partiár na 40 ťahov (XLS)', href: `${DL}/Tlac/Partiar40.xls` },
      { label: 'Partiár na 9 kôl (XLS)', href: `${DL}/Tlac/Partiar9kol.xls` },
      { label: 'Prestup / licencia (DOC)', href: `${DL}/Tlac/Prestup-licencia.doc` },
      { label: 'Zápis stretnutia v súťaži (DOC)', href: `${DL}/Tlac/Zapis_stretnutia.doc` },
    ],
  },
  {
    title: 'Pravidlá šachu',
    note: 'Aktuálne pravidlá nájdete vždy vo FIDE handbooku; PDF nižšie sú historické verzie z roku 2009.',
    items: [
      { label: 'FIDE handbook (aktuálne pravidlá)', href: 'https://handbook.fide.com/' },
      { label: 'Pravidlá šachu v slovenčine (2009, archív)', href: `${DL}/Pravidla/09FIDEPrs.pdf` },
      { label: 'Pravidlá šachu v angličtine (2009, archív)', href: `${DL}/Pravidla/09FIDEPra.pdf` },
      { label: 'Pravidlá šachu 960', href: `${DL}/Pravidla/Pravidla_sachu960.pdf` },
    ],
  },
]

export default function Documents() {
  return (
    <>
      <PageHeader
        eyebrow="Dokumenty"
        title="Stanovy, formuláre a pravidlá"
        lead="Klubové dokumenty, tlačivá pre organizátorov turnajov a pravidlá šachu."
      />
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-7 md:py-16">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {groups.map((g) => (
            <div key={g.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="font-condensed text-2xl font-extrabold uppercase text-navy">{g.title}</h2>
              {g.note && <p className="mt-2 text-sm text-slate-500">{g.note}</p>}
              <ul className="mt-4 flex flex-col gap-2">
                {g.items.map((i) => (
                  <li key={i.href}>
                    <a href={i.href} target="_blank" rel="noreferrer" className="text-[15px] font-semibold text-blue hover:text-blue-dark">
                      {i.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
