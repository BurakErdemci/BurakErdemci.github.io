import { useLayoutEffect, useRef } from 'react';
import { COPY, LINKS, SECTION_ORDER, type Lang, type SectionId } from './copy';
import { Ransom } from './Ransom';
import { glitch, isNarrow, jitter, mark, schedule, warm } from './motion';

export type Entry = 'open' | 'return' | 'enter' | 'instant';

// Desktop cascade: items step right as they go down, so their ends follow the
// glint streak toward the glasses. Values in vw, zig-zag like a pasted note.
const CASCADE = [1.2, 4.6, 2.4, 7.4, 5.0, 9.6];

interface Props {
  lang: Lang;
  sel: number;
  setSel: (i: number) => void;
  entry: Entry;
  speed: number;
  onOpen: (id: SectionId) => void;
}

export function MenuScreen({ lang, sel, setSel, entry, speed, onOpen }: Props) {
  const t = COPY[lang];
  const rootRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const glitchRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const firstSel = useRef(true);

  // Open sequence (GRAMMAR "Menu open"): darken -> red layer + silhouette + wedge
  // snap -> silhouette fills -> every item pops in the same frame -> jitter.
  useLayoutEffect(() => {
    const root = rootRef.current!;
    const set = (p: string) => { root.dataset.phase = p; mark(`menu:${p}`); };
    // Next screens' art, so the submenu reveal is not held up by a decode.
    const idle = window.setTimeout(() => warm([isNarrow() ? '/char/submenu-m.webp' : '/char/submenu.webp', '/media/gamachine-still.webp', '/char/avatar.webp']), 700);
    const stop = () => window.clearTimeout(idle);
    if (entry === 'instant') { set('live'); return stop; }
    if (entry === 'return') {
      set('live');
      const c = schedule([[Math.round(170 * speed), () => jitter(glitchRefs.current[sel])]]);
      return () => { c(); stop(); };
    }
    const k = speed;
    // Coming from the intro or a cold load the screen is already dark, so the
    // darken beat is shortened from the game's 270 ms to 120 ms.
    const dark = Math.round(120 * k);
    set('dark');
    const c = schedule([
      [dark, () => set('snap')],
      [dark + Math.round(70 * k), () => set('sil')],
      [dark + Math.round(200 * k), () => set('live')],
      [dark + Math.round(200 * k) + 16, () => jitter(glitchRefs.current[sel])],
    ]);
    return () => { c(); stop(); };
    // entry is fixed for the life of this mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useLayoutEffect(() => {
    if (firstSel.current) { firstSel.current = false; return; }
    glitch(glitchRefs.current[sel]);
    mark('menu:select');
  }, [sel]);

  const move = (d: number) => {
    const n = (sel + d + SECTION_ORDER.length) % SECTION_ORDER.length;
    setSel(n);
    itemRefs.current[n]?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') { e.preventDefault(); move(1); }
    else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') { e.preventDefault(); move(-1); }
    else if (e.key === 'Home') { e.preventDefault(); move(-sel); }
    else if (e.key === 'End') { e.preventDefault(); move(SECTION_ORDER.length - 1 - sel); }
    else if (/^[1-6]$/.test(e.key)) { const n = +e.key - 1; setSel(n); itemRefs.current[n]?.focus(); }
  };

  const selId = SECTION_ORDER[sel];
  const num = String(sel + 1).padStart(2, '0');

  return (
    <section ref={rootRef} className="xp-screen xp-menu" data-phase="live" aria-label={t.sr.menu}>
      <div className="mn-bg" aria-hidden="true">
        <div className="mn-red" />
        <div className="mn-bone" />
        <div className="mn-slash" />
      </div>

      <div className="mn-charbox" aria-hidden="true">
        <picture>
          <source media="(max-width: 700px)" srcSet="/char/menu-m.webp" />
          <img className="mn-char" src="/char/menu.webp" alt="" width={933} height={1400} decoding="async" fetchPriority="high" />
        </picture>
        <div className="mn-glint" />
      </div>

      <div className="mn-name">
        <h1 className="mn-h1" aria-label="Burak Erdemci"><Ransom text="BURAK ERDEMCI" seed={3} /></h1>
        <p className="mn-label">{t.name.label}</p>
        <p className="mn-chips"><span className="c-r">{t.name.chipA}</span><span className="c-w">{t.name.chipB}</span></p>
        <p className="mn-loc">{t.name.loc}</p>
      </div>

      <nav className="mn-nav" aria-label={t.sr.menu} onKeyDown={onKeyDown}>
        <ul className="mn-list">
          {SECTION_ORDER.map((id, i) => {
            const label = t.items[id].label;
            const isSel = i === sel;
            return (
              <li key={id} style={{ '--x': `${CASCADE[i]}vw`, '--r': `${i % 2 ? 2.5 : -3.5}deg` } as React.CSSProperties}>
                <button
                  ref={(el) => { itemRefs.current[i] = el; }}
                  type="button"
                  className={`mi${isSel ? ' is-sel' : ''}`}
                  tabIndex={isSel ? 0 : -1}
                  aria-label={`${String(i + 1).padStart(2, '0')} ${label}`}
                  aria-current={isSel ? 'true' : undefined}
                  aria-describedby={isSel ? 'mn-cap' : undefined}
                  onPointerEnter={(e) => { if (e.pointerType === 'mouse' && !isSel) setSel(i); }}
                  onFocus={() => { if (!isSel) setSel(i); }}
                  onClick={() => onOpen(id)}
                >
                  <span className="mi-g" ref={(el) => { glitchRefs.current[i] = el; }}>
                    <span className="mi-plate" aria-hidden="true" />
                    <span className="g-streak" aria-hidden="true" />
                    <Ransom text={label} seed={i} />
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="mn-num" key={`n${sel}`} aria-hidden="true">
        <span className="mn-num-a">{num[0]}</span><span className="mn-num-b">{num[1]}</span>
      </div>
      <div className="mn-foot">
        <p className="mn-cap" id="mn-cap" key={`c${sel}-${lang}`}>
          <span className="mn-cap-k" aria-hidden="true">{t.items[selId].label}</span>
          <span className="mn-cap-t">{t.items[selId].caption}</span>
        </p>
        <ul className="mn-links" aria-label={t.contact.others}>
          <li><a href={LINKS.email}>{t.hud.email}</a></li>
          <li><a href={LINKS.github} target="_blank" rel="noopener noreferrer">GITHUB ↗</a></li>
        </ul>
      </div>
      <p className="mn-hint" aria-hidden="true">{t.hint}</p>
    </section>
  );
}
