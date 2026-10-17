import { useTheme } from '../context/ThemeContext';
import { COPY } from '../experience/copy';

export function Projects() {
  const { lang } = useTheme();
  const t = COPY[lang];

  const localizedData = {
    tr: {
      sub: '// SEÇİLMİŞ ÇALIŞMALAR',
      title: <>MİS<em>YONLAR</em></>
    },
    en: {
      sub: '// SELECTED WORKS',
      title: <>MISS<em>IONS</em></>
    }
  };

  const labels = localizedData[lang];

  return (
    <section className="sec missions halftone" id="missions">
      <div className="sec-head">
        <span className="sec-num rv">03</span>
        <h2 className="sec-title rv">{labels.title}</h2>
        <span className="sec-sub rv">{labels.sub}</span>
      </div>
      <div className="mission-list">
        {t.missions.list.map((mission, idx) => {
          const paddedNum = String(idx + 1).padStart(2, '0');
          return (
            <article key={mission.id} className="mission rv">
              <span className="m-num">{paddedNum}</span>
              <div className="m-body">
                <div className="m-kind">{mission.kind}</div>
                <h3>{mission.title}</h3>
                <p>{mission.text}</p>
                {mission.status && <p className="m-status">{mission.status}</p>}
                {mission.tech && (
                  <div className="m-tags">
                    {mission.tech.map((tech) => (
                      <span key={tech}>{tech}</span>
                    ))}
                  </div>
                )}
              </div>
              <div className="m-links">
                {mission.links.map((link) => (
                  <a key={link.href} className="m-cta" href={link.href} target="_blank" rel="noopener noreferrer" data-hover>
                    {link.label}
                  </a>
                ))}
              </div>
            </article>
          );
        })}
      </div>
      <div className="open-source">
        <h3>{t.confidants.title}</h3>
        <p>{t.confidants.intro}</p>
        {t.confidants.repos.map((repo) => (
          <article key={repo.repo} className="open-source-repo">
            <h4>
              <a href={repo.url} target="_blank" rel="noopener noreferrer" data-hover>{repo.repo}</a>
              <span className="open-source-rank">{repo.rank}</span>
            </h4>
            <ul>
              {repo.prs.map((pr) => (
                <li key={pr.n}>
                  <a href={pr.url} target="_blank" rel="noopener noreferrer" data-hover>
                    {pr.n} · {pr.text.replace(/`([^`]+)`/g, '$1')}
                  </a>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
