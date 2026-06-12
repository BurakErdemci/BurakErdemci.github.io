import { useTheme } from '../context/ThemeContext';

export function Contact() {
  const { lang } = useTheme();

  const localizedData = {
    tr: {
      pitch: '// SON CANAVAR BOŞ BİR GELEN KUTUSUDUR',
      h2: <><span className="a">BİR GÖREVİN</span> <span className="b">Mİ VAR?</span></>,
      cv: 'CV / Özgeçmiş'
    },
    en: {
      pitch: '// THE FINAL BOSS IS AN EMPTY INBOX',
      h2: <><span className="a">GOT A</span> <span className="b">MISSION?</span></>,
      cv: 'CV / Resume'
    }
  };

  const data = localizedData[lang];

  return (
    <section className="sec contact" id="contact">
      <p className="pitch rv">{data.pitch}</p>
      <h2 className="rv">{data.h2}</h2>
      <a
        className="mail-btn rv"
        href="mailto:erdemciburakemre@gmail.com"
        data-hover
      >
        erdemciburakemre@gmail.com
      </a>
      <div className="socials rv">
        <a href="https://github.com/BurakErdemci" target="_blank" rel="noopener noreferrer" data-hover>GitHub</a>
        <a href="https://www.linkedin.com/in/burak-erdemci-a3994833b/" target="_blank" rel="noopener noreferrer" data-hover>LinkedIn</a>
        <a href="https://burakerdemci.itch.io/" target="_blank" rel="noopener noreferrer" data-hover>itch.io</a>
        <a href="/Burak_Erdemci_CV.pdf" target="_blank" rel="noopener noreferrer" data-hover>{data.cv}</a>
      </div>
    </section>
  );
}
