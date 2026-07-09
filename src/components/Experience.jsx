
const Experience = () => {
  const experiences = [
    {
      id: "intern",
      date: "Dec 2025 - May 2026",
      title: "Frontend Developer Intern",
      company: "Sughosh Technolab",
      description: "Developed responsive web pages using HTML, CSS, and JavaScript. Collaborated with team members on frontend tasks, assisted in UI implementation, and learned industry-standard workflows."
    },
    {
      id: "bca",
      date: "2023 - 2026",
      title: "Bachelor of Computer Applications (BCA)",
      company: "Veer Narmad South Gujarat University (VNSGU)",
      description: "Pursuing BCA with a focus on computer science fundamentals and practical software development.\nFinal CGPA: 6.56/10."
    },
    {
      id: "hsc",
      date: "2022 - 2023",
      title: "Higher Secondary Education",
      company: "Harikrushna Vidhyalaya",
      description: "Completed higher secondary education with a strong foundation in core subjects."
    }
  ];

  return (
    <section id="experience" className="section padded-section">
      <h2 className="section-title">Experience & Education</h2>
      <div className="timeline">
        {experiences.map(exp => (
          <div key={exp.id} className="timeline-item">
            <div className="timeline-dot"></div>
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
