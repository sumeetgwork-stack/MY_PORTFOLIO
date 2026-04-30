import { FaGithub, FaLinkedin } from 'react-icons/fa'

const Footer = () => (
  <footer className="footer">
    <div className="container">
      <div className="footer-left">
        <p>© 2025 Sumeet Gupta. All rights reserved.</p>
        <span className="footer-role">Full Stack Developer</span>
      </div>
      <div className="footer-socials">
        <a href="https://github.com/sumeetgwork-stack" target="_blank" rel="noreferrer" className="github"><FaGithub /></a>
        <a href="https://www.linkedin.com/in/sumeetgupta07/" target="_blank" rel="noreferrer" className="linkedin"><FaLinkedin /></a>
      </div>
    </div>
  </footer>
)

export default Footer
