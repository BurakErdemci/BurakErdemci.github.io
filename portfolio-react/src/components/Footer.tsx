import { FileText, ChevronsUp } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { content } from '../data/content'

export function Footer({ onOpenCV }: { onOpenCV: () => void }) {
  const { lang } = useTheme()
  const t = content[lang]

  return (
    <footer className="py-8 border-t border-[#1a1a1a]">
      <div className="max-w-[800px] mx-auto px-6 flex items-center justify-between">
        <p className="text-xs text-[#555]">
          &copy; {new Date().getFullYear()} Burak Erdemci
        </p>
        <div className="flex items-center gap-4">
          <button 
            onClick={onOpenCV}
            className="flex items-center gap-2 text-xs text-[#555] hover:text-white transition-colors cursor-pointer"
          >
            <FileText size={12} /> {t.footerCv}
          </button>
          <a href="#hero"
            className="flex items-center gap-2 text-xs text-[#555] hover:text-white transition-colors">
            <ChevronsUp size={12} /> {t.footerTop}
          </a>
        </div>
      </div>
    </footer>
  )
}
