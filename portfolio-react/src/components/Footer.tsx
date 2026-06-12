import { useTheme } from '../context/ThemeContext';

export function Footer() {
  const { lang } = useTheme();

  const localizedData = {
    tr: {
      desc: 'Stille tasarlandı. Hiçbir soygun gerçekleştirilmedi.'
    },
    en: {
      desc: 'Designed with style. No heists were committed.'
    }
  };

  const data = localizedData[lang];

  return (
    <footer>
      <span className="f1">© 2026 Burak Erdemci</span>
      <span className="f2">{data.desc}</span>
    </footer>
  );
}
