import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { MapPin, Building2, Hash, Phone, X } from 'lucide-react'
import Logo from './Logo'
import { useLanguage } from '../i18n/LanguageContext'

type MapInfo = { label: string; address: string; code: string; query: string }

export default function Footer() {
  const { t, lang } = useLanguage()
  const [mapInfo, setMapInfo] = useState<MapInfo | null>(null)

  // Ngôn ngữ ≠ tiếng Việt: bỏ dấu tên nhân sự + hiển thị SĐT dạng quốc tế (+84)
  const intl = lang !== 'vi'
  const stripVN = (s: string) =>
    s
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D')
  const dispName = (n: string) => (intl ? stripVN(n) : n)
  const dispPhone = (p: string) => (intl ? '+84 ' + p.replace(/^0/, '') : p)
  const telHref = (p: string) => {
    const d = p.replace(/[^0-9]/g, '')
    return intl ? `tel:+84${d.replace(/^0/, '')}` : `tel:${d}`
  }

  useEffect(() => {
    if (!mapInfo) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMapInfo(null)
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [mapInfo])

  const navLinks = [
    { href: '#home', label: t.nav.home },
    { href: '#about', label: t.nav.about },
    { href: '#services', label: t.nav.services },
    { href: '#products', label: t.nav.products },
    { href: '#contact', label: t.nav.contact },
  ]

  return (
    <footer className="relative overflow-hidden border-t border-navy-100 bg-slate-50 text-navy-700">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/4 hidden h-72 w-72 rounded-full bg-navy-200/30 blur-[120px] sm:block" />
        <div className="absolute -bottom-20 right-10 hidden h-64 w-64 rounded-full bg-gold-300/20 blur-[120px] sm:block" />
        <div className="shimmer-line absolute inset-x-0 top-0 h-px animate-shimmer" />
      </div>

      <div className="container-px relative">
        {/* Khối chính */}
        <div className="grid gap-10 py-10 sm:py-12 lg:grid-cols-12 lg:gap-8">
          {/* Cột 1 — Thương hiệu */}
          <div className="lg:col-span-3">
            <Logo variant="dark" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-navy-600">{t.footer.tagline}</p>
          </div>

          {/* Cột 2 — Thông tin công ty (gồm trụ sở & xưởng) */}
          <div className="lg:col-span-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-gold-600">{t.footer.companyTitle}</h3>
            <ul className="mt-5 space-y-4">
              <li className="flex items-start gap-3">
                <Building2 className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />
                <span className="text-sm font-semibold leading-snug text-navy-800">{t.footer.company}</span>
              </li>
              <li className="flex items-center gap-3">
                <Hash className="h-4 w-4 shrink-0 text-gold-600" />
                <span className="text-sm leading-snug text-navy-700">
                  <span className="font-semibold text-navy-800">{t.footer.tax}:</span> 0317945836
                </span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />
                <span className="text-sm leading-snug text-navy-700">
                  <span className="font-semibold text-navy-800">{t.footer.hqLabel}:</span>{' '}
                  <button
                    type="button"
                    onClick={() =>
                      setMapInfo({
                        label: t.footer.hqLabel,
                        address: t.footer.hq,
                        code: 'VHRF+9P Xuân Thới Sơn',
                        query: 'VHRF+9P Xuan Thoi Son, Ho Chi Minh, Vietnam',
                      })
                    }
                    className="text-left transition-colors hover:text-gold-600"
                  >
                    {t.footer.hq}
                  </button>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />
                <span className="text-sm leading-snug text-navy-700">
                  <span className="font-semibold text-navy-800">{t.footer.workshopLabel}:</span>{' '}
                  <button
                    type="button"
                    onClick={() =>
                      setMapInfo({
                        label: t.footer.workshopLabel,
                        address: t.footer.workshop,
                        code: 'JPQJ+6X Hiệp Phước',
                        query: 'JPQJ+6X Hiep Phuoc, Ho Chi Minh, Vietnam',
                      })
                    }
                    className="text-left transition-colors hover:text-gold-600"
                  >
                    {t.footer.workshop}
                  </button>
                </span>
              </li>
            </ul>
          </div>

          {/* Cột 3 — Nhân sự phụ trách */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-bold uppercase tracking-widest text-gold-600">{t.footer.staffTitle}</h3>
            <ul className="mt-5 space-y-4">
              {t.footer.staff.map((s) => (
                <li key={s.phone}>
                  <p className="text-sm font-semibold text-navy-800">{dispName(s.name)}</p>
                  <p className="text-xs text-navy-500">{s.role}</p>
                  <a
                    href={telHref(s.phone)}
                    className="mt-0.5 inline-flex items-center gap-1.5 text-sm font-bold text-navy-700 transition-colors hover:text-gold-600"
                  >
                    <Phone className="h-3.5 w-3.5 text-gold-600" strokeWidth={2.2} />
                    {dispPhone(s.phone)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Cột 4 — Liên kết nhanh */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-bold uppercase tracking-widest text-gold-600">{t.footer.quickLinks}</h3>
            <ul className="mt-5 space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-navy-600 transition-colors hover:text-gold-600">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Thanh bản quyền */}
        <div className="border-t border-navy-100 py-6 text-center">
          <p className="text-xs text-navy-500">
            © {new Date().getFullYear()} Minh Huy. {t.footer.rights}
          </p>
        </div>
      </div>

      {/* Modal bản đồ vị trí (trụ sở / xưởng) */}
      {mapInfo &&
        createPortal(
          <div
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-label={mapInfo.label}
          >
            <div className="absolute inset-0 bg-zinc-900/50 backdrop-blur-md" onClick={() => setMapInfo(null)} />
            <div className="relative flex w-full max-w-lg flex-col overflow-hidden rounded-xl bg-white shadow-card-hover">
              <div className="flex items-start justify-between gap-4 border-b border-navy-100 px-5 py-4">
                <div className="min-w-0">
                  <p className="flex items-center gap-2 text-sm font-bold text-navy-900">
                    <MapPin className="h-4 w-4 shrink-0 text-gold-600" />
                    {mapInfo.label}
                  </p>
                  <p className="mt-1 text-xs leading-snug text-navy-600">{mapInfo.address}</p>
                </div>
                <button
                  onClick={() => setMapInfo(null)}
                  aria-label="Đóng"
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-xl text-navy-500 transition-colors hover:bg-navy-50 hover:text-navy-900"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <iframe
                title={`Bản đồ — ${mapInfo.label}`}
                src={`https://maps.google.com/maps?q=${encodeURIComponent(mapInfo.query)}&z=16&output=embed`}
                className="h-72 w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="flex items-center justify-between gap-3 border-t border-navy-100 px-5 py-3">
                <span className="font-mono text-xs text-navy-600">{mapInfo.code}</span>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapInfo.query)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-gold-600 transition-colors hover:text-gold-700"
                >
                  {lang === 'vi' ? 'Mở Google Maps' : 'Open in Google Maps'} →
                </a>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </footer>
  )
}
