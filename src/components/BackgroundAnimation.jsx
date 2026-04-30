import { useEffect, useRef } from 'react'

const BackgroundAnimation = ({ theme }) => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf
    let t = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = document.documentElement.scrollHeight || window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Re-measure on scroll height changes
    const resizeObserver = new ResizeObserver(() => resize())
    resizeObserver.observe(document.body)

    const isDark = theme === 'dark'

    // Color palettes
    const waveColors = isDark
      ? [
          'rgba(79, 70, 229, 0.06)',   // indigo
          'rgba(139, 92, 246, 0.05)',   // violet
          'rgba(99, 102, 241, 0.04)',   // blue-indigo
        ]
      : [
          'rgba(79, 70, 229, 0.04)',
          'rgba(139, 92, 246, 0.035)',
          'rgba(99, 102, 241, 0.03)',
        ]

    const orbColors = isDark
      ? [
          { r: 79, g: 70, b: 229, a: 0.08 },
          { r: 139, g: 92, b: 246, a: 0.06 },
          { r: 59, g: 130, b: 246, a: 0.05 },
        ]
      : [
          { r: 79, g: 70, b: 229, a: 0.05 },
          { r: 139, g: 92, b: 246, a: 0.04 },
          { r: 199, g: 210, b: 254, a: 0.08 },
        ]

    // Floating orbs
    const orbs = Array.from({ length: 5 }, (_, i) => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: 150 + Math.random() * 250,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.2,
      color: orbColors[i % orbColors.length],
      phase: Math.random() * Math.PI * 2,
    }))

    // Small floating particles
    const particles = Array.from({ length: 30 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.5,
      speedY: -(Math.random() * 0.3 + 0.1),
      speedX: (Math.random() - 0.5) * 0.2,
      opacity: Math.random() * 0.3 + 0.1,
      twinkle: Math.random() * 0.02 + 0.005,
      offset: Math.random() * Math.PI * 2,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      t += 0.008

      // --- Gradient Orbs ---
      orbs.forEach((orb) => {
        orb.x += orb.speedX + Math.sin(t + orb.phase) * 0.3
        orb.y += orb.speedY + Math.cos(t * 0.7 + orb.phase) * 0.2

        // Wrap around
        if (orb.x < -orb.radius) orb.x = canvas.width + orb.radius
        if (orb.x > canvas.width + orb.radius) orb.x = -orb.radius
        if (orb.y < -orb.radius) orb.y = canvas.height + orb.radius
        if (orb.y > canvas.height + orb.radius) orb.y = -orb.radius

        const breathe = 1 + Math.sin(t * 0.5 + orb.phase) * 0.15
        const r = orb.radius * breathe

        const gradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, r)
        const { r: cr, g: cg, b: cb, a: ca } = orb.color
        gradient.addColorStop(0, `rgba(${cr}, ${cg}, ${cb}, ${ca})`)
        gradient.addColorStop(0.5, `rgba(${cr}, ${cg}, ${cb}, ${ca * 0.4})`)
        gradient.addColorStop(1, `rgba(${cr}, ${cg}, ${cb}, 0)`)

        ctx.beginPath()
        ctx.arc(orb.x, orb.y, r, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()
      })

      // --- Flowing Waves ---
      waveColors.forEach((color, i) => {
        ctx.beginPath()
        const amplitude = 40 + i * 15
        const frequency = 0.002 - i * 0.0003
        const speed = t * (0.8 + i * 0.3)
        const yBase = canvas.height * (0.3 + i * 0.25)

        ctx.moveTo(0, canvas.height)
        for (let x = 0; x <= canvas.width; x += 4) {
          const y =
            yBase +
            Math.sin(x * frequency + speed) * amplitude +
            Math.sin(x * frequency * 2.5 + speed * 0.7) * (amplitude * 0.3) +
            Math.cos(x * frequency * 0.5 + speed * 1.3) * (amplitude * 0.5)
          if (x === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.lineTo(canvas.width, canvas.height)
        ctx.lineTo(0, canvas.height)
        ctx.closePath()
        ctx.fillStyle = color
        ctx.fill()
      })

      // --- Floating Particles ---
      particles.forEach((p) => {
        p.y += p.speedY
        p.x += p.speedX

        // Reset when off screen
        if (p.y < -10) {
          p.y = canvas.height + 10
          p.x = Math.random() * canvas.width
        }
        if (p.x < -10) p.x = canvas.width + 10
        if (p.x > canvas.width + 10) p.x = -10

        const flicker = Math.sin(t * 30 * p.twinkle + p.offset) * 0.3 + 0.7
        const alpha = p.opacity * flicker

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = isDark
          ? `rgba(167, 139, 250, ${alpha})`
          : `rgba(79, 70, 229, ${alpha * 0.6})`
        ctx.fill()
      })

      raf = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      resizeObserver.disconnect()
    }
  }, [theme])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  )
}

export default BackgroundAnimation
