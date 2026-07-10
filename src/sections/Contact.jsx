import { SOCIAL_LINKS, CONTACT_INFO } from '../data/socials';

/**
 * Contact section — reach-out card with email/location info,
 * social media cards, and current status.
 */
const Contact = () => {
  return (
    <section id="contact" className="section padded-section">
      <h2 className="section-title">Let's Connect</h2>
      <div className="contact-grid">
        {/* Reach Out Card (Left) */}
        <div className="glass-card reach-out-card">
          <h3 className="reach-out-title">Reach out.</h3>
          <p className="reach-out-subtitle">
            For investors, mentors, builders and collaborators. If your idea is bold, my inbox is open.
          </p>

          <div className="info-pill-stack">
            <div className="info-pill">
              <div className="info-pill-icon">
                <i className="ph ph-envelope-simple" />
              </div>
              <div className="info-pill-content">
                <span className="info-pill-label">EMAIL</span>
                <span className="info-pill-value">{CONTACT_INFO.email}</span>
              </div>
            </div>
            <div className="info-pill">
              <div className="info-pill-icon">
                <i className="ph ph-map-pin" />
              </div>
              <div className="info-pill-content">
                <span className="info-pill-label">LOCATION</span>
                <span className="info-pill-value">{CONTACT_INFO.location}</span>
              </div>
            </div>
          </div>

          <div className="reach-out-actions">
            <a href={`mailto:${CONTACT_INFO.email}`} className="btn-solid">
              Contact Me <i className="ph ph-arrow-up-right" />
            </a>
            <a
              href={CONTACT_INFO.github}
              className="btn-outline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Collaborate
            </a>
          </div>
        </div>

        {/* Socials & Status (Right) */}
        <div className="social-stack">
          {SOCIAL_LINKS.map((social) => (
            <a
              key={social.id}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card social-card"
            >
              <div className="social-card-icon">
                <i className={`ph ${social.icon}`} />
              </div>
              <div className="social-card-content">
                <span className="social-card-label">{social.label}</span>
                <span className="social-card-handle">{social.handle}</span>
              </div>
              <i className="ph ph-arrow-up-right social-card-arrow" />
            </a>
          ))}

          <div className="glass-card status-card">
            <span className="status-label">CURRENTLY</span>
            <p className="status-text">
              Building Ascendrahub and learning new technologies.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
