import type { ReactNode } from 'react'

/** Eyebrow: thanh vàng dọc ngắn + chữ in hoa navy (tĩnh, tiết chế). */
export default function SectionEyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.18em] text-navy-700">
      <span aria-hidden="true" className="h-3.5 w-[3px] rounded-full bg-gold-400" />
      {children}
    </span>
  )
}
