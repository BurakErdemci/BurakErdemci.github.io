import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Profile } from './components/Profile';
import { Arsenal } from './components/Arsenal';
import { Projects } from './components/Projects';
import { Timeline } from './components/Timeline';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';


// Hero's storm canvas creates a ScrollTrigger; it must be registered first.
gsap.registerPlugin(ScrollTrigger);

// The original scrolling site, kept as the plain view (#plain). Loaded as its own
// chunk so three/gsap never weigh on the menu experience's first paint.
export default function Portfolio() {
  // No preloader, smooth-scroll, cursor, cut-in or scroll reveals here: the plain
  // view is the always-readable fallback, so content must never wait on animation.
  // (.has-js is deliberately not set, which keeps every .rv block visible.)
  useEffect(() => {
    document.documentElement.classList.remove('has-js');
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Profile />
        <Arsenal />
        <Projects />
        <Timeline />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
