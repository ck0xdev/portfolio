import React from 'react';

const Hero = () => {
  return (
    <section id="home" className="section">
      <div className="bg-text">ck0xDev</div>
      <div className="hero-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2 }}>
        <div className="hero-img-container">
          <img src="/hero.png" alt="Chintan Kukadiya" width="300" height="400" fetchpriority="high" loading="eager" />
        </div>
        <h2 style={{
          fontFamily: 'Outfit, sans-serif',
          fontSize: '1.5rem',
          fontWeight: '600',
          color: 'var(--text-primary)', 
          marginTop: '1rem',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          opacity: 0.9
        }}>Frontend Developer</h2>
      </div>

    </section>
  );
};

export default Hero;
