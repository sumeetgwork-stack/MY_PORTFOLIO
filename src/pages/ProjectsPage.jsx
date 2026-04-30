import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { HiArrowLeft, HiX } from 'react-icons/hi'

/* ──────────── PROJECT DATA ──────────── */
const projects = [
  {
    id: 1, number: '01', title: 'ChaloGhumo', subtitle: 'Travel Planning Application',
    description: 'A user-focused full-stack application designed for intuitive trip planning with beautiful UI/UX and robust backend architecture.',
    highlights: ['Built a user-focused full‑stack app for trip planning', 'Improved skills in UI/UX and backend connections'],
    tech: ['Full-Stack', 'UI/UX', 'Database', 'REST API'], emoji: '✈️',
  },
  {
    id: 2, number: '02', title: 'RoboRover', subtitle: 'IoT Surveillance Rover',
    description: 'An intelligent rover equipped with IoT sensors designed for disaster response scenarios with real-time monitoring capabilities.',
    highlights: ['Created a rover with IoT sensors for disaster response', 'Set up real‑time monitoring with reliable communication'],
    tech: ['IoT', 'Sensors', 'Real-time', 'Embedded'], emoji: '🤖',
  },
  {
    id: 3, number: '03', title: 'AI Comm Assistant', subtitle: 'For Mute Individuals',
    description: 'Training gesture-recognition ML models to enable inclusive communication, closing social gaps with human-centered AI technology.',
    highlights: ['Training gesture‑recognition ML models', 'Aiming to close social gaps with human‑centered AI'],
    tech: ['Machine Learning', 'Gesture Recognition', 'Python', 'AI'], emoji: '🧠',
  },
  {
    id: 4, number: '04', title: 'Quiz Application', subtitle: 'Interactive Web Platform',
    description: 'A dynamic quiz tool with secure authentication, real-time scoring, and a fully responsive layout built from scratch.',
    highlights: ['Developed interactive quiz with dynamic questions', 'Added secure login, scoring, and responsive layout'],
    tech: ['HTML', 'CSS', 'JavaScript', 'Backend'], emoji: '📝',
  },
  {
    id: 5, number: '05', title: 'ChainFund', subtitle: 'Blockchain Fundraising Platform',
    description: 'A blockchain-based fundraising platform with robust KYC management and admin application processing, featuring a clean, optimized interface.',
    highlights: ['Built a decentralized fundraising platform using Web3 technologies', 'Implemented comprehensive KYC management and admin processing logic'],
    tech: ['Blockchain', 'Web3', 'KYC', 'Full-Stack'], emoji: '🔗',
  },
  {
    id: 6, number: '06', title: 'Medicare+', subtitle: 'IoT & Blockchain App',
    description: 'A secure mobile application combining IoT health devices and Blockchain technology to securely track and manage patient data.',
    highlights: ['Developed a robust mobile application with a stabilized dark theme', 'Integrated IoT sensors with Blockchain data security for health monitoring'],
    tech: ['IoT', 'Blockchain', 'React Native', 'Mobile'], emoji: '🩺',
  },
  {
    id: 7, number: '07', title: 'OatbitesBySEJ', subtitle: '3D E-commerce Website',
    description: 'A highly interactive 3D e-commerce platform featuring dynamic weight-based product variants, pricing models, and an admin dashboard.',
    highlights: ['Created a fully functional 3D website for an e-commerce client', 'Implemented weight-based product variants and dynamic shopping cart logic', 'Developed a custom admin dashboard for product management'],
    tech: ['3D Web', 'E-commerce', 'Admin Panel', 'React'], emoji: '🍪',
  },
]

/* ──────────── CYLINDER ──────────── */
const CylinderCarousel = ({ onSelect, selectedId, rotation }) => {
  const faceCount = projects.length
  const anglePerFace = 360 / faceCount
  // Dynamically calculate radius based on number of faces so they don't overlap
  const translateZ = Math.round(180 / (2 * Math.tan(Math.PI / faceCount))) + 20

  return (
    <div className="cylinder-viewport">
      <img 
        src="/project-hand.png" 
        alt="Sumeet's Hand" 
        className="cylinder-hand-bg" 
        onError={(e) => { e.target.style.display = 'none'; }}
      />
      <div
        className="cylinder-track"
        style={{ transform: `rotateX(-5deg) rotateY(${rotation}deg)` }}
      >
        {projects.map((project, i) => {
          const angle = i * anglePerFace
          return (
            <div
              key={project.id}
              className="cylinder-face"
              onClick={() => onSelect(project.id)}
              style={{
                transform: `rotateY(${angle}deg) translateZ(${translateZ}px)`,
                borderColor: selectedId === project.id ? 'var(--accent)' : undefined,
                boxShadow: selectedId === project.id ? '0 8px 30px rgba(79,70,229,0.18)' : undefined,
              }}
            >
              <div className="cylinder-face-top">
                <span className="cylinder-face-emoji">{project.emoji}</span>
                <div className="cylinder-face-number">{project.number}</div>
              </div>
              <div className="cylinder-face-body">
                <div className="cylinder-face-title">{project.title}</div>
                <div className="cylinder-face-subtitle">{project.subtitle}</div>
              </div>
              <div className="cylinder-face-tech">
                {project.tech.slice(0, 3).map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* ──────────── DETAIL PANEL ──────────── */
const DetailPanel = ({ project, onClose }) => (
  <motion.div
    className="project-detail-panel"
    initial={{ opacity: 0, x: 80, scale: 0.96 }}
    animate={{ opacity: 1, x: 0, scale: 1 }}
    exit={{ opacity: 0, x: 80, scale: 0.96 }}
    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
  >
    <button className="detail-close-btn" onClick={onClose} aria-label="Close">
      <HiX />
    </button>

    <motion.div
      className="detail-accent-line"
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ delay: 0.15, duration: 0.5 }}
    />

    <div className="detail-header">
      <motion.span
        className="detail-emoji"
        initial={{ scale: 0, rotate: -90 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 18 }}
      >
        {project.emoji}
      </motion.span>
      <div>
        <span className="detail-number">PROJECT {project.number}</span>
        <h2 className="detail-title">{project.title}</h2>
        <p className="detail-subtitle">{project.subtitle}</p>
      </div>
    </div>

    <p className="detail-description">{project.description}</p>

    <div className="detail-highlights">
      {project.highlights.map((h, i) => (
        <motion.div
          key={i}
          className="highlight-item"
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.25 + i * 0.1 }}
        >
          <span className="highlight-marker">▹</span>
          {h}
        </motion.div>
      ))}
    </div>

    <div className="detail-tech">
      {project.tech.map((t, i) => (
        <motion.span
          key={t}
          className="tech-pill"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.35 + i * 0.06 }}
        >
          {t}
        </motion.span>
      ))}
    </div>
  </motion.div>
)

/* ──────────── MAIN PAGE ──────────── */
const ProjectsPage = () => {
  const [selectedId, setSelectedId] = useState(null)
  const [rotation, setRotation] = useState(0)
  const selectedProject = projects.find((p) => p.id === selectedId)
  const isLocked = useRef(false)
  const layoutRef = useRef(null)

  useEffect(() => { window.scrollTo(0, 0) }, [])

  // Lock/unlock wheel rotation based on selection
  useEffect(() => {
    isLocked.current = selectedId !== null
  }, [selectedId])

  // Use wheel event directly — no scroll needed
  useEffect(() => {
    const handleWheel = (e) => {
      if (isLocked.current) return
      e.preventDefault()
      const step = 360 / projects.length
      if (Math.abs(e.deltaY) > 5) {
        setRotation((prev) => prev - Math.sign(e.deltaY) * step)
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    return () => window.removeEventListener('wheel', handleWheel)
  }, [])

  // Touch handlers for mobile swiping
  const touchStartY = useRef(null)
  const touchStartX = useRef(null)

  useEffect(() => {
    const handleTouchStart = (e) => {
      touchStartY.current = e.touches[0].clientY
      touchStartX.current = e.touches[0].clientX
    }

    const handleTouchEnd = (e) => {
      if (isLocked.current || touchStartY.current === null || touchStartX.current === null) return

      const touchEndY = e.changedTouches[0].clientY
      const touchEndX = e.changedTouches[0].clientX

      const deltaY = touchStartY.current - touchEndY
      const deltaX = touchStartX.current - touchEndX

      const step = 360 / projects.length

      // Detect if the swipe is significant enough
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Horizontal swipe (Left/Right)
        if (Math.abs(deltaX) > 40) {
          setRotation((prev) => prev - Math.sign(deltaX) * step)
        }
      }

      touchStartY.current = null
      touchStartX.current = null
    }

    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [])

  return (
    <motion.div
      className="projects-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header — just title, no labels */}
      <motion.div
        className="projects-page-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h1 className="section-title" style={{ textAlign: 'center' }}>My work</h1>
      </motion.div>

      {/* Cylinder + Detail */}
      <div className={`cylinder-layout${selectedId ? ' shifted' : ''}`} ref={layoutRef}>
        <CylinderCarousel
          onSelect={setSelectedId}
          selectedId={selectedId}
          rotation={rotation}
        />
        <AnimatePresence mode="wait">
          {selectedProject && (
            <DetailPanel
              key={selectedProject.id}
              project={selectedProject}
              onClose={() => setSelectedId(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default ProjectsPage
