import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { HiCode, HiCog, HiShieldCheck, HiDesktopComputer } from 'react-icons/hi'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } } }

const data = [
  { icon: <HiCode />, title: 'Programming', desc: 'Building robust applications with clean, efficient code.', tags: ['HTML', 'CSS', 'React', 'JavaScript', 'Tailwind CSS', 'C', 'Java', 'Python'] },
  { icon: <HiCog />, title: 'IoT & Automation', desc: 'Creating connected devices and intelligent automation systems.', tags: ['IoT Protocols', 'Sensors', 'Arduino', 'Automation'] },
  { icon: <HiShieldCheck />, title: 'Cybersecurity', desc: 'Protecting digital assets through testing and assessment.', tags: ['Ethical Hacking', 'Cloud Security'] },
  { icon: <HiDesktopComputer />, title: 'Full-Stack Dev', desc: 'Designing complete web applications with user-centric approach.', tags: ['Frontend', 'Backend', 'Database', 'UI/UX'] },
]

const Skills = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section className="skills" id="skills" ref={ref}>
      <div className="container">
        <motion.div variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
          <span className="section-label">Expertise</span>
          <h2 className="section-title" style={{ textTransform: 'uppercase', fontWeight: 'bold' }}>SKILLS & TECHNOLOGIES</h2>
          <p className="section-subtitle">A diverse toolkit spanning software, hardware, and security.</p>
        </motion.div>
        <motion.div className="skills-grid" variants={stagger} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
          {data.map((s) => (
            <motion.div key={s.title} className="skill-card" variants={fadeUp}>
              <div className="skill-icon">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <div className="skill-tags">{s.tags.map((t) => <span key={t} className="skill-tag">{t}</span>)}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Skills
