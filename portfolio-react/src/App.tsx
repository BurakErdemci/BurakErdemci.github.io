import { useState, useRef, useEffect } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import { useReveal } from './hooks/useReveal'
import { Landing } from './components/Landing'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { Projects } from './components/Projects'
import { Timeline } from './components/Timeline'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { CVModal } from './components/CVModal'
import AnoAI from './components/ui/animated-shader-background'

function Portfolio({ toggleMusic, isPlaying, onOpenCV, showCV, setShowCV }: { 
  toggleMusic: () => void, 
  isPlaying: boolean, 
  onOpenCV: () => void,
  showCV: boolean,
  setShowCV: (show: boolean) => void
}) {
  useReveal()

  return (
    <div className="relative min-h-screen">
      <div className="bg-noise" />
      
      <Navbar toggleMusic={toggleMusic} isPlaying={isPlaying} />
      <main className="relative z-10">
        <Hero onOpenCV={onOpenCV} />
        <Projects />
        <Timeline />
        <Contact />
      </main>
      <Footer onOpenCV={onOpenCV} />

      {showCV && <CVModal onClose={() => setShowCV(false)} />}
    </div>
  )
}

export default function App() {
  const [entered, setEntered] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showCV, setShowCV] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(err => console.error("Audio play failed:", err))
      } else {
        audioRef.current.pause()
      }
    }
  }, [isPlaying])

  const toggleMusic = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <ThemeProvider>
      <div className="fixed inset-0 bg-black z-[-2]" />
      <AnoAI isPlaying={isPlaying} />
      
      <audio
        ref={audioRef}
        src="/audio/clair-de-lune.mp3"
        loop
      />

      {!entered && (
        <Landing 
          onEnter={() => setEntered(true)} 
          toggleMusic={toggleMusic}
          isPlaying={isPlaying}
        />
      )}
      {entered && (
        <Portfolio 
          toggleMusic={toggleMusic} 
          isPlaying={isPlaying} 
          onOpenCV={() => setShowCV(true)}
          showCV={showCV}
          setShowCV={setShowCV}
        />
      )}
    </ThemeProvider>
  )
}
