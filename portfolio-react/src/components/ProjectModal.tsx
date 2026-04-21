import { X, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useTheme } from '../context/ThemeContext'
import { content, type Project } from '../data/content'
import { RainbowButton } from './ui/rainbow-borders-button'
import ReactMarkdown from 'react-markdown'

interface ProjectModalProps {
  project: Project
  onClose: () => void
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const { lang } = useTheme()
  const t = content[lang]
  const [currentImageIdx, setCurrentImageIdx] = useState(0)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  const hasImages = project.images && project.images.length > 0

  const nextImage = () => {
    if (hasImages) {
      setCurrentImageIdx((prev) => (prev + 1) % project.images.length)
    }
  }

  const prevImage = () => {
    if (hasImages) {
      setCurrentImageIdx((prev) => (prev - 1 + project.images.length) % project.images.length)
    }
  }

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 md:p-8">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-xl animate-backdrop"
        onClick={onClose}
      />

      {hasImages ? (
        /* ── WITH IMAGES: Side-by-side layout ── */
        <div className="relative w-full max-w-[1100px] max-h-[85vh] flex flex-col md:flex-row gap-0 animate-modal bg-[#0a0a0a]/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden">

          {/* Left: Image Gallery */}
          <div className="relative w-full md:w-[55%] h-[35vh] md:h-auto md:min-h-[450px] md:max-h-[85vh] bg-black/40 flex items-center justify-center">
            <img
              src={project.images[currentImageIdx]}
              alt={`${project.title} screenshot ${currentImageIdx + 1}`}
              className="w-full h-full object-contain p-4"
            />

            {project.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white/80 hover:text-white transition-colors backdrop-blur-sm cursor-pointer"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white/80 hover:text-white transition-colors backdrop-blur-sm cursor-pointer"
                >
                  <ChevronRight size={20} />
                </button>

                {/* Dots */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                  {project.images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIdx(idx)}
                      className={`w-2 h-2 rounded-full transition-all cursor-pointer ${idx === currentImageIdx ? 'bg-white scale-125' : 'bg-white/40 hover:bg-white/60'}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Right: Details */}
          <div className="w-full md:w-[45%] flex flex-col relative overflow-hidden bg-[#0a0a0a]">
            <div className="flex-1 overflow-y-auto custom-scrollbar">
              <div className="p-6 md:p-10 md:pl-14 pt-20 md:pt-24 relative">
                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-6 right-6 md:top-8 md:right-8 p-2.5 bg-white/5 hover:bg-white/15 rounded-full text-white/60 hover:text-white transition-all cursor-pointer z-10 border border-white/5 shadow-xl backdrop-blur-md"
                >
                  <X size={20} />
                </button>

                <h2 className="text-2xl lg:text-3.5xl font-bold text-white tracking-tight mb-6 pr-14 leading-tight">
                  {project.title}
                </h2>

                <div className="prose prose-invert prose-sm max-w-none text-[#a0a0a0] leading-relaxed mb-6">
                  <ReactMarkdown>
                    {project.detail}
                  </ReactMarkdown>
                </div>

                <div>
                  <h3 className="text-[10px] font-semibold text-[#555] mb-3 tracking-[0.2em]">
                    TECHNOLOGIES
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map(tech => (
                      <span key={tech} className="px-3 py-1.5 bg-white/5 border border-white/8 text-[#aaa] text-xs rounded-full font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* GitHub Button - Bottom centered */}
              <div className="p-6 md:px-8 md:pb-8 pt-0 flex justify-center">
                <RainbowButton href={project.link} target="_blank" rel="noopener noreferrer">
                  <ExternalLink size={14} />
                  {t.projectViewGithub}
                </RainbowButton>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* ── WITHOUT IMAGES: Compact centered layout ── */
        <div className="relative w-full max-w-lg max-h-[85vh] animate-modal bg-[#0a0a0a]/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
          <div className="p-8 pt-20 relative flex-1 overflow-y-auto custom-scrollbar">
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2.5 bg-white/5 hover:bg-white/15 rounded-full text-white/60 hover:text-white transition-all cursor-pointer z-10 border border-white/5 shadow-xl backdrop-blur-md"
            >
              <X size={20} />
            </button>

            <h2 className="text-2xl font-bold text-white tracking-tight mb-6 pr-14">
              {project.title}
            </h2>

            <div className="prose prose-invert prose-sm max-w-none text-[#a0a0a0] leading-relaxed mb-6">
              <ReactMarkdown>
                {project.detail}
              </ReactMarkdown>
            </div>

            <div className="mb-6">
              <h3 className="text-[10px] font-semibold text-[#555] mb-3 tracking-[0.2em]">
                TECHNOLOGIES
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tech.map(tech => (
                  <span key={tech} className="px-3 py-1.5 bg-white/5 border border-white/8 text-[#aaa] text-xs rounded-full font-medium">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* GitHub Button */}
            <div className="mt-8 pt-6 border-t border-white/8 flex justify-center">
              <RainbowButton href={project.link} target="_blank" rel="noopener noreferrer">
                <ExternalLink size={14} />
                {t.projectViewGithub}
              </RainbowButton>
            </div>
          </div>
        </div>
      )}
    </div>,
    document.body
  )
}
