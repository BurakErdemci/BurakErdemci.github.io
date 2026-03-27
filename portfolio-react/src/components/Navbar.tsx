import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './icons'
import { useTheme } from '../context/ThemeContext'
import { content } from '../data/content'

export function Navbar() {
  const { lang, toggleLang } = useTheme()
  const t = content[lang]
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { href: '#projects', label: t.navProjects },
    { href: '#timeline', label: t.navTimeline },
    { href: '#contact', label: t.navContact },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'py-3 backdrop-blur-2xl border-b border-white/5 shadow-2xl bg-black/40' : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-[1000px] w-full mx-auto px-6 h-12 flex items-center justify-between">
        <a href="#hero" className="text-base font-semibold text-white tracking-tight">
          B.E
        </a>

        {/* Desktop - Text Links Centered */}
        <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-[#888] hover:text-white transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop - Right Aligned Actions */}
        <div className="hidden md:flex items-center gap-4">
          <a href="https://github.com/BurakErdemci" target="_blank" rel="noopener noreferrer" className="text-[#888] hover:text-white transition-colors duration-200">
            <GithubIcon size={16} />
          </a>
          <a href="https://www.linkedin.com/in/burak-erdemci-a3994833b/" target="_blank" rel="noopener noreferrer" className="text-[#888] hover:text-white transition-colors duration-200">
            <LinkedinIcon size={16} />
          </a>

          <div className="w-px h-4 bg-[#333] mx-1" />

          <button onClick={toggleLang}
            className="text-xs font-medium text-[#888] hover:text-white transition-colors duration-200 cursor-pointer">
            {t.btnLang}
          </button>
        </div>

        {/* Mobile hamburger - right aligned */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-[#888] cursor-pointer"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-[#1a1a1a] bg-[rgba(10,10,10,0.95)] backdrop-blur-md py-4">
          <div className="flex flex-col items-center gap-4">
            {navLinks.map(link => (
              <a key={link.href} href={link.href}
                className="text-sm text-[#888] hover:text-white"
                onClick={() => setMobileOpen(false)}>
                {link.label}
              </a>
            ))}
            <button onClick={toggleLang} className="text-xs text-[#888] hover:text-white cursor-pointer">
              {t.btnLang}
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}
