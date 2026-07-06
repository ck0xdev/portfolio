import React, { Suspense, lazy } from 'react';
import BackgroundShader from './components/BackgroundShader';
import Sidebar from './components/Sidebar';
import Hero from './components/Hero';

// Lazy load below-the-fold components
const About = lazy(() => import('./components/About'));
const Experience = lazy(() => import('./components/Experience'));
const Projects = lazy(() => import('./components/Projects'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));

function App() {
  return (
    <>
      <BackgroundShader />
      <Sidebar />
      <main className="main-content">
        <Hero />
        <Suspense fallback={<div style={{ height: '100vh' }}></div>}>
          <About />
          <Experience />
          <Projects />
          <Contact />
        </Suspense>
      </main>
      <Suspense fallback={<div></div>}>
        <Footer />
      </Suspense>
    </>
  );
}

export default App;