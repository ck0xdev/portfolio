import { NAV_LINKS } from '../data/navigation';
import { SOCIAL_LINKS, CONTACT_INFO } from '../data/socials';

/**
 * Footer — site-wide footer with navigation, social links,
 * resume download, and copyright.
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-logo" aria-hidden="true">ck0xDev</div>

      <div className="footer-top">
        <div className="footer-nav">
          <span className="footer-heading">Navigate</span>
          {NAV_LINKS.map((link) => (
            <a key={link.id} href={`#${link.id}`}>
              {link.label === 'Experience' ? 'Experience & Education' : link.label}
            </a>
          ))}
        </div>

        <div className="footer-nav">
          <span className="footer-heading">Socials</span>
          <a href={CONTACT_INFO.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          {SOCIAL_LINKS.map((social) => (
            <a
              key={social.id}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {social.label.charAt(0) + social.label.slice(1).toLowerCase()}
            </a>
          ))}
        </div>

        <div className="footer-nav">
          <span className="footer-heading">Resources</span>
          <a
            href={CONTACT_INFO.resumePath}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-cv"
          >
            Download Resume <i className="ph ph-download-simple" />
          </a>
          <a href={`mailto:${CONTACT_INFO.email}`}>Email Me</a>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-legal">
          <span>&copy; {currentYear} Chintan Kukadiya. All rights reserved.</span>
          <span>Surat, Gujarat, India</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
