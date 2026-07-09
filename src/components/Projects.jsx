
const Projects = () => {
  const projectsData = [
    {
      id: "portfolio",
      title: "Personal Portfolio",
      placeholder: "Portfolio",
      description: "Built a personal portfolio showcasing projects and skills. Implemented responsive layouts and smooth navigation.",
      techStack: ["HTML5", "CSS3", "JavaScript"],
      link: "https://www.ck0x.me/",
      icon: "ph-arrow-up-right"
    },
    {
      id: "ascendrahub",
      title: "Ascendrahub",
      placeholder: "Ascendrahub",
      description: "A modern web platform delivering streamlined services and a seamless user experience.",
      techStack: ["React", "Tailwind CSS", "Web Dev"],
      link: "https://ascendrahub.in",
      icon: "ph-arrow-up-right"
    },
    {
      id: "vyaparbook",
      title: "VyaparBook Mobile",
      placeholder: "VyaparBook",
      description: "A mobile application for managing business transactions and accounting efficiently on the go.",
      techStack: ["React Native", "Expo", "Mobile"],
      link: "https://github.com/ck0xdev/VyaparBookMobile",
      icon: "ph-github-logo"
    }
  ];

  return (
    <section id="projects" className="section padded-section">
      <h2 className="section-title">Projects</h2>
      <div className="projects-grid">
        {projectsData.map(project => (
          <div key={project.id} className="glass-card project-card">
            <div className="project-img-placeholder">{project.placeholder}</div>
            <div className="project-info">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="tech-stack">
                {project.techStack.map(tech => (
                  <span key={tech} className="pill">{tech}</span>
                ))}
              </div>
              <a href={project.link} target="_blank" rel="noreferrer" className="project-link">
                <i className={`ph ${project.icon}`}></i>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
