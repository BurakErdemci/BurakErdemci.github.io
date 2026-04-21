import { useState } from 'react'
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

function Portfolio() {
  useReveal()
  const [showCV, setShowCV] = useState(false)

  return (
    <div className="relative min-h-screen">
      <div className="bg-noise" />
      
      <Navbar />
      <main className="relative z-10">
        <Hero onOpenCV={() => setShowCV(true)} />
        <Projects />
        <Timeline />
        <Contact />
      </main>
      <Footer onOpenCV={() => setShowCV(true)} />

      {showCV && <CVModal onClose={() => setShowCV(false)} />}
    </div>
  )
}

export default function App() {
  const [entered, setEntered] = useState(false)

  return (
    <ThemeProvider>
      <div className="fixed inset-0 bg-black z-[-2]" />
      <AnoAI />
      {!entered && <Landing onEnter={() => setEntered(true)} />}
      {entered && <Portfolio />}
    </ThemeProvider>
  )
}
