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

import Reveal from './components/Reveal'

function HomePage() {
  return (
    <>
      <main>
        <Hero />
        <div className="section-divider" />
        <Reveal><About /></Reveal>
        <div className="section-divider" />
        <Reveal><Skills /></Reveal>
        <div className="section-divider" />
        <Reveal><Education /></Reveal>
        <div className="section-divider" />
        <Reveal><Certifications /></Reveal>
        <div className="section-divider" />
        <Reveal><Contact /></Reveal>
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

import CustomCursor from './components/CustomCursor'
import { motion, useScroll, useSpring as useFramerSpring } from 'framer-motion'

function App() {
  const [loading, setLoading] = useState(true)
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('portfolio-theme')
    return saved || 'light'
  })

  const { scrollYProgress } = useScroll()
  const scaleX = useFramerSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
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
      <CustomCursor />
      <motion.div className="scroll-progress" style={{ scaleX }} />
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
