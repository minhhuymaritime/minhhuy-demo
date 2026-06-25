import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { X, ArrowUpRight } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import type { ServiceSection } from '../data/serviceDetails'

type Data = { title: string; image: string; sections: ServiceSection[] }

export default function ServiceDetailModal({ data, onClose }: { data: Data | null; onClose: () => void }) {
  const { t } = useLanguage()

  useEffect(() => {
    if (!data) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [data, onClose])

  if (!data) return null

  return createPortal(
    <div
      className="fixed inset-0 z-[60] flex sm:items-center sm:justify-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={data.title}
    >
      <div className="absolute inset-0 bg-zinc-900/50 backdrop-blur-md" onClick={onClose} />

      <div className="relative flex h-full w-full flex-col overflow-hidden rounded-none bg-white shadow-card-hover sm:h-auto sm:max-h-[92vh] sm:max-w-6xl sm:rounded-xl">
        {/* Nút đóng nổi ở góc */}
        <button
          onClick={onClose}
          aria-label="Đóng"
          className="absolute right-5 top-5 z-10 grid h-9 w-9 place-items-center rounded-xl bg-white text-navy-500 shadow-sm ring-1 ring-navy-100 transition-colors hover:bg-navy-50 hover:text-navy-900 sm:right-6 sm:top-6"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Nội dung cuộn — gồm cả tiêu đề */}
        <div className="min-h-0 flex-1 space-y-5 overflow-y-auto bg-slate-50 px-4 py-6 sm:space-y-6 sm:px-16 sm:py-12 lg:px-20 lg:py-16">
          <h3 className="pr-10 text-xl font-bold leading-tight tracking-tight text-navy-900 sm:text-3xl">
            {data.title}
          </h3>
          {data.sections.map((sec) => (
            <section
              key={sec.heading}
              className="rounded-xl border border-navy-100 bg-white p-4 shadow-[0_4px_20px_-12px_rgba(15,34,64,0.25)] sm:p-8"
            >
              {/* Tiêu đề mục — gạch vàng nổi bật */}
              <div className="flex items-center gap-3">
                <span aria-hidden="true" className="h-7 w-1.5 shrink-0 rounded-full bg-gradient-to-b from-gold-300 to-gold-500" />
                <h4 className="text-lg font-bold tracking-tight text-navy-900 sm:text-xl">{sec.heading}</h4>
              </div>

              {sec.body && <p className="mt-4 text-[15px] leading-7 text-navy-600 sm:text-base">{sec.body}</p>}

              {sec.items && sec.timeline && (
                <ol className="mt-5 grid gap-x-6 gap-y-6 sm:mt-7 sm:gap-y-9 sm:grid-cols-2 lg:grid-cols-4">
                  {sec.items.map((it, idx) => (
                    <li key={it.label ?? it.text} className="relative flex gap-4 sm:block">
                      {/* đường nối dọc (mobile) */}
                      {idx < sec.items!.length - 1 && (
                        <span className="absolute left-[1.375rem] top-12 -bottom-6 w-px -translate-x-1/2 bg-navy-200 sm:hidden" />
                      )}
                      {/* đường nối ngang (desktop) */}
                      {idx < sec.items!.length - 1 && (
                        <span className="shimmer-line absolute left-12 -right-6 top-[21px] hidden h-0.5 animate-shimmer rounded-full bg-navy-200 lg:block" />
                      )}
                      <span className="relative z-10 grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-to-br from-navy-600 to-navy-700 text-base font-bold text-white shadow-[0_6px_16px_-6px_rgba(35,76,140,0.7)] ring-4 ring-white">
                        {idx + 1}
                      </span>
                      <div className="min-w-0 pb-1 sm:pb-0">
                        <p className="text-[15px] font-bold leading-snug text-navy-900 sm:mt-4">{it.label}</p>
                        {it.text && <p className="mt-1.5 text-sm leading-relaxed text-navy-600">{it.text}</p>}
                        {it.sub && (
                          <ul className="mt-2 space-y-1">
                            {it.sub.map((s) => (
                              <li key={s} className="flex items-start gap-1.5 text-[13px] leading-snug text-navy-600">
                                <span className="mt-[6px] h-1 w-1 shrink-0 rounded-full bg-gold-500" />
                                {s}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </li>
                  ))}
                </ol>
              )}

              {sec.items && !sec.timeline && (
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {sec.items.map((it) => (
                    <li key={it.label ?? it.text} className="rounded-xl border border-navy-100/70 bg-slate-50 p-4 sm:p-5">
                      <p className="text-[15px] leading-relaxed text-navy-700">
                        {it.label && (
                          <span className="font-bold text-navy-900">
                            {it.label}
                            {it.text ? ': ' : ''}
                          </span>
                        )}
                        {it.text}
                      </p>
                      {it.sub && (
                        <ul className="mt-2.5 space-y-1.5">
                          {it.sub.map((s) => (
                            <li key={s} className="flex items-start gap-2 text-sm leading-snug text-navy-600">
                              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" />
                              {s}
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          <a href="#contact" onClick={onClose} className="btn-primary mt-10 w-full sm:w-auto">
            {t.services.contactBtn}
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>,
    document.body,
  )
}
