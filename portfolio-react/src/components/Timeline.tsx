import { useTheme } from '../context/ThemeContext'
import { content } from '../data/content'

export function Timeline() {
  const { lang } = useTheme()
  const t = content[lang]

  return (
    <section id="timeline" className="py-32 bg-transparent">
      <div className="section-container">
        <h2 className="reveal text-5xl font-bold text-white mb-4 tracking-tighter">{t.timelineTitle}</h2>
        <p className="reveal text-base italic text-[#777] mb-24 tracking-widest">{t.timelineLabel} 🕰️</p>

        <div className="space-y-32 relative w-full">
          {t.timeline.map((item, i) => (
            <div key={i} className="reveal group relative flex flex-col items-center text-center">
              {/* Large year background - centered */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[12rem] font-bold text-white/[0.02] pointer-events-none select-none group-hover:text-white/[0.04] transition-all duration-700">
                {item.date.split(' ')[0]}
              </div>
              
              <div className="relative z-10 flex flex-col items-center">
                <span className="text-sm font-semibold text-[#666] uppercase tracking-[0.3em] mb-6 block">
                  {item.date}
                </span>
                <h3 className="text-3xl font-bold text-white group-hover:scale-105 transition-transform duration-500 mb-4">
                  {item.title}
                </h3>
                <p className="text-base text-[#999] font-medium mb-8 max-w-[500px]">{item.subtitle}</p>
                <div className="h-px bg-white/5 w-16 mb-8" />
                <p className="text-lg text-[#888] leading-relaxed max-w-[700px] opacity-80 group-hover:opacity-100 transition-opacity">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
