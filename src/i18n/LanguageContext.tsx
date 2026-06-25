import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react'
import { translations, type Lang, type Translation } from './translations'
import { localePath } from '../lib/i18nRoutes'

interface LanguageContextValue {
  lang: Lang
  t: Translation
  toggleLang: () => void
  setLang: (lang: Lang) => void
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined)

export function LanguageProvider({
  children,
  initialLang = 'vi',
}: {
  children: ReactNode
  initialLang?: Lang
}) {
  // Mỗi ngôn ngữ là một trang/URL riêng -> lang cố định theo trang.
  const [lang] = useState<Lang>(initialLang)

  // Đổi ngôn ngữ = điều hướng sang URL của ngôn ngữ đó (tốt cho SEO + hreflang).
  const setLang = useCallback(
    (next: Lang) => {
      if (next === lang) return
      try {
        sessionStorage.setItem('mh-entered', '1') // tránh hiện lại màn Intro sau khi chuyển
      } catch {
        /* sessionStorage có thể bị chặn — bỏ qua */
      }
      window.location.assign(localePath(next))
    },
    [lang],
  )

  const toggleLang = useCallback(() => {
    setLang(lang === 'vi' ? 'en' : 'vi')
  }, [lang, setLang])

  // Layout đã đặt sẵn title/description/lang phía server; đồng bộ lại phía client cho chắc.
  useEffect(() => {
    const seo = translations[lang].seo
    document.documentElement.lang = lang
    document.title = seo.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', seo.description)
  }, [lang])

  const value: LanguageContextValue = {
    lang,
    t: translations[lang],
    toggleLang,
    setLang,
  }

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
