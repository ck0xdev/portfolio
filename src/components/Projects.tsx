export default function Projects() {
  return (
    <section id="projects" className="section projects">
      <div className="container">
        <div
          className="section-header-wrapper"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1.5rem",
            flexWrap: "wrap",
            gap: "1rem"
          }}
        >
          <h2 className="section-heading" style={{ marginBottom: "0" }}>Selected Work</h2>
          <a
            href="https://github.com/ck0xdev?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
            style={{
              border: "1px solid var(--accent-1)",
              color: "var(--accent-1)",
              padding: "0.6rem 1.5rem",
              borderRadius: "100px",
              textDecoration: "none",
              fontWeight: 600,
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              transition: "all 0.3s ease"
            }}
          >
            More Projects
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
        </div>

        <div className="projects-grid">
          <article className="project-card fade-up">
            <div
              className="project-vault-icon"
              style={{
                background: "linear-gradient(135deg, rgba(32, 227, 178, 0.1), rgba(0, 150, 255, 0.1))",
                borderBottom: "1px solid rgba(255, 255, 255, 0.05)"
              }}
            >
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--accent-2)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lock-icon">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="2" y1="12" x2="22" y2="12"></line>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
              </svg>
            </div>
            <div className="project-info">
              <h3 className="project-title">Portfolio Redesign</h3>
              <p className="project-desc">
                A modern, responsive portfolio built with Next.js, TypeScript, and clean interactive design.
              </p>
              <div className="project-tags" style={{ marginBottom: "1.5rem" }}>
                <span className="skill-tag">Next.js</span>
                <span className="skill-tag">GSAP</span>
                <span className="skill-tag">TypeScript</span>
              </div>
              <a
                href="https://www.ck0x.me/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  color: "var(--text-primary)",
                  textDecoration: "none",
                  borderBottom: "1px solid var(--accent-2)",
                  paddingBottom: "2px",
                  fontWeight: 600,
                  transition: "color 0.3s ease"
                }}
              >
                View Live Project ↗
              </a>
            </div>
          </article>

          <article className="project-card fade-up">
            <div
              className="project-vault-icon"
              style={{
                background: "linear-gradient(135deg, rgba(255, 158, 0, 0.1), rgba(255, 51, 102, 0.1))",
                borderBottom: "1px solid rgba(255, 255, 255, 0.05)"
              }}
            >
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--accent-4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lock-icon">
                <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                <line x1="12" y1="18" x2="12.01" y2="18"></line>
              </svg>
            </div>
            <div className="project-info">
              <h3 className="project-title">VyaparMobile Application</h3>
              <p className="project-desc">
                A mobile application tailored for modern business management and streamlined operations.
              </p>
              <div className="project-tags" style={{ marginBottom: "1.5rem" }}>
                <span className="skill-tag">Mobile</span>
                <span className="skill-tag">App Dev</span>
              </div>
              <a
                href="https://github.com/ck0xdev/VyaparBookMobile"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  color: "var(--text-primary)",
                  textDecoration: "none",
                  borderBottom: "1px solid var(--accent-4)",
                  paddingBottom: "2px",
                  fontWeight: 600,
                  transition: "color 0.3s ease"
                }}
              >
                View Source Code ↗
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
