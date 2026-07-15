import { useEffect } from 'react'

interface LightboxProps {
  images: string[]
  index: number
  onClose: () => void
  onIndex: (i: number) => void
}

export default function Lightbox({ images, index, onClose, onIndex }: LightboxProps) {
  const prev = () => onIndex((index - 1 + images.length) % images.length)
  const next = () => onIndex((index + 1) % images.length)

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onIndex((index - 1 + images.length) % images.length)
      if (e.key === 'ArrowRight') onIndex((index + 1) % images.length)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [index, images.length, onClose, onIndex])

  const btnCls =
    'grid h-11 w-11 place-items-center rounded-full bg-white/10 text-2xl leading-none text-white transition hover:bg-white/25'

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Fotogaléria"
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-sm"
    >
      <button
        type="button"
        aria-label="Zavrieť"
        onClick={onClose}
        className={`${btnCls} absolute right-4 top-4`}
      >
        ✕
      </button>

      <button
        type="button"
        aria-label="Predchádzajúca fotografia"
        onClick={(e) => {
          e.stopPropagation()
          prev()
        }}
        className={`${btnCls} absolute left-3 sm:left-6`}
      >
        ‹
      </button>

      <img
        src={images[index]}
        alt={`Fotografia ${index + 1} z ${images.length}`}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[85vh] max-w-[88vw] rounded-lg object-contain shadow-2xl"
      />

      <button
        type="button"
        aria-label="Nasledujúca fotografia"
        onClick={(e) => {
          e.stopPropagation()
          next()
        }}
        className={`${btnCls} absolute right-3 sm:right-6`}
      >
        ›
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-1.5 font-condensed text-sm font-bold tracking-widest text-white">
        {index + 1} / {images.length}
      </div>
    </div>
  )
}
