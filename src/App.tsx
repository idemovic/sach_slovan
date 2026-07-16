import { useEffect } from 'react'
import { Link, Route, Routes, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import NewsList from './pages/NewsList'
import NewsPost from './pages/NewsPost'
import History from './pages/History'
import Personality from './pages/Personality'
import Archive from './pages/Archive'
import Documents from './pages/Documents'

function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

function NotFound() {
  return (
    <div className="mx-auto max-w-7xl px-7 py-32 text-center">
      <div className="font-condensed text-7xl font-extrabold uppercase text-navy">404</div>
      <p className="mt-3 text-lg text-slate-600">Stránka neexistuje.</p>
      <Link to="/" className="mt-6 inline-block rounded-lg bg-red px-6 py-3 font-condensed text-lg font-bold uppercase tracking-wide text-white">
        Späť na úvod
      </Link>
    </div>
  )
}

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollManager />
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/news" element={<NewsList />} />
          <Route path="/news/:slug" element={<NewsPost />} />
          <Route path="/history" element={<History />} />
          <Route path="/history/:slug" element={<Personality />} />
          <Route path="/archive" element={<Archive />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
