import { FaGithub, FaLinkedin } from 'react-icons/fa'

const Footer = () => (
  <footer className="footer">
    <div className="container">
      <p>© 2025 Sumeet Gupta. All rights reserved.</p>
      <div className="footer-socials">
        <a href="https://github.com/sumeetgwork-stack" target="_blank" rel="noreferrer"><FaGithub /></a>
        <a href="https://www.linkedin.com/in/sumeetgupta07/" target="_blank" rel="noreferrer"><FaLinkedin /></a>
      </div>
    </div>
  </footer>
)

export default Footer
