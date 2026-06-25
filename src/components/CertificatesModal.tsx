import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Award, X, ZoomIn } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import { asset } from '../lib/asset'

// Ảnh giấy chứng nhận — đặt trong /public/certs (khớp thứ tự với services.certsItems).
const CERT_IMAGES = [
  '/images/certificates/cert-co2.jpg',
  '/images/certificates/cert-pccc-1.jpg',
  '/images/certificates/cert-pccc-2.jpg',
  '/images/certificates/cert-cau-xuong.jpg',
  '/images/certificates/cert-be-crv.jpg',
  '/images/certificates/cert-2030.jpg',
]

export default function CertificatesModal({ className = '' }: { className?: string }) {
  const { t } = useLanguage()
  const [open, setOpen] = useState(false)
  const [zoom, setZoom] = useState<number | null>(null)
  const items = t.services.certsItems

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      if (zoom !== null) setZoom(null)
      else setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open, zoom])

  return (
    <>
      {/* Nút mở */}
      <button onClick={() => setOpen(true)} className={`btn-primary ${className}`}>
        <Award className="h-4 w-4 shrink-0 text-gold-300" />
        <span className="sm:hidden">{t.services.certsBtnShort}</span>
        <span className="hidden sm:inline">{t.services.certsBtn}</span>
      </button>

      {/* Modal — render qua portal để thoát khỏi ancestor có transform */}
      {open &&
        createPortal(
          <div
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-label={t.services.certsHeading}
          >
          <div className="absolute inset-0 bg-zinc-900/50 backdrop-blur-md" onClick={() => setOpen(false)} />

          <div className="relative flex max-h-[88vh] w-full max-w-6xl flex-col overflow-hidden rounded-xl bg-white shadow-card-hover">
            {/* Header */}
            <div className="flex items-start justify-between gap-4 border-b border-navy-100 px-8 py-6 sm:px-12 sm:py-8">
              <div>
                <h3 className="text-lg font-bold tracking-tight text-navy-900 sm:text-xl">
                  {t.services.certsHeading}
                </h3>
                <p className="mt-1 text-sm text-navy-500">{t.services.certsSub}</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Đóng"
                className="grid h-9 w-9 shrink-0 place-items-center rounded-xl text-navy-500 transition-colors hover:bg-navy-50 hover:text-navy-900"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Lưới giấy chứng nhận */}
            <div className="grid min-h-0 auto-rows-max gap-6 overflow-y-auto px-8 py-8 sm:grid-cols-2 sm:gap-8 sm:px-12 sm:py-10 lg:grid-cols-3 lg:py-12">
              {CERT_IMAGES.map((src, i) => (
                <button
                  key={src}
                  onClick={() => setZoom(i)}
                  aria-label={items[i]}
                  className="group relative aspect-[3/4] overflow-hidden rounded-xl bg-white shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-hover"
                >
                  <img
                    src={asset(src)}
                    alt={items[i]}
                    loading="lazy"
                    className="h-full w-full object-contain p-2 transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <span className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-1.5 bg-navy-900/0 py-2 text-xs font-semibold text-white opacity-0 transition-all duration-300 group-hover:bg-navy-900/55 group-hover:opacity-100">
                    <ZoomIn className="h-4 w-4" />
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Lightbox phóng to */}
          {zoom !== null && (
            <div
              className="absolute inset-0 z-10 flex items-center justify-center bg-navy-900/90 p-4 sm:p-10"
              onClick={() => setZoom(null)}
            >
              <img
                src={asset(CERT_IMAGES[zoom])}
                alt={items[zoom]}
                className="max-h-full max-w-full rounded-xl object-contain shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />
              <button
                onClick={() => setZoom(null)}
                aria-label="Đóng"
                className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-xl bg-white/15 text-white backdrop-blur transition-colors hover:bg-white/25"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          )}
          </div>,
          document.body,
        )}
    </>
  )
}
