import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

/* ── Stars + UFO + Cloud Formation Loader ── */
const Loader = () => {
  const canvasRef = useRef(null)
  const [phase, setPhase] = useState(0) // 0=forming, 1=zoom-out

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf
    let t = 0

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    resize()
    window.addEventListener('resize', resize)

    // Stars
    const stars = Array.from({ length: 120 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.8 + 0.3,
      twinkle: Math.random() * 0.03 + 0.01,
      offset: Math.random() * Math.PI * 2,
    }))

    // Cloud particles that form around the name
    const cloudParticles = Array.from({ length: 60 }, (_, i) => {
      const angle = (i / 60) * Math.PI * 2
      const radius = 160 + Math.random() * 80
      const targetX = Math.cos(angle) * radius
      const targetY = Math.sin(angle) * (radius * 0.4)
      return {
        x: (Math.random() - 0.5) * canvas.width * 1.5,
        y: (Math.random() - 0.5) * canvas.height * 1.5,
        targetX,
        targetY,
        size: Math.random() * 30 + 15,
        opacity: Math.random() * 0.3 + 0.1,
        speed: 0.01 + Math.random() * 0.02,
        wobble: Math.random() * Math.PI * 2,
      }
    })

    // UFO
    const ufo = { x: -80, y: canvas.height * 0.25, speed: 0.8 }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      t += 0.016

      const cx = canvas.width / 2
      const cy = canvas.height / 2

      // Draw stars
      stars.forEach((s) => {
        const flicker = Math.sin(t * 60 * s.twinkle + s.offset) * 0.4 + 0.6
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${flicker * 0.8})`
        ctx.fill()
      })

      // Draw UFO
      ufo.x += ufo.speed
      if (ufo.x > canvas.width + 80) ufo.x = -80
      const ufoY = ufo.y + Math.sin(t * 2) * 15

      // UFO body
      ctx.save()
      ctx.translate(ufo.x, ufoY)
      // Beam
      ctx.beginPath()
      ctx.moveTo(-8, 8)
      ctx.lineTo(8, 8)
      ctx.lineTo(18, 40)
      ctx.lineTo(-18, 40)
      ctx.closePath()
      ctx.fillStyle = `rgba(129, 140, 248, ${0.06 + Math.sin(t * 3) * 0.03})`
      ctx.fill()
      // Dome
      ctx.beginPath()
      ctx.ellipse(0, 0, 12, 10, 0, Math.PI, 0)
      ctx.fillStyle = 'rgba(167, 139, 250, 0.6)'
      ctx.fill()
      // Saucer
      ctx.beginPath()
      ctx.ellipse(0, 2, 24, 7, 0, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(99, 102, 241, 0.7)'
      ctx.fill()
      // Lights
      for (let i = -2; i <= 2; i++) {
        const lightPhase = Math.sin(t * 5 + i) * 0.5 + 0.5
        ctx.beginPath()
        ctx.arc(i * 8, 5, 2, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(251, 191, 36, ${lightPhase})`
        ctx.fill()
      }
      ctx.restore()

      // Animate cloud particles toward target
      const progress = Math.min(t / 2.5, 1)
      const ease = 1 - Math.pow(1 - progress, 3) // ease-out cubic

      cloudParticles.forEach((p) => {
        const currentX = p.x + (cx + p.targetX - p.x) * ease
        const currentY = p.y + (cy + p.targetY - p.y) * ease
        const wobbleX = Math.sin(t * 1.5 + p.wobble) * (8 * (1 - ease))
        const wobbleY = Math.cos(t * 1.2 + p.wobble) * (5 * (1 - ease))

        const drawX = currentX + wobbleX
        const drawY = currentY + wobbleY

        // Cloud puff
        const gradient = ctx.createRadialGradient(drawX, drawY, 0, drawX, drawY, p.size)
        gradient.addColorStop(0, `rgba(200, 200, 220, ${p.opacity * ease * 0.6})`)
        gradient.addColorStop(1, 'rgba(200, 200, 220, 0)')
        ctx.beginPath()
        ctx.arc(drawX, drawY, p.size, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()
      })

      raf = requestAnimationFrame(draw)
    }

    draw()

    // Phase timing
    const timer = setTimeout(() => setPhase(1), 3000)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      clearTimeout(timer)
    }
  }, [])

  return (
    <motion.div
      key="loader"
      initial={{ opacity: 1 }}
      animate={phase === 1 ? { scale: 8, opacity: 0 } : { scale: 1, opacity: 1 }}
      transition={phase === 1 ? { duration: 1.2, ease: [0.16, 1, 0.3, 1] } : {}}
      onAnimationComplete={() => {
        if (phase === 1) {
          // parent will handle unmounting via loading state
        }
      }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#0c0c18',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', inset: 0, zIndex: 0 }}
      />

      {/* Name text */}
      <motion.div
        style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.h1
          style={{
            fontFamily: "'Gilda Display', serif",
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 400,
            color: '#f5f5f5',
            letterSpacing: '-0.02em',
            lineHeight: 1.2,
          }}
        >
          Sumeet Gupta
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 1, duration: 1 }}
          style={{
            fontFamily: "'Inclusive Sans', sans-serif",
            fontSize: '0.75rem',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            color: '#a5b4fc',
            marginTop: '12px',
          }}
        >
          Portfolio
        </motion.p>
      </motion.div>
    </motion.div>
  )
}

export default Loader
