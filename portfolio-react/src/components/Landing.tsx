import { useState, useEffect } from 'react'
import { Music, Music2 } from 'lucide-react'

interface LandingProps {
  onEnter: () => void
  toggleMusic: () => void
  isPlaying: boolean
}

export function Landing({ onEnter, toggleMusic, isPlaying }: LandingProps) {
  const [exiting, setExiting] = useState(false)
  const [visible, setVisible] = useState(false)
  const [isHoveringMusic, setIsHoveringMusic] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 1200)
    return () => clearTimeout(timer)
  }, [])

  const handleClick = () => {
    setExiting(true)
    setTimeout(onEnter, 800)
  }

  return (
    <div
      className={`fixed inset-0 z-50 w-full h-full overflow-hidden bg-transparent cursor-default transition-opacity duration-700 ${
        exiting ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Simple centered ENTER text */}
      <div
        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center transition-all duration-1000 ease-out ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        {/* Music Button ABOVE the name */}
        <div className="mb-8 flex flex-col items-center group/music">
          <button
            onClick={(e) => {
              e.stopPropagation()
              toggleMusic()
            }}
            onMouseEnter={() => setIsHoveringMusic(true)}
            onMouseLeave={() => setIsHoveringMusic(false)}
            className={`p-4 rounded-full border transition-all duration-500 flex items-center justify-center cursor-pointer ${
              isPlaying 
                ? 'bg-white/10 border-white/20 text-white shadow-[0_0_20px_rgba(255,255,255,0.1)]' 
                : 'bg-transparent border-white/10 text-white/40 hover:border-white/30 hover:text-white/60'
            }`}
          >
            {isPlaying ? (
              <Music2 size={24} className="animate-pulse" />
            ) : (
              <Music size={24} />
            )}
          </button>
          
          <div className={`mt-4 overflow-hidden transition-all duration-500 flex flex-col items-center ${isHoveringMusic ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}>
            <p className="text-[10px] text-white/50 tracking-[0.2em] uppercase text-center max-w-[250px] leading-relaxed">
              Arkanıza yaslanıp atmosferin tadını çıkarmak isterseniz bana basın
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center mb-12">
          <h1 className="text-white text-4xl sm:text-6xl font-black tracking-[0.15em] uppercase mb-4 drop-shadow-2xl">
            Burak Erdemci
          </h1>
          
          <div className={`h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent transition-all duration-1000 delay-500 origin-center ${visible ? 'w-64 opacity-100' : 'w-0 opacity-0'}`} />
          
          <p className={`mt-4 text-white/50 text-[10px] sm:text-xs tracking-[0.4em] uppercase font-medium transition-all duration-1000 delay-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}>
            Game & Full Stack Developer
          </p>
        </div>
        
        <button
          onClick={(e) => {
            e.stopPropagation()
            handleClick()
          }}
          className="group relative flex flex-col items-center cursor-pointer"
        >
          <span className="text-white/30 text-[10px] tracking-[0.6em] uppercase font-light transition-all duration-500 group-hover:text-white group-hover:tracking-[0.8em]">
            Enter Experience
          </span>
          <div className="mt-4 w-px h-12 bg-gradient-to-b from-white/20 to-transparent group-hover:h-16 transition-all duration-500" />
        </button>
      </div>
    </div>
  )
}
