import { useState } from 'react'
import { Link } from 'react-router-dom'

const links = [
  { to: '/#klub', label: 'Klub' },
  { to: '/#tim', label: 'Tím' },
  { to: '/#kalendar', label: 'Kalendár' },
  { to: '/news', label: 'Novinky' },
  { to: '/history', label: 'História' },
  { to: '/archive', label: 'Archív' },
  { to: '/documents', label: 'Dokumenty' },
]

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-navy/90 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center gap-7 px-5 py-3 sm:px-7">
        <Link to="/" className="flex items-center gap-3 text-white" onClick={() => setOpen(false)}>
          <img src="/slovan.png" alt="ŠK Slovan Bratislava" className="h-10 w-10 object-contain" />
          <span className="font-condensed text-lg font-extrabold uppercase leading-none tracking-wide">
            ŠK Slovan
            <br />
            <span className="text-[13px] font-semibold tracking-[2px] text-sky-light">Bratislava · Šach</span>
          </span>
        </Link>
        <div className="flex-1" />
        <div className="hidden items-center gap-6 lg:flex">
          {links.map((l) => (
            <Link key={l.to} to={l.to} className="text-[15px] font-semibold text-slate-300 hover:text-white">
              {l.label}
            </Link>
          ))}
          <Link
            to="/#kontakt"
            className="rounded-md bg-red px-4 py-2.5 font-condensed text-[15px] font-bold uppercase tracking-wide text-white hover:bg-[#b81824]"
          >
            Staň sa členom
          </Link>
        </div>
        <button
          type="button"
          aria-label={open ? 'Zavrieť menu' : 'Otvoriť menu'}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          className="flex h-10 w-10 items-center justify-center rounded-md text-2xl text-white lg:hidden"
        >
          {open ? '✕' : '☰'}
        </button>
      </nav>
      {open && (
        <div className="border-t border-white/10 bg-navy px-5 pb-5 lg:hidden">
          <div className="flex flex-col gap-1 pt-3">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2.5 text-base font-semibold text-slate-200 hover:bg-white/5 hover:text-white"
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/#kontakt"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-md bg-red px-4 py-3 text-center font-condensed text-base font-bold uppercase tracking-wide text-white"
            >
              Staň sa členom
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
