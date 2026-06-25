import { useEffect, useRef, useState } from 'react'
import { Menu, X, ArrowUpRight, ChevronDown, Check } from 'lucide-react'
import Logo from './Logo'
import { useLanguage } from '../i18n/LanguageContext'
import { LANGS } from '../i18n/translations'
import Flag from './Flag'

export default function Navbar() {
  const { t, lang, setLang } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [progress, setProgress] = useState(0)
  const [open, setOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const langRef = useRef<HTMLDivElement>(null)

  // Đóng dropdown ngôn ngữ khi bấm ra ngoài
  useEffect(() => {
    if (!langOpen) return
    const onDown = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [langOpen])

  useEffect(() => {
    const onScroll = () => {
      const top = window.scrollY
      setScrolled(top > 12)
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? Math.min(top / max, 1) : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: '#home', label: t.nav.home },
    { href: '#about', label: t.nav.about },
    { href: '#services', label: t.nav.services },
    { href: '#products', label: t.nav.products },
    { href: '#news', label: t.nav.news },
  ]

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-navy-100 bg-white/70 backdrop-blur-md shadow-[0_4px_30px_-12px_rgba(15,34,64,0.25)]'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav className="container-px-wide flex h-[5.5rem] items-center justify-between py-3">
        {/* Nhóm trái: logo + menu sát bên */}
        <div className="flex items-center gap-6 lg:gap-9">
        <Logo variant="dark" />

        {/* Menu desktop */}
        <ul className="hidden items-center gap-0.5 xl:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="relative whitespace-nowrap rounded-xl px-3.5 py-2 text-[15px] font-medium tracking-wide text-navy-600 transition-colors hover:text-navy-900
                           after:absolute after:inset-x-3.5 after:-bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0
                           after:rounded-full after:bg-gold-400 after:transition-transform after:duration-300 hover:after:scale-x-100"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Đổi ngôn ngữ — dropdown đơn giản */}
          <div className="relative" ref={langRef}>
            <button
              onClick={() => setLangOpen((v) => !v)}
              aria-haspopup="listbox"
              aria-expanded={langOpen}
              aria-label="Chọn ngôn ngữ"
              className="flex items-center gap-1.5 rounded-xl px-2 py-1.5 text-xs font-bold uppercase tracking-wide text-navy-700 ring-1 ring-transparent transition-all duration-200 hover:bg-navy-50 hover:ring-navy-200"
            >
              <Flag code={lang} className="h-[18px] w-[18px]" />
              {lang}
              <ChevronDown
                className={`h-3.5 w-3.5 text-navy-400 transition-transform duration-200 ${
                  langOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            <ul
              role="listbox"
              className={`absolute right-0 top-full z-20 mt-2 w-52 origin-top-right overflow-hidden rounded-xl border border-navy-100 bg-white py-1 shadow-lg transition duration-200 ${
                langOpen ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-1 opacity-0'
              }`}
            >
              {LANGS.map(({ code, label }) => (
                <li key={code}>
                  <button
                    onClick={() => {
                      setLang(code)
                      setLangOpen(false)
                    }}
                    role="option"
                    aria-selected={lang === code}
                    className={`flex w-full items-center gap-2.5 whitespace-nowrap px-3.5 py-2 text-sm tracking-wide transition-colors hover:bg-navy-50 ${
                      lang === code ? 'bg-navy-50 font-bold text-navy-900' : 'font-medium text-navy-600'
                    }`}
                  >
                    <Flag code={code} className="h-[18px] w-[18px]" />
                    {label}
                    {lang === code && (
                      <Check className="ml-auto h-3.5 w-3.5 shrink-0 text-gold-500" strokeWidth={3} />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <a href="#contact" className="btn-primary hidden whitespace-nowrap sm:inline-flex">
            {t.nav.quote}
            <ArrowUpRight className="h-4 w-4" />
          </a>

          {/* Toggle mobile */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-xl border border-navy-100 bg-white/60 text-navy-700 xl:hidden"
            aria-label="Open menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Thanh tiến trình cuộn */}
      <div
        className={`absolute inset-x-0 bottom-0 h-0.5 origin-left bg-gradient-to-r from-gold-300 to-gold-400 transition-opacity duration-300 ${
          scrolled ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ transform: `scaleX(${progress})` }}
        aria-hidden="true"
      />

      {/* Menu mobile */}
      <div
        className={`overflow-hidden border-t border-navy-100 bg-white/95 backdrop-blur-md transition-[max-height,opacity] duration-300 xl:hidden ${
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <ul className="container-px-wide flex flex-col gap-1 py-4">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-4 py-3 text-base font-medium tracking-wide text-navy-700 transition-colors hover:bg-navy-50"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="pt-2">
            <a href="#contact" onClick={() => setOpen(false)} className="btn-primary w-full">
              {t.nav.quote}
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </li>
        </ul>
      </div>
    </header>
  )
}

