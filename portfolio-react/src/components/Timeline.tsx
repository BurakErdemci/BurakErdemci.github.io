import { useTheme } from '../context/ThemeContext';
import { content } from '../data/content';

export function Timeline() {
  const { lang } = useTheme();
  const t = content[lang];

  const localizedData = {
    tr: {
      title: <>YOL<em>CULUK</em></>,
      sub: '// DENEYİM & EĞİTİM'
    },
    en: {
      title: <>JOUR<em>NEY</em></>,
      sub: '// EXPERIENCE & EDUCATION'
    }
  };

  const labels = localizedData[lang];

  return (
    <section className="sec timeline halftone" id="timeline">
      <div className="sec-head">
        <span className="sec-num rv">04</span>
        <h2 className="sec-title rv">{labels.title}</h2>
        <span className="sec-sub rv">{labels.sub}</span>
      </div>
      <div className="mission-list">
        {t.timeline.map((item, idx) => (
          <div
            key={idx}
            className="mission rv"
            style={{
              gridTemplateColumns: 'auto 1fr',
              cursor: 'default'
            }}
          >
            <span
              className="m-num"
              style={{
                fontSize: 'clamp(20px, 2.5vw, 32px)',
                minWidth: '150px',
                display: 'inline-block',
                alignSelf: 'start',
                marginTop: '4px'
              }}
            >
              {item.date}
            </span>
            <div className="m-body">
              <div className="m-kind">{item.subtitle}</div>
              <h3 style={{ fontSize: 'clamp(22px, 2.8vw, 36px)' }}>{item.title}</h3>
              <p style={{ marginTop: '8px' }}>{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
