export default function Contact() {
  return (
    <section id="contact" className="section contact">
      <div className="container">
        <h2 className="section-heading">Contact</h2>

        <div className="contact-bento-grid">
          <div className="contact-left bento-card fade-up">
            <div
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                transform: "translate(30%, -30%)",
                width: "300px",
                height: "300px",
                background: "radial-gradient(circle, rgba(32, 227, 178, 0.2) 0%, transparent 70%)",
                filter: "blur(50px)",
                pointerEvents: "none"
              }}
            />

            <h3 className="reach-out-title">Reach out.</h3>
            <p className="reach-out-desc">
              For investors, mentors, builders and collaborators. If your idea is bold, my inbox is open.
            </p>

            <div className="contact-info-boxes">
              <div className="info-box">
                <div className="info-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div className="info-text">
                  <span className="info-label">EMAIL</span>
                  <span className="info-value">kukadiyachintan026@gmail.com</span>
                </div>
              </div>

              <div className="info-box">
                <div className="info-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div className="info-text">
                  <span className="info-label">LOCATION</span>
                  <span className="info-value">Gujarat, India</span>
                </div>
              </div>
            </div>

            <div className="contact-actions">
              <a
                href="mailto:kukadiyachintan026@gmail.com"
                className="btn btn-primary"
                style={{
                  background: "white",
                  color: "black",
                  fontWeight: 700,
                  border: "none",
                  padding: "0.8rem 2rem",
                  borderRadius: "100px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  transition: "transform 0.3s ease"
                }}
              >
                Contact Me ↗
              </a>
            </div>
          </div>

          <div className="contact-right">
            <a
              href="https://linkedin.com/in/ck0x"
              target="_blank"
              rel="noopener noreferrer"
              className="bento-card small-card fade-up magnetic"
            >
              <div className="social-box">
                <div className="social-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </div>
                <div className="social-text">
                  <span className="social-label">LINKEDIN</span>
                  <span className="social-value">@ck0x</span>
                </div>
                <div className="social-arrow">↗</div>
              </div>
            </a>

            <a
              href="https://discord.com/users/1389525213376544768"
              target="_blank"
              rel="noopener noreferrer"
              className="bento-card small-card fade-up magnetic"
            >
              <div className="social-box">
                <div className="social-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.09.09 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.09 16.09 0 0 0-4.8 0c-.14-.33-.35-.76-.53-1.09a.09.09 0 0 0-.07-.03c-1.5.26-2.93.71-4.27 1.33-.01 0-.02.01-.03.02-2.72 4.07-3.47 8.03-3.1 11.95 0 .02.01.04.03.05 1.8 1.32 3.53 2.12 5.24 2.65.03.01.06 0 .07-.02.4-.55.76-1.13 1.07-1.74.02-.04 0-.08-.04-.09-.57-.22-1.11-.48-1.64-.78-.04-.02-.04-.08-.01-.11.11-.08.22-.17.33-.25.02-.02.05-.02.07-.01 3.44 1.57 7.15 1.57 10.55 0 .02-.01.05-.01.07.01.11.09.22.17.33.26.03.02.03.08-.01.11-.52.31-1.07.56-1.64.78-.04.01-.05.06-.04.09.32.61.68 1.19 1.07 1.74.01.02.04.03.07.02 1.71-.53 3.44-1.33 5.24-2.65.02-.01.03-.03.03-.05.44-4.53-.73-8.46-3.1-11.95-.01-.01-.02-.02-.03-.02zM8.52 14.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12 0 1.17-.84 2.12-1.89 2.12zm6.97 0c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12 0 1.17-.83 2.12-1.89 2.12z" />
                  </svg>
                </div>
                <div className="social-text">
                  <span className="social-label">DISCORD</span>
                  <span className="social-value">@ck0x</span>
                </div>
                <div className="social-arrow">↗</div>
              </div>
            </a>

            <div className="bento-card currently-card fade-up">
              <span className="social-label">CURRENTLY</span>
              <p className="currently-text">Working as a Video Editor at StudioX.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
