import { Suspense, lazy } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingSpinner from './components/ui/LoadingSpinner';
import BackgroundShader from './components/ui/BackgroundShader';
import Sidebar from './layout/Sidebar';
import Hero from './sections/Hero';

/* Lazy-load below-the-fold sections for faster initial paint */
const About = lazy(() => import('./sections/About'));
const Experience = lazy(() => import('./sections/Experience'));
const Projects = lazy(() => import('./sections/Projects'));
const Contact = lazy(() => import('./sections/Contact'));
const Footer = lazy(() => import('./layout/Footer'));

/**
 * Root application component.
 *
 * Layout:  BackgroundShader (fixed) → Sidebar (fixed) → Main sections → Footer
 * Perf:    Hero loads eagerly; everything below the fold is lazy-loaded.
 * Safety:  ErrorBoundary wraps lazy sections to prevent full-app crash.
 */
function App() {
  return (
    <>
      <BackgroundShader />
      <Sidebar />
      <main className="main-content">
        <Hero />
        <ErrorBoundary>
          <Suspense fallback={<LoadingSpinner />}>
            <About />
            <Experience />
            <Projects />
            <Contact />
          </Suspense>
        </ErrorBoundary>
      </main>
      <ErrorBoundary>
        <Suspense fallback={<div />}>
          <Footer />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}

export default App;