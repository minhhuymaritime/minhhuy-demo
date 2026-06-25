import { useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { QrCode, Minus } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'

const ZALO_LINK = 'https://zalo.me/0909239268'

/**
 * Thẻ QR Zalo neo cạnh phải.
 * - Mở: thẻ đầy đủ (tiêu đề + QR), bấm nút thu nhỏ để co lại.
 * - Thu nhỏ: chỉ còn một icon tròn nhỏ; bấm để bung ra lại.
 * Chỉ hiện trên desktop (mobile dùng nút Zalo chạm ở góc dưới-phải).
 */
export default function QrDock() {
  const { t } = useLanguage()
  const [open, setOpen] = useState(true)

  return (
    <>
      {/* Icon tròn khi thu nhỏ */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Mở mã QR Zalo"
        className={`fixed right-3 top-1/2 z-40 hidden h-11 w-11 -translate-y-1/2 animate-glow place-items-center rounded-full border border-gold-300/40 bg-navy-600 text-white shadow-card-hover transition-all duration-300 hover:bg-navy-700 lg:grid ${
          open ? 'pointer-events-none scale-0 opacity-0' : 'scale-100 opacity-100'
        }`}
      >
        <QrCode className="h-5 w-5 text-gold-300" />
      </button>

      {/* Thẻ QR đầy đủ */}
      <div
        className={`fixed right-0 top-1/2 z-40 hidden origin-right -translate-y-1/2 transition-all duration-300 ease-out lg:block ${
          open ? 'scale-100 opacity-100' : 'pointer-events-none scale-90 opacity-0'
        }`}
      >
        <div className="w-[132px] overflow-hidden rounded-l-xl border border-r-0 border-white/50 bg-white/25 shadow-card-hover backdrop-blur-md">
          {/* Tiêu đề ngang + nút thu nhỏ */}
          <button
            onClick={() => setOpen(false)}
            aria-label="Thu nhỏ mã QR"
            className="flex w-full items-center justify-between gap-1.5 bg-navy-600 px-2.5 py-2 text-white transition-colors hover:bg-navy-700"
          >
            <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide">
              <QrCode className="h-3.5 w-3.5 text-gold-300" />
              {t.hero.qrDockTab}
            </span>
            <Minus className="h-3.5 w-3.5 text-gold-300" />
          </button>

          {/* QR */}
          <div className="flex flex-col items-center gap-2 p-2.5">
            <div className="relative rounded-xl border border-white/60 bg-white/45 p-2 shadow-card backdrop-blur">
              <span className="absolute left-1 top-1 h-3 w-3 rounded-tl border-l-2 border-t-2 border-gold-400" />
              <span className="absolute right-1 top-1 h-3 w-3 rounded-tr border-r-2 border-t-2 border-gold-400" />
              <span className="absolute bottom-1 left-1 h-3 w-3 rounded-bl border-b-2 border-l-2 border-gold-400" />
              <span className="absolute bottom-1 right-1 h-3 w-3 rounded-br border-b-2 border-r-2 border-gold-400" />
              <a href={ZALO_LINK} target="_blank" rel="noopener noreferrer" aria-label="Mở Zalo Minh Huy">
                <QRCodeSVG
                  value={ZALO_LINK}
                  size={84}
                  bgColor="transparent"
                  fgColor="#152a4c"
                  level="M"
                  marginSize={0}
                />
              </a>
            </div>
            <p className="text-center text-[10px] font-bold uppercase tracking-wide leading-tight text-navy-800">
              {t.hero.qrDockLabel}
            </p>
            <div className="text-center leading-tight">
              <p className="text-[10px] font-bold text-navy-700">Mr. Rzuy Anh</p>
              <p className="text-[10px] font-medium text-navy-500">0909.239.268</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
