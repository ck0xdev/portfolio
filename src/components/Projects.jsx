import React from 'react';

const Projects = () => {
  return (
    <section id="projects" className="section padded-section">
      <h2 className="section-title">Projects</h2>
      <div className="projects-grid">
        <div className="glass-card project-card">
          <div className="project-img-placeholder">Portfolio</div>
          <div className="project-info">
            <h3>Personal Portfolio</h3>
            <p>
              Built a personal portfolio showcasing projects and skills. Implemented responsive layouts and smooth navigation.
            </p>
            <div className="tech-stack">
              <span className="pill">HTML5</span>
              <span className="pill">CSS3</span>
              <span className="pill">JavaScript</span>
            </div>
            <a href="https://www.ck0x.me/" target="_blank" rel="noreferrer" className="project-link">
              <i className="ph ph-arrow-up-right"></i>
            </a>
          </div>
        </div>
        
        <div className="glass-card project-card">
          <div className="project-img-placeholder">Ascendrahub</div>
          <div className="project-info">
            <h3>Ascendrahub</h3>
            <p>
              A modern web platform delivering streamlined services and a seamless user experience.
            </p>
            <div className="tech-stack">
              <span className="pill">React</span>
              <span className="pill">Tailwind CSS</span>
              <span className="pill">Web Dev</span>
            </div>
            <a href="https://ascendrahub.in" target="_blank" rel="noreferrer" className="project-link">
              <i className="ph ph-arrow-up-right"></i>
            </a>
          </div>
        </div>
        
        <div className="glass-card project-card">
          <div className="project-img-placeholder">VyaparBook</div>
          <div className="project-info">
            <h3>VyaparBook Mobile</h3>
            <p>
              A mobile application for managing business transactions and accounting efficiently on the go.
            </p>
            <div className="tech-stack">
              <span className="pill">React Native</span>
              <span className="pill">Expo</span>
              <span className="pill">Mobile</span>
            </div>
            <a href="https://github.com/ck0xdev/VyaparBookMobile" target="_blank" rel="noreferrer" className="project-link">
              <i className="ph ph-github-logo"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
