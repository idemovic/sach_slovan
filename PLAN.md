# ŠK Slovan Bratislava - website rebuild plan

Goal: replace https://www.slovan-bratislava.com (1990s frameset site, content frozen around 2013)
with the new visual in `SK Slovan Bratislava.dc.html`, without losing the historical archive.

## 1. What the old site contains (extracted sitemap)

The old site is a frameset (header / tree menu / content / footer), Slovak only.
Most content lives as PDF/XLS/DOC files on `download.slovan-bratislava.com`.
Structure pulled from its `sitemap.html`:

- Upozornenia
  - 2% z dane (Rozne/Presmeruj.htm)
  - Klubove stvrtky (PDF)
  - Zaujimave stranky - external links (Rozne/AdrStranok.htm)
- Klub
  - fotografie klubu (Slovanfoto.pdf)
  - adresa a mapy (Adresa.pdf)
  - historia klubu (Historia.pdf)
  - stanovy 2011, stanovy 1925, zapisnica 1945 (PDF)
  - vedenie klubu (Vedenie.pdf)
  - zoznam clenov (Clenovia.pdf)
- Ratingy
  - Rating FIDE SVK k 1.5.2013 (stale)
- Formulare (turnajova administrativa - XLS/DOC: partiare, tabulky, zapisy, prestup)
- Pravidla (FIDE pravidla 2009 SK/EN, sach 960, FIDE handbook link)
- Turnaje (mix lokalnych HTML stranok, PDF archivov a chess-results.com liniek)
  - OPEN Advokat 2008-2013
  - Memorial dr. Nemca 2005-2013
  - OPEN Slovan 1973-2013
  - M SR seniorov 2005-2013
  - Sachova dovolenka 2009
  - OPEN Tatry 1952-2013
  - Piestany 2004-2013
  - Bleskove turnaje: Maraton 2002-2003, Vianocny 2002-2007, Hebelkov memorial 2009-2012
- Partie (download partiar)
- Druzstva a ligy 1969-2013 (4 velke PDF prehlady)
- Galeria osobnosti: Sturc, Petran, Nemec, Kramarik, Banas, Malac, Kozma (HTM), Hebelka (PDF)

## 2. Data classification: what moves where

### A. Transfer into the new layout (live content)
| Old content | New location |
|---|---|
| Nazov, logo, historia klubu (Historia.pdf) | Hero + sekcia "O klube" |
| Adresa a mapy (Adresa.pdf) | Sekcia "Kontakt" |
| Klubove stvrtky | "Kontakt" (klubove vecery) + "Kalendar" (opakujuca sa udalost) |
| Vedenie klubu (Vedenie.pdf) | "O klube" alebo "Kontakt" |
| 2% z dane | Banner/notice na homepage (sezonna kampan, stale relevantna na Slovensku) |
| Zoznam clenov (Clenovia.pdf) | Zdroj pre realne cislo v hero statistikach |

### B. Keep as archive (new "/archive" page, files hosted as-is)
- Vsetky turnajove vysledky (PDF + chess-results.com linky + stare HTML stranky)
- Druzstva a ligy 1969-2013 (PDF)
- Stanovy 2011/1925, zapisnica 1945
- Galeria osobnosti - unikatny obsah, presunut na podstranku "Historia" v novom vizuale
- Formulare pre organizatorov (XLS/DOC)

### C. Drop or replace with live sources
- Rating FIDE SVK k 1.5.2013 (celoslovensky rebricek) - novy web nezobrazuje data
  o hracoch mimo klubu; stara stranka ide iba do /archive. Zive ratingy sa zobrazuju
  vylucne pre hracov Slovana (sekcia "Tim"), s linkami na ich chess.sk / FIDE profily.
  Jedina vynimka: supiska A-timu (team-a.json) moze obsahovat hostujucich hracov,
  ktori nie su clenmi klubu
- FIDE pravidla 2009 - linkovat aktualne pravidla na handbook.fide.com
- Stranka externych linkov - vybrat 2-3 zive do patky, zvysok zahodit
- Propozicie 2013 - iba archiv

### D. New data needed (does NOT exist on the old site - must come from the club or external sources)
- Aktualna supiska A-timu + ELO (chess.sk supisky extraligy / FIDE)
- Aktualny kalendar podujati
- Novinky (aspon 3 na start)
- Fotografie (hero, galeria) - stary web ma len Slovanfoto.pdf
- Sponzori (alebo sekciu vypustit)
- Realne cisla pre hero strip - POZOR: 280+ clenov, 9 druzstiev, 17x majster, rok 1922
  su v demo layoute VYMYSLENE placeholdery a treba ich overit (stanovy su z 1925,
  rok zalozenia 1922 je neoverene)

## 3. New sitemap (proposal)

```
/            Home - novy one-page layout
             (hero, o klube, tim, kalendar, novinky - posledne 3, galeria,
             trening/clenstvo, kontakt, sponzori)
/news        Zoznam vsetkych noviniek (markdown posty)
/news/:slug  Detail clanku (hero obrazok + text + volitelna galeria)
/history     Historia klubu + Galeria osobnosti (8 profilov v novom vizuale)
/archive     Turnajovy archiv - tabulka rocnikov s linkami na PDF / chess-results
             + ligy 1969-2013 + partie
/documents   Stanovy, formulare pre organizatorov, pravidla (linky na aktualne FIDE)
/files/...   Zrkadlo download.slovan-bratislava.com (PDF/XLS/DOC ako su)
```

Minimal alternative: only `/` + `/news` + `/archive` (historia a dokumenty ako sekcie archivu).

## 4. Filling the new layout - section by section

| Sekcia | Zdroj dat | Stav |
|---|---|---|
| Hero (claim, statistiky) | Historia.pdf, Clenovia.pdf | overit cisla, nahradit placeholdery |
| O klube | Historia.pdf | prepisat text podla realnej historie |
| Tim (karty A-timu + tabulka klubu) | team-a.json (rucne, moze mat hostov) + players.json (matrika) | doplnit realnu supisku A-timu |
| Kalendar | klub (turnaje, extraliga, klubove vecery) | dodat realne terminy |
| Novinky | markdown posty v content/news/ | dodat 3+ realne spravy |
| Galeria | Slovanfoto.pdf (extrahovat) + nove foto | nahradit placeholder dlazdice |
| Trening/clenstvo | klub - OVERIT: pripravka/akademia/dospeli su v demo vymyslene | potvrdit alebo prepisat |
| Kontakt | Adresa.pdf + realny email | overit "utorok a stvrtok" - stary web hovori o STVRTKOCH |
| Sponzori | klub | realne loga alebo vypustit |

## 5. Tech stack and architecture

Stack: **Vite + React + TypeScript + Tailwind CSS (v4) + react-router**.
Cisto staticky build (ziadny backend), nasaditelny na lubovolny staticky hosting
(Cloudflare Pages / Netlify / GitHub Pages).

### Project structure

```
sk_slovan/
  reference/           povodne demo (dc.html, support.js, slovan.png) - iba vizualna predloha
  content/
    news/              markdown novinky - viz content model nizsie
    events/            kalendar podujati - jeden .md subor (frontmatter) = jedna udalost
    data/              players.json, sponsors.json
  public/
    files/             zrkadlo stareho archivu (PDF/XLS/DOC), stabilne URL
  src/
    pages/             Home, NewsList, NewsPost, History, Archive, Documents
    components/        sekcie homepage (Hero, Klub, Tim, Kalendar, ...), Gallery, PostCard
    lib/news.ts        nacitanie + parsovanie markdown postov (import.meta.glob)
```

### News content model (markdown)

Jeden priecinok = jeden clanok. Nazov priecinka je slug (a URL clanku):

```
content/news/2026-07-20-letny-bleskovy-pohar/
  index.md             text clanku + frontmatter (povinne)
  hero.jpg             VOLITELNE - hero obrazok; auto-detekcia hero.(jpg|jpeg|png|webp);
                       zobrazi sa v hlavicke clanku a ako nahlad v zozname noviniek
  gallery/             VOLITELNE - GALERIA CLANKU: kazdy obrazok vlozeny do tohto
    01.jpg             priecinka sa automaticky zobrazi v mriezke na konci clanku,
    02.jpg             zoradeny podla nazvu suboru (01, 02, ... urcuje poradie)
```

Frontmatter v index.md:

```yaml
---
title: Letny bleskovy pohar    # povinne
date: 2026-07-20               # povinne (radenie zoznamu)
tag: Turnaj                    # volitelne - badge na karte/clanku
excerpt: Kratky perex...       # volitelne - inak sa vezme prvy odsek
---
```

Mechanika: `import.meta.glob` nacita vsetky `content/news/*/index.md` (raw) a obrazky
(ako URL, Vite ich zahashuje do buildu), frontmatter sa parsuje pri starte, telo
renderuje `react-markdown`. Novy clanok = novy priecinok + commit/push (da sa aj cez
GitHub web editor vratane uploadu obrazkov) - ziadny CMS, ziadna databaza.

### Dalsie technicke rozhodnutia

- Tailwind theme tokeny podla demo vizualu: navy #0b1f44, blue #0f66c2, red #d81f2c,
  bg #f5f6f8; fonty Barlow + Barlow Condensed self-hosted cez @fontsource
  (ziadny request na Google Fonts - GDPR).
- Demo `reference/SK Slovan Bratislava.dc.html` je preview format (sc-for/sc-if,
  DCLogic, style-hover atributy) - sluzi len ako vizualna predloha; sekcie sa
  prepisu ako React komponenty s Tailwind triedami.
- Responzivita: Tailwind breakpointy, fixne 3-4 stlpcove gridy z dema prepisat
  na 1/2/3-4 stlpce, hero nadpis skalovat.
- Kontaktny formular: Formspree (alebo mailto fallback) - staticky web nema server.
- SEO: SPA staci na start; ak bude treba indexacia clankov Googlom, doplni sa
  prerender build krok (bez zmeny architektury).

## 6. Execution steps

1. **Archive the old site first.** Mirror `www.slovan-bratislava.com` aj
   `download.slovan-bratislava.com` (wget mirror) do `reference/old-site/` -
   obsah moze zmiznut.
2. **Scaffold**: Vite + React + TS + Tailwind + react-router, theme tokeny, fonty.
3. **Port vizualu**: sekcie homepage z dema ako komponenty + responzivita.
4. **News pipeline**: lib/news.ts, /news, /news/:slug, hero + gallery konvencie,
   1 ukazkovy clanok na overenie celeho toku.
5. **Extract facts** z klucovych PDF (Historia, Adresa, Vedenie, Clenovia) a
   naplnit realny obsah; supiska a ELO hracov Slovana z chess.sk.
6. **Subpages** /history, /archive, /documents + presun PDF do public/files/.
7. **Kontaktny formular** napojit (Formspree) alebo docasne mailto.
8. **Deploy + redirecty** zo starych URL (aspon sitemap.html a hlavne turnajove
   stranky) na nove ekvivalenty.

## 7. Success criteria

- Kazda URL zo stareho sitemap.html ma bud novy ekvivalent, alebo je dostupna
  cez /archive (ziadna strata obsahu).
- Na webe nezostal ziaden vymysleny fakt z demo layoutu (mena hracov, cisla,
  rok zalozenia, treningove kategorie).
- Mimo /archive web nezobrazuje udaje o hracoch, ktori nie su clenmi klubu
  (ratingy, rebricky, supisky inych klubov). Vynimka: hostujuci hraci na
  supiske A-timu (content/data/team-a.json).
- Web funguje na mobile (360px) aj desktope bez horizontalneho scrollu.
- Formular alebo kontakt realne dorucuje spravy.

## 8. Open questions for the club

1. VYRIESENE: korene klubu 1891 (Historia.pdf), 6x majster SR druzstiev - extraliga
   1995/96, 98/99, 00/01, 01/02, 08/09, 12/13 (Wikipedia, overene proti extralige
   2024/25); pocty hracov sa pocitaju dynamicky z players.json (matrika SSZ).
2. Existuje mladeznicka akademia s kategoriami ako v demo, alebo prepisat?
3. Klubove vecery - stvrtok (stary web) alebo utorok+stvrtok (demo)?
4. Kam sa bude web nasadzovat (hosting)? Novinky su vyriesene ako markdown v gite -
   kto ich bude pridavat, potrebuje pristup do repa (staci GitHub web editor).
5. Realna supiska A-timu pre aktualnu sezonu (chess.sk supisky extraligy) -
   doplnit rucne do content/data/team-a.json; mozu tam byt aj hostujuci hraci,
   kym je prazdna, web zobrazuje top 8 z matriky.
