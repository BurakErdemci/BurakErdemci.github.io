import { X, Download, FileText } from 'lucide-react'
import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { RainbowButton } from './ui/rainbow-borders-button'
import { useTheme } from '../context/ThemeContext'
import { content } from '../data/content'

interface CVModalProps {
  onClose: () => void
}

export function CVModal({ onClose }: CVModalProps) {
  const { lang } = useTheme()
  const t = content[lang]

  // Lock scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  const downloadText = lang === 'tr' ? "İndir" : "Download"
  const fallbackText = lang === 'tr' 
    ? "PDF görüntülenemiyorsa lütfen indirme butonunu kullanın."
    : "If the PDF cannot be displayed, please use the download button."

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 md:p-8 animate-in fade-in duration-300">
      
      {/* Background Overlay Click to Close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative w-full max-w-5xl h-[85vh] bg-[#0a0a0a]/90 backdrop-blur-2xl border border-white/10 rounded-[2rem] shadow-2xl flex flex-col overflow-hidden animate-modal">
        
        {/* Header Action Bar */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-white/5 bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/5 rounded-lg">
              <FileText size={20} className="text-white/70" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">Curriculum Vitae</h2>
              <p className="text-xs text-white/40 uppercase tracking-widest font-medium">Burak Erdemci</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Download Button */}
            <RainbowButton href="Burak_Erdemci_CV.pdf" download>
              <Download size={14} />
              {downloadText}
            </RainbowButton>

            {/* Close Button */}
            <button 
              onClick={onClose}
              className="p-2.5 bg-white/5 hover:bg-white/15 ring-1 ring-white/10 rounded-full text-white/50 hover:text-white transition-all backdrop-blur-md"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* PDF Viewer Content */}
        <div className="flex-1 w-full relative bg-black/20">
          <iframe 
            src="Burak_Erdemci_CV.pdf#toolbar=0" 
            className="w-full h-full border-none"
            title="Burak Erdemci CV"
          />
          
          {/* Mobile Fallback Label if iframe is blocked or weird */}
          <div className="absolute inset-0 z-[-1] flex flex-col items-center justify-center text-center p-8">
            <p className="text-white/40 text-sm mb-4">{fallbackText}</p>
          </div>
        </div>

      </div>
    </div>,
    document.body
  )
}
