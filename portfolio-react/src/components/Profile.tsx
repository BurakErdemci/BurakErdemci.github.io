import { useTheme } from '../context/ThemeContext';

const InlinePointer = () => (
  <span className="inline-pointer" aria-hidden="true">
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
      <polygon points="12,3 21,12 12,21 3,12" stroke="var(--red)" strokeWidth="2" fill="var(--wht)" />
      <path d="M10,8 L10,16 L12.5,13.5 L15,18.5 L16.5,17.7 L14,12.7 L17,12.7 Z" fill="var(--wht)" stroke="var(--red)" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  </span>
);

export function Profile() {
  const { lang } = useTheme();

  const localizedData = {
    tr: {
      num: '01',
      title: <>PRO<em>FİL</em></>,
      sub: '// SİSTEM MİMARİSİNİN ARKASINDAKİ İSİM',
      p1: <>Ben Burak — Eskişehir'de yaşayan bir geliştiriciyim; önce oyunlara, ardından onların arkasındaki yapay zeka ve sistem mekanizmalarına merak sardım. Ağırlıklı olarak oyun ve yapay zeka (AI) geliştirme alanlarında çalışıyorum: <b>Unity ve Unreal ile oynanış</b>, <b>Python ve FastAPI ile yapay zeka araçları</b>, ve <b>web ön yüzleri <InlinePointer /> ve TypeScript ile Next.js</b>.</>,
      p2: <>Çalışma tarzım basit: mimariyi tasarlar, sınırları belirler ve uygulamanın hızlanması için yapay zeka araçlarını yönetirim — sonrasında ise her şeyi sanki bir milyon oyuncuya sunulmuş gibi gözden geçiririm. Daha az kod yazımı, daha çok <b>sistem düşüncesi</b>.</>,
      calloutQ: '"Sınırları çiz. Sistemi optimize et. Çözümleri teslim et."',
      calloutA: '// ANA METODOLOJİM',
      stats: [
        { n: '5+', l: 'Yayında ve devam eden proje' },
        { n: '5', l: 'Aktif kullanılan programlama dili' },
        { n: '48s', l: 'Game Jam — oynanabilir sürüm teslimi' },
        { n: '100+', l: 'Ana projede commit sayısı' }
      ]
    },
    en: {
      num: '01',
      title: <>PRO<em>FILE</em></>,
      sub: '// BEHIND THE SYSTEM ARCHITECTURE',
      p1: <>I'm Burak — a developer from Eskişehir who fell for games first and the AI and system mechanics behind them second. I focus primarily on game development and artificial intelligence (AI) systems: <b>gameplay in Unity and Unreal</b>, <b>AI tools in Python and FastAPI</b>, and <b>web frontends <InlinePointer /> in TypeScript and Next.js</b>.</>,
      p2: <>My working style is simple: I design the architecture, set the constraints, and orchestrate AI agents to move fast on implementation — then review everything like it shipped to a million players. Less typing, more <b>system thinking</b>.</>,
      calloutQ: '"Architect the boundaries. Optimize the code. Ship the systems."',
      calloutA: '// MY CORE METHODOLOGY',
      stats: [
        { n: '5+', l: 'Shipped & ongoing projects' },
        { n: '5', l: 'Languages in production use' },
        { n: '48h', l: 'Game jam — playable build shipped' },
        { n: '100+', l: 'Commits on flagship project' }
      ]
    }
  };

  const data = localizedData[lang];

  return (
    <section className="sec profile halftone" id="profile">
      <div className="sec-head">
        <span className="sec-num rv">{data.num}</span>
        <h2 className="sec-title rv">{data.title}</h2>
        <span className="sec-sub rv">{data.sub}</span>
      </div>
      <div className="profile-grid">
        <div>
          <p className="rv">{data.p1}</p>
          <p className="rv">{data.p2}</p>
          <div className="callout rv">
            <div className="q">{data.calloutQ}</div>
            <div className="a">{data.calloutA}</div>
          </div>
        </div>
        <div className="stat-stack">
          {data.stats.map((st, idx) => (
            <div key={idx} className="stat rv">
              <span className="n">{st.n}</span>
              <span className="l">{st.l}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
