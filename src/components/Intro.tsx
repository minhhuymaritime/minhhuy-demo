import { useEffect, useState } from 'react'
import { ChevronDown, Languages } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import { translations, LANGS, type Lang } from '../i18n/translations'
import { asset } from '../lib/asset'
import Flag from './Flag'

// Nội dung song ngữ (intro hiện trước khi chọn ngôn ngữ)
const GREET = `${translations.vi.logo.greeting} · ${translations.en.logo.greeting}`
const TAGLINE = `${translations.vi.logo.line1} · ${translations.en.logo.line1}`

const EXIT = 750 // thời lượng màn kéo lên

/** Màn intro: logo + wordmark + chọn ngôn ngữ, chọn xong kéo lên lộ trang. */
export default function Intro() {
  const { setLang, lang } = useLanguage()
  const [leaving, setLeaving] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [ddOpen, setDdOpen] = useState(false)

  const signalDone = () => {
    document.body.classList.remove('intro-active')
    ;(window as typeof window & { __introDone?: boolean }).__introDone = true
    window.dispatchEvent(new Event('intro:done'))
  }

  const finish = () => {
    if (leaving) return
    setLeaving(true)
    window.setTimeout(() => {
      setHidden(true)
      document.body.style.overflow = ''
      signalDone()
    }, EXIT)
  }

  const choose = (l: Lang) => {
    try {
      sessionStorage.setItem('mh-entered', '1')
    } catch {
      /* bỏ qua */
    }
    if (l === lang) {
      finish() // cùng ngôn ngữ với trang hiện tại -> chỉ kéo màn lên
    } else {
      setLang(l) // khác ngôn ngữ -> điều hướng sang URL ngôn ngữ đó
    }
  }

  useEffect(() => {
    // Đã vào trang trong phiên này (vd: vừa chuyển ngôn ngữ) -> bỏ qua màn Intro
    let entered = false
    try {
      entered = !!sessionStorage.getItem('mh-entered')
    } catch {
      /* bỏ qua */
    }
    if (entered) {
      setHidden(true)
      signalDone()
      return
    }
    // Tạm dừng animation của trang phía sau trong lúc intro còn che
    document.body.classList.add('intro-active')
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setHidden(true)
      signalDone()
      return
    }
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') finish()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      document.body.classList.remove('intro-active')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (hidden) return null

  return (
    <div
      role="presentation"
      className={`fixed inset-0 z-[100] flex items-start justify-center overflow-hidden bg-white transition-transform duration-700 ease-[cubic-bezier(0.7,0,0.25,1)] ${
        leaving ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      {/* Đốm sáng trôi */}
      <div className="pointer-events-none absolute -left-24 top-1/4 hidden h-72 w-72 animate-drift rounded-full bg-white/25 blur-3xl sm:block" />
      <div className="pointer-events-none absolute -right-20 top-1/3 hidden h-80 w-80 animate-drift-rev rounded-full bg-amber-200/30 blur-3xl sm:block" />

      {/* Sóng biển nhiều lớp ở đáy */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[42%]">
        <Wave className="text-navy-700/80 animate-[wave-x_26s_linear_infinite]" d="M0 70 C240 110 480 30 720 70 C960 110 1200 30 1440 70 L1440 120 L0 120 Z" />
        <Wave
          className="text-gold-400/75 animate-[wave-x_17s_linear_infinite] [animation-direction:reverse]"
          d="M0 62 C200 22 520 102 720 62 C920 22 1240 102 1440 62 L1440 120 L0 120 Z"
        />
        <Wave className="text-navy-200/75 animate-[wave-x_32s_linear_infinite] hidden sm:block" d="M0 84 C300 120 460 44 720 84 C980 120 1140 44 1440 84 L1440 120 L0 120 Z" />
        <Wave className="text-navy-600/90 animate-[wave-x_21s_linear_infinite] [animation-direction:reverse] hidden sm:block" d="M0 92 C260 116 500 64 720 92 C940 116 1180 64 1440 92 L1440 120 L0 120 Z" />
      </div>

      {/* Quầng sáng nền nhẹ tôn nội dung lên */}
      <div className="pointer-events-none absolute left-1/2 top-[24%] h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(35,76,140,0.10),transparent)] blur-2xl" />

      {/* Nội dung */}
      <div className="relative mt-[8vh] flex flex-col items-center px-6 text-center">
        {/* Lời chào song ngữ — nhạt, nhỏ như trước */}
        <span className="mb-6 animate-[fade-up_650ms_ease-out_both] text-[11px] font-semibold uppercase tracking-[0.42em] text-navy-800/85 sm:text-xs">
          {GREET}
        </span>

        {/* Logo: vầng sáng + vòng mảnh xoay nhẹ */}
        <div className="relative animate-[pop_800ms_cubic-bezier(0.2,0.85,0.25,1)_both]">
          <img
            src={asset('/images/brand/logo.png')}
            alt="Minh Huy"
            className="h-32 w-32 rounded-full object-contain shadow-[0_16px_44px_-14px_rgba(35,76,140,0.5)] sm:h-36 sm:w-36"
          />
        </div>

        <span
          className="intro-wordmark mt-8 animate-[fade-up_650ms_ease-out_both] text-3xl font-bold tracking-[0.28em] sm:text-4xl"
          style={{ animationDelay: '420ms' }}
        >
          MINH HUY
        </span>

        {/* Tagline song ngữ — sạch, hiện đại */}
        <p
          className="mt-4 animate-[fade-up_650ms_ease-out_both] text-xs font-semibold uppercase tracking-[0.32em] text-navy-700 sm:text-sm"
          style={{ animationDelay: '600ms' }}
        >
          {TAGLINE}
        </p>

        {/* Chọn ngôn ngữ */}
        <div
          className="mt-11 flex animate-[fade-up_650ms_ease-out_both] flex-col items-center gap-4"
          style={{ animationDelay: '780ms' }}
        >
          <p className="text-[11px] font-medium tracking-wide text-navy-700/80 sm:text-xs">
            Vui lòng chọn ngôn ngữ
            <span className="mx-2 text-navy-900/30">/</span>
            Please select your language
          </p>
          <div className="relative">
            <button
              onClick={() => setDdOpen((v) => !v)}
              aria-haspopup="listbox"
              aria-expanded={ddOpen}
              className="flex items-center gap-3 rounded-full border border-navy-900/20 bg-white/50 px-6 py-2.5 text-sm font-semibold text-navy-800 backdrop-blur transition-all hover:border-navy-500/60 hover:bg-white/75 hover:text-navy-900"
            >
              <Languages className="h-4 w-4 text-navy-500" strokeWidth={2} />
              <span>Chọn ngôn ngữ · Select language</span>
              <ChevronDown
                className={`h-4 w-4 text-navy-500 transition-transform duration-200 ${ddOpen ? 'rotate-180' : ''}`}
              />
            </button>
            <ul
              role="listbox"
              className={`absolute left-1/2 top-full z-10 mt-3 w-60 -translate-x-1/2 origin-top overflow-hidden rounded-2xl border border-navy-100 bg-white py-1 shadow-xl ring-1 ring-navy-900/5 transition duration-200 ${
                ddOpen ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-1 opacity-0'
              }`}
            >
              {LANGS.map(({ code, label }) => (
                <li key={code}>
                  <button
                    onClick={() => choose(code)}
                    role="option"
                    aria-selected="false"
                    className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm font-medium text-navy-700 transition-colors hover:bg-gold-50 hover:text-navy-900"
                  >
                    <Flag code={code} className="h-[18px] w-[18px]" />
                    <span>{label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

function Wave({ className, d }: { className: string; d: string }) {
  return (
    <svg
      className={`absolute bottom-0 left-0 h-full w-[200%] ${className}`}
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path fill="currentColor" d={d} />
    </svg>
  )
}
