import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'

const navLinks = [
  { label: 'About', href: '#about', route: '/' },
  { label: 'Skills & Expertise', href: '#skills', route: '/' },
  { label: 'Projects', href: null, route: '/projects' },
  { label: 'Contact', href: '#contact', route: '/' },
]

const Navbar = () => {
  const [activeTab, setActiveTab] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    if (location.pathname === '/projects') {
      setActiveTab('Projects')
      setMobileMenuOpen(false)
      return
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 40)

      if (location.pathname !== '/') return
      const sectionIds = ['about', 'skills', 'contact']
      const labels = ['About', 'Skills & Expertise', 'Contact']
      const scrollPosition = window.scrollY + 200

      sectionIds.forEach((id, index) => {
        const section = document.getElementById(id)
        if (section) {
          const top = section.offsetTop
          const bottom = top + section.offsetHeight
          if (scrollPosition >= top && scrollPosition < bottom) {
            setActiveTab(labels[index])
          }
        }
      })

      if (window.scrollY < 300) setActiveTab('')
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [location.pathname])

  const handleClick = (item) => {
    setActiveTab(item.label)
    setMobileMenuOpen(false)

    if (item.route === '/projects') {
      navigate('/projects')
      return
    }

    if (location.pathname !== '/') {
      navigate('/')
      setTimeout(() => {
        const el = document.querySelector(item.href)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    } else if (item.href) {
      const el = document.querySelector(item.href)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleLogoClick = () => {
    setActiveTab('')
    setMobileMenuOpen(false)
    if (location.pathname !== '/') {
      navigate('/')
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <motion.header
      className={`top-navbar${scrolled ? ' scrolled' : ''}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
    >
      <button className="nav-logo" onClick={handleLogoClick}>
        Sumeet Gupta
      </button>

      {/* Desktop Links */}
      <nav className="nav-links">
        {navLinks.map((item) => (
          <button
            key={item.label}
            onClick={() => handleClick(item)}
            className={`nav-link${activeTab === item.label ? ' active' : ''}`}
          >
            {item.label}
          </button>
        ))}
      </nav>

      {/* Right side actions + Mobile Hamburger */}
      <div className="nav-right">
        <a href="/resume.pdf" target="_blank" rel="noreferrer" className="nav-resume-btn">
          Resume
        </a>
        <ThemeToggle />
        <button 
          className={`mobile-menu-btn ${mobileMenuOpen ? 'open' : ''}`} 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span><span></span><span></span>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'active' : ''}`}>
        {navLinks.map((item) => (
          <button
            key={item.label}
            onClick={() => handleClick(item)}
            className={`mobile-nav-link${activeTab === item.label ? ' active' : ''}`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </motion.header>
  )
}

export default Navbar
