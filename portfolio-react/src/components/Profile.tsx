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
      p1: <>Ben Burak, Eskişehir'de yaşıyorum. Gemi makineleri okurken koda hiç dokunmamıştım. Bölümle yıldızım barışamayınca 2024'ün sonunda <b>Unity'yi açtım</b> ve bir daha kapatmadım. 2024'te gemi makinelerini bıraktım, 2025'te yatay geçişle Eskişehir'e geldim. Şimdi ESTÜ'de Bilgisayar Programcılığı son sınıftayım, Haziran 2027'de mezun oluyorum.</>,
      p2: <>İki işim var. <b>Unity ve C# ile oyun</b> yapıyorum; <b>Python ve TypeScript <InlinePointer /> ile yapay zeka ajanlarının kullandığı araçları</b> yazıyorum. Mimariyi ben kuruyorum, kodu ajanlar yazıyor. Her işi ikinci bir ajan, ilkinin raporunu görmeden baştan denetliyor. Bulgu çıkarsa düzeltme de aynı denetimden geçiyor; sıfır bulgu gelmeden hiçbir şey yayına çıkmıyor.</>,
      calloutQ: 'YAZ → KÖR DENETİM → DÜZELT → TEKRAR DENETLE',
      calloutA: '// ÇALIŞMA DÜZENİM',
      stats: [
        { n: '4', l: "Birleştirilen açık kaynak PR'ı" },
        { n: '0', l: "Kâğıt Kart'taki asset dosyası" },
        { n: '2', l: 'Alan: oyun ve ajan araçları' },
        { n: '2027', l: 'Mezuniyet' }
      ]
    },
    en: {
      num: '01',
      title: <>PRO<em>FILE</em></>,
      sub: '// BEHIND THE SYSTEM ARCHITECTURE',
      p1: <>I'm Burak, based in Eskişehir. I studied marine engineering and had never written a line of code. The degree and I never got along, so at the end of 2024 I <b>opened Unity</b> and kept going. I left marine engineering in 2024 and transferred to Eskişehir in 2025. Now I'm in my final year of Computer Programming at ESTÜ, graduating in June 2027.</>,
      p2: <>I work in two areas. I make <b>games with Unity and C#</b>, and I build <b>the tools AI agents use <InlinePointer /> with Python and TypeScript</b>. I design the architecture and agents write the code. A second agent audits every change without seeing the first one's report. If it finds something, the fix goes through the same audit, and nothing ships until a round comes back with zero findings.</>,
      calloutQ: 'WRITE → BLIND AUDIT → FIX → AUDIT AGAIN',
      calloutA: '// HOW I WORK',
      stats: [
        { n: '4', l: 'Merged open-source PRs' },
        { n: '0', l: 'Asset files in Kâğıt Kart' },
        { n: '2', l: 'Fields: games and agent tools' },
        { n: '2027', l: 'Graduation' }
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
