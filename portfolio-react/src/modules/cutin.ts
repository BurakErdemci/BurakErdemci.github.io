import gsap from 'gsap';
import { getLenis } from './lenis';

const CUT_LABELS: Record<string, Record<'tr' | 'en', { big: string; sub: string }>> = {
  '#hero': {
    tr: { big: 'GİRİŞ', sub: '// 00' },
    en: { big: 'HOME', sub: '// 00' }
  },
  '#profile': {
    tr: { big: 'PROFİL', sub: '// 01' },
    en: { big: 'PROFILE', sub: '// 01' }
  },
  '#arsenal': {
    tr: { big: 'YETENEKLER', sub: '// 02' },
    en: { big: 'ARSENAL', sub: '// 02' }
  },
  '#missions': {
    tr: { big: 'PROJELER', sub: '// 03' },
    en: { big: 'MISSIONS', sub: '// 03' }
  },
  '#contact': {
    tr: { big: 'İLETİŞİM', sub: '// 04' },
    en: { big: 'CONTACT', sub: '// 04' }
  }
};

let cutBusy = false;

function jumpTo(target: HTMLElement) {
  const lenis = getLenis();
  const y = target.getBoundingClientRect().top + window.scrollY - 10;
  if (lenis) {
    lenis.scrollTo(y, { immediate: true });
  } else {
    window.scrollTo(0, y);
  }
}

export function cutinTo(target: HTMLElement, href: string) {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const lenis = getLenis();

  if (reduced) {
    if (lenis) {
      lenis.scrollTo(target, { offset: -10, duration: 1.2 });
    } else {
      target.scrollIntoView({ behavior: 'auto' });
    }
    return;
  }

  if (cutBusy) return;
  cutBusy = true;

  const ci = document.getElementById('cutin');
  if (!ci) return;

  const currentLang = (document.documentElement.lang || 'tr') as 'tr' | 'en';
  const label = (CUT_LABELS[href] && CUT_LABELS[href][currentLang]) || { big: 'GO', sub: '//' };
  const bigEl = ci.querySelector('.ct .big');
  const subEl = ci.querySelector('.ct .sub');

  if (!bigEl || !subEl) return;

  // Split and format letters: alternating styles
  bigEl.innerHTML = '';
  [...label.big].forEach((ch, i) => {
    const s = document.createElement('span');
    s.className = 'cl' + ((i * 7 + ch.charCodeAt(0)) % 5 === 0 ? ' alt' : '');
    s.textContent = ch;
    bigEl.appendChild(s);
  });
  subEl.textContent = label.sub;

  const band = ci.querySelector('.band');
  const cls = bigEl.querySelectorAll('.cl');
  const sp1 = ci.querySelector('.sp1');
  const sp2 = ci.querySelector('.sp2');
 
  (window as unknown as { __cutinActive?: boolean }).__cutinActive = true;
  ci.style.display = 'block';
  gsap.set(band, { scaleX: 0, xPercent: 0, transformOrigin: 'left center' });
  gsap.set(cls, { xPercent: 140, skewX: -24, opacity: 0 });
  gsap.set(subEl, { opacity: 0, x: 20 });
  gsap.set([sp1, sp2], { opacity: 0, scale: 0.3, rotate: -40 });

  const tl = gsap.timeline();
  tl.eventCallback('onComplete', () => {
    ci.style.display = 'none';
    cutBusy = false;
    (window as unknown as { __cutinActive?: boolean }).__cutinActive = false;
  });

  tl.to(band, { scaleX: 1, duration: 0.3, ease: 'power4.out' })
    .add(() => jumpTo(target)) // warp/scroll immediately while curtain is closed
    .to(cls, {
      xPercent: 0,
      skewX: 0,
      opacity: 1,
      duration: 0.34,
      stagger: { each: 0.028, from: 'start' },
      ease: 'power4.out'
    }, '-=.12')
    .to(subEl, { opacity: 1, x: 0, duration: 0.25 }, '-=.18')
    .to([sp1, sp2], {
      opacity: 1,
      scale: 1,
      rotate: 0,
      duration: 0.3,
      stagger: 0.06,
      ease: 'back.out(3)'
    }, '-=.3')
    .to({}, { duration: 0.4 }) // hold state briefly so details can be read
    .to([sp1, sp2], { opacity: 0, duration: 0.15 })
    .to(band, { xPercent: 135, duration: 0.35, ease: 'power3.inOut' }, '<');
}

export function initCutIn(): () => void {
  const handleAnchorClick = (e: MouseEvent) => {
    const a = (e.target as HTMLElement).closest('a[href^="#"]');
    if (!a) return;

    const href = a.getAttribute('href');
    if (!href || href === '#') return;

    const target = document.querySelector(href) as HTMLElement;
    if (!target) return;

    e.preventDefault();
    cutinTo(target, href);
  };

  document.addEventListener('click', handleAnchorClick);

  return () => {
    document.removeEventListener('click', handleAnchorClick);
  };
}
