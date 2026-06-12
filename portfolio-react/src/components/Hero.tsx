import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useTheme } from '../context/ThemeContext';
import { initStorm } from '../modules/storm';

export function Hero() {
  const { lang } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const cleanup = initStorm(canvasRef.current);
      return cleanup;
    }
  }, []);

  const finePointer = typeof window !== 'undefined' && window.matchMedia('(hover:hover) and (pointer:fine)').matches;

  const handleMouseEnter = (e: React.MouseEvent<HTMLSpanElement>) => {
    if (!finePointer) return;
    gsap.to(e.currentTarget, {
      rotate: '+=8',
      scale: 1.12,
      duration: 0.18,
      ease: 'power2.out',
      yoyo: true,
      repeat: 1
    });
  };

  const renderRansomText = (text: string, liOffset: number) => {
    const styles = ['s1', 's1', 's2', 's1', 's3', 's1', 's4', 's1'];
    const rots = [-5, 3, -2, 6, -7, 2, 4, -3, 5, -4, 2, -6];
    return [...text].map((ch, i) => {
      const styleClass = styles[(i * 3 + liOffset * 5 + (ch.charCodeAt(0) % 4)) % styles.length];
      const rotVal = rots[(i + liOffset * 4) % rots.length];
      return (
        <span
          key={i}
          className={`rl ${styleClass}`}
          data-rot={rotVal}
          onMouseEnter={handleMouseEnter}
          style={{ transform: `rotate(${rotVal * 0.55}deg)` }}
        >
          {ch}
        </span>
      );
    });
  };

  const localizedData = {
    tr: {
      codename: '// OYUN & FULL-STACK GELİŞTİRİCİ',
      roleChipRed: 'dünyalar inşa ederim',
      roleChipWht: '& arkalarındaki sistemleri',
      loc: <>KONUM // <b>ESKİŞEHİR, TR</b> — UZAKTAN ÇALIŞMAYA &amp; RELOKASYONA AÇIK</>
    },
    en: {
      codename: '// GAME & FULL-STACK DEVELOPER',
      roleChipRed: 'I build worlds',
      roleChipWht: '& the systems behind them',
      loc: <>LOC // <b>ESKİŞEHİR, TR</b> — OPEN TO REMOTE &amp; RELOCATION</>
    }
  };

  const heroData = localizedData[lang];

  return (
    <section className="hero" id="hero">
      <canvas ref={canvasRef} id="storm" aria-hidden="true"></canvas>
      <div className="hero-inner">
        <span className="codename rv">{heroData.codename}</span>
        <h1 id="heroName" aria-label="Burak Erdemci">
          <span className="ln" data-text="BURAK">
            {renderRansomText('BURAK', 0)}
          </span>
          <span className="ln" data-text="ERDEMCI">
            {renderRansomText('ERDEMCI', 1)}
          </span>
        </h1>
        <div className="role rv">
          <span className="role-chip r">{heroData.roleChipRed}</span>
          <span className="role-chip w">{heroData.roleChipWht}</span>
        </div>
        <p className="loc rv">{heroData.loc}</p>
      </div>
      <div className="hero-scroll">
        <span>{lang === 'tr' ? 'KAYDIR' : 'SCROLL'}</span>
        <div className="stem"></div>
      </div>
    </section>
  );
}
