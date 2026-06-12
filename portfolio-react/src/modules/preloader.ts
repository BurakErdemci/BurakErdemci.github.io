import gsap from 'gsap';

export function initPreloader() {
  const loader = document.getElementById('loader');
  const letters = document.querySelectorAll('#heroName .rl');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reducedMotion && loader) {
    loader.remove();
    return;
  }

  if (loader) {
    // Set initial state
    gsap.set(letters, { yPercent: 130, opacity: 0, rotate: 0 });
    gsap.set('.hero .rv', { opacity: 0, y: 24 });

    const tl = gsap.timeline();
    tl.to('#loader .wipe', { x: '0%', duration: 0.55, ease: 'power4.in' })
      .to('#loader .stamp', { opacity: 1, scale: 1.04, duration: 0.06 }, '+=.05')
      .fromTo('#loader .stamp', { rotate: -7, scale: 1.18 }, { rotate: -4, scale: 1, duration: 0.35, ease: 'power4.out' }, '<')
      .to('#loader .tag', { opacity: 1, duration: 0.3 }, '-=.1')
      .to('#loader .wipe', { x: '130%', duration: 0.55, ease: 'power4.in', delay: 0.55 })
      .to('#loader .stamp, #loader .tag', { opacity: 0, duration: 0.2 }, '<')
      .to(loader, { opacity: 0, duration: 0.25 })
      .add(() => loader.remove())
      // letters slam
      .to(letters, {
        yPercent: 0,
        opacity: 1,
        duration: 0.7,
        rotate: (_i, el) => {
          const rotData = (el as HTMLElement).dataset.rot;
          return rotData ? +rotData * 0.55 : 0;
        },
        stagger: { each: 0.04, from: 'random' },
        ease: 'back.out(2.2)'
      }, '-=.15')
      .to('.hero .rv', { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out' }, '-=.4');
  }
}
