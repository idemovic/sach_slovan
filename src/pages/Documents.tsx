import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'

const DL = 'https://download.slovan-bratislava.com'
const LIGY = 'https://ligy.slovan-bratislava.com/data/documents'

// nazvy suborov na klubovom portali obsahuju medzery aj diakritiku - kodujeme ich
const ligy = (file: string) => `${LIGY}/${encodeURIComponent(file)}`

interface DocGroup {
  title: string
  note?: ReactNode
  items: { label: string; href: string }[]
}

const groups: DocGroup[] = [
  {
    title: 'Klubové dokumenty',
    note: (
      <>
        Historické dokumenty klubu (stanovy z roku 1925, zápisnica z roku 1945, história) nájdete
        v sekcii <Link to="/history" className="font-semibold text-blue hover:text-blue-dark">História</Link>.
      </>
    ),
    items: [{ label: 'Stanovy klubu (2011)', href: `${DL}/Historia/Klub/2011Stanovy.pdf` }],
  },
  {
    title: 'Pravidlá šachu',
    note: 'Najnovšie znenie je vždy vo FIDE handbooku, verzie z roku 2009 sú už len archívne.',
    items: [
      { label: 'FIDE handbook (aktuálne pravidlá)', href: 'https://handbook.fide.com/' },
      { label: 'Pravidlá šachu FIDE od 1. 1. 2023 (PDF)', href: ligy('Pravidlá FIDE šachu k 1.1. 2023 .pdf') },
      { label: 'Pravidlá šachu 960 (PDF)', href: `${DL}/Pravidla/Pravidla_sachu960.pdf` },
      { label: 'Pravidlá šachu 2009, slovensky (archív)', href: `${DL}/Pravidla/09FIDEPrs.pdf` },
      { label: 'Pravidlá šachu 2009, anglicky (archív)', href: `${DL}/Pravidla/09FIDEPra.pdf` },
    ],
  },
  {
    title: 'Súťažné poriadky a predpisy',
    note: 'Predpisy Slovenského (SŠZ) a Bratislavského (BŠZ) šachového zväzu.',
    items: [
      { label: 'Súťažný poriadok družstiev SŠZ (od 1. 7. 2025)', href: ligy('Súťažný poriadok družstiev SŠZ_od 1.7.2025.pdf') },
      { label: 'Súťažný poriadok družstiev BŠZ (od 1. 9. 2020)', href: ligy('Sutazny_poriadok_BSZ_1.9.2020.pdf') },
      { label: 'Súťažný poriadok pre jednotlivcov (od 1. 7. 2016)', href: ligy('Súťažný poriadok pre jednotlivcov pdf.pdf') },
      { label: 'Prestupový poriadok (od 1. 8. 2020)', href: ligy('Prestupový poriadok.pdf') },
      { label: 'Klasifikačný poriadok (od 1. 1. 2014)', href: ligy('Klasifikačný poriadok - platný od 2014 .pdf') },
      { label: 'Rozhodcovský poriadok (od 1. 2. 2021)', href: ligy('Rozhodcovský poriadok .pdf') },
      { label: "Arbiters' Manual 2018 (PDF, anglicky)", href: ligy('Príučka pre rozhodcov 2018 - ENG .pdf') },
      { label: 'Sadzobník poplatkov a pokút SŠZ (od 1. 7. 2025)', href: ligy('Sadzobník poplatkov a pokút SŠZ_od 1.7.2025.pdf') },
      { label: 'Sadzobník poplatkov a pokút BŠZ (od 15. 8. 2017)', href: ligy('Sadzobník poplatkov a pokút BŠZ_od 15.8.2017.pdf') },
    ],
  },
  {
    title: 'Pre organizátorov turnajov',
    note: 'Tlačivá, tabuľky a manuály na organizáciu turnajov a súťaží.',
    items: [
      { label: 'Tabuľky pre kruhové turnaje + Schurigove tabuľky (XLSX)', href: ligy('turnajove tabulky.xlsx') },
      { label: 'Tabuľka pre 14 hráčov (XLS)', href: `${DL}/Tlac/Kruhovy14.xls` },
      { label: 'Tabuľka pre 20 hráčov (XLS)', href: `${DL}/Tlac/Kruhovy20.xls` },
      { label: 'Tabuľka na maratón (XLS)', href: `${DL}/Tlac/Maraton.xls` },
      { label: 'Partiár na 30 ťahov (XLS)', href: `${DL}/Tlac/Partiar30.xls` },
      { label: 'Partiár na 40 ťahov (XLS)', href: `${DL}/Tlac/Partiar40.xls` },
      { label: 'Partiár na 9 kôl (XLS)', href: `${DL}/Tlac/Partiar9kol.xls` },
      { label: 'Čísla hráčov na turnaj (XLS)', href: `${DL}/Tlac/Cisla_hracov.xls` },
      { label: 'Čísla stolov (DOC)', href: `${DL}/Tlac/Cisla_stolov.doc` },
      { label: 'Zápis stretnutia v súťaži (DOC)', href: `${DL}/Tlac/Zapis_stretnutia.doc` },
      { label: 'Prestup / licencia - tlačivo (DOC)', href: `${DL}/Tlac/Prestup-licencia.doc` },
      { label: 'Manuál k hodinám DGT 2010 (PDF, česky)', href: ligy('Manuál k hodinám DGT10 .pdf') },
    ],
  },
]

export default function Documents() {
  return (
    <>
      <PageHeader
        eyebrow="Dokumenty"
        title="Pravidlá, poriadky a formuláre"
        lead="Pravidlá šachu, súťažné poriadky zväzov, tlačivá pre organizátorov turnajov a klubové dokumenty."
      />
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-7 md:py-16">
        {/* stlpcovy (masonry) layout - karty maju velmi rozdielny pocet poloziek
            a v mriezke by za kratsimi vznikali prazdne miesta */}
        <div className="columns-1 gap-5 md:columns-2 lg:columns-3">
          {groups.map((g) => (
            <div
              key={g.title}
              className="mb-5 break-inside-avoid rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <h2 className="font-condensed text-2xl font-extrabold uppercase text-navy">{g.title}</h2>
              {g.note && <p className="mt-2 text-sm text-slate-500">{g.note}</p>}
              <ul className="mt-4 flex flex-col gap-2">
                {g.items.map((i) => (
                  <li key={i.href}>
                    <a
                      href={i.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[15px] font-semibold text-blue hover:text-blue-dark"
                    >
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
