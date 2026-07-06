import React, { useEffect, useRef, useState } from 'react';

const originalLinks = [
  { id: 'home', icon: 'ph-house', label: 'Home' },
  { id: 'about', icon: 'ph-user', label: 'About' },
  { id: 'experience', icon: 'ph-star', label: 'Experience' },
  { id: 'projects', icon: 'ph-briefcase', label: 'Projects' },
  { id: 'contact', icon: 'ph-envelope-simple', label: 'Contact' }
];

// We repeat the links 3 times to make the dial effect wrap smoothly
const allLinks = [...originalLinks, ...originalLinks, ...originalLinks];

const Sidebar = () => {
  const sidebarRef = useRef(null);
  const [activeId, setActiveId] = useState('home');
  const [dialAngle, setDialAngle] = useState(0);
  
  const isClickScrolling = useRef(false);
  const scrollTimeout = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (isClickScrolling.current) {
        clearTimeout(scrollTimeout.current);
        scrollTimeout.current = setTimeout(() => {
          isClickScrolling.current = false;
        }, 100);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll('.section');
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
      if (isClickScrolling.current) return;
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          if (id) updateNav(id);
        }
      });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, [dialAngle]);

  const updateNav = (newActiveId) => {
    setActiveId(newActiveId);

    const baseIndex = originalLinks.findIndex(link => link.id === newActiveId);
    if (baseIndex === -1) return;

    let minDiff = Infinity;
    let bestAngle = dialAngle;

    for (let k = -3; k <= 3; k++) {
      const testAngle = -(baseIndex + k * 5) * 24;
      const diff = testAngle - dialAngle;
      if (Math.abs(diff) < Math.abs(minDiff)) {
        minDiff = diff;
        bestAngle = testAngle;
      }
    }

    setDialAngle(bestAngle);
    document.documentElement.style.setProperty('--dial-angle', `${bestAngle}deg`);
  };

  const handleLinkClick = (e, id) => {
    e.preventDefault();
    isClickScrolling.current = true;
    updateNav(id);
    
    const targetSection = document.getElementById(id);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleWheel = (e) => {
    window.scrollBy({
      top: e.deltaY,
      behavior: 'smooth'
    });
  };

  return (
    <>
      <div className="logo" onClick={() => handleLinkClick({ preventDefault: () => {} }, 'home')}>ck</div>
      
      <aside className="sidebar" id="sidebar" ref={sidebarRef} onWheel={handleWheel}>
        <nav className="nav-links dial" id="dial">
          {allLinks.map((link, index) => {
            const isActive = link.id === activeId;
            return (
              <a
                key={`${link.id}-${index}`}
                href={`#${link.id}`}
                className={`nav-item ${isActive ? 'active' : ''}`}
                title={link.label}
                style={{ '--item-angle': `${index * 24}deg` }}
                onClick={(e) => handleLinkClick(e, link.id)}
              >
                <div className="icon-content">
                  <div className="icon-circle">
                    <i className={`ph ${link.icon}`}></i>
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
