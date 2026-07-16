# Obsah webu - navod pre editorov

Vsetok obsah, ktory sa priebezne meni, je v tomto priecinku. Zmena = uprava suboru
+ commit/push (da sa aj cez GitHub web editor vratane nahravania obrazkov).

## Novinky (news/)

Jeden priecinok = jeden clanok. Nazov priecinka je URL clanku (slug),
odporucany format `RRRR-MM-DD-nazov-clanku`:

```
news/2026-07-20-letny-bleskovy-pohar/
  index.md      POVINNE - text clanku (Markdown) + hlavicka (viz nizsie)
  hero.jpg      VOLITELNE - hlavny obrazok clanku (hero.jpg / hero.png / hero.webp);
                zobrazi sa v hlavicke clanku a ako nahlad v zozname noviniek
  gallery/      VOLITELNE - SEM vlozte fotky galerie: kazdy obrazok v tomto
    01.jpg      priecinku sa automaticky zobrazi na konci clanku,
    02.jpg      zoradeny podla nazvu suboru (01-, 02-, ... urcuje poradie)
```

Hlavicka (frontmatter) na zaciatku index.md:

```
---
title: Letny bleskovy pohar     (povinne - nadpis)
date: 2026-07-20                (povinne - datum, urcuje poradie v zozname)
tag: Turnaj                     (volitelne - stitok na karte)
excerpt: Kratky perex clanku.   (volitelne - inak sa pouzije prvy odsek)
---
```

Podporovane formaty obrazkov: jpg, jpeg, png, webp.
Fotky z galerii najnovsich clankov sa automaticky zobrazuju aj v sekcii
"Galeria" na uvodnej stranke.

## Kalendar podujati (events/)

Jeden .md subor = jedna udalost, staci hlavicka (telo suboru sa zatial nezobrazuje).
Odporucany nazov suboru `RRRR-MM-DD-nazov.md`:

```
---
title: Extraliga - 1. kolo      (povinne - nazov udalosti)
date: 2026-09-20                (povinne - datum vo formate RRRR-MM-DD)
type: Družstvá                  (volitelne - modry stitok, napr. FIDE turnaj / Mladez / Blitz)
location: Bratislava · klubovňa (volitelne - miesto)
tag: Domáci zápas               (volitelne - poznamka vpravo)
---
```

Na webe sa zobrazuju len buduce udalosti, najblizsia je zvyraznena.
Stare subory netreba mazat - po datume samy zmiznu z webu.
POZOR: aktualne su v priecinku PLACEHOLDER udalosti - nahradit realnymi.

## Galeria osobnosti (personalities/)

Jeden .md subor = jeden profil osobnosti na podstranke /history/<nazov-suboru>.
Nazov suboru je URL profilu (slug), napr. `julius-kozma.md`:

```
---
name: Július Kozma              (povinne - meno)
title: IM                       (volitelne - titul pred menom, napr. IM / GM / MUDr.)
born: 1. 6. 1929                (volitelne - datum narodenia)
died: 26. 11. 2009              (volitelne - datum umrtia)
source: /files/Osobnosti/Kozma.pdf   (volitelne - odkaz na povodny dokument)
order: 6                        (volitelne - poradie v galerii, mensie = skor)
---

Text profilu v Markdowne...
```

Profily su prepisane z PDF dokumentov povodneho webu; originaly su ulozene
v `public/files/Osobnosti/`.

## Data (data/)

- `players.json` - supiska klubu. NEUPRAVUJTE RUCNE - subor generuje prikaz
  `npm run fetch:players`, ktory stiahne aktualnych hracov Slovana z matriky
  SSZ (chess.sk) aj s ratingami a FIDE ID. Spustit pri kazdej zmene supisky
  alebo novom ratingovom rebricku.
- `team-a.json` - supiska A-timu (extraliga). UPRAVUJE SA RUCNE, rovnaky format
  ako players.json. Moze obsahovat aj hostujucich hracov, ktori nie su clenmi
  klubu - preto sa negeneruje z matriky (`sszId` vtedy mozno vynechat).
  Kym je zoznam `players` prazdny, web docasne zobrazi top 8 z players.json.
- `sponsors.json` - sponzori: `[{ "name": "...", "url": "...", "logo": "..." }]`.
  Ak je zoznam prazdny, sekcia sa na webe nezobrazi.
