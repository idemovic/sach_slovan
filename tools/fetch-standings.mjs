// Prejde vsetky slovenske suatze druzstiev danej sezony (chess.sk -> chess-results.com),
// najde v tabulke "Tabulka podla poradia (MP)" vsetky druzstva SK Slovan Bratislava
// a zapise ich konecne umiestnenie do content/data/standings.json.
// Spustenie: npm run fetch:standings
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

// Sezona na spracovanie. Hodnota je filter zo selectu na chess.sk (str=sutaze&detail=28),
// label je zobrazovany text. Po skonceni dalsej sezony bumpni obe hodnoty.
const SEASON_VALUE = '25'
const SEASON_LABEL = '2025/2026'

const CLUB = 'Slovan Bratislava' // substring - zachyti aj B/C tim (napr. "SK Slovan Bratislava B")
const LIST_URL =
  `https://chess.sk/index.php?str=sutaze&detail=28&page_p=1&dgphp_filter_p_sezona=${SEASON_VALUE}&datagridphp_submit_p=xx`
const RANK_ART = 83 // "Tabulka podla poradia (MP)" - konecne poradie podla zapasovych bodov

const NAMED = { nbsp: ' ', amp: '&', lt: '<', gt: '>', quot: '"', '#39': "'" }
function decode(s) {
  return s
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&(nbsp|amp|lt|gt|quot|#39);/g, (_, n) => NAMED[n])
}
function clean(html) {
  return decode(html.replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim()
}

async function get(url) {
  const res = await fetch(url, { headers: { 'User-Agent': 'sk-slovan-web/fetch-standings' } })
  if (!res.ok) throw new Error(`HTTP ${res.status} pri ${url}`)
  return res.text()
}

// zoznam sutazi sezony: [{ name, tnr }]
function parseCompetitions(html) {
  return html
    .split('id="p_src_')
    .slice(1)
    .map((chunk) => {
      const name = clean((chunk.match(/<a[^>]*>(.*?)<\/a>/s) || [, ''])[1])
      const tnr = (chunk.match(/chess-results\.com\/(tnr\d+)\.aspx/) || [, ''])[1]
      return { name, tnr }
    })
    .filter((c) => c.tnr)
}

// tabulka poradia: [{ rank, team }]
function parseRanking(html) {
  const rows = [...html.matchAll(/<tr[^>]*class="CR[^"]*"[^>]*>(.*?)<\/tr>/gs)]
  const table = []
  for (const [, body] of rows) {
    const cells = [...body.matchAll(/<td[^>]*>(.*?)<\/td>/gs)].map((m) => clean(m[1]))
    const rank = Number(cells[0])
    if (Number.isInteger(rank) && rank > 0 && cells[1]) table.push({ rank, team: cells[1] })
  }
  return table
}

const listHtml = await get(LIST_URL)
const competitions = parseCompetitions(listHtml)
if (competitions.length === 0) throw new Error('ziadne sutaze - zmenil sa format chess.sk?')

const results = []
for (const c of competitions) {
  const url = `https://chess-results.com/${c.tnr}.aspx?lan=4&art=${RANK_ART}`
  let table
  try {
    table = parseRanking(await get(url))
  } catch (e) {
    console.warn(`  ! ${c.name}: ${e.message}`)
    continue
  }
  const ours = table.filter((row) => row.team.includes(CLUB))
  for (const row of ours) {
    results.push({ league: c.name, team: row.team, rank: row.rank, teams: table.length, url })
    console.log(`  ${c.name}: ${row.team} -> ${row.rank}. z ${table.length}`)
  }
}

if (results.length === 0) throw new Error('nenasiel sa ziaden tim Slovana - skontroluj sezonu/format')

const out = {
  season: SEASON_LABEL,
  updated: new Date().toISOString().slice(0, 10),
  source: 'chess-results.com (cez chess.sk)',
  standings: results,
}
const target = join(dirname(fileURLToPath(import.meta.url)), '..', 'content', 'data', 'standings.json')
writeFileSync(target, JSON.stringify(out, null, 2) + '\n', 'utf8')
console.log(`\nstandings.json: ${results.length} timov Slovana v sezone ${SEASON_LABEL}`)
