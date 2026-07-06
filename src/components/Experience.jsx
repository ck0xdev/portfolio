import React from 'react';

const Experience = () => {
  return (
    <section id="experience" className="section padded-section">
      <h2 className="section-title">Experience & Education</h2>
      <div className="timeline">
        <div className="timeline-item">
          <div className="timeline-dot"></div>
          <div className="glass-card timeline-content">
            <span className="timeline-date">Dec 2025 - May 2026</span>
            <h3>Frontend Developer Intern</h3>
            <h4>Sughosh Technolab</h4>
            <p>
              Developed responsive web pages using HTML, CSS, and JavaScript. Collaborated with team members on frontend tasks, assisted in UI implementation, and learned industry-standard workflows.
            </p>
          </div>
        </div>
        <div className="timeline-item">
          <div className="timeline-dot"></div>
          <div className="glass-card timeline-content">
            <span className="timeline-date">2023 - 2026</span>
            <h3>Bachelor of Computer Applications (BCA)</h3>
            <h4>Veer Narmad South Gujarat University (VNSGU)</h4>
            <p>
              Pursuing BCA with a focus on computer science fundamentals and practical software development.
            </p>
            <p>Final CGPA: 6.56/10.</p>
          </div>
        </div>
        <div className="timeline-item">
          <div className="timeline-dot"></div>
          <div className="glass-card timeline-content">
            <span className="timeline-date">2022 - 2023</span>
            <h3>Higher Secondary Education</h3>
            <h4>Harikrushna Vidhyalaya</h4>
            <p>
              Completed higher secondary education with a strong foundation in core subjects.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
