import Image from 'next/image';

export default function Hero() {
  return (
    <section id="home" className="section hero">
                <div className="hero-bg-text-wrapper">
                    <div className="x-stick x-stick-1"></div>
                    <div className="x-stick x-stick-2"></div>
                    <h1 className="hero-bg-text">
                        <span className="sr-only">Chintan Kukadiya - Frontend Developer &amp; Video Editor Portfolio</span>
                        <span className="bg-text-left" aria-hidden="true">ck0</span><span className="bg-text-x" aria-hidden="true">X</span><span
                            className="bg-text-right" aria-hidden="true">Dev</span>
                    </h1>
                </div>
    
                <div className="container hero-centered">
                    <div className="hero-visual fade-in">
                        <div className="avatar-container">
                            <Image
                                src="/assets/hero.png"
                                alt="Chintan Kukadiya (ck0x) - Frontend Developer and Video Editor"
                                id="hero-avatar"
                                className="fade-bottom"
                                width={500}
                                height={500}
                                priority
                            />
                        </div>
                    </div>
    
                    <div className="hero-content">
                        <h2 className="hero-role">FRONTEND DEVELOPER</h2>
                    </div>
                </div>
            </section>
  );
}
