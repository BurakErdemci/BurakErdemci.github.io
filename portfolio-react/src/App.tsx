import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Profile } from './components/Profile';
import { Arsenal } from './components/Arsenal';
import { Projects } from './components/Projects';
import { Timeline } from './components/Timeline';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { AdminPanel } from './components/AdminPanel';

import { initLenis } from './modules/lenis';
import { initCursor } from './modules/cursor';
import { initCutIn } from './modules/cutin';
import { initReveals } from './modules/reveals';
import { initPreloader } from './modules/preloader';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

function Portfolio() {
  const { lang } = useTheme();

  useEffect(() => {
    // 1. Add js class to root
    document.documentElement.classList.add('has-js');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      document.documentElement.classList.add('reduced');
    }

    // 2. Initialize modules
    const destroyLenis = initLenis();
    const destroyCursor = initCursor();
    const destroyCutIn = initCutIn();
    const destroyReveals = initReveals();

    // 3. Preloader GSAP animation on mount
    initPreloader();

    // Cleanup on unmount
    return () => {
      if (destroyLenis) destroyLenis.destroy();
      destroyCursor();
      destroyCutIn();
      destroyReveals();
    };
  }, []);

  // Refresh ScrollTrigger when language changes to recalculate height positions
  useEffect(() => {
    // Small timeout to allow React render to complete first
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 50);
    return () => clearTimeout(timer);
  }, [lang]);

  return (
    <>
      {/* Preloader */}
      <div id="loader" aria-hidden="true">
        <div className="wipe"></div>
        <div className="stamp">BURAK <i>ERDEMCI</i></div>
        <div className="tag">// INITIALIZING</div>
      </div>

      {/* Custom Cursor */}
      <div className="cursor" aria-hidden="true"></div>
      <div className="cursor-tail" aria-hidden="true"></div>

      {/* Navigation Header */}
      <Navbar />

      {/* Sections */}
      <main>
        <Hero />
        <Profile />
        <Arsenal />
        <Projects />
        <Timeline />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Cut-in Transition Screen */}
      <div id="cutin" aria-hidden="true">
        <div className="slash k1"></div>
        <div className="slash k2"></div>
        <div className="band">
          <div className="lines"></div>
          <div className="ct"><span className="big"></span><span className="sub"></span></div>
        </div>
        <div className="spark sp1"></div>
        <div className="spark sp2"></div>
      </div>
    </>
  );
}

export default function App() {
  const [isAdmin, setIsAdmin] = useState(() => window.location.hash === '#burak-admin');

  useEffect(() => {
    const handleHash = () => {
      setIsAdmin(window.location.hash === '#burak-admin');
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  return (
    <ThemeProvider>
      {isAdmin ? (
        <AdminPanel onBack={() => { window.location.hash = ''; }} />
      ) : (
        <Portfolio />
      )}
    </ThemeProvider>
  );
}
