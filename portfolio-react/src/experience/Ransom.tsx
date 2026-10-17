import { memo } from 'react';

// Ransom-note lettering (the Hero's .rl approach, extended with mixed typefaces).
// Letter styles and tilts are deterministic per text+seed so the word does not
// reshuffle between renders. Letters are aria-hidden; the parent carries the label.
const STYLES = ['k1', 'k1', 'k2', 'k1', 'k3', 'k5', 'k1', 'k4', 'k6', 'k1', 'k3', 'k2'];
const ROTS = [-6, 4, -2, 7, -8, 3, 5, -4, 6, -5, 2, -7];

function hash(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return h >>> 0;
}

export const Ransom = memo(function Ransom({ text, seed = 0, className = '' }: { text: string; seed?: number; className?: string }) {
  const base = hash(text) + seed * 7;
  // Letters are grouped per word: atomic inline letters would otherwise allow a
  // line break between any two of them.
  const words: { ch: string; i: number }[][] = [[]];
  [...text].forEach((ch, i) => (ch === ' ' ? words.push([]) : words[words.length - 1].push({ ch, i })));
  return (
    <span className={`rn ${className}`} aria-hidden="true">
      {words.map((w, wi) => (
        <span key={wi} className="rn-w">
          {wi > 0 && <span className="rn-sp"> </span>}
          {w.map(({ ch, i }) => {
            const st = STYLES[(base + i * 5 + ch.charCodeAt(0)) % STYLES.length];
            const rot = ROTS[(base + i * 3) % ROTS.length];
            const lift = ((base >> (i % 16)) & 3) - 1.5;
            return (
              <span key={i} className={`rl2 ${st}`} style={{ transform: `rotate(${rot * 0.7}deg) translateY(${lift * 0.03}em)` }}>
                {ch}
              </span>
            );
          })}
        </span>
      ))}
    </span>
  );
});
