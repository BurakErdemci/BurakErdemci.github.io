import { useState } from 'react'
import { Send, CheckCircle, XCircle, Mail } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './icons'
import { useTheme } from '../context/ThemeContext'
import { content } from '../data/content'

export function Contact() {
  const { lang } = useTheme()
  const t = content[lang]
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('sending')
    const formData = new FormData(e.currentTarget)

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      })
      const data = await response.json()
      if (data.success) {
        setStatus('success')
        ;(e.target as HTMLFormElement).reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
    setTimeout(() => setStatus('idle'), 3000)
  }

  return (
    <section id="contact" className="py-32 bg-transparent">
      <div className="section-container">
        <h2 className="reveal text-5xl font-bold text-white mb-4 tracking-tighter">{t.contactTitle}</h2>
        <p className="reveal text-lg text-[#999] mb-20 max-w-[600px] leading-relaxed">{t.contactText}</p>

        <div className="reveal flex flex-col items-center w-full max-w-[600px] space-y-16">
          {/* Channels - Centered row */}
          <div className="flex flex-wrap justify-center gap-10 w-full">
            <a href="mailto:erdemciburakemre@gmail.com"
              className="flex flex-col items-center gap-3 text-sm text-[#888] hover:text-white transition-all hover:scale-105">
              <div className="w-12 h-12 rounded-full bg-white/[0.03] flex items-center justify-center border border-white/5">
                <Mail size={20} />
              </div>
              <span className="tracking-wide">Email</span>
            </a>
            <a href="https://github.com/BurakErdemci" target="_blank" rel="noopener noreferrer"
              className="flex flex-col items-center gap-3 text-sm text-[#888] hover:text-white transition-all hover:scale-105">
              <div className="w-12 h-12 rounded-full bg-white/[0.03] flex items-center justify-center border border-white/5">
                <GithubIcon size={20} />
              </div>
              <span className="tracking-wide">GitHub</span>
            </a>
            <a href="https://www.linkedin.com/in/burak-erdemci-a3994833b/" target="_blank" rel="noopener noreferrer"
              className="flex flex-col items-center gap-3 text-sm text-[#888] hover:text-white transition-all hover:scale-105">
              <div className="w-12 h-12 rounded-full bg-white/[0.03] flex items-center justify-center border border-white/5">
                <LinkedinIcon size={20} />
              </div>
              <span className="tracking-wide">LinkedIn</span>
            </a>
          </div>

          <div className="h-px bg-white/5 w-full" />

          {/* Form - Full width centered in Glass Container */}
          <div className="form-glass-container mt-8">
            <h3 className="text-2xl font-semibold text-white mb-8 tracking-tight text-center">Bana Ulaşın</h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
              <input type="hidden" name="access_key" value="654e6ffd-9c6c-473b-9c88-8983ac592ee7" />

              <input
                type="text" name="name" required placeholder={t.formName}
                className="form-input"
              />
              <input
                type="email" name="email" required placeholder={t.formEmail}
                className="form-input"
              />
              <textarea
                name="message" required rows={5} placeholder={t.formMessage}
                className="form-input resize-none"
              />

              <button
                type="submit"
                disabled={status === 'sending'}
                className="btn-primary w-full py-4 mt-2 tracking-widest text-sm uppercase cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'success' ? (
                  <><CheckCircle size={16} /> {lang === 'tr' ? 'Gönderildi!' : 'Sent!'}</>
                ) : status === 'error' ? (
                  <><XCircle size={16} /> {lang === 'tr' ? 'Hata' : 'Error'}</>
                ) : status === 'sending' ? (
                  <>{lang === 'tr' ? 'Gönderiliyor...' : 'Sending...'}</>
                ) : (
                  <><Send size={16} /> {t.formSubmit}</>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
