import { useLayoutEffect, useRef } from 'react';
import { Ransom } from './Ransom';
import { isNarrow, mark, schedule, warm } from './motion';

// Intro beat sheet, scaled from the measured AOA finisher (GRAMMAR "Finisher
// sequence") into the site's 2.5 s budget. Steps are hard cuts on purpose.
const INTRO_STEPS: [number, string][] = [
  [0, 'ink'],       // ink cover grows white->red (game: 30-260)
  [260, 'glass'],   // cracked red glass, plain pieces
  [700, 'shards'],  // all media shards appear in ONE frame (game: 1110)
  [770, 'glint'],   // diagonal white glint, 70 ms (game: 1180-1250)
  [840, 'hold'],
  [1330, 'black'],  // cut to black
  [1396, 'ghost'],  // 2-frame grey ghost of the splash
  [1463, 'splash'], // hard cut to full colour, lettering reveals bottom->top
];
const INTRO_END = 2330;

// Glass layout: polygons in % of the viewport; media shards carry our own frames.
const SHARDS: { img?: string; pos: string; clip: string }[] = [
  { img: '/media/gamachine-still.webp', pos: 'left:6%;top:9%;width:44%;height:46%', clip: 'polygon(8% 0,100% 14%,86% 100%,0 78%)' },
  { img: '/char/avatar.webp', pos: 'left:55%;top:4%;width:30%;height:52%', clip: 'polygon(14% 4%,96% 0,100% 88%,0 100%)' },
  { img: '/media/kagit-1.webp', pos: 'left:14%;top:56%;width:40%;height:38%', clip: 'polygon(0 10%,92% 0,100% 100%,10% 86%)' },
  { img: '/media/kagit-2.webp', pos: 'left:58%;top:58%;width:36%;height:36%', clip: 'polygon(6% 0,100% 18%,94% 100%,0 92%)' },
  { pos: 'left:44%;top:30%;width:18%;height:34%', clip: 'polygon(30% 0,100% 40%,60% 100%,0 70%)' },
  { pos: 'left:0%;top:44%;width:16%;height:24%', clip: 'polygon(0 0,100% 30%,70% 100%,0 80%)' },
  { pos: 'left:84%;top:40%;width:16%;height:26%', clip: 'polygon(40% 0,100% 0,100% 100%,0 60%)' },
];

const toStyle = (s: string): React.CSSProperties =>
  Object.fromEntries(s.split(';').map((kv) => kv.split(':'))) as React.CSSProperties;

export function Intro({ onDone }: { onDone: () => void }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const doneRef = useRef(onDone);
  useLayoutEffect(() => { doneRef.current = onDone; });

  useLayoutEffect(() => {
    const root = rootRef.current!;
    const n = isNarrow();
    warm([n ? '/char/finisher-m.webp' : '/char/finisher.webp', ...SHARDS.flatMap((x) => (x.img ? [x.img] : [])), n ? '/char/menu-m.webp' : '/char/menu.webp']);
    mark('intro:start');
    return schedule([
      ...INTRO_STEPS.map(([ms, p]) => [ms, () => { root.dataset.phase = p; mark(`intro:${p}`); }] as [number, () => void]),
      [INTRO_END, () => { mark('intro:end'); doneRef.current(); }],
    ]);
  }, []);

  return (
    <div ref={rootRef} className="xp-intro" data-phase="ink" aria-hidden="true">
      <div className="in-ink" />
      <div className="in-glass">
        <svg className="in-cracks" viewBox="0 0 100 100" preserveAspectRatio="none">
          {[[0, 8], [22, 0], [48, 0], [80, 0], [100, 20], [100, 62], [86, 100], [52, 100], [20, 100], [0, 70], [0, 40]].map(([x, y], i) => (
            <line key={i} x1="52" y1="48" x2={x} y2={y} />
          ))}
          <polyline points="38,38 52,30 66,40 64,58 48,66 36,56 38,38" />
          <polyline points="24,28 52,16 80,30 82,66 52,82 22,70 24,28" />
        </svg>
        {SHARDS.map((s, i) => (
          <div key={i} className={`in-shard${s.img ? '' : ' plain'}`} style={{ ...toStyle(s.pos), clipPath: s.clip }}>
            {s.img && <img src={s.img} alt="" decoding="async" />}
          </div>
        ))}
        <div className="in-glint" />
      </div>
      <div className="in-splash">
        <picture>
          <source media="(max-width: 700px)" srcSet="/char/finisher-m.webp" />
          <img src="/char/finisher.webp" alt="" width={1536} height={1024} decoding="async" />
        </picture>
        <div className="in-letters">
          <Ransom text="BURAK" seed={5} className="rn-v" />
          <Ransom text="ERDEMCI" seed={9} className="rn-v" />
        </div>
      </div>
    </div>
  );
}
