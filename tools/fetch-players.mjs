// Stiahne supisku ŠK Slovan Bratislava z matriky SSZ (chess.sk) a zapise ju
// do content/data/players.json. Spustenie: npm run fetch:players
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const CLUB = 'ŠK Slovan Bratislava'
const EXPORT_URL =
  'https://www.chess.sk/index.php?str=clenovia&detail=10&page_p=1&export_current_data=1&' +
  new URLSearchParams({
    dgphp_filter_p_klub: CLUB,
    datagridphp_submit_p: 'Hľadať',
  }).toString()

const res = await fetch(EXPORT_URL)
if (!res.ok) throw new Error(`chess.sk export zlyhal: HTTP ${res.status}`)
const csv = (await res.text()).replace(/^﻿/, '')

// format: "94";"Ač, Michal";"ŠK Slovan Bratislava";"2038";"14900319";""
const lines = csv.trim().split(/\r?\n/).slice(1)
const players = lines
  .map((line) => {
    const cols = [...line.matchAll(/"((?:[^"]|"")*)"/g)].map((m) => m[1].replaceAll('""', '"'))
    const [sszId, rawName, klub, rating, fideId] = cols
    return { sszId, rawName, klub, elo: Number(rating), fideId }
  })
  // filter na chess.sk je substringovy - presnou zhodou drzime iba hracov Slovana
  .filter((p) => p.klub === CLUB && p.rawName)
  .map(({ rawName, sszId, elo, fideId }) => {
    // format mena v matrike: "[TITUL ]Priezvisko, Meno", napr. "GM Ftáčnik, Ľubomír"
    const [lastRaw, first = ''] = rawName.split(',').map((s) => s.trim())
    const parts = lastRaw.split(/\s+/).filter(Boolean)
    const TITLES = new Set(['GM', 'IM', 'FM', 'CM', 'WGM', 'WIM', 'WFM', 'WCM'])
    const title = parts.length > 1 && TITLES.has(parts[0]) ? parts.shift() : null
    const last = parts.join(' ')
    return { name: first ? `${first} ${last}` : last, title, elo, fideId, sszId }
  })
  .sort((a, b) => b.elo - a.elo)

if (players.length === 0) throw new Error('ziadni hraci - zmenil sa format exportu na chess.sk?')

const out = {
  updated: new Date().toISOString().slice(0, 10),
  source: 'matrika SŠZ (chess.sk)',
  club: CLUB,
  players,
}
const target = join(dirname(fileURLToPath(import.meta.url)), '..', 'content', 'data', 'players.json')
writeFileSync(target, JSON.stringify(out, null, 2) + '\n', 'utf8')
console.log(`players.json: ${players.length} hracov, stav k ${out.updated}`)
