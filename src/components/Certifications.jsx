import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { HiShieldCheck, HiLightningBolt, HiAcademicCap } from 'react-icons/hi'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } } }

const certs = [
  { icon: <HiShieldCheck />, title: 'Agentic AI: Learner to Builder', org: 'IBM', date: 'Jul 2025 - Aug 2025', desc: 'Hands-on exploration of Agentic AI, moving from foundational concepts to building functional, intelligent agents.', link: 'https://drive.google.com/file/d/18Cw1eeEqW5DzD5utG9hUSEWvc25bHMvG/view?usp=drive_link' },
  { icon: <HiShieldCheck />, title: 'Certified Cloud Security Professional', date: 'Oct 2025 - Nov 2025', desc: 'Expertise in cloud security controls, risk assessment, and architecture vulnerabilities.', link: 'https://drive.google.com/file/d/17eYzXJOa5U4XvXRf0peqood6XRmOSb-m/view?usp=drive_link' },
  { icon: <HiLightningBolt />, title: 'Skills4Future Workshop', org: 'Edunet Foundation', date: 'Oct 2025', desc: 'Hands-on training on emerging technologies and industry-ready skill development.' },
  { icon: <HiAcademicCap />, title: 'Ethical Hacking Workshop', org: 'Hactify', date: 'Dec 2025, June 2024, Dec 2023 - Jan 2024', desc: 'Practical experience with penetration testing methods and security tooling.', link: 'https://drive.google.com/file/d/1VAeAVyJKkihJ3PvTfTh3faIIWNbbWeHR/view?usp=drive_link' },
  { icon: <HiAcademicCap />, title: 'GDG on campus GEN AI', date: 'Feb 2024', desc: 'Generative AI fundamentals.', link: 'https://drive.google.com/file/d/1SKvhAn-2QOxka4qaKNSiwQNw12idPGJF/view?usp=drive_link' },
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
              <h3>
                {c.link ? (
                  <a href={c.link} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline', textDecorationColor: 'var(--accent)' }}>
                    {c.title}
                  </a>
                ) : (
                  c.title
                )}
              </h3>
              <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', letterSpacing: '1px', marginBottom: '8px' }}>
                {c.org ? `${c.org} | ` : ''}{c.date}
              </p>
              <p>{c.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Certifications
