// Motion helpers. Every timing number here comes from site-tasarim/p5-motion/GRAMMAR.md:
// entries are hard cuts or 70-130 ms snaps, never soft ease-ins, so keyframes use
// step easing (each keyframe holds until the next one = one "game frame").

export const reducedMotion = (): boolean =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const finePointer = (): boolean =>
  typeof window !== 'undefined' && window.matchMedia('(hover:hover) and (pointer:fine)').matches;

// Timeline marks, read by the verification scripts (window.__xpMarks) so the
// measured ms in the report come from the page itself, not from guesses.
type Mark = { name: string; t: number };
declare global { interface Window { __xpMarks?: Mark[] } }
export function mark(name: string) {
  if (typeof window === 'undefined') return;
  (window.__xpMarks ||= []).push({ name, t: Math.round(performance.now()) });
}

// Cancellable schedule of [ms, fn] steps measured from one origin, so a skipped or
// interrupted sequence never fires stale steps into a newer screen.
export function schedule(steps: [number, () => void][]): () => void {
  const ids = steps.map(([ms, fn]) => window.setTimeout(fn, ms));
  return () => ids.forEach((id) => window.clearTimeout(id));
}

// Selection glitch (GRAMMAR rule 6): frame 1 = channel split + skew peak, then the
// element settles larger over ~3 frames at 30 fps (~110 ms). Uses the CSS
// variables --gx (skew) / --gs (scale) so the resting transform stays in CSS.
export function glitch(el: HTMLElement | null, settleScale = 1) {
  if (!el || reducedMotion()) return;
  const s = settleScale;
  el.animate(
    [
      { transform: `translateX(-10px) skewX(-16deg) scale(${s * 1.16})`, filter: 'drop-shadow(-6px 0 0 #E8001C) drop-shadow(6px 0 0 #19E3FF)', easing: 'steps(1,end)' },
      { transform: `translateX(7px) skewX(9deg) scale(${s * 0.94})`, filter: 'drop-shadow(4px 0 0 #E8001C) drop-shadow(-4px 0 0 #19E3FF)', easing: 'steps(1,end)' },
      { transform: `translateX(-2px) skewX(-3deg) scale(${s * 1.04})`, filter: 'drop-shadow(-1px 0 0 #19E3FF)', easing: 'steps(1,end)' },
      { transform: `none`, filter: 'none' },
    ],
    { duration: 120, fill: 'none' },
  );
  // horizontal streak across the selection, first two frames only
  el.querySelector<HTMLElement>('.g-streak')?.animate(
    [
      { opacity: 1, transform: 'translateY(-.18em) scaleX(1.2)', easing: 'steps(1,end)' },
      { opacity: .8, transform: 'translateY(.22em) scaleX(.7)', easing: 'steps(1,end)' },
      { opacity: 0, transform: 'none' },
    ],
    { duration: 70 },
  );
}

// Small idle jitter on the freshly selected item after a screen opens
// (GRAMMAR: "selected item jitters 470-800").
export function jitter(el: HTMLElement | null, ms = 330) {
  if (!el || reducedMotion()) return;
  const frames: Keyframe[] = [];
  const n = Math.round(ms / 33);
  for (let i = 0; i < n; i++) {
    const a = (n - i) / n;
    frames.push({ translate: `${((i * 37) % 7 - 3) * a}px ${((i * 53) % 5 - 2) * a}px`, easing: 'steps(1,end)' });
  }
  frames.push({ translate: '0 0' });
  el.animate(frames, { duration: ms });
}

export const nextFrame = () => new Promise<void>((r) => requestAnimationFrame(() => r()));

// Decode images ahead of the hard cut that reveals them. Measured: the first
// splash frame and the submenu reveal each stalled ~100-200 ms while a large
// WebP decoded on first paint; decoding early keeps the cut on its beat.
const warmed = new Set<string>();
export function warm(urls: string[]) {
  for (const u of urls) {
    if (warmed.has(u)) continue;
    warmed.add(u);
    const img = new Image();
    img.decoding = 'async';
    img.src = u;
    img.decode().catch(() => { /* a failed preload only costs the optimisation */ });
  }
}
export const isNarrow = () => typeof window !== 'undefined' && window.innerWidth <= 700;
