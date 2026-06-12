import { useTheme } from '../context/ThemeContext';

export function Profile() {
  const { lang } = useTheme();

  const localizedData = {
    tr: {
      num: '01',
      title: <>PRO<em>FİL</em></>,
      sub: '// SİSTEM MİMARİSİNİN ARKASINDAKİ İSİM',
      p1: <>Ben Burak — Eskişehir'de yaşayan bir yazılım geliştiriciyim. Çalışmalarım yapay zeka araçları geliştirme, arka uç mimarileri ve oyun sistemlerinin kesişim noktasında yer alıyor. Özellikle geliştirici araçları ve yapay zeka destekli üretken sistemler (Python/FastAPI) oluşturma, güçlü arka uç mimarileri (C#/ASP.NET Core) tasarlama ve Unity/Unreal ile oynanış mekanikleri geliştirme konularına odaklanıyorum.</>,
      p2: <>Yazılım geliştirmeye sistem odaklı ve verimlilik odaklı bir düşünce yapısıyla yaklaşıyorum: mimariyi ve sınırları çizer, geliştirme süreçlerini hızlandırmak için yapay zeka araçlarından yararlanır ve otomatize ederim; sonrasında ise her satırı milyonlarca kullanıcıya hizmet veriyormuş gibi denetleyip optimize ederim.</>,
      calloutQ: '"Sınırları çiz. Sistemi optimize et. Çözümleri teslim et."',
      calloutA: '// ANA METODOLOJİM',
      stats: [
        { n: '10+', l: 'Yayında ve devam eden proje' },
        { n: '5', l: 'Aktif kullanılan programlama dili' },
        { n: '48s', l: 'Game Jam — oynanabilir sürüm teslimi' },
        { n: '100+', l: 'Ana projede commit sayısı' }
      ]
    },
    en: {
      num: '01',
      title: <>PRO<em>FILE</em></>,
      sub: '// BEHIND THE SYSTEM ARCHITECTURE',
      p1: <>I'm Burak — a software engineer based in Eskişehir, TR. My focus lies at the intersection of AI tool development, backend architectures, and gameplay systems. I specialize in building developer tools, AI-powered systems (Python/FastAPI), designing robust backends (C#/ASP.NET Core), and crafting gameplay systems in Unity and Unreal.</>,
      p2: <>I approach software development with a systems-thinking and efficiency-driven mindset: defining architecture and constraints, leveraging AI tools to automate and accelerate workflows, and auditing and optimizing every line as if it were serving millions.</>,
      calloutQ: '"Architect the boundaries. Optimize the code. Ship the systems."',
      calloutA: '// MY CORE METHODOLOGY',
      stats: [
        { n: '10+', l: 'Shipped & ongoing projects' },
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
