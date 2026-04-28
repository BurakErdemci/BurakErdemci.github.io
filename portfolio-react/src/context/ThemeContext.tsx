import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

type Lang = 'tr' | 'en'

interface ThemeContextType {
  lang: Lang
  toggleLang: () => void
}

const ThemeContext = createContext<ThemeContextType | null>(null)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    const saved = localStorage.getItem('lang')
    return saved === 'en' ? 'en' : 'tr'
  })

  useEffect(() => {
    localStorage.setItem('lang', lang)
    document.documentElement.lang = lang
  }, [lang])

  const toggleLang = () => setLang(prev => prev === 'tr' ? 'en' : 'tr')

  return (
    <ThemeContext.Provider value={{ lang, toggleLang }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
