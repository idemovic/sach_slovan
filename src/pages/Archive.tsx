import PageHeader from '../components/PageHeader'

const DL = 'https://download.slovan-bratislava.com'
const OLD = 'https://www.slovan-bratislava.com'
const CR = (id: number) =>
  `https://chess-results.com/tnr${id}.aspx?art=1&lan=4&css=2&iframe=NOADV&turdet=NO&lansel=NO`

interface ArchiveItem {
  label: string
  href: string
}
interface ArchiveGroup {
  title: string
  years?: string
  items: ArchiveItem[]
}

// Kompletny archiv prevzaty zo sitemap.html povodneho webu.
// TODO: lokalne subory (OLD/DL) po zozrkadleni presmerovat pod /files
const tournaments: ArchiveGroup[] = [
  {
    title: 'OPEN Tatry',
    years: '1952-2013',
    items: [
      { label: 'História Tatranského pohára', href: `${DL}/Historia/Turnaje/HistTP.pdf` },
      { label: '1952-2012 hráči', href: `${DL}/Historia/Turnaje/Tprehlad.pdf` },
      { label: '1952-2012 kruhové turnaje', href: `${DL}/Historia/Turnaje/HistTKr.pdf` },
      { label: '1952-2012 Slovan + Tatry', href: `${DL}/Historia/Turnaje/STprehlad.pdf` },
      { label: '2013 propozície (SK)', href: `${DL}/Turnaje/T13.pdf` },
      { label: '2013 propozície (EN)', href: `${DL}/Turnaje/T13a.pdf` },
      { label: '2013 propozície (DE)', href: `${DL}/Turnaje/T13n.pdf` },
    ],
  },
  {
    title: 'OPEN Slovan',
    years: '1973-2013',
    items: [
      { label: '1979-2013 hráči', href: `${DL}/Historia/Turnaje/Sprehlad.pdf` },
      { label: '1979-2013 turnaje', href: `${DL}/Historia/Turnaje/HistS.pdf` },
    ],
  },
  {
    title: 'OPEN Advokát',
    years: '2008-2013',
    items: [
      { label: '2008 výsledky', href: `${OLD}/Turnaje/08Advokat/08Advokat.html` },
      { label: '2009 výsledky', href: `${OLD}/Turnaje/09Advokat/09Advokat.html` },
      { label: '2010 výsledky', href: `${OLD}/Turnaje/10Advokat/10Advokat.html` },
      { label: '2011 výsledky (chess-results)', href: CR(49582) },
      { label: '2012 výsledky (chess-results)', href: CR(71569) },
      { label: '2013 výsledky (chess-results)', href: CR(99257) },
    ],
  },
  {
    title: 'Memoriál dr. Nemca',
    years: '2005-2013',
    items: [
      { label: '2005-2013 hráči', href: `${DL}/Historia/Turnaje/Tadoprehlad.pdf` },
      { label: '2005-2013 turnaje', href: `${DL}/Historia/Turnaje/HistTado.pdf` },
    ],
  },
  {
    title: 'M SR seniorov',
    years: '2005-2013',
    items: [
      { label: '2005-2012 hráči', href: `${DL}/Historia/Turnaje/Senprehlad.pdf` },
      { label: '2005-2012 turnaje', href: `${DL}/Historia/Turnaje/HistSen.pdf` },
      { label: '2013 propozície', href: `${DL}/Turnaje/Sen13.pdf` },
      { label: '2013 A, B výsledky (chess-results)', href: CR(97014) },
    ],
  },
  {
    title: 'Piešťany',
    years: '2004-2013',
    items: [
      { label: '2004 OPEN výsledky', href: `${OLD}/Turnaje/04Piestany/04PiestOP.htm` },
      { label: '2004 IM výsledky', href: `${OLD}/Turnaje/04Piestany/04PiestIM.htm` },
      { label: '2005 výsledky', href: `${OLD}/Turnaje/05Piest/P05.html` },
      { label: '2006 výsledky', href: `${OLD}/Turnaje/06Piest/P06.html` },
      { label: '2007 výsledky', href: `${OLD}/Turnaje/07Piest/07PiestP.html` },
      { label: '2008 výsledky', href: `${OLD}/Turnaje/08Piestany/08Piestany.html` },
      { label: '2009 výsledky', href: `${OLD}/Turnaje/09Piestany/09Piestany.html` },
      { label: '2010 výsledky', href: `${OLD}/Turnaje/10Piestany/10Piestany.html` },
      { label: '2011 výsledky (chess-results)', href: CR(57840) },
      { label: '2012 výsledky (chess-results)', href: CR(82585) },
      { label: '2013 propozície (SK)', href: `${DL}/Turnaje/P13s.pdf` },
      { label: '2013 propozície (EN)', href: `${DL}/Turnaje/P13a.pdf` },
    ],
  },
  {
    title: 'Šachová dovolenka',
    years: '2009',
    items: [{ label: '2009 výsledky', href: `${OLD}/Turnaje/09Dovol/09Dovol.html` }],
  },
  {
    title: 'Maratón Slovan (blesk)',
    years: '2002-2003',
    items: [
      { label: '2002 výsledky', href: `${OLD}/Turnaje/02Marat/02Marat.htm` },
      { label: '2002 fotografie', href: `${OLD}/Fotky/02Maraton/02Marat.htm` },
      { label: '2003 propozície (SK)', href: `${OLD}/Propozicie/M03s.htm` },
      { label: '2003 propozície (EN)', href: `${OLD}/Propozicie/M03a.htm` },
    ],
  },
  {
    title: 'Vianočný turnaj (blesk)',
    years: '2002-2007',
    items: [
      { label: '2002 výsledky', href: `${OLD}/Turnaje/02Vianoce/02VianPor.htm` },
      { label: '2003 výsledky', href: `${OLD}/Turnaje/03Vianoce/03VianPor.htm` },
      { label: '2003 fotografie', href: `${OLD}/Turnaje/03Vianoce/03VianFoto.htm` },
      { label: '2004 výsledky', href: `${OLD}/Turnaje/04Vianoce/04VianoceVys.htm` },
      { label: '2005 výsledky (XLS)', href: `${OLD}/Turnaje/05Vianoce/05VianPor.xls` },
      { label: '2006 výsledky', href: `${OLD}/Turnaje/06Vianoce/06VianPor.htm` },
      { label: '2007 výsledky', href: `${OLD}/Turnaje/07Vianoce/07VianPor.htm` },
    ],
  },
  {
    title: 'Hebelkov memoriál (blesk)',
    years: '2009-2012',
    items: [
      { label: '2009 výsledky', href: `${OLD}/Turnaje/09Hebelka/09Hebelka.html` },
      { label: '2010 výsledky', href: `${OLD}/Turnaje/10MBA/10MBA.html` },
      { label: '2012 propozície', href: `${DL}/Turnaje/MBA12blic.pdf` },
    ],
  },
]

const leagues: ArchiveGroup = {
  title: 'Družstvá a ligy',
  years: '1969-2013',
  items: [
    { label: '1969-2013 jednotlivci - súhrn', href: `${DL}/Historia/Ligy/69ligyvyb.pdf` },
    { label: '1969-2013 hráči + družstvá komplet', href: `${DL}/Historia/Ligy/69ligy.pdf` },
    { label: '1969-1992 1. československá liga', href: `${DL}/Historia/Ligy/69-92Csliga.pdf` },
    { label: '1992-2013 Extraliga komplet', href: `${DL}/Historia/Ligy/92Ex.pdf` },
  ],
}

const other: ArchiveGroup = {
  title: 'Partie a ostatné',
  items: [
    { label: 'Download partiár', href: `${OLD}/Partie/partiedown.htm` },
    { label: 'Rating FIDE SVK k 1.5.2013 (historický)', href: `${OLD}/Elo/1305FIDESVK.htm` },
    { label: 'Pôvodný web - sitemap', href: `${OLD}/sitemap.html` },
  ],
}

function GroupCard({ group }: { group: ArchiveGroup }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="font-condensed text-2xl font-extrabold uppercase text-navy">{group.title}</h3>
        {group.years && <span className="font-condensed text-sm font-bold tracking-wide text-slate-400">{group.years}</span>}
      </div>
      <ul className="mt-4 flex flex-col gap-2">
        {group.items.map((i) => (
          <li key={i.href}>
            <a href={i.href} target="_blank" rel="noreferrer" className="text-[15px] font-semibold text-blue hover:text-blue-dark">
              {i.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Archive() {
  return (
    <>
      <PageHeader
        eyebrow="Archív"
        title="Turnaje a ligy klubu"
        lead="Kompletný archív výsledkov z pôvodného webu - turnaje od roku 1952, ligy od roku 1969. Nič sa nestratilo."
      />
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-7 md:py-16">
        <h2 className="font-condensed text-3xl font-extrabold uppercase text-navy md:text-4xl">Turnaje</h2>
        <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {tournaments.map((g) => (
            <GroupCard key={g.title} group={g} />
          ))}
        </div>
        <h2 className="mt-14 font-condensed text-3xl font-extrabold uppercase text-navy md:text-4xl">Ligy a ostatné</h2>
        <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          <GroupCard group={leagues} />
          <GroupCard group={other} />
        </div>
      </div>
    </>
  )
}
