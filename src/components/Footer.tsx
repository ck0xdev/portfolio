export default function Footer() {
  return (
    <footer
      className="site-footer w-full"
      style={{
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        paddingTop: "4rem",
        paddingBottom: "4rem",
        background: "var(--bg-color)",
        position: "relative",
        zIndex: 10,
        overflow: "hidden",
        width: "100%"
      }}
    >
      <div
        className="container mx-auto"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
          flex: 1,
          width: "100%"
        }}
      >
        <div className="footer-huge-logo">
          <h2>ck0XDev</h2>
        </div>
        <div className="footer-links-grid">
          <div className="footer-col">
            <h4>Navigate</h4>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#experience">Experience &amp; Education</a></li>
              <li><a href="#projects">Projects</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Socials</h4>
            <ul>
              <li><a href="https://github.com/ck0xdev" target="_blank" rel="noopener noreferrer">GitHub</a></li>
              <li><a href="https://linkedin.com/in/ck0x" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
              <li><a href="https://discord.com/users/1389525213376544768" target="_blank" rel="noopener noreferrer">Discord</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Get In Touch</h4>
            <ul>
              <li><a href="mailto:kukadiyachintan026@gmail.com">Email Me</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Chintan Kukadiya. All rights reserved.</p>
          <p>Gujarat, India</p>
        </div>
      </div>
    </footer>
  );
}
