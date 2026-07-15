export default function PageHeader({ eyebrow, title, lead }: { eyebrow: string; title: string; lead?: string }) {
  return (
    <div className="bg-navy text-white">
      <div className="mx-auto max-w-7xl px-5 pb-12 pt-14 sm:px-7 md:pb-16 md:pt-20">
        <span className="font-condensed text-[15px] font-bold uppercase tracking-[2.5px] text-sky">{eyebrow}</span>
        <h1 className="mt-2.5 font-condensed text-4xl font-extrabold uppercase leading-none sm:text-5xl md:text-6xl">
          {title}
        </h1>
        {lead && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-300">{lead}</p>}
      </div>
    </div>
  )
}
