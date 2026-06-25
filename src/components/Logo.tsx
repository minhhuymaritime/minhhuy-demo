import { useLanguage } from '../i18n/LanguageContext'
import { asset } from '../lib/asset'

interface LogoProps {
  variant?: 'light' | 'dark'
  /** Ẩn phần chữ bên cạnh, chỉ hiện huy hiệu tròn */
  iconOnly?: boolean
}

/** Logo Minh Huy: huy hiệu tròn chính thức + wordmark. */
export default function Logo({ variant = 'dark', iconOnly = false }: LogoProps) {
  const { t, lang } = useLanguage()
  const textColor = variant === 'light' ? 'text-white' : 'text-navy-700'
  const subColor = variant === 'light' ? 'text-white/60' : 'text-navy-900'

  return (
    <a href="#home" className="group flex items-center gap-3.5" aria-label="Minh Huy Maritime - Trang chủ">
      <span className="relative grid h-16 w-16 place-items-center transition-transform duration-300 group-hover:scale-105 sm:h-[4.5rem] sm:w-[4.5rem]">
        <img
          src={asset('/images/brand/logo.png')}
          alt="Dịch vụ Hàng hải Minh Huy"
          className="h-full w-full rounded-full object-contain"
          loading="eager"
          decoding="async"
        />
      </span>
      {!iconOnly && (
        <span
          className={`flex w-fit text-center leading-tight ${
            lang === 'en' ? 'flex-col-reverse' : 'flex-col'
          }`}
        >
          <span
            className={`text-[10px] font-medium uppercase leading-[1.35] tracking-[0.22em] sm:text-[11px] ${subColor}`}
          >
            {t.logo.line1}
          </span>
          <span
            className={`text-2xl font-bold tracking-normal sm:text-[1.7rem] ${textColor}`}
            aria-label="MINH HUY"
          >
            {'MINH HUY'.split('').map((ch, i) => (
              <span key={i}>{ch === ' ' ? ' ' : ch}</span>
            ))}
          </span>
        </span>
      )}
    </a>
  )
}
