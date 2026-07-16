const chips = ['Extraliga družstiev', 'Mládežnícka akadémia', 'Otvorené turnaje', 'Online liga']

export default function About() {
  return (
    <section id="klub" className="mx-auto max-w-7xl scroll-mt-20 px-5 py-16 sm:px-7 md:py-24">
      <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-[0.9fr_1.1fr] md:gap-14">
        <div className="h-64 overflow-hidden rounded-2xl border border-slate-200 md:h-96">
          <img src="/klubovna.jpg" alt="Klubovňa ŠK Slovan Bratislava" className="h-full w-full object-cover" />
        </div>
        <div>
          <span className="font-condensed text-[15px] font-bold uppercase tracking-[2.5px] text-red">O klube</span>
          <h2 className="mt-3 font-condensed text-4xl font-extrabold uppercase leading-none text-navy md:text-5xl">
            Tradícia, ktorá ťahá za jeden koniec
          </h2>
          <p className="mt-5 text-[17px] leading-relaxed text-slate-600">
            Sme jeden z najstarších a najúspešnejších šachových klubov na Slovensku. Naša prvá aj
            mládežnícke družstvá pravidelne bojujú o najvyššie priečky slovenskej extraligy a hráči
            klubu reprezentujú krajinu na medzinárodných podujatiach.
          </p>
          <p className="mt-3.5 text-[17px] leading-relaxed text-slate-600">
            Popri vrcholovom šachu je srdcom klubu mládežnícka akadémia - desiatky detí sa u nás
            každý týždeň učia od skúsených trénerov a majstrov.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {chips.map((c) => (
              <span key={c} className="rounded-lg bg-blue/10 px-4 py-2 text-sm font-bold text-blue">
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
