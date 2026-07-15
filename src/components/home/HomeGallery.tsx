import { useState } from 'react'
import { latestGalleryImages } from '../../lib/news'
import Lightbox from '../Lightbox'

export default function HomeGallery() {
  const images = latestGalleryImages.slice(0, 6)
  const [lightbox, setLightbox] = useState<number | null>(null)
  if (images.length === 0) return null

  return (
    <section id="galeria" className="mx-auto max-w-7xl scroll-mt-20 px-5 py-16 sm:px-7 md:py-22">
      <span className="font-condensed text-[15px] font-bold uppercase tracking-[2.5px] text-red">Galéria</span>
      <h2 className="mb-7 mt-2.5 font-condensed text-4xl font-extrabold uppercase leading-none text-navy md:text-5xl">
        Momenty od šachovnice
      </h2>
      <div className="grid auto-rows-[140px] grid-cols-2 gap-3.5 md:auto-rows-[150px] md:grid-cols-4">
        {images.map((src, i) => (
          <button
            type="button"
            key={src}
            onClick={() => setLightbox(i)}
            aria-label={`Otvoriť fotografiu ${i + 1}`}
            className={`cursor-pointer overflow-hidden rounded-xl border border-slate-200 ${i === 0 ? 'col-span-2 row-span-2' : ''}`}
          >
            <img src={src} alt={`Fotografia z klubu ${i + 1}`} className="h-full w-full object-cover transition hover:scale-105" />
          </button>
        ))}
      </div>
      {lightbox !== null && (
        <Lightbox images={images} index={lightbox} onClose={() => setLightbox(null)} onIndex={setLightbox} />
      )}
    </section>
  )
}
