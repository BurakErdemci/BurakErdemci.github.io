import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initReveals(): () => void {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) return () => {};

  const triggers: ScrollTrigger[] = [];

  // section elements fade & slide up
  const rvElements = document.querySelectorAll('section:not(.hero) .rv');
  rvElements.forEach((el) => {
    const t = ScrollTrigger.create({
      trigger: el,
      start: 'top 88%',
      once: true,
      onEnter: () => {
        gsap.fromTo(el,
          { opacity: 0, y: 34, rotate: 0.4 },
          { opacity: 1, y: 0, rotate: 0, duration: 0.85, ease: 'power3.out' }
        );
      }
    });
    triggers.push(t);
  });

  // mission cards slide in from left/right
  const missionCards = document.querySelectorAll('.mission');
  missionCards.forEach((m, i) => {
    const t = ScrollTrigger.create({
      trigger: m,
      start: 'top 86%',
      once: true,
      onEnter: () => {
        gsap.fromTo(m,
          { x: i % 2 ? 60 : -60, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.9, ease: 'power4.out' }
        );
      }
    });
    triggers.push(t);
  });

  // return cleanup function
  return () => {
    triggers.forEach((t) => t.kill());
  };
}
