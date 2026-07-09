
const Footer = () => {
  return (
    <footer className="site-footer">
      <h1 className="footer-logo">ck0xDev</h1>
      
      <div className="footer-top">
        <div className="footer-nav">
          <span className="footer-heading">Navigate</span>
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#experience">Experience & Education</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </div>
        <div className="footer-nav">
          <span className="footer-heading">Socials</span>
          <a href="https://github.com/ck0xdev" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/ck0x/" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="https://discord.com/users/1389525213376544768" target="_blank" rel="noreferrer">Discord</a>
        </div>
        <div className="footer-nav">
          <span className="footer-heading">Resources</span>
          <a href="Chintan Kukadiya.pdf" target="_blank" rel="noreferrer" className="footer-cv">
            Download Resume <i className="ph ph-download-simple"></i>
          </a>
          <a href="mailto:kukadiyachintan026@gmail.com">Email Me</a>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="footer-legal">
          <span>&copy; 2026 Chintan Kukadiya. All rights reserved.</span>
          <span>Surat, Gujarat, India</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
