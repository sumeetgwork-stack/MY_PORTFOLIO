import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { HiArrowRight, HiOutlineMail } from 'react-icons/hi'
import Magnetic from './Magnetic'

const line = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 + i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  }),
}

const Hero = () => (
  <section className="hero" id="hero">
    <div className="container">
      <div className="hero-content">
        <motion.div className="hero-label" custom={0} variants={line} initial="hidden" animate="visible">
          <span className="dot" />
          Available for opportunities
        </motion.div>

        <motion.h1 custom={1} variants={line} initial="hidden" animate="visible" className="text-shimmer">
          Hi, I&apos;m<br />
          Sumeet <em>Gupta</em>
        </motion.h1>

        <motion.p custom={2} variants={line} initial="hidden" animate="visible">
          A passionate tech enthusiast pursuing Computer Science Engineering,
          building innovative solutions in IoT, AI, Cybersecurity and Full-Stack Development.
        </motion.p>

        <motion.div className="hero-buttons" custom={3} variants={line} initial="hidden" animate="visible">
          <Magnetic>
            <Link to="/projects" className="btn-primary">
              View My Work <HiArrowRight />
            </Link>
          </Magnetic>
          <Magnetic>
            <a href="#contact" className="btn-outline">
              <HiOutlineMail /> Get in Touch
            </a>
          </Magnetic>
        </motion.div>
      </div>
    </div>
  </section>
)

export default Hero
