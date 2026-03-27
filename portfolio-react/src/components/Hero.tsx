import { FileText } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { content } from '../data/content'

export function Hero({ onOpenCV }: { onOpenCV: () => void }) {
  const { lang } = useTheme()
  const t = content[lang]

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-transparent pt-28 sm:pt-20 pb-16">
      <div className="section-container relative z-10">
        <div className="w-full py-6 sm:py-10 flex flex-col items-center text-center">

          {/* Name */}
          <h1 className="reveal text-4xl sm:text-6xl md:text-8xl font-black text-white mb-6 sm:mb-10 tracking-tighter">
            Burak Erdemci
          </h1>

          {/* Subtitle */}
          <p className="reveal reveal-delay-1 text-xl sm:text-2xl md:text-3xl font-semibold text-white/90 tracking-tight mb-6 sm:mb-8">
            {t.heroSubtitle}
          </p>

          {/* Bio */}
          <div className="reveal reveal-delay-1 space-y-6 text-base sm:text-lg md:text-xl leading-relaxed text-[#aaa] mb-8 sm:mb-12 max-w-[700px] mx-auto px-2">
            <p className="opacity-90">{t.aboutText}</p>
          </div>

          {/* Separator */}
          <div className="reveal reveal-delay-2 h-px bg-white/10 w-24 mb-8 sm:mb-12 mx-auto" />

          {/* Skills */}
          <div className="reveal reveal-delay-2 mb-8 sm:mb-12 space-y-3 sm:space-y-4 w-full px-2 text-center">
            {Object.entries(t.skills).map(([category, skills]) => (
              <p key={category} className="text-xs sm:text-sm text-[#777] tracking-wider">
                <span className="text-white/60 font-bold mr-2">{category.toUpperCase()}:</span>{' '}
                {skills.join(' • ').toUpperCase()}
              </p>
            ))}
          </div>

          {/* Actions */}
          <div className="reveal reveal-delay-3 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-8 w-full px-4 sm:px-0">
            <a href="#projects" className="btn-primary w-full sm:w-auto sm:min-w-[180px]">
              {t.btnProjects}
            </a>
            <button
              onClick={onOpenCV}
              className="btn-secondary w-full sm:w-auto sm:min-w-[180px]"
            >
              <FileText size={18} />
              {t.btnCv}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

