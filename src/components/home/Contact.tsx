import { useCallback, useEffect, useRef, useState, type FormEvent } from 'react'
import { CLUB_ADDRESS, CLUB_EMAIL, CLUB_MAPS_URL } from '../../lib/club'
import FacebookLink from '../FacebookLink'

const inputCls =
  'rounded-lg border border-slate-300 px-3.5 py-2.5 text-[15px] outline-none focus:border-blue focus:ring-[3px] focus:ring-blue/15'

// Backend formulara: public/php/contactForm.php sa nasadi spolu s webom (dist/php/).
const ENDPOINT = '/php/contactForm.php'
// Verejny kluc Cloudflare Turnstile. Backend bez overenia spravu odmietne,
// takze kym kluc nie je nastaveny, formular pouzije mailto fallback.
const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY as string | undefined
const TURNSTILE_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: { sitekey: string }) => string
      getResponse: (id?: string) => string | undefined
      reset: (id?: string) => void
      remove: (id?: string) => void
    }
  }
}

const EMPTY_FORM = { name: '', email: '', category: 'Dieťa - prípravka (5-10)', message: '' }

// odpovede contactForm.php -> hlaska pre pouzivatela
const ERRORS: Record<string, string> = {
  spam: 'Správa vyzerá ako spam. Skúste to prosím znova.',
  turnstile_missing: 'Chýba overenie, že nie ste robot. Skúste to prosím znova.',
  turnstile_error: 'Overenie sa nepodarilo. Skúste to prosím o chvíľu.',
  turnstile_failed: 'Overenie sa nepodarilo. Skúste to prosím znova.',
  invalid_input: 'Skontrolujte prosím meno, e-mail a text správy.',
}

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [form, setForm] = useState(EMPTY_FORM)
  // Turnstile nacitavame az ked navstevnik zacne formular vyplnat - kto ho
  // nepouzije, neposiela na Cloudflare ziadnu poziadavku.
  const [armed, setArmed] = useState(false)
  const boxRef = useRef<HTMLDivElement | null>(null)
  const widgetId = useRef<string | null>(null)

  // Vykresli widget do aktualneho kontajnera, ak este nie je a skript je nacitany.
  // Explicitne render() - implicitny (data-sitekey) sa v SPA nemusi spustit.
  const renderWidget = useCallback(() => {
    if (!TURNSTILE_SITE_KEY || !boxRef.current || !window.turnstile || widgetId.current !== null) return
    widgetId.current = window.turnstile.render(boxRef.current, { sitekey: TURNSTILE_SITE_KEY })
  }, [])

  // Callback ref: kontajner sa po odoslani (obrazovka "Dakujeme") odmontuje a pri
  // dalsej sprave znova pripoji. Token je jednorazovy, preto pri kazdom pripojeni
  // vykreslime cerstvy widget a pri odmontovani ho odstranime - inak by widgetId
  // ukazoval na uz neexistujuci widget a druhe odoslanie by zlyhalo.
  const attachWidget = useCallback(
    (node: HTMLDivElement | null) => {
      if (node) {
        boxRef.current = node
        renderWidget()
      } else {
        if (widgetId.current && window.turnstile) window.turnstile.remove(widgetId.current)
        widgetId.current = null
        boxRef.current = null
      }
    },
    [renderWidget],
  )

  // skript nacitame az po armed; ked dobehne, vykresli widget (ak uz je pripojeny)
  useEffect(() => {
    if (!TURNSTILE_SITE_KEY || !armed || window.turnstile) {
      renderWidget()
      return
    }
    let script = document.querySelector<HTMLScriptElement>(`script[src="${TURNSTILE_SRC}"]`)
    if (!script) {
      script = document.createElement('script')
      script.src = TURNSTILE_SRC
      script.async = true
      script.defer = true
      document.head.appendChild(script)
    }
    script.addEventListener('load', renderWidget)
    return () => script?.removeEventListener('load', renderWidget)
  }, [armed, renderWidget])

  // widget sa nacitava az od prveho vstupu, takze pri rychlom odoslani
  // token este nemusi byt hotovy - chvilu naň pockame
  async function waitForToken(timeoutMs = 10000): Promise<string> {
    const deadline = Date.now() + timeoutMs
    for (;;) {
      const id = widgetId.current
      const token = id && window.turnstile ? window.turnstile.getResponse(id) : undefined
      if (token) return token
      if (Date.now() > deadline) return ''
      await new Promise((r) => setTimeout(r, 200))
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    // bez Turnstile kluca by backend spravu odmietol - otvorime predvyplneny e-mail
    if (!TURNSTILE_SITE_KEY) {
      const body = `Meno: ${form.name}\nE-mail: ${form.email}\nKategória: ${form.category}\n\n${form.message}`
      window.location.href = `mailto:${CLUB_EMAIL}?subject=${encodeURIComponent(
        'Prihláška / správa z webu',
      )}&body=${encodeURIComponent(body)}`
      setSubmitted(true)
      return
    }

    // FormData citame synchronne - po await uz e.currentTarget nie je dostupny
    const data = new FormData(e.currentTarget)

    setSending(true)
    setError(null)

    const token = await waitForToken()
    if (!token) {
      setError(ERRORS.turnstile_missing)
      setSending(false)
      return
    }
    data.set('cf-turnstile-response', token)

    try {
      const res = await fetch(ENDPOINT, { method: 'POST', body: data })
      const result = (await res.text()).trim()
      if (result === 'success') {
        setSubmitted(true)
        setForm(EMPTY_FORM)
      } else {
        setError(ERRORS[result] ?? `Správu sa nepodarilo odoslať. Napíšte nám prosím na ${CLUB_EMAIL}.`)
      }
    } catch {
      setError(`Správu sa nepodarilo odoslať. Napíšte nám prosím na ${CLUB_EMAIL}.`)
    } finally {
      setSending(false)
      window.turnstile?.reset(widgetId.current ?? undefined)
    }
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
                <FacebookLink className="text-blue hover:text-blue-dark">facebook.com/Slovanchess</FacebookLink>
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
            <form
              onSubmit={handleSubmit}
              onChange={() => setArmed(true)}
              className="flex flex-col gap-4"
            >
              <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                <label className="flex flex-col gap-1.5 text-sm font-bold text-navy">
                  Meno a priezvisko
                  <input
                    required
                    type="text"
                    name="name"
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
                    name="email"
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
                  name="package"
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
                  name="message"
                  placeholder="Chcem sa prísť pozrieť na tréning…"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className={`${inputCls} resize-y`}
                />
              </label>

              <input type="hidden" name="subject" value="Prihláška / správa z webu" />
              {/* honeypot - skryte pole, ktore vyplnia len roboty (kontroluje contactForm.php) */}
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute left-[-9999px] h-0 w-0 opacity-0"
              />
              {TURNSTILE_SITE_KEY && armed && <div ref={attachWidget} />}

              {error && (
                <p className="rounded-lg bg-red/10 px-3.5 py-2.5 text-sm font-semibold text-red">{error}</p>
              )}

              <button
                type="submit"
                disabled={sending}
                className="rounded-xl bg-red py-3.5 font-condensed text-lg font-bold uppercase tracking-wide text-white hover:bg-[#b81824] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {sending ? 'Odosielam…' : 'Odoslať'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
