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
      p1: <>Ben Burak. Eskişehir'de yaşıyorum. Oyunlarla başladım, arkalarındaki sistemler beni daha çok tuttu. Bugün iki alanda çalışıyorum: <b>Unity ve C# ile oyun</b>, <b>Python ve TypeScript <InlinePointer /> ile yapay zeka ajanlarını çalıştıran araçlar</b>.</>,
      p2: <>Mimariyi ben kurarım, sınırları ben çizerim, kodun büyük kısmını ajanlara yazdırırım. Çıkan işi aracın raporuna göre değil, dışarıda bıraktığı ize göre doğrularım: testi koştururum, dosyayı açarım, git geçmişini okurum. <b>Gamachine</b> yedi kodlama ajanını tek arayüzde topluyor; <b>Context Police</b> o ajanların hafızasını denetleyip bayatlamış notları buluyor.</>,
      calloutQ: '"Doğrulamayı rapordan değil, izden yap."',
      calloutA: '// ÇALIŞMA İLKEM',
      stats: [
        { n: '330+', l: "Gamachine'de commit" },
        { n: '7', l: 'Tek arayüzde birleşen AI kodlama ajanı' },
        { n: '3', l: 'Yayında açık kaynak geliştirici aracı' },
        { n: '2', l: 'Masaüstü uygulaması — Electron ve Tauri' }
      ]
    },
    en: {
      num: '01',
      title: <>PRO<em>FILE</em></>,
      sub: '// BEHIND THE SYSTEM ARCHITECTURE',
      p1: <>I'm Burak, a developer based in Eskişehir. Games came first; the systems behind them held me longer. I work in two areas today: <b>games in Unity and C#</b>, and <b>tooling that keeps AI agents <InlinePointer /> dependable, in Python and TypeScript</b>.</>,
      p2: <>I set the architecture and the constraints, then hand most of the typing to agents. I judge the result by the trace it leaves rather than the report it writes: I run the tests, open the files, read the git log. <b>Gamachine</b> brings seven coding agents into one interface; <b>Context Police</b> audits what those agents remember and finds the notes that went stale.</>,
      calloutQ: '"Verify from the trace, not the report."',
      calloutA: '// HOW I WORK',
      stats: [
        { n: '330+', l: 'Commits on Gamachine' },
        { n: '7', l: 'AI coding agents in one interface' },
        { n: '3', l: 'Open-source developer tools shipped' },
        { n: '2', l: 'Desktop apps — Electron and Tauri' }
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
