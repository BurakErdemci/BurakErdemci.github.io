import { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { content } from '../data/content';

export function Navbar() {
  const { lang, toggleLang } = useTheme();
  const t = content[lang];
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const headerEl = document.getElementById('header');
    if (!headerEl) return;

    let lastY = 0;
    const handleScroll = () => {
      const y = window.scrollY;
      if (mobileMenuOpen) return; // do not hide header if mobile overlay is open
      headerEl.classList.toggle('hidden', y > 400 && y > lastY);
      lastY = y;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mobileMenuOpen]);

  const toggleMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <>
      <header id="header">
        <nav className="nav">
          <a className="logo" href="#hero">BE.</a>
          <div className="nav-links">
            <a href="#profile" data-hover>{t.navAbout}</a>
            <a href="#arsenal" data-hover>{t.navSkills}</a>
            <a href="#missions" data-hover>{t.navProjects}</a>
            <a href="#contact" data-hover>{t.navContact}</a>
            <button onClick={toggleLang} className="lang-btn mono" data-hover>
              {t.btnLang}
            </button>
          </div>
          <button className="mobile-menu-btn mono" onClick={toggleMenu}>
            MENU
          </button>
        </nav>
      </header>

      {/* Fullscreen Mobile Menu Overlay */}
      <div className={`mobile-menu-overlay ${mobileMenuOpen ? 'open' : ''}`}>
        <button className="close-btn mono" onClick={toggleMenu}>
          {lang === 'tr' ? 'KAPAT' : 'CLOSE'}
        </button>
        <div className="mobile-links">
          <a href="#profile" onClick={toggleMenu}>{t.navAbout}</a>
          <a href="#arsenal" onClick={toggleMenu}>{t.navSkills}</a>
          <a href="#missions" onClick={toggleMenu}>{t.navProjects}</a>
          <a href="#contact" onClick={toggleMenu}>{t.navContact}</a>
          <button
            onClick={() => {
              toggleLang();
            }}
            className="lang-btn mono"
            style={{ marginTop: '12px' }}
          >
            {t.btnLang}
          </button>
        </div>
      </div>
    </>
  );
}
