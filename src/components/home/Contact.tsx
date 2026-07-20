import { useState, type FormEvent } from 'react'
import { CLUB_ADDRESS, CLUB_EMAIL, CLUB_FACEBOOK_URL, CLUB_MAPS_URL } from '../../lib/club'

const inputCls =
  'rounded-lg border border-slate-300 px-3.5 py-2.5 text-[15px] outline-none focus:border-blue focus:ring-[3px] focus:ring-blue/15'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', category: 'Dieťa - prípravka (5-10)', message: '' })

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const endpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT as string | undefined
    if (endpoint) {
      await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      })
    } else {
      // docasny fallback bez backendu: otvori e-mail s predvyplnenou spravou
      const body = `Meno: ${form.name}\nE-mail: ${form.email}\nKategória: ${form.category}\n\n${form.message}`
      window.location.href = `mailto:info@slovan-bratislava.com?subject=${encodeURIComponent(
        'Prihláška / správa z webu',
      )}&body=${encodeURIComponent(body)}`
    }
    setSubmitted(true)
  }

  return (
    <section id="kontakt" className="mx-auto max-w-7xl scroll-mt-20 px-5 py-16 sm:px-7 md:py-24">
      <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-[0.95fr_1.05fr] md:gap-14">
        <div>
          <span className="font-condensed text-[15px] font-bold uppercase tracking-[2.5px] text-red">Kontakt</span>
          <h2 className="mt-2.5 font-condensed text-4xl font-extrabold uppercase leading-none text-navy md:text-5xl">
            Príď si zahrať
          </h2>
          <p className="mt-4.5 text-[17px] leading-relaxed text-slate-600">
            Napíš nám cez formulár alebo príď priamo na klubový večer. Prvá tréningová hodina je
            zadarmo - stačí prísť.
          </p>
          <div className="mt-7 flex flex-col gap-4">
            <div className="flex items-start gap-3.5">
              <span className="text-xl">📍</span>
              <div>
                <div className="font-bold text-navy">Klubovňa</div>
                <div className="text-slate-500">{CLUB_ADDRESS}</div>
                <a href={CLUB_MAPS_URL} target="_blank" rel="noreferrer" className="text-sm font-semibold text-blue hover:text-blue-dark">
                  Zobraziť na mape →
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3.5">
              <span className="text-xl">✉️</span>
              <div>
                <div className="font-bold text-navy">E-mail</div>
                <a href={`mailto:${CLUB_EMAIL}`} className="text-blue hover:text-blue-dark">
                  {CLUB_EMAIL}
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3.5">
              <span className="text-xl">🕑</span>
              <div>
                <div className="font-bold text-navy">Klubové večery</div>
                <div className="text-slate-500">Štvrtok od 17:00</div>
              </div>
            </div>
            <div className="flex items-start gap-3.5">
              <span className="text-xl">📘</span>
              <div>
                <div className="font-bold text-navy">Facebook</div>
                <a href={CLUB_FACEBOOK_URL} target="_blank" rel="noreferrer" className="text-blue hover:text-blue-dark">
                  facebook.com/Slovanchess
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg shadow-navy/5 sm:p-8">
          {submitted ? (
            <div className="px-2.5 py-10 text-center">
              <div className="text-5xl">♞</div>
              <h3 className="mb-2 mt-3.5 font-condensed text-3xl font-extrabold uppercase text-navy">Ďakujeme!</h3>
              <p className="text-slate-500">Ozveme sa ti čo najskôr. Tešíme sa na teba za šachovnicou.</p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-5 rounded-lg border border-slate-200 bg-mist px-4.5 py-2.5 font-bold text-navy"
              >
                Odoslať ďalšiu správu
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                <label className="flex flex-col gap-1.5 text-sm font-bold text-navy">
                  Meno a priezvisko
                  <input
                    required
                    type="text"
                    placeholder="Ján Novák"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={inputCls}
                  />
                </label>
                <label className="flex flex-col gap-1.5 text-sm font-bold text-navy">
                  E-mail
                  <input
                    required
                    type="email"
                    placeholder="jan@email.sk"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className={inputCls}
                  />
                </label>
              </div>
              <label className="flex flex-col gap-1.5 text-sm font-bold text-navy">
                Úroveň / kategória
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className={`${inputCls} bg-white`}
                >
                  <option>Dieťa - prípravka (5-10)</option>
                  <option>Mládež - akadémia (11-18)</option>
                  <option>Dospelý - rekreačne</option>
                  <option>Registrovaný hráč (FIDE)</option>
                </select>
              </label>
              <label className="flex flex-col gap-1.5 text-sm font-bold text-navy">
                Správa
                <textarea
                  rows={4}
                  placeholder="Chcem sa prísť pozrieť na tréning…"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className={`${inputCls} resize-y`}
                />
              </label>
              <button
                type="submit"
                className="rounded-xl bg-red py-3.5 font-condensed text-lg font-bold uppercase tracking-wide text-white hover:bg-[#b81824]"
              >
                Odoslať prihlášku
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
