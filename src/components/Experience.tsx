export default function Experience() {
  return (
    <section id="experience" className="section experience">
      <div className="container">
        <h2 className="section-heading">My Journey</h2>
        <div className="timeline">
          <div className="timeline-progress"></div>

          <div className="timeline-item fade-up">
            <div className="timeline-dot"></div>
            <div className="timeline-content bento-card">
              <span className="timeline-date">Aug 2026 - Current</span>
              <h3 className="timeline-title">Video Editor</h3>
              <p className="timeline-desc" style={{ color: "var(--accent-1)", fontWeight: 600, marginBottom: "0.5rem" }}>
                StudioX
              </p>
              <p className="timeline-desc">
                Wedding Reels Editor &amp; Still learning the Cool Animation and motions, Seeing the World With different Perspective too.
              </p>
            </div>
          </div>

          <div className="timeline-item fade-up">
            <div className="timeline-dot"></div>
            <div className="timeline-content bento-card">
              <span className="timeline-date">Dec 2025 - May 2026</span>
              <h3 className="timeline-title">Frontend Developer Intern</h3>
              <p className="timeline-desc" style={{ color: "var(--accent-1)", fontWeight: 600, marginBottom: "0.5rem" }}>
                Sughosh Technolab
              </p>
              <p className="timeline-desc">
                Developed responsive web pages using HTML, CSS, and JavaScript. Collaborated with team members on frontend tasks, assisted in UI implementation, and learned industry-standard workflows.
              </p>
            </div>
          </div>

          <div className="timeline-item fade-up">
            <div className="timeline-dot"></div>
            <div className="timeline-content bento-card">
              <span className="timeline-date">2023 - 2026</span>
              <h3 className="timeline-title">Bachelor of Computer Applications (BCA)</h3>
              <p className="timeline-desc" style={{ color: "var(--accent-1)", fontWeight: 600, marginBottom: "0.5rem" }}>
                Veer Narmad South Gujarat University (VNSGU)
              </p>
              <p className="timeline-desc">
                Pursuing BCA with a focus on computer science fundamentals and practical software development. <br />
                <strong>Final CGPA: 6.56/10.</strong>
              </p>
            </div>
          </div>

          <div className="timeline-item fade-up">
            <div className="timeline-dot"></div>
            <div className="timeline-content bento-card">
              <span className="timeline-date">2022 - 2023</span>
              <h3 className="timeline-title">Higher Secondary Education</h3>
              <p className="timeline-desc" style={{ color: "var(--accent-1)", fontWeight: 600, marginBottom: "0.5rem" }}>
                Harikrushna Vidhyalaya
              </p>
              <p className="timeline-desc">
                Completed higher secondary education with a strong foundation in core subjects.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
