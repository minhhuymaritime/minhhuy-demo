import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { X, ArrowUpRight } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import { asset } from '../lib/asset'
import type { NewsItem } from '../data/news'

/** Modal đọc đầy đủ một tin — render qua portal để thoát ancestor có transform. */
export default function NewsModal({ item, onClose }: { item: NewsItem; onClose: () => void }) {
  const { t, lang } = useLanguage()
  const dl = lang === 'vi' ? 'vi' : 'en' // du lieu tin tuc/chi tiet chi co vi/en -> fallback en

  useEffect(() => {
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
  }, [onClose])

  const fmt = (iso: string) =>
    new Date(iso).toLocaleDateString(lang === 'vi' ? 'vi-VN' : 'en-US', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    })

  const paragraphs = item.body[dl].split('\n\n')

  return createPortal(
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={item.title[dl]}
    >
      <div className="absolute inset-0 bg-zinc-900/50 backdrop-blur-md" onClick={onClose} />

      <div className="relative flex max-h-[90vh] w-full max-w-6xl flex-col overflow-hidden rounded-xl bg-white shadow-card-hover">
        {/* Nút đóng nổi ở góc */}
        <button
          onClick={onClose}
          aria-label="Đóng"
          className="absolute right-5 top-5 z-10 grid h-9 w-9 place-items-center rounded-xl bg-white text-navy-500 shadow-sm ring-1 ring-navy-100 transition-colors hover:bg-navy-50 hover:text-navy-900 sm:right-6 sm:top-6"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Nội dung cuộn — gồm cả tiêu đề */}
        <div className="min-h-0 overflow-y-auto px-8 py-10 sm:px-12 sm:py-12 lg:py-14">
          <div className="mx-auto max-w-4xl">
            <div className="flex items-center gap-3 pr-10">
              <span className="rounded-full bg-gold-300 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-navy-900">
                {item.tag[dl]}
              </span>
              <time className="text-xs font-semibold uppercase tracking-wide text-navy-400">{fmt(item.date)}</time>
            </div>
            <h3 className="mt-3 text-2xl font-bold leading-tight tracking-tight text-navy-900 sm:text-3xl">
              {item.title[dl]}
            </h3>
            {/* Ảnh minh hoạ — bo góc */}
            <img
              src={asset(item.image)}
              alt={item.title[dl]}
              loading="lazy"
              className="mt-7 aspect-[16/7] w-full rounded-xl object-cover"
            />
            <div className="mt-8 space-y-4 text-[15px] leading-relaxed text-navy-600">
              {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            {item.source && (
              <div className="mt-7 border-t border-navy-100 pt-5">
                <p className="mb-4 text-[13px] text-navy-500">
                  {t.news.source}:{' '}
                  <a
                    href={item.source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-navy-700 underline decoration-navy-300 underline-offset-2 hover:text-gold-600"
                  >
                    {item.source.name}
                  </a>
                </p>
                <a
                  href={item.source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex"
                >
                  {t.news.readSource}
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}
