export default function About() {
  return (
    <section id="about" className="section about">
      <div className="container">
        <h2 className="section-heading">About Me</h2>
        <div className="bento-container">
          <div className="bento-card bio-card fade-up">
            <h3 className="card-title">Hello! I&apos;m Chintan Kukadiya</h3>
            <p>
              A Frontend Developer focused on crafting clean, user-friendly experiences. I have a strong
              interest in creating responsive web applications, building modern interfaces, and
              continuously learning new technologies.
            </p>
            <p>
              Currently, I am working full-time as a <strong>Video Editor</strong>, where I produce and
              craft cinematic visual narratives to tell compelling stories. When I&apos;m not editing or
              coding, you&apos;ll usually find me exploring design thinking, focusing on UI/UX, or
              collaborating on creative projects.
            </p>
          </div>

          <div className="bento-card tech-card fade-up">
            <h3 className="card-title">Tech Stack & Skills</h3>
            <div className="skills-grid">
              <div className="skill-tag magnetic">HTML5 & CSS3</div>
              <div className="skill-tag magnetic">JavaScript (ES6+)</div>
              <div className="skill-tag magnetic">TypeScript</div>
              <div className="skill-tag magnetic">React.js</div>
              <div className="skill-tag magnetic">Next.js</div>
              <div className="skill-tag magnetic">Tailwind CSS</div>
              <div className="skill-tag magnetic">Node.js</div>
              <div className="skill-tag magnetic">SQL</div>
              <div className="skill-tag magnetic">Git & GitHub</div>
              <div className="skill-tag magnetic">UI/UX Design</div>
              <div className="skill-tag magnetic">Figma</div>
              <div className="skill-tag magnetic">Video Editing</div>
            </div>
          </div>

          <div className="bento-card stat-card fade-up">
            <h4 className="stat-number">2+</h4>
            <p className="stat-label">Years Experience</p>
          </div>

          <div className="bento-card stat-card fade-up">
            <div className="info-tooltip-container" style={{ position: "absolute", top: "1rem", right: "1rem" }}>
              <div
                className="info-circle"
                style={{ width: "26px", height: "26px", fontSize: "0.85rem", borderColor: "rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.03)" }}
              >
                !
              </div>
              <div className="info-tooltip-content" style={{ width: "280px", bottom: "130%" }}>
                Over my career, I have delivered <strong>8+ Different Type of projects</strong> for
                private corporations. Due to strict NDAs, I cannot showcase them publicly.
              </div>
            </div>
            <h4 className="stat-number">8+</h4>
            <p className="stat-label">Different Projects</p>
          </div>
        </div>
      </div>
    </section>
  );
}
