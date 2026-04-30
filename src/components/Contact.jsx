import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { HiOutlineMail, HiLocationMarker } from 'react-icons/hi'
import { FaGithub, FaLinkedin } from 'react-icons/fa'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

const Contact = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 })
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('') // '', 'sending', 'success', 'error'

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          access_key: 'c88d45ef-6ec2-44e8-a3ec-1832195a6535',
          name: form.name,
          email: form.email,
          message: form.message
        })
      });
      
      const result = await response.json();
      if (result.success) {
        setStatus('success');
        setForm({ name: '', email: '', message: '' }); // Clear form
        setTimeout(() => setStatus(''), 5000); // Reset status after 5 seconds
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  }

  return (
    <section className="contact" id="contact" ref={ref}>
      <div className="container">
        <motion.div variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
          <span className="section-label">Contact</span>
          <h2 className="section-title" style={{ textTransform: 'uppercase', fontWeight: 'bold' }}>LET&apos;S WORK TOGETHER</h2>
        </motion.div>

        <div className="contact-grid">
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="contact-image-box">
              <img 
                src="/contact.jpg" 
                alt="Sumeet Gupta" 
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
              <span style={{ display: 'none' }}>👋</span>
            </div>
            <h3>Have a project in mind?<br />I&apos;d love to hear about it.</h3>
            <p>Feel free to reach out for collaborations, project ideas, or just a friendly conversation about technology.</p>
            <div className="contact-links">
              <a href="mailto:sumeetgwork@gmail.com" className="contact-item"><HiOutlineMail /> sumeetgwork@gmail.com</a>
              <a href="https://github.com/sumeetgwork-stack" target="_blank" rel="noreferrer" className="contact-item"><FaGithub /> github.com/sumeetgwork-stack</a>
              <a href="https://www.linkedin.com/in/sumeetgupta07/" target="_blank" rel="noreferrer" className="contact-item"><FaLinkedin /> linkedin.com/in/sumeetgupta07</a>
              <div className="contact-item"><HiLocationMarker /> Mumbai, India</div>
            </div>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            <div className="form-group">
              <label>Name</label>
              <input name="name" value={form.name} onChange={handleChange} required placeholder="Your name" />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="your@email.com" />
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea name="message" value={form.message} onChange={handleChange} required placeholder="Tell me about your project..." />
            </div>
            <button 
              type="submit" 
              className="btn-primary" 
              disabled={status === 'sending' || status === 'success'}
              style={{ marginTop: '12px', width: '100%', justifyContent: 'center', opacity: status === 'sending' ? 0.7 : 1 }}
            >
              {status === 'sending' ? 'Sending...' : status === 'success' ? 'Message Sent!' : 'Send Message'}
            </button>
            
            {status === 'success' && (
              <p style={{ color: '#10b981', fontSize: '0.85rem', marginTop: '12px', textAlign: 'center' }}>
                Thank you! Your message has been sent successfully.
              </p>
            )}
            {status === 'error' && (
              <p style={{ color: '#ef4444', fontSize: '0.85rem', marginTop: '12px', textAlign: 'center' }}>
                Oops! Something went wrong. Please try again.
              </p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  )
}

export default Contact
