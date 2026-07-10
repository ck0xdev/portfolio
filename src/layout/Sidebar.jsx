import { useEffect, useRef, useState, useCallback } from 'react';
import { NAV_LINKS } from '../data/navigation';
import { DIAL_STEP_DEGREES } from '../constants';

/**
 * Sidebar — fixed rotary dial navigation.
 *
 * On desktop: renders as a left-side vertical dial.
 * On mobile:  docks to the bottom of the screen.
 *
 * Uses IntersectionObserver to sync the active nav item
 * with the currently visible section.
 */

// Repeat links 3× so the rotary dial wraps smoothly
const allLinks = [...NAV_LINKS, ...NAV_LINKS, ...NAV_LINKS];

const Sidebar = () => {
  const sidebarRef = useRef(null);
  const [activeId, setActiveId] = useState('home');
  const [dialAngle, setDialAngle] = useState(0);

  const isClickScrolling = useRef(false);
  const scrollTimeout = useRef(null);
  const dialAngleRef = useRef(dialAngle);

  // Keep ref in sync with state (avoids stale closures)
  useEffect(() => {
    dialAngleRef.current = dialAngle;
  }, [dialAngle]);

  // Debounce scroll events during click-initiated scrolls
  useEffect(() => {
    const handleScroll = () => {
      if (isClickScrolling.current) {
        clearTimeout(scrollTimeout.current);
        scrollTimeout.current = setTimeout(() => {
          isClickScrolling.current = false;
        }, 100);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout.current);
    };
  }, []);

  const updateNav = useCallback((newActiveId) => {
    setActiveId(newActiveId);

    const baseIndex = NAV_LINKS.findIndex((link) => link.id === newActiveId);
    if (baseIndex === -1) return;

    const currentAngle = dialAngleRef.current;
    let minDiff = Infinity;
    let bestAngle = currentAngle;

    for (let k = -3; k <= 3; k++) {
      const testAngle = -(baseIndex + k * NAV_LINKS.length) * DIAL_STEP_DEGREES;
      const diff = testAngle - currentAngle;
      if (Math.abs(diff) < Math.abs(minDiff)) {
        minDiff = diff;
        bestAngle = testAngle;
      }
    }

    setDialAngle(bestAngle);
    document.documentElement.style.setProperty('--dial-angle', `${bestAngle}deg`);
  }, []);

  // Observe sections to sync nav on scroll
  useEffect(() => {
    let sections = document.querySelectorAll('.section');

    const observer = new IntersectionObserver(
      (entries) => {
        if (isClickScrolling.current) return;
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            if (id) updateNav(id);
          }
        });
      },
      { root: null, rootMargin: '0px', threshold: 0.5 }
    );

    sections.forEach((section) => observer.observe(section));

    // Watch for lazy-loaded sections appearing in the DOM
    const mutationObserver = new MutationObserver(() => {
      const currentSections = document.querySelectorAll('.section');
      if (currentSections.length > sections.length) {
        sections = currentSections;
        sections.forEach((section) => observer.observe(section));
      }
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [updateNav]);

  const handleLinkClick = useCallback(
    (e, id) => {
      e.preventDefault();
      isClickScrolling.current = true;
      updateNav(id);

      const targetSection = document.getElementById(id);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    },
    [updateNav]
  );

  const handleWheel = useCallback((e) => {
    window.scrollBy({ top: e.deltaY, behavior: 'smooth' });
  }, []);

  return (
    <>
      <div
        className="logo"
        role="button"
        tabIndex={0}
        aria-label="Scroll to top"
        onClick={(e) => handleLinkClick(e, 'home')}
        onKeyDown={(e) => e.key === 'Enter' && handleLinkClick(e, 'home')}
      >
        ck
      </div>

      <aside className="sidebar" id="sidebar" ref={sidebarRef} onWheel={handleWheel}>
        <nav className="nav-links dial" id="dial" aria-label="Main navigation">
          {allLinks.map((link, index) => {
            const isActive = link.id === activeId;
            return (
              <a
                key={`${link.id}-${index}`}
                href={`#${link.id}`}
                className={`nav-item ${isActive ? 'active' : ''}`}
                title={link.label}
                aria-current={isActive ? 'true' : undefined}
                style={{ '--item-angle': `${index * DIAL_STEP_DEGREES}deg` }}
                onClick={(e) => handleLinkClick(e, link.id)}
              >
                <div className="icon-content">
                  <div className="icon-circle">
                    <i className={`ph ${link.icon}`} />
                  </div>
                  <span>{link.label}</span>
                </div>
              </a>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
