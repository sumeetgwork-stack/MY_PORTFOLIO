import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { HiLocationMarker, HiAcademicCap, HiCode, HiGlobe } from 'react-icons/hi'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
}

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } } }

const About = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 })

  const details = [
    { icon: <HiLocationMarker />, label: 'Location', value: 'Mumbai, India' },
    { icon: <HiAcademicCap />, label: 'University', value: 'Xavier Institute of Eng.' },
    { icon: <HiCode />, label: 'Focus', value: 'Full-Stack & IoT' },
    { icon: <HiGlobe />, label: 'Languages', value: 'English, Hindi' },
  ]

  return (
    <section className="about" id="about" ref={ref}>
      <div className="container">
        <motion.div variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
          <h2 className="section-title" style={{ fontSize: 'clamp(3rem, 7vw, 5rem)', letterSpacing: '0.05em', marginBottom: '24px' }}>
            ABOUT ME
          </h2>
        </motion.div>

        <div className="about-grid">
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="about-image-box">
              <img 
                src="/about.jpg" 
                alt="Sumeet Gupta" 
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
              <span style={{ display: 'none' }}>👨‍💻</span>
            </div>
          </motion.div>

          <motion.div className="about-info" variants={stagger} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
            <motion.h3 variants={fadeUp}>
              A curious mind building at the intersection of hardware & software
            </motion.h3>
            <motion.p variants={fadeUp}>
              I&apos;m currently pursuing a Bachelor of Engineering in Computer Science from 
              Xavier Institute of Engineering. I have a growing interest in both programming 
              and hardware development.
            </motion.p>
            <motion.p variants={fadeUp}>
              I&apos;m particularly curious about developing websites, app, automation, IoT, and AI. I believe 
              in creating technology that makes a real impact — from surveillance rovers for 
              disaster response to AI-powered communication, 3D websites.
            </motion.p>
            <motion.div className="about-details" variants={stagger}>
              {details.map((d) => (
                <motion.div key={d.label} className="about-detail-item" variants={fadeUp}>
                  <div className="label">{d.label}</div>
                  <div className="value" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ color: 'var(--text-muted)' }}>{d.icon}</span> {d.value}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About
