import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { COPY, LINKS, SECTION_ORDER, type SectionId } from './copy';
import { MenuScreen, type Entry } from './MenuScreen';
import { MissionsScreen } from './MissionsScreen';
import { SectionScreen } from './SectionScreen';
import { Intro } from './Intro';
import { mark, reducedMotion, schedule } from './motion';
import './experience.css';

type Screen = 'intro' | 'menu' | SectionId;
const INTRO_KEY = 'xp-intro-seen';

function routeFromHash(): SectionId | null {
  const m = window.location.hash.match(/^#\/([a-z]+)/);
  return m && (SECTION_ORDER as string[]).includes(m[1]) ? (m[1] as SectionId) : null;
}

function seenIntro() {
  try { return sessionStorage.getItem(INTRO_KEY) === '1'; } catch { return true; }
}

export function Experience() {
  const { lang, toggleLang } = useTheme();
  const t = COPY[lang];
  const reduced = reducedMotion();
  // Mobile gets the same transitions, shortened (brief: "the same transitions shortened").
  const speed = typeof window !== 'undefined' && window.innerWidth <= 700 ? 0.7 : 1;

  const [screen, setScreen] = useState<Screen>(() => {
    const r = routeFromHash();
    if (r) return r;
    return reduced || seenIntro() ? 'menu' : 'intro';
  });
  const [entry, setEntry] = useState<Entry>(() => (reduced ? 'instant' : routeFromHash() ? 'enter' : 'open'));
  const [menuSel, setMenuSel] = useState(() => Math.max(0, SECTION_ORDER.indexOf(routeFromHash() ?? 'profile')));
  const [missionSel, setMissionSel] = useState(0);
  const [announce, setAnnounce] = useState('');

  const stageRef = useRef<HTMLDivElement>(null);
  const wedgeRef = useRef<HTMLDivElement>(null);
  const darkRef = useRef<HTMLDivElement>(null);
  const busy = useRef(false);
  const cancel = useRef<() => void>(() => {});
  const focusAfter = useRef<'screen' | 'menu' | null>(null);

  const go = useCallback((s: Screen, e: Entry) => {
    setEntry(e);
    setScreen(s);
    const hash = s === 'menu' || s === 'intro' ? ' ' : `#/${s}`;
    history.replaceState(null, '', hash === ' ' ? window.location.pathname + window.location.search : hash);
  }, []);

  const finishIntro = useCallback(() => {
    try { sessionStorage.setItem(INTRO_KEY, '1'); } catch { /* storage blocked: intro may replay, harmless */ }
    focusAfter.current = 'menu';
    go('menu', 'open');
  }, [go]);

  // Submenu transition (GRAMMAR "Submenu", <= 700 ms): confirm flash -> items
  // vanish -> full-screen wedge from the right -> swap under the cover -> wipe out.
  const openSection = useCallback((id: SectionId) => {
    if (busy.current) return;
    setMenuSel(SECTION_ORDER.indexOf(id));
    focusAfter.current = 'screen';
    setAnnounce(t.sr.opened(t.items[id].label));
    if (reduced) { go(id, 'instant'); return; }
    busy.current = true;
    const k = speed;
    const menu = stageRef.current?.querySelector<HTMLElement>('.xp-menu');
    const wedge = wedgeRef.current!;
    mark('enter:start');
    if (menu) menu.dataset.phase = 'confirm';
    cancel.current = schedule([
      [Math.round(100 * k), () => { if (menu) menu.dataset.phase = 'gone'; }],
      [Math.round(200 * k), () => {
        mark('enter:cover');
        // One animation for cover-in, hold and wipe-out: created before the swap,
        // it keeps running on the compositor while React mounts the new screen.
        // (Measured: a separate wipe-out started at the swap waited ~130 ms for
        // the new screen's first paint.)
        wedge.animate(
          [
            { transform: 'translateX(100vw)', offset: 0 },
            { transform: 'translateX(-50vw)', offset: 100 / 300 },
            { transform: 'translateX(-50vw)', offset: 130 / 300 },
            { transform: 'translateX(-210vw)', offset: 1 },
          ],
          { duration: Math.round(300 * k), easing: 'linear', fill: 'forwards' },
        );
      }],
      [Math.round(300 * k), () => { mark('enter:swap'); go(id, 'enter'); }],
      [Math.round(700 * k), () => { busy.current = false; mark('enter:done'); }],
    ]);
  }, [go, reduced, speed, t]);

  // Close (GRAMMAR "Close", ~500 ms): dark wedge from the top-left covers, swap,
  // then it leaves with a torn red edge sweeping lower-left -> right.
  const closeToMenu = useCallback(() => {
    if (busy.current || screen === 'menu' || screen === 'intro') return;
    focusAfter.current = 'menu';
    setAnnounce(t.sr.menu);
    if (reduced) { go('menu', 'instant'); return; }
    busy.current = true;
    const k = speed;
    const dark = darkRef.current!;
    mark('close:start');
    dark.animate(
      [
        { transform: 'translateX(-210vw)', offset: 0, easing: 'cubic-bezier(.6,0,.9,.6)' },
        { transform: 'translateX(-50vw)', offset: 300 / 470 },
        { transform: 'translateX(-50vw)', offset: 370 / 470 },
        { transform: 'translateX(110vw)', offset: 1 },
      ],
      { duration: Math.round(470 * k), fill: 'forwards' },
    );
    cancel.current = schedule([
      [Math.round(300 * k), () => { mark('close:swap'); go('menu', 'return'); }],
      [Math.round(470 * k), () => { busy.current = false; mark('close:done'); }],
    ]);
  }, [go, reduced, screen, speed, t]);

  useEffect(() => () => cancel.current(), []);

  // Focus follows the screen so keyboard and screen-reader users land inside it.
  useLayoutEffect(() => {
    const st = stageRef.current;
    if (!st || !focusAfter.current) return;
    if (focusAfter.current === 'menu') st.querySelector<HTMLElement>('.mi.is-sel')?.focus({ preventScroll: true });
    else st.querySelector<HTMLElement>('[data-autofocus]')?.focus({ preventScroll: true });
    focusAfter.current = null;
  }, [screen]);

  // Global keys: any key skips the intro; Esc returns to the menu from anywhere.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (screen === 'intro') {
        if (e.key === 'Tab') return; // let keyboard users reach the skip / plain-view controls
        e.preventDefault();
        finishIntro();
        return;
      }
      if (e.key === 'Escape') { e.preventDefault(); closeToMenu(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [screen, finishIntro, closeToMenu]);

  // Back/forward or a pasted #/section link while the experience is open.
  useEffect(() => {
    const onHash = () => {
      const r = routeFromHash();
      if (r && r !== screen) { setMenuSel(SECTION_ORDER.indexOf(r)); go(r, reduced ? 'instant' : 'enter'); }
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, [screen, go, reduced]);

  useEffect(() => {
    document.title = screen === 'menu' || screen === 'intro'
      ? 'BURAK ERDEMCI'
      : `${t.items[screen].label} · BURAK ERDEMCI`;
  }, [screen, t]);

  const inSection = screen !== 'menu' && screen !== 'intro';

  return (
    <div className={`xp${reduced ? ' xp-reduced' : ''}`} data-screen={screen} ref={stageRef}>
      <a className="xp-skiplink" href="#plain">{t.hud.plainAria}</a>

      <main className="xp-stage" onPointerDown={screen === 'intro' ? finishIntro : undefined}>
        {screen === 'intro' && <Intro onDone={finishIntro} />}
        {screen === 'menu' && (
          <MenuScreen lang={lang} sel={menuSel} setSel={setMenuSel} entry={entry} speed={speed} onOpen={openSection} />
        )}
        {screen === 'missions' && (
          <MissionsScreen lang={lang} entry={entry} speed={speed} sel={missionSel} setSel={setMissionSel} />
        )}
        {inSection && screen !== 'missions' && (
          <SectionScreen key={screen} id={screen} lang={lang} entry={entry} speed={speed} />
        )}
      </main>

      <div className="xp-cover" aria-hidden="true">
        <div className="cv-wedge" ref={wedgeRef}><div className="cv-wedge-r" /></div>
        <div className="cv-dark" ref={darkRef}><div className="cv-torn" /></div>
      </div>

      <header className="xp-hud">
        {inSection && (
          <button type="button" className="hud-btn hud-menu" onClick={closeToMenu}>
            <span aria-hidden="true">◂ </span>{t.hud.menu}<kbd aria-hidden="true">ESC</kbd>
          </button>
        )}
        {screen === 'intro' && (
          <button type="button" className="hud-btn hud-skip" onClick={finishIntro}>{t.hud.skip} <span aria-hidden="true">▸▸</span></button>
        )}
        <nav className="hud-right" aria-label={t.hud.quick}>
          <a className="tag tag-cv" href={lang === 'tr' ? LINKS.cvTr : LINKS.cvEn} target="_blank" rel="noopener noreferrer" aria-label={t.hud.cvAria}>
            CV <span aria-hidden="true">↓</span>
          </a>
          <a className="tag tag-plain" href="#plain" aria-label={t.hud.plainAria}>{t.hud.plain}</a>
          <div className="tag tag-lang" role="group" aria-label={t.hud.langGroup}>
            {(['tr', 'en'] as const).map((l) => (
              <button key={l} type="button" lang={l} aria-pressed={lang === l}
                className={lang === l ? 'is-on' : ''}
                onClick={() => { if (lang !== l) toggleLang(); }}>
                {l.toUpperCase()}
              </button>
            ))}
          </div>
        </nav>
      </header>

      <p className="vh" aria-live="polite">{announce}</p>
    </div>
  );
}
