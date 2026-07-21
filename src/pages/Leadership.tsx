import PageHeader from '../components/PageHeader'

// Zdroj: Vedenie.pdf (povodny web). Meno v tvare "Meno Priezvisko".
type Person = { role: string; name: string; phone: string; email: string }

const committee: Person[] = [
  { role: 'Prezident klubu', name: 'Peter Petrán', phone: '+421 905 511 157', email: 'petran@kpklegal.eu' },
  { role: 'Vedúci pre materiálno-technické zabezpečenie klubu', name: 'Pavel Eiben', phone: '+421 905 204 474', email: 'pavel.eiben@gmail.com' },
  { role: 'Ekonóm klubu', name: 'Marián Horváth', phone: '+421 903 335 018', email: 'horvath.marian.sk@gmail.com' },
  { role: 'Vedúci pre organizačné záležitosti a propagáciu', name: 'Ľubomír Munk', phone: '+421 905 645 158', email: 'munklubo@gmail.com' },
  { role: 'Vedúci pre prácu s mládežou, organizačný pracovník', name: 'Radovan Vachálek', phone: '+421 902 902 245', email: 'vachalek.radovan@gmail.com' },
]

const controllers: Person[] = [
  { role: 'Kontrolór financií a chodu klubu', name: 'Miroslav Petrek', phone: '+421 903 787 151', email: 'miroslav.petrek@gmail.com' },
]

function initials(name: string): string {
  return name.split(/\s+/).map((n) => n[0]).join('').toUpperCase()
}

function telHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, '')}`
}

function PersonCard({ p }: { p: Person }) {
  return (
    <div className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-navy font-condensed text-lg font-bold text-white">
        {initials(p.name)}
      </div>
      <div className="min-w-0">
        <div className="font-condensed text-sm font-bold uppercase tracking-wide text-red">{p.role}</div>
        <div className="font-condensed text-xl font-bold uppercase leading-tight text-navy">{p.name}</div>
        <div className="mt-2 flex flex-col gap-1 text-sm">
          <a href={telHref(p.phone)} className="font-semibold text-blue hover:text-blue-dark">
            {p.phone}
          </a>
          <a href={`mailto:${p.email}`} className="break-all font-semibold text-blue hover:text-blue-dark">
            {p.email}
          </a>
        </div>
      </div>
    </div>
  )
}

export default function Leadership() {
  return (
    <>
      <PageHeader
        eyebrow="Klub"
        title="Vedenie klubu"
        lead="Výkonný výbor a kontrolór Šachového klubu ŠK Slovan Bratislava."
      />
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-7 md:py-16">
        <section>
          <h2 className="font-condensed text-3xl font-extrabold uppercase text-navy md:text-4xl">Výkonný výbor</h2>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {committee.map((p) => (
              <PersonCard key={p.email} p={p} />
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="font-condensed text-3xl font-extrabold uppercase text-navy md:text-4xl">Kontrolór</h2>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {controllers.map((p) => (
              <PersonCard key={p.email} p={p} />
            ))}
          </div>
        </section>
      </div>
    </>
  )
}
