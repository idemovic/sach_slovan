import { Link } from 'react-router-dom'
import playersData from '../../../content/data/players.json'

// Zdroje: 1891 - Historia.pdf (Bratislavsky sachovy klub, predchodca Slovana);
// 6x majster SR - extraliga 1995/96, 98/99, 00/01, 01/02, 08/09, 12/13
// (sk.wikipedia.org/wiki/Slovenska_sachova_Extraliga); pocty hracov - players.json (matrika SSZ)
const stats = [
  { value: '1891', label: 'korene klubu' },
  { value: String(playersData.players.length), label: 'registrovaných hráčov' },
  { value: String(playersData.players.filter((p) => p.title).length), label: 'hráčov s FIDE titulom' },
  { value: '6×', label: 'majster Slovenska družstiev' },
]

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-navy text-white">
      <div className="hero-glow absolute inset-0" />
      <div aria-hidden="true" className="chess-pattern absolute right-0 top-0 hidden h-full w-[46%] opacity-10 md:block" />
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-5 pb-16 pt-16 sm:px-7 md:grid-cols-[1.15fr_0.85fr] md:pb-22 md:pt-24">
        <div className="animate-float-in">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-[13px] font-semibold uppercase tracking-[1.5px] text-sky-light">
            ♞ Šachový klub · korene od roku 1891
          </span>
          <h1 className="mt-5 font-condensed text-5xl font-extrabold uppercase leading-[0.95] sm:text-6xl lg:text-[76px]">
            Najväčší
            <br />
            šachový klub
            <br />
            <span className="text-sky">na Slovensku</span>
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-slate-300">
            SK Slovan Bratislava spája vrcholových hráčov extraligy s deťmi, ktoré práve posúvajú
            svojho prvého pešiaka. Tréningy, turnaje a komunita - pre každú úroveň.
          </p>
          <div className="mt-8 flex flex-wrap gap-3.5">
            <Link
              to="/#kontakt"
              className="inline-flex items-center gap-2.5 rounded-lg bg-red px-7 py-4 font-condensed text-lg font-bold uppercase tracking-wide text-white hover:bg-[#b81824]"
            >
              Pridaj sa ku klubu →
            </Link>
            <Link
              to="/#tim"
              className="inline-flex items-center gap-2.5 rounded-lg border-[1.5px] border-white/30 px-7 py-4 font-condensed text-lg font-bold uppercase tracking-wide text-white hover:border-white/60"
            >
              Náš tím
            </Link>
          </div>
        </div>
        <div className="hidden justify-center md:flex animate-float-in-slow">
          <div className="relative grid h-72 w-72 place-items-center">
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(94,160,232,0.35),transparent_68%)]" />
            <img
              src="/slovan.png"
              alt="Znak klubu SK Slovan Bratislava"
              className="relative h-56 w-56 object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
            />
          </div>
        </div>
      </div>
      <div className="relative border-t border-white/10 bg-black/20">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-5 py-5 sm:px-7 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="font-condensed text-3xl font-extrabold leading-none text-white md:text-4xl">{s.value}</div>
              <div className="text-sm font-semibold tracking-wide text-slate-400">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
