import Hero from '../components/home/Hero'
import About from '../components/home/About'
import Team from '../components/home/Team'
import CalendarSection from '../components/home/CalendarSection'
import NewsSection from '../components/home/NewsSection'
import HomeGallery from '../components/home/HomeGallery'
import Training from '../components/home/Training'
import Contact from '../components/home/Contact'
import Sponsors from '../components/home/Sponsors'

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Team />
      <CalendarSection />
      <NewsSection />
      <HomeGallery />
      <Training />
      <Contact />
      <Sponsors />
    </>
  )
}
