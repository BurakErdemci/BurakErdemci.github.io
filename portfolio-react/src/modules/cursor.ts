import gsap from 'gsap';

export function initCursor(): () => void {
  const finePointer = window.matchMedia('(hover:hover) and (pointer:fine)').matches;
  if (!finePointer) return () => {};

  const cur = document.querySelector('.cursor') as HTMLElement;
  const tail = document.querySelector('.cursor-tail') as HTMLElement;
  if (!cur || !tail) return () => {};

  const cx = gsap.quickTo(cur, 'x', { duration: 0.06, ease: 'power2.out' });
  const cy = gsap.quickTo(cur, 'y', { duration: 0.06, ease: 'power2.out' });
  const tx2 = gsap.quickTo(tail, 'x', { duration: 0.28, ease: 'power3.out' });
  const ty2 = gsap.quickTo(tail, 'y', { duration: 0.28, ease: 'power3.out' });

  const handleMouseMove = (e: MouseEvent) => {
    cx(e.clientX);
    cy(e.clientY);
    tx2(e.clientX);
    ty2(e.clientY);
  };

  const handleMouseOver = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target) return;
    const isHovered = !!target.closest('a, button, [data-hover], .tag, .mission');
    tail.classList.toggle('is-hover', isHovered);
  };

  window.addEventListener('mousemove', handleMouseMove, { passive: true });
  document.addEventListener('mouseover', handleMouseOver);

  return () => {
    window.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseover', handleMouseOver);
  };
}
