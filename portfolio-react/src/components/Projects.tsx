import { useTheme } from '../context/ThemeContext';
import { content } from '../data/content';

export function Projects() {
  const { lang } = useTheme();
  const t = content[lang];

  const localizedData = {
    tr: {
      sub: '// SEÇİLMİŞ ÇALIŞMALAR',
      title: <>MİS<em>YONLAR</em></>,
      ctaPlay: 'Oyna →',
      ctaLive: 'Canlı Gör →',
      ctaCode: 'Kodu Gör →',
      ctaCase: 'Projeyi Gör →'
    },
    en: {
      sub: '// SELECTED WORKS',
      title: <>MISS<em>IONS</em></>,
      ctaPlay: 'Play It →',
      ctaLive: 'View Live →',
      ctaCode: 'View Code →',
      ctaCase: 'View Case →'
    }
  };

  const labels = localizedData[lang];

  // Helper to determine custom CTA button label
  const getCtaLabel = (title: string) => {
    const key = title.toLowerCase();
    if (key.includes('workday')) return labels.ctaPlay;
    if (key.includes('ristorante')) return labels.ctaLive;
    if (key.includes('architect')) return labels.ctaCase;
    return labels.ctaCode;
  };

  return (
    <section className="sec missions halftone" id="missions">
      <div className="sec-head">
        <span className="sec-num rv">03</span>
        <h2 className="sec-title rv">{labels.title}</h2>
        <span className="sec-sub rv">{labels.sub}</span>
      </div>
      <div className="mission-list">
        {t.projects.map((project, idx) => {
          const paddedNum = String(idx + 1).padStart(2, '0');
          return (
            <a
              key={project.title}
              className="mission rv"
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              data-hover
            >
              <span className="m-num">{paddedNum}</span>
              <div className="m-body">
                <div className="m-kind">{project.tag}</div>
                <h3>{project.title}</h3>
                <p>{project.brief}</p>
                <div className="m-tags">
                  {project.tech.map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>
              </div>
              <span className="m-cta">{getCtaLabel(project.title)}</span>
            </a>
          );
        })}
      </div>
    </section>
  );
}
