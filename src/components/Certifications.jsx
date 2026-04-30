import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { HiShieldCheck, HiLightningBolt, HiAcademicCap } from 'react-icons/hi'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } } }

const certs = [
  { icon: <HiShieldCheck />, title: 'Certified Cloud Security Professional', desc: 'Expertise in cloud security controls, risk assessment, and architecture vulnerabilities.' },
  { icon: <HiLightningBolt />, title: 'Skills4Future Workshop', org: 'Edunet Foundation', desc: 'Hands-on training on emerging technologies and industry-ready skill development.' },
  { icon: <HiAcademicCap />, title: 'Ethical Hacking Workshop', org: 'Hactify', desc: 'Practical experience with penetration testing methods and security tooling.' },
]

const Certifications = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section className="certifications" id="certifications" ref={ref}>
      <div className="container">
        <motion.div variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
          <h2 className="section-title" style={{ textTransform: 'uppercase', fontWeight: 'bold' }}>WORKSHOPS & CERTIFICATIONS</h2>
        </motion.div>
        <motion.div className="cert-grid" variants={stagger} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
          {certs.map((c) => (
            <motion.div key={c.title} className="cert-card" variants={fadeUp}>
              <div className="cert-icon">{c.icon}</div>
              <h3>{c.title}</h3>
              {c.org && <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', letterSpacing: '1px', marginBottom: '8px' }}>{c.org}</p>}
              <p>{c.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Certifications
