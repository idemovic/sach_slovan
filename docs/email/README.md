# E-mailové šablóny ŠK Slovan Bratislava

Jednotný vzhľad e-mailov klubu. V priečinku sú dve šablóny:

- `signature.html` - **podpis** pod bežné e-maily (Gmail aj iné programy)
- `newsletter.html` - **newsletter / oznam** (turnaj, výsledky, pozvánka...)

Obe si logo načítavajú z `https://slovan.elia.sk/slovan.png`, netreba ho nikam
nahrávať. Texty v `[hranatých zátvorkách]` sú placeholdery - prepíš ich.

## Podpis (signature.html)

Prepíš tri placeholdery: `[Meno Priezvisko]`, `[Funkcia v klube]`
(napr. Prezident, Tréner mládeže, Kapitán A-tímu) a `[+421 900 000 000]`
(alebo celý riadok s telefónom zmaž). Zvyšok je spoločný a nemení sa.

Vloženie do Gmailu:

1. Otvor `signature.html` v prehliadači (dvojklik).
2. Označ všetko `Ctrl+A`, skopíruj `Ctrl+C`.
3. V Gmaile: ⚙ **Nastavenia > Zobraziť všetky nastavenia > Všeobecné > Podpis**.
4. **Vytvoriť nový**, pomenuj (napr. "Slovan") a vlož `Ctrl+V`.
5. Prepíš placeholdery a dole nastav podpis pre nové správy aj odpovede.
6. **Uložiť zmeny**.

Ak sa logo nezobrazí, skontroluj, či máš v Gmaile povolené zobrazovanie
externých obrázkov (Nastavenia > Obrázky > Vždy zobrazovať externé obrázky).

## Newsletter / oznam (newsletter.html)

Šablóna na hromadné správy - hlavička s logom, titulok, text, tlačidlo a päta.
Prepíš placeholdery (predmet, rubrika, nadpis, odseky, text a odkaz tlačidla).
Sekciu s podnadpisom môžeš skopírovať viackrát alebo zmazať.

Použitie v Gmaile - dve možnosti:

- **Jednorazovo:** otvor `newsletter.html` v prehliadači, `Ctrl+A`, `Ctrl+C`
  a vlož do okna **Napísať** (nová správa).
- **Ako uloženú šablónu:** ⚙ **Nastavenia > Zobraziť všetky nastavenia >
  Pokročilé** > pri **Šablóny** daj **Povoliť** a ulož. Potom v novej správe
  vlož obsah a cez **⋮ (tri bodky) > Šablóny > Uložiť koncept ako šablónu**.
  Nabudúce ju vložíš cez **⋮ > Šablóny**.

Na väčšie rozposielanie (stovky adries) je lepší mailingový nástroj
(Mailchimp, Ecomail a pod.) - `newsletter.html` sa doň dá vložiť ako HTML.
Pri hromadnom rozposielaní z Gmailu daj adresy do **skrytej kópie (Bcc)**.

## Textová verzia podpisu (bez formátovania)

```
[Meno Priezvisko]
[Funkcia v klube]
ŠK Slovan Bratislava - šachový klub

Tel: [+421 900 000 000]
E-mail: info@slovan-bratislava.com
Adresa: Černyševského 1286/8, 851 00 Bratislava-Petržalka
www.slovan-bratislava.com · facebook.com/Slovanchess
```

## Poznámky

- Obe šablóny sú robené tabuľkami s inline štýlmi a bežným písmom (Arial), aby
  vyzerali rovnako vo väčšine e-mailových klientov - tie ignorujú `<style>`
  aj vlastné písma.
- Logo je plné (800x800, ~380 kB) načítané z URL. Pošte to nevadí (obrázok sa
  nevkladá do správy, len sa načíta a zobrazí zmenšený), ale ak by sa niekedy
  zmenila adresa loga alebo webu, uprav `src`/odkazy v oboch `.html` súboroch.
- Zobrazovaný web je `www.slovan-bratislava.com`. Ak bude verejná adresa nového
  webu iná, prepíš odkazy v oboch súboroch.
