/**
 * Hero section — landing viewport with profile image and title.
 * Uses a floating animation and background text watermark.
 */
const Hero = () => {
  return (
    <section id="home" className="section">
      <div className="bg-text">ck0xDev</div>
      <div className="hero-content">
        <div className="hero-img-container">
          <img
            src="/hero.png"
            alt="Chintan Kukadiya — Frontend Developer Portfolio"
            width="300"
            height="400"
            fetchpriority="high"
            loading="eager"
          />
        </div>
        <h2 className="hero-subtitle">Frontend Developer</h2>
      </div>
    </section>
  );
};

export default Hero;
