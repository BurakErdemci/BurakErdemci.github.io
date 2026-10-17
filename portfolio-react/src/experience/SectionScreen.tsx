import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { COPY, LINKS, SECTION_ORDER, type Lang, type SectionId } from './copy';
import { Ransom } from './Ransom';
import { glitch, isNarrow, mark, reducedMotion, schedule } from './motion';
import type { Entry } from './MenuScreen';

type Sid = Exclude<SectionId, 'missions'>;

// Renders `code` spans from the copy file without pulling in a markdown parser.
function Code({ text }: { text: string }) {
  return <>{text.split('`').map((p, i) => (i % 2 ? <code key={i}>{p}</code> : p))}</>;
}

// A one-shot overlay beat (rank-up, reward splash). Any key except Tab/Esc, or a
// click, ends it at once; Esc still reaches the global close handler.
function useSkippable(active: boolean, skip: () => void) {
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => { if (e.key !== 'Tab' && e.key !== 'Escape') skip(); };
    const onDown = () => skip();
    window.addEventListener('keydown', onKey, true);
    window.addEventListener('pointerdown', onDown, true);
    return () => { window.removeEventListener('keydown', onKey, true); window.removeEventListener('pointerdown', onDown, true); };
  }, [active, skip]);
}

/* ---------------- PROFİL: status screen ---------------- */
function Profile({ lang }: { lang: Lang }) {
  const t = COPY[lang];
  const p = t.profile;
  return (
    <>
      <div className="pf-char" aria-hidden="true">
        <picture>
          <source media="(max-width: 700px)" srcSet="/char/submenu-m.webp" />
          <img src="/char/submenu.webp" alt="" width={933} height={1400} decoding="async" />
        </picture>
      </div>
      <div className="pf-grid">
        <div className="pf-plate sx-in">
          <p className="pf-status">{p.status}</p>
          <p className="pf-name">BURAK ERDEMCI</p>
          <p className="pf-role">{t.name.label.replace('// ', '')}</p>
          <p className="pf-loc">{t.name.loc}</p>
        </div>
        <div className="pf-bio sx-in">
          <p>{p.p1}</p>
          <p>{p.p2}</p>
        </div>
        <section className="pf-work sx-in" aria-label={p.workLabel}>
          <h3>{p.workLabel}</h3>
          <ol>
            {p.steps.map((s, i) => (
              <li key={s} style={{ '--i': i } as React.CSSProperties}><b>{String(i + 1).padStart(2, '0')}</b><span>{s}</span></li>
            ))}
          </ol>
          <p className="pf-loop"><span aria-hidden="true">↺ </span>{p.loop}</p>
        </section>
        <ul className="pf-stats sx-in">
          {p.stats.map((s) => <li key={s.l}><b>{s.n}</b><span>{s.l}</span></li>)}
        </ul>
      </div>
    </>
  );
}

/* ---------------- SIRDAŞLAR: confidant rank-up ---------------- */
function Confidants({ lang, entry }: { lang: Lang; entry: Entry }) {
  const c = COPY[lang].confidants;
  const play = entry === 'enter' && !reducedMotion();
  // rank-up beat: pre (old rank shown) -> on (stamp + new rank) -> done
  const [ru, setRu] = useState<'pre' | 'on' | 'done'>(play ? 'pre' : 'done');
  const badgeRef = useRef<HTMLSpanElement>(null);
  const finish = useCallback(() => setRu('done'), []);
  useSkippable(ru !== 'done', finish);
  useLayoutEffect(() => {
    if (!play) return;
    const k = isNarrow() ? 0.7 : 1;
    mark('rankup:pre');
    return schedule([
      [Math.round(160 * k), () => { setRu('on'); mark('rankup:on'); }],
      [Math.round(176 * k), () => glitch(badgeRef.current)],
      [Math.round(900 * k), () => { setRu('done'); mark('rankup:off'); }],
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="cf2" data-ru={ru}>
      <p className="sx-intro sx-in">{c.intro}</p>
      <ul className="cf-cards">
        {c.repos.map((r, ri) => {
          const target = +r.rank.replace(/\D/g, '');
          // the first card is the one that ranks up on enter
          const shown = ri === 0 && ru === 'pre' ? target - 1 : target;
          return (
            <li key={r.repo} className="cf-card sx-in" style={{ '--r': `${[-2.2, 1.6, -1.2][ri]}deg` } as React.CSSProperties}>
              <div className="cf-top">
                <span className="cf-rank" ref={ri === 0 ? badgeRef : undefined} aria-label={r.rank}>
                  <small aria-hidden="true">RANK</small><b aria-hidden="true">{shown}</b>
                </span>
                <span className="cf-pips" aria-hidden="true">
                  {Array.from({ length: 10 }, (_, i) => <i key={i} className={i < shown ? 'on' : ''} />)}
                </span>
              </div>
              <h3><a href={r.url} target="_blank" rel="noopener noreferrer">{r.repo} <span aria-hidden="true">↗</span></a></h3>
              <ul className="cf-prs">
                {r.prs.map((pr) => (
                  <li key={pr.n}>
                    <a href={pr.url} target="_blank" rel="noopener noreferrer">
                      <b>{pr.n}</b><span><Code text={pr.text} /></span><em>{c.merged}</em>
                    </a>
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
      <p className="cf-bond sx-in">
        <img src="/char/avatar.webp" alt="" width={64} height={64} aria-hidden="true" />
        <b><em>{c.repos.reduce((n, r) => n + r.prs.length, 0)}</em> {c.bond[0]} · <em>{c.repos.length}</em> {c.bond[1]}</b>
      </p>
      {ru === 'on' && (
        <div className="cf-rankup" aria-hidden="true">
          <div className="cf-burst" />
          <Ransom text={c.rankUp} seed={4} className="cf-ru-word" />
          <p className="cf-ru-sub">{c.repos[0].repo} · {c.repos[0].rank}</p>
        </div>
      )}
    </div>
  );
}

/* ---------------- CEPHANELİK: affinity card ---------------- */
function Arsenal({ lang }: { lang: Lang }) {
  const a = COPY[lang].arsenal;
  return (
    <>
      <div className="ar-art" aria-hidden="true">
        <picture>
          <source media="(max-width: 700px)" srcSet="/char/finisher-m.webp" />
          <img src="/char/finisher.webp" alt="" width={1536} height={1024} decoding="async" />
        </picture>
      </div>
      <div className="ar2 sx-in">
        <p className="ar-note">{a.note}</p>
        <table className="ar-table">
          <thead><tr>{a.head.map((h) => <th key={h} scope="col">{h}</th>)}</tr></thead>
          <tbody>
            {a.rows.map((r) => (
              <tr key={r.k}>
                <th scope="row">{r.k}</th>
                <td>
                  <ul className="ar-tools">{r.tools.map((x) => <li key={x}>{x}</li>)}</ul>
                  <span className="ar-where">// {r.note}</span>
                </td>
                <td><span className={`ar-aff${r.main ? ' main' : ''}`}>{r.aff}</span></td>
              </tr>
            ))}
            <tr className="ar-weak">
              <th scope="row">{a.weak.k}</th>
              <td><span className="ar-flutter">{a.weak.v}</span> <span className="ar-where">{a.weak.note}</span></td>
              <td><span className="ar-aff weak">{a.weak.k}</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

/* ---------------- TAKVİM: calendar flip ---------------- */
function Calendar({ lang, entry }: { lang: Lang; entry: Entry }) {
  const rows = [...COPY[lang].calendar.rows].reverse(); // oldest left, newest right
  const rootRef = useRef<HTMLOListElement>(null);
  useLayoutEffect(() => {
    if (entry !== 'enter' || reducedMotion()) return;
    const el = rootRef.current!;
    el.dataset.flip = 'pre';
    // flip once the submenu cover has lifted (measured: ~130 ms after the swap),
    // otherwise the whole flip plays unseen under the wedge
    return schedule([[Math.round(200 * (isNarrow() ? 0.7 : 1)), () => { el.dataset.flip = 'go'; mark('cal:flip'); }]]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <img className="cl-av" src="/char/avatar.webp" alt="" width={512} height={512} decoding="async" aria-hidden="true" />
      <ol className="cl2 sx-in" ref={rootRef}>
        {rows.map((r) => (
          <li key={r.date} className={r.now ? 'is-now' : ''}>
            <div className="cl-tile" aria-hidden="true">
              <span className="cl-rings"><i /><i /></span>
              <div className="cl-page">
                <span className="cl-m">{r.m}</span>
                <span className="cl-y">{r.y}</span>
              </div>
            </div>
            <div className="cl-body">
              <p className="cl-date">{r.date}</p>
              <h3>{r.title}</h3>
              <p>{r.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </>
  );
}

/* ---------------- İLETİŞİM: phone group chat + calling-card reward ---------------- */
function Contact({ lang }: { lang: Lang }) {
  const c = COPY[lang].contact;
  const [reward, setReward] = useState<'off' | 'flash' | 'splash' | 'fade'>('off');
  const cancel = useRef<() => void>(() => {});
  const end = useCallback(() => { cancel.current(); setReward('off'); mark('reward:end'); }, []);
  useSkippable(reward !== 'off', end);
  useEffect(() => () => cancel.current(), []);

  // Finisher-style reward (GRAMMAR: white flash, hard cut to splash, lettering
  // bottom->top ~170 ms, short hold, the only linear fade): <= 1.2 s.
  const onCard = () => {
    if (reducedMotion()) return; // the mailto link still opens; no splash
    // defer one tick so the click that started it is not caught as a skip
    window.setTimeout(() => {
      setReward('flash'); mark('reward:flash');
      cancel.current = schedule([
        [70, () => { setReward('splash'); mark('reward:splash'); }],
        [900, () => { setReward('fade'); mark('reward:fade'); }],
        [1200, () => { setReward('off'); mark('reward:end'); }],
      ]);
    }, 0);
  };

  const actions: [string, string, boolean][] = [
    [lang === 'tr' ? 'E-POSTA' : 'EMAIL', LINKS.email, false],
    ['GITHUB', LINKS.github, true],
    ['LINKEDIN', LINKS.linkedin, true],
    ['ITCH.IO', LINKS.itch, true],
    ['CV (TR)', LINKS.cvTr, true],
    ['CV (EN)', LINKS.cvEn, true],
  ];

  return (
    <>
      <img className="ct-av-big" src="/char/avatar.webp" alt="" width={512} height={512} decoding="async" aria-hidden="true" />
      <div className="ct-phone2 sx-in">
        <header className="ct-bar">
          <img src="/char/avatar.webp" alt="" width={40} height={40} />
          <div><b>{c.chat}</b><span>{c.sender}</span></div>
        </header>
        <ol className="ct-log">
          <li className="ct-msg2"><span className="ct-who">{c.sender}</span><p>{c.robot}</p></li>
          <li className="ct-msg2 alt"><span className="ct-who">{c.sender}</span><p>{c.pitch}</p></li>
          <li className="ct-actions">
            <ul aria-label={c.others}>
              {actions.map(([label, href, ext]) => (
                <li key={label}><a href={href} {...(ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{label} <span aria-hidden="true">{ext ? '↗' : '✉'}</span></a></li>
              ))}
            </ul>
          </li>
        </ol>
        <a className="ct-card" href={LINKS.email} onClick={onCard}>
          {c.button} <span aria-hidden="true">✉</span>
        </a>
        <p className="ct-mail">{LINKS.emailText}</p>
      </div>
      <p className="ct-foot2">{c.footer}</p>
      {reward !== 'off' && (
        <div className="ct-reward" data-r={reward} aria-hidden="true">
          <img src={isNarrow() ? '/char/finisher-m.webp' : '/char/finisher.webp'} alt="" />
          <div className="ct-reward-letters">{c.reward.split(' ').map((w, i) => <Ransom key={w} text={w} seed={8 + i} className="rn-v" />)}</div>
          <p className="ct-reward-sub">{c.rewardSub}</p>
        </div>
      )}
    </>
  );
}

export function SectionScreen({ id, lang, entry, speed }: { id: Sid; lang: Lang; entry: Entry; speed: number }) {
  const t = COPY[lang];
  const rootRef = useRef<HTMLElement>(null);
  const title = id === 'contact' ? t.contact.title : t[id].title;
  const num = String(SECTION_ORDER.indexOf(id) + 1).padStart(2, '0');

  // Same enter as the submenu: the cover lifts, every block wipes in on one frame.
  useLayoutEffect(() => {
    const root = rootRef.current!;
    const set = (p: string) => { root.dataset.phase = p; mark(`section:${p}`); };
    if (entry === 'instant' || entry === 'return') { set('live'); return; }
    set('pre');
    return schedule([[Math.round(30 * speed), () => set('live')]]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section ref={rootRef} className={`xp-screen xp-sec sx-${id}`} data-phase="live" aria-labelledby="sx-title">
      <div className="sx-bg" aria-hidden="true"><div className="sx-slab" /><span className="sx-num">{num}</span></div>
      <header className="sx-head">
        <h2 id="sx-title" className="sx-title" tabIndex={-1} data-autofocus aria-label={title}>
          <Ransom text={title} seed={num.charCodeAt(1)} />
        </h2>
      </header>
      {id === 'profile' && <Profile lang={lang} />}
      {id === 'confidants' && <Confidants lang={lang} entry={entry} />}
      {id === 'arsenal' && <Arsenal lang={lang} />}
      {id === 'calendar' && <Calendar lang={lang} entry={entry} />}
      {id === 'contact' && <Contact lang={lang} />}
    </section>
  );
}
