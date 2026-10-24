import { useLayoutEffect, useRef, useState } from 'react';
import { COPY, type Lang, type Mission } from './copy';
import { Ransom } from './Ransom';
import { columnLayout, glitch, mark, reducedMotion, schedule } from './motion';
import type { Entry } from './MenuScreen';

// One list + detail screen, two lists: the missions and the music videos (showtime).
interface Props { id: 'missions' | 'showtime'; lang: Lang; entry: Entry; speed: number; sel: number; setSel: (i: number) => void }

function Media({ m }: { m: Mission }) {
  const media = m.media;
  if (media.kind === 'loop') {
    // A 1.5-2.6 MB loop only exists in the DOM while its entry is selected, and
    // reduced-motion visitors get the still instead of the animation.
    const still = reducedMotion();
    return (
      <figure className="md md-loop">
        <img src={still ? media.poster : media.src} alt={still && media.stillAlt ? media.stillAlt : media.alt}
          width={960} height={540} loading="lazy" decoding="async"
          style={{ backgroundImage: `url(${media.poster})` }} />
        <figcaption>{media.label}</figcaption>
      </figure>
    );
  }
  if (media.kind === 'shots') {
    return (
      <figure className={`md md-shots n${media.srcs.length}`}>
        {media.srcs.map((s, i) => (
          <img key={s} src={s} alt={`${m.title} ${i + 1}`} width={960} height={540} loading="lazy" decoding="async" />
        ))}
        <figcaption>{media.label}</figcaption>
      </figure>
    );
  }
  // codex-delegate: drawn in code, no screenshot. One architect fans out to three
  // worker lanes; every lane converges on the review gate.
  return (
    <figure className="md md-lanes" aria-label={`${media.arch[0]} → ${media.lane} 1–3 → ${media.review[0]}`}>
      <div className="ln-arch"><b>{media.arch[0]}</b><span>{media.arch[1]}</span></div>
      <svg className="ln-wires" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 50 L22 50 L30 18 L70 18 L78 50 L100 50" />
        <path d="M0 50 L100 50" />
        <path d="M0 50 L22 50 L30 82 L70 82 L78 50 L100 50" />
      </svg>
      <ol className="ln-lanes" aria-hidden="true">
        {[1, 2, 3].map((n) => <li key={n}><span>{media.lane}</span><b>#{n}</b></li>)}
      </ol>
      <div className="ln-review"><b>{media.review[0]}</b><span>{media.review[1]}</span></div>
    </figure>
  );
}

export function MissionsScreen({ id, lang, entry, speed, sel, setSel }: Props) {
  const t = COPY[lang];
  const data = t[id];
  const list = data.list;
  const rootRef = useRef<HTMLElement>(null);
  const rowRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const gRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [detailKey, setDetailKey] = useState(0);
  const first = useRef(true);

  // Submenu enter, second half (GRAMMAR "Submenu"): the list is already in place
  // when the cover lifts; the pose slides in on a diagonal wipe from the left.
  useLayoutEffect(() => {
    const root = rootRef.current!;
    const set = (p: string) => { root.dataset.phase = p; mark(`missions:${p}`); };
    if (entry === 'instant' || entry === 'return') { set('live'); return; }
    set('pre');
    return schedule([
      [Math.round(30 * speed), () => set('live')],
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useLayoutEffect(() => {
    if (first.current) { first.current = false; return; }
    glitch(gRefs.current[sel]);
    setDetailKey((k) => k + 1);
    mark('missions:select');
  }, [sel]);

  const move = (d: number) => {
    const n = (sel + d + list.length) % list.length;
    setSel(n);
    rowRefs.current[n]?.focus();
  };
  // Listens on the whole screen: on entry focus sits on the heading (so screen readers announce it), and
  // arrows must already work there. Links in the detail panel are left alone.
  const onKeyDown = (e: React.KeyboardEvent) => {
    const el = e.target as HTMLElement;
    if (el.id !== 'ms-title' && !el.closest('.ms-list')) return;
    if (e.key === 'ArrowDown') { e.preventDefault(); move(1); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); move(-1); }
  };

  const m = list[sel];

  return (
    <section ref={rootRef} className={`xp-screen xp-missions xp-${id}`} data-phase="live" aria-labelledby="ms-title" onKeyDown={onKeyDown}>
      <div className="ms-bg" aria-hidden="true"><div className="ms-bone" /><div className="ms-red" /></div>
      <div className="ms-charbox" aria-hidden="true">
        <picture>
          <source media="(max-width: 700px)" srcSet="/char/submenu-m.webp" />
          <img src="/char/submenu.webp" alt="" width={933} height={1400} decoding="async" />
        </picture>
      </div>

      <header className="ms-head">
        <h2 id="ms-title" className="ms-title" tabIndex={-1} data-autofocus aria-label={data.title}>
          <Ransom text={data.title} seed={id === 'missions' ? 11 : 13} />
        </h2>
        <p className="ms-sub">{data.sub}</p>
      </header>

      <ul className="ms-list">
        {list.map((it, i) => (
          <li key={it.id} style={{ '--i': i } as React.CSSProperties}>
            <button
              ref={(el) => { rowRefs.current[i] = el; }}
              type="button"
              className={`mr${i === sel ? ' is-sel' : ''}`}
              // roving tabindex: Tab leaves the list for the selected mission's links; arrows move inside it
              tabIndex={i === sel ? 0 : -1}
              aria-pressed={i === sel}
              aria-controls="ms-detail"
              onFocus={() => { if (i !== sel) setSel(i); }}
              onClick={() => {
                if (i !== sel) setSel(i);
                // In the column layout the detail sits below the list; bring it into view.
                if (columnLayout()) document.getElementById('ms-detail')?.scrollIntoView({ block: 'start', behavior: reducedMotion() ? 'auto' : 'smooth' });
              }}
            >
              <span className="mr-g" ref={(el) => { gRefs.current[i] = el; }}>
                <span className="mr-bar" aria-hidden="true" />
                <span className="g-streak" aria-hidden="true" />
                <span className="mr-n" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <span className="mr-t" lang={it.titleLang}>{it.title}</span>
                <span className="mr-k">{it.kind}</span>
                {it.status && <span className="mr-s">{it.status}</span>}
              </span>
            </button>
          </li>
        ))}
      </ul>

      <article id="ms-detail" className="ms-detail" key={`${m.id}-${detailKey}-${lang}`} aria-label={data.detailLabel} aria-live="polite">
        <p className="dt-kind">{m.kind}</p>
        <h3 className="dt-title" lang={m.titleLang}>{m.title}</h3>
        {m.status && <p className="dt-stamp">{m.status}</p>}
        <Media m={m} />
        <p className="dt-text">{m.text}</p>
        {m.tech && <ul className="dt-tech" aria-label="Tech" lang="en">{m.tech.map((x) => <li key={x}>{x}</li>)}</ul>}
        <p className="dt-links">
          {m.links.map((l) => (
            <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="xbtn">{l.label} <span aria-hidden="true">↗</span></a>
          ))}
        </p>
      </article>
    </section>
  );
}
