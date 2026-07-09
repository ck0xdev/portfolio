
const About = () => {
  return (
    <section id="about" className="section padded-section">
      <h2 className="section-title">About Me</h2>
      <div className="about-container">
        <div className="about-text">
          <p className="highlight-text">
            Hello! I'm Chintan Kukadiya, a Frontend Developer focused on crafting clean, user-friendly experiences.
          </p>
          <p>
            I have a strong interest in creating responsive web applications. I am passionate about building modern interfaces and continuously learning new technologies.
          </p>
          <p>
            When I'm not coding, you'll usually find me exploring design thinking, working on UI/UX, or collaborating on creative projects.
          </p>
        </div>
        <div className="about-skills">
          <div className="skill-tag">HTML5 & CSS3</div>
          <div className="skill-tag">JavaScript (ES6+)</div>
          <div className="skill-tag">React.js</div>
          <div className="skill-tag">Tailwind CSS</div>
          <div className="skill-tag">Git & GitHub</div>
          <div className="skill-tag">UI/UX Design</div>
          <div className="skill-tag">Figma</div>
          <div className="skill-tag">REST APIs</div>
        </div>
      </div>
    </section>
  );
};

export default About;
