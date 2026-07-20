import PageHeader from '../components/PageHeader'
import SeasonStandings from '../components/SeasonStandings'
import data from '../../content/data/standings.json'

export default function Results() {
  return (
    <>
      <PageHeader
        eyebrow="Výsledky"
        title={`Sezóna ${data.season}`}
        lead="Konečné umiestnenie družstiev ŠK Slovan Bratislava v slovenských súťažiach družstiev."
      />
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-7 md:py-16">
        <SeasonStandings />
      </div>
    </>
  )
}
