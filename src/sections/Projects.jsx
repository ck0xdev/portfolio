import { PROJECTS } from '../data/projects';

/**
 * Projects section — grid of project cards with tech stack pills
 * and external links.
 */
const Projects = () => {
  return (
    <section id="projects" className="section padded-section">
      <h2 className="section-title">Projects</h2>
      <div className="projects-grid">
        {PROJECTS.map((project) => (
          <div key={project.id} className="glass-card project-card">
            <div className="project-img-placeholder">{project.placeholder}</div>
            <div className="project-info">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="tech-stack">
                {project.techStack.map((tech) => (
                  <span key={tech} className="pill">{tech}</span>
                ))}
              </div>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link"
                aria-label={`View ${project.title}`}
              >
                <i className={`ph ${project.icon}`} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
