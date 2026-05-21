import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

const Education = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 })

  return (
    <section className="education" id="education" ref={ref}>
      <div className="container">
        <motion.div variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
          <span className="section-label">Education</span>
          <h2 className="section-title" style={{ textTransform: 'uppercase', fontWeight: 'bold' }}>ACADEMIC JOURNEY</h2>
        </motion.div>
        <div className="timeline">
          <motion.div
            className="timeline-item"
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className="timeline-dot" />
            <div className="timeline-content">
              <span className="year">2011 — 2021</span>
              <h3>SSC</h3>
              <p className="institution" style={{ color: 'var(--text-muted)', marginTop: '4px' }}>
                Lokmanya Tilak High School
              </p>
            </div>
          </motion.div>

          <motion.div
            className="timeline-item"
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <div className="timeline-dot" />
            <div className="timeline-content">
              <span className="year">2021 — 2023</span>
              <h3>HSC</h3>
              <p className="institution" style={{ color: 'var(--text-muted)', marginTop: '4px' }}>
                Swami Vivekanand Jr College
              </p>
            </div>
          </motion.div>

          <motion.div
            className="timeline-item"
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            <div className="timeline-dot" />
            <div className="timeline-content">
              <span className="year">2023 — 2027</span>
              <h3>Bachelor of Engineering</h3>
              <p className="institution">Computer Science and Engineering</p>
              <p className="institution" style={{ color: 'var(--text-muted)', marginTop: '4px' }}>
                Xavier Institute of Engineering
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Education
