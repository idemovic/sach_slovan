import type { MouseEvent, ReactNode } from 'react'
import { CLUB_FACEBOOK_PAGE_ID, CLUB_FACEBOOK_URL } from '../lib/club'

// Na mobile otvorime stranku rovno v aplikacii Facebook, na desktope (a bez JS)
// zostava normalny odkaz na web.
//
//   iOS     - fb://profile/<id>; fb://page/... v novsich verziach appky nefunguje.
//             Ak appka chyba, po timeoute posleme uzivatela na web.
//
//   Android - appke posleme priamo jej vlastnu https adresu s explicitnym
//             balickom (package=com.facebook.katana). Appka ju spracuje rovnakou
//             cestou ako App Link, takze otvori konkretnu stranku.
//             Schemu fb://page/<id> sme skusali predtym: novsie verzie appky ju
//             prijmu, ale otvoria len uvodnu obrazovku namiesto stranky.
//             Ak by prestala fungovat aj tato cesta, dalsie varianty na skusanie:
//               fb://facewebmodal/f?href=<url-encoded https adresa>
//               fb://page/?id=<id>          (niektore verzie)
//               fb://profile/<id>           (ako na iOS)
//             Chrome pri chybajucej appke sam prejde na browser_fallback_url,
//             takze netreba vlastny timeout ani nehrozi ERR_UNKNOWN_URL_SCHEME.
function deepLink(): { url: string; needsFallback: boolean } | null {
  const ua = navigator.userAgent
  if (/iPad|iPhone|iPod/.test(ua)) {
    return { url: `fb://profile/${CLUB_FACEBOOK_PAGE_ID}`, needsFallback: true }
  }
  if (/Android/.test(ua)) {
    const { host, pathname } = new URL(CLUB_FACEBOOK_URL)
    const fallback = encodeURIComponent(CLUB_FACEBOOK_URL)
    return {
      url:
        `intent://${host}${pathname}#Intent;scheme=https;` +
        `package=com.facebook.katana;S.browser_fallback_url=${fallback};end`,
      needsFallback: false,
    }
  }
  return null
}

export default function FacebookLink({ className, children }: { className?: string; children: ReactNode }) {
  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    // ctrl/cmd klik a spol. nechavame prehliadacu (otvorenie v novej karte)
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    const link = deepLink()
    if (!link) return // desktop - normalny odkaz na web

    e.preventDefault()
    if (link.needsFallback) {
      const timer = window.setTimeout(() => {
        window.location.href = CLUB_FACEBOOK_URL
      }, 1500)
      // ked appka prevezme kontrolu, stranka sa skryje - fallback uz netreba
      const cancel = () => window.clearTimeout(timer)
      window.addEventListener('pagehide', cancel, { once: true })
      document.addEventListener(
        'visibilitychange',
        () => {
          if (document.hidden) cancel()
        },
        { once: true },
      )
    }
    window.location.href = link.url
  }

  return (
    <a href={CLUB_FACEBOOK_URL} target="_blank" rel="noreferrer" onClick={handleClick} className={className}>
      {children}
    </a>
  )
}
