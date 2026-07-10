import { EXPERIENCES } from '../data/experiences';

/**
 * Experience & Education section — timeline layout showing
 * work history and education.
 */
const Experience = () => {
  return (
    <section id="experience" className="section padded-section">
      <h2 className="section-title">Experience &amp; Education</h2>
      <div className="timeline">
        {EXPERIENCES.map((exp) => (
          <div key={exp.id} className="timeline-item">
            <div className="timeline-dot" />
            <div className="glass-card timeline-content">
              <span className="timeline-date">{exp.date}</span>
              <h3>{exp.title}</h3>
              <h4>{exp.company}</h4>
              {exp.description.split('\n').map((line, idx) => (
                <p key={idx}>{line}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
