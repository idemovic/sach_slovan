import { Link } from 'react-router-dom'
import { CLUB_ADDRESS, CLUB_EMAIL, CLUB_MAPS_URL } from '../lib/club'

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-9 px-5 pb-9 pt-14 sm:px-7 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-3">
            <img src="/slovan.png" alt="ŠK Slovan Bratislava" className="h-11 w-11 object-contain" />
            <span className="font-condensed text-xl font-extrabold uppercase leading-none">
              ŠK Slovan Bratislava
              <br />
              <span className="text-[13px] font-semibold tracking-[2px] text-sky-light">Šachový klub</span>
            </span>
          </div>
          <p className="mt-4 max-w-xs text-[15px] leading-relaxed text-slate-400">
            Najväčší šachový klub na Slovensku. Vrcholový šach aj mládežnícka akadémia.
          </p>
        </div>
        <div>
          <div className="mb-3.5 font-condensed text-sm font-bold uppercase tracking-[1.5px] text-sky-light">Klub</div>
          <div className="flex flex-col gap-2">
            <Link to="/#klub" className="text-slate-300 hover:text-white">O klube</Link>
            <Link to="/#tim" className="text-slate-300 hover:text-white">Tím</Link>
            <Link to="/news" className="text-slate-300 hover:text-white">Novinky</Link>
            <Link to="/history" className="text-slate-300 hover:text-white">História</Link>
            <Link to="/archive" className="text-slate-300 hover:text-white">Archív</Link>
            <Link to="/documents" className="text-slate-300 hover:text-white">Dokumenty</Link>
          </div>
        </div>
        <div>
          <div className="mb-3.5 font-condensed text-sm font-bold uppercase tracking-[1.5px] text-sky-light">Kontakt</div>
          <div className="flex flex-col gap-2 text-slate-300">
            <a href={`mailto:${CLUB_EMAIL}`} className="hover:text-white">{CLUB_EMAIL}</a>
            <span>Klubové štvrtky</span>
            <a href={CLUB_MAPS_URL} target="_blank" rel="noreferrer" className="hover:text-white">
              {CLUB_ADDRESS}
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-2.5 px-5 py-4 text-sm text-slate-500 sm:px-7">
          <span>© {new Date().getFullYear()} ŠK Slovan Bratislava - šachový klub</span>
          <Link to="/archive" className="hover:text-slate-300">Archív pôvodného webu</Link>
        </div>
      </div>
    </footer>
  )
}
