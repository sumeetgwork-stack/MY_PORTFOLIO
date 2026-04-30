import { useState, useEffect, createContext, useContext } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Education from './components/Education'
import Certifications from './components/Certifications'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Loader from './components/Loader'
import ProjectsPage from './pages/ProjectsPage'
import BackgroundAnimation from './components/BackgroundAnimation'

export const ThemeContext = createContext()
export const useTheme = () => useContext(ThemeContext)

function HomePage() {
  return (
    <>
      <main>
        <Hero />
        <div className="section-divider" />
        <About />
        <div className="section-divider" />
        <Skills />
        <div className="section-divider" />
        <Education />
        <div className="section-divider" />
        <Certifications />
        <div className="section-divider" />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
      </Routes>
    </AnimatePresence>
  )
}

function App() {
  const [loading, setLoading] = useState(true)
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('portfolio-theme')
    return saved || 'light'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('portfolio-theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme((p) => (p === 'dark' ? 'light' : 'dark'))

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 4500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <AnimatePresence mode="wait">
        {loading && <Loader key="loader" />}
      </AnimatePresence>
      {!loading && (
        <BrowserRouter>
          <BackgroundAnimation theme={theme} />
          <Navbar />
          <AnimatedRoutes />
        </BrowserRouter>
      )}
    </ThemeContext.Provider>
  )
}

export default App
