# ŠK Slovan Bratislava - klubovy web

Novy web sachoveho klubu ŠK Slovan Bratislava, nahrada za povodny frameset web
na https://www.slovan-bratislava.com. Migracny plan a stav: [PLAN.md](PLAN.md).

## Tech stack

Vite + React + TypeScript + Tailwind CSS v4 + react-router. Cisto staticky web -
ziadny backend ani databaza. Vsetok obsah sa nacitava pri builde (import.meta.glob),
takze zmena obsahu = zmena suboru + commit.

## Prikazy

```
npm install            # prva instalacia
npm run dev            # dev server na http://localhost:5173
npm run build          # typecheck + produkcny build do dist/
npm run preview        # lokalny nahlad produkcneho buildu
npm run fetch:players  # aktualizacia supisky z chess.sk (viz nizsie)
```

## Ako pridat novinku

Jeden priecinok v `content/news/` = jeden clanok. Nazov priecinka je slug
(URL clanku), odporucany format `RRRR-MM-DD-nazov-clanku`:

```
content/news/2026-07-20-letny-bleskovy-pohar/
  index.md      POVINNE - text clanku (Markdown) + hlavicka
  hero.jpg      VOLITELNE - hlavny obrazok (hero.jpg / hero.png / hero.webp);
                zobrazi sa v hlavicke clanku a ako nahlad v zozname noviniek
  gallery/      VOLITELNE - fotogaleria: KAZDY obrazok vlozeny do tohto priecinka
    01.jpg      sa automaticky zobrazi na konci clanku (modal s listovanim),
    02.jpg      zoradeny podla nazvu suboru (01-, 02-, ... urcuje poradie)
```

Hlavicka (frontmatter) na zaciatku `index.md`:

```
---
title: Letny bleskovy pohar     (povinne - nadpis)
date: 2026-07-20                (povinne - urcuje poradie v zozname)
tag: Turnaj                     (volitelne - cerveny stitok)
excerpt: Kratky perex.          (volitelne - inak sa pouzije prvy odsek)
---

Text clanku v Markdowne...
```

Podporovane obrazky: jpg, jpeg, png, webp. Obrazky vlozene priamo v texte
(`![popis](foto.jpg)`) sa hladaju v priecinku clanku.

Fotky z galerii najnovsich clankov sa automaticky zobrazuju aj v sekcii
"Galeria" na uvodnej stranke - netreba nic nastavovat.

Cely postup sa da spravit v GitHub web editore vratane nahratia obrazkov,
netreba nic instalovat.

## Ako pridat udalost do kalendara

Jeden `.md` subor v `content/events/` = jedna udalost, staci hlavicka:

```
---
title: Extraliga - 1. kolo      (povinne)
date: 2026-09-20                (povinne - format RRRR-MM-DD)
type: Družstvá                  (volitelne - modry stitok)
location: Bratislava · klubovňa (volitelne)
tag: Domáci zápas               (volitelne - poznamka vpravo)
---
```

Na webe sa zobrazuju len buduce udalosti, najblizsia je zvyraznena.
Stare subory netreba mazat - po datume samy zmiznu.

## Ako aktualizovat supisku hracov

```
npm run fetch:players
```

Skript `tools/fetch-players.mjs` stiahne z matriky SSZ (chess.sk) CSV export
hracov filtrovany na klub "ŠK Slovan Bratislava", vytiahne meno, FIDE titul,
rating a FIDE ID a zapise ich do `content/data/players.json` aj s datumom stavu.
Subor NEUPRAVUJTE rucne - dalsi beh skriptu ho prepise.

Web zobrazuje supisku A-timu ako karty a kompletnu supisku klubu
v rozbalovacej tabulke, s odkazmi na FIDE profily.

Kedy spustit: po prestupoch alebo novom ratingovom rebricku (staci raz za cas,
data sa zapecu do buildu). Pozor: zobrazujeme len hracov Slovana - skript
filtruje presnu zhodu nazvu klubu a nic ine na web nepatri (viz PLAN.md).
Jedina vynimka je supiska A-timu (nizsie), kde mozu byt hostujuci hraci.

### Supiska A-timu

A-tim ma vlastnu supisku v `content/data/team-a.json` (rovnaky format ako
players.json), ktora sa upravuje RUCNE - moze obsahovat aj hostujucich hracov
mimo klubu, takze sa neda generovat z matriky (`sszId` vtedy mozno vynechat).
Kym je zoznam prazdny, web docasne zobrazuje top 8 hracov z matriky.

## Ako aktualizovat vysledky druzstiev (sezona)

```
npm run fetch:standings
```

Skript `tools/fetch-standings.mjs` prejde vsetky slovenske sutaze druzstiev danej
sezony (chess.sk -> chess-results.com), v kazdej najde tabulku "Tabulka podla
poradia (MP)" a vytiahne konecne umiestnenie vsetkych druzstiev Slovana (A, B, C...)
do `content/data/standings.json`. Subor NEUPRAVUJTE rucne. Zobrazuje sa na
stranke /vysledky, umiestnenia do 3. miesta dostanu medailu.

Sezona sa nastavuje konstantami `SEASON_VALUE` a `SEASON_LABEL` na zaciatku skriptu -
po skonceni dalsej sezony ich treba zvysit (hodnota = filter zo selectu na chess.sk).
Kedy spustit: po skonceni sezony, ked su vysledky finalne.

## Ostatny obsah

- `content/personalities/` - galeria osobnosti na /history: jeden .md subor
  (frontmatter + Markdown) = jeden profil, originaly PDF su
  v `public/files/Osobnosti/`. Format: [content/README.md](content/README.md).
- `content/data/sponsors.json` - sponzori `[{ "name", "url", "logo" }]`;
  prazdny zoznam = sekcia sa nezobrazi.
- Texty sekcii (O klube, Trening, Kontakt...) su priamo v komponentoch
  v `src/components/home/`.
- `public/files/` - miesto pre zozrkadlene subory povodneho webu (PDF/XLS/DOC).
- Podrobnejsi navod pre editorov obsahu: [content/README.md](content/README.md).

## Struktura projektu

```
content/           obsah webu (novinky, udalosti, data) - viz vyssie
public/            staticke subory (logo, favicon, archiv PDF)
reference/         povodne demo dizajnu - len ako vizualna predloha
src/
  components/      Header, Footer, Lightbox, PostCard, sekcie homepage
  lib/             news.ts, events.ts, personalities.ts, markdown.ts (nacitanie obsahu)
  pages/           Home, NewsList, NewsPost, History, Personality, Results, Archive, Documents
tools/             fetch-players.mjs (supiska), fetch-standings.mjs (vysledky druzstiev)
```

## Kontaktny formular

Bez konfiguracie formular otvori predvyplneny e-mail (mailto). Pre odosielanie
cez Formspree nastavte pri builde premennu `VITE_FORMSPREE_ENDPOINT`.

## TODO pred spustenim

Neoverene fakty z navrhu su oznacene `TODO` v kode a zhrnute v PLAN.md sekcii 8:
treningove kategorie. Dalej treba doplnit realnu supisku A-timu do
`content/data/team-a.json`, zozrkadlit stary web do `public/files/`
a nastavit redirecty (PLAN.md sekcia 6).
