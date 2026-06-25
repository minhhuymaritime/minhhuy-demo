import { useState } from 'react'
import { Facebook, Phone, Mail, Share2, X } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

const FACEBOOK_LINK = 'https://www.facebook.com/dichvuhanghai.minhhuy/'

type Social = {
  icon: LucideIcon
  label: string
  href: string
  external?: boolean
  color: string
}

const socials: Social[] = [
  { icon: Facebook, label: 'Facebook', href: FACEBOOK_LINK, external: true, color: 'bg-[#1877F2]' },
  { icon: Phone, label: 'Gọi 0909.239.268', href: 'tel:0909239268', color: 'bg-emerald-500' },
  { icon: Mail, label: 'dichvuminhhuy@gmail.com', href: 'mailto:dichvuminhhuy@gmail.com', color: 'bg-red-500' },
]

/** Dock mạng xã hội: cột cố định trên desktop; trên mobile gom vào 1 nút bật/tắt (speed-dial). */
export default function SocialDock() {
  const [open, setOpen] = useState(false)

  return (
    <div className="pointer-events-none fixed bottom-5 left-5 z-40 flex flex-col items-start gap-3 sm:gap-4">
      {/* Nhóm nút — mobile: ẩn cho tới khi bấm; desktop: luôn hiện */}
      <div
        className={`flex flex-col gap-3 transition-all duration-300 sm:gap-4 sm:pointer-events-auto sm:translate-y-0 sm:opacity-100 ${
          open ? 'pointer-events-auto translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
        }`}
      >
      {socials.map(({ icon: Icon, label, href, external, color }, i) => (
        <a
          key={label}
          href={href}
          aria-label={label}
          onClick={() => setOpen(false)}
          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          className="group relative"
        >
          <span
            className={`relative grid h-12 w-12 place-items-center overflow-hidden rounded-full text-white shadow-lg transition-[filter,transform] duration-300 group-hover:scale-110 group-hover:brightness-110 ${color}`}
          >
            <Icon className="relative z-10 h-[22px] w-[22px] group-hover:animate-wiggle" strokeWidth={2} />
            {/* Ánh sáng lướt nhẹ định kỳ (lệch pha theo từng nút) */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 -left-2 w-3 -skew-x-[18deg] bg-gradient-to-r from-transparent via-white/50 to-transparent animate-[dock-sheen_5s_ease-in-out_infinite]"
              style={{ animationDelay: `${i * 1.2}s` }}
            />
          </span>

          {/* Nhãn hiện khi hover (desktop) */}
          <span className="pointer-events-none absolute left-full top-1/2 ml-3 hidden -translate-x-1 -translate-y-1/2 whitespace-nowrap rounded-md bg-navy-800 px-2.5 py-1 text-xs font-semibold text-white opacity-0 shadow-md transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 sm:block">
            {label}
          </span>
        </a>
      ))}
      </div>

      {/* Nút bật/tắt — chỉ hiện trên mobile */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Đóng liên hệ nhanh' : 'Liên hệ nhanh'}
        aria-expanded={open}
        className="pointer-events-auto grid h-12 w-12 place-items-center rounded-full bg-navy-600 text-white shadow-lg ring-1 ring-white/15 transition-all duration-300 hover:bg-navy-700 active:scale-95 sm:hidden"
      >
        {open ? <X className="h-[22px] w-[22px]" /> : <Share2 className="h-[21px] w-[21px]" />}
      </button>
    </div>
  )
}
