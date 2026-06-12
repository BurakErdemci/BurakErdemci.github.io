import { useTheme } from '../context/ThemeContext';

export function Arsenal() {
  const { lang } = useTheme();

  const localizedData = {
    tr: {
      title: <>YETENEK<em>LER</em></>,
      sub: '// SEKTÖRÜN ARAÇLARI',
      groups: [
        {
          title: 'Oyun Geliştirme',
          tags: [
            { name: 'Unity 6', hot: true },
            { name: 'C#', hot: true },
            { name: 'Unreal Engine 5', hot: false },
            { name: 'URP / 2D', hot: false },
            { name: 'Oynanış Sistemleri', hot: false },
            { name: 'Game Jams', hot: false }
          ]
        },
        {
          title: 'Arka Uç',
          tags: [
            { name: 'ASP.NET Core', hot: true },
            { name: 'Python', hot: true },
            { name: 'FastAPI', hot: false },
            { name: 'REST APIs', hot: false },
            { name: 'MSSQL', hot: false },
            { name: 'PostgreSQL', hot: false },
            { name: 'MongoDB', hot: false }
          ]
        },
        {
          title: 'Web Ön Yüz',
          tags: [
            { name: 'TypeScript', hot: true },
            { name: 'Next.js', hot: true },
            { name: 'React', hot: false },
            { name: 'Three.js', hot: false },
            { name: 'GSAP', hot: false },
            { name: 'Tailwind', hot: false },
            { name: 'PWA', hot: false }
          ]
        },
        {
          title: 'AI Orkestrasyonu',
          tags: [
            { name: 'Çok Ajanlı Sistemler', hot: true },
            { name: 'Claude Code', hot: false },
            { name: 'LLM APIs', hot: false },
            { name: 'RAG / FAISS', hot: false },
            { name: 'MCP', hot: false },
            { name: 'Electron', hot: false }
          ]
        }
      ]
    },
    en: {
      title: <>ARSE<em>NAL</em></>,
      sub: '// TOOLS OF THE TRADE',
      groups: [
        {
          title: 'Game Dev',
          tags: [
            { name: 'Unity 6', hot: true },
            { name: 'C#', hot: true },
            { name: 'Unreal Engine 5', hot: false },
            { name: 'URP / 2D', hot: false },
            { name: 'Gameplay Systems', hot: false },
            { name: 'Game Jams', hot: false }
          ]
        },
        {
          title: 'Backend',
          tags: [
            { name: 'ASP.NET Core', hot: true },
            { name: 'Python', hot: true },
            { name: 'FastAPI', hot: false },
            { name: 'REST APIs', hot: false },
            { name: 'MSSQL', hot: false },
            { name: 'PostgreSQL', hot: false },
            { name: 'MongoDB', hot: false }
          ]
        },
        {
          title: 'Web',
          tags: [
            { name: 'TypeScript', hot: true },
            { name: 'Next.js', hot: true },
            { name: 'React', hot: false },
            { name: 'Three.js', hot: false },
            { name: 'GSAP', hot: false },
            { name: 'Tailwind', hot: false },
            { name: 'PWA', hot: false }
          ]
        },
        {
          title: 'AI Orchestration',
          tags: [
            { name: 'Multi-Agent Pipelines', hot: true },
            { name: 'Claude Code', hot: false },
            { name: 'LLM APIs', hot: false },
            { name: 'RAG / FAISS', hot: false },
            { name: 'MCP', hot: false },
            { name: 'Electron', hot: false }
          ]
        }
      ]
    }
  };

  const data = localizedData[lang];

  return (
    <section className="sec arsenal halftone-w halftone" id="arsenal">
      <div className="sec-head">
        <span className="sec-num rv">02</span>
        <h2 className="sec-title rv">{data.title}</h2>
        <span className="sec-sub rv">{data.sub}</span>
      </div>
      <div className="ars-groups">
        {data.groups.map((g, idx) => (
          <div key={idx} className="ars-g rv">
            <span className="gt">{g.title}</span>
            <div className="ars-tags">
              {g.tags.map((t, tIdx) => (
                <span key={tIdx} className={`tag ${t.hot ? 'hot' : ''}`}>
                  {t.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
