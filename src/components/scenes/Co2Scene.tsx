import { useLanguage } from '../../i18n/LanguageContext'

/** Scene "Thi công hệ thống CO2": trạm CO2 (ống góp + van an toàn + đồng hồ áp + dãy bình). */
export default function Co2Scene() {
  const { t } = useLanguage()
  const cyls = [0, 1, 2, 3, 4]

  return (
    <div className="flex h-[24rem] w-full items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-[16rem] pt-14">
          {/* Van an toàn + đồng hồ áp trên ống góp */}
          <SafetyValve />
          <ManifoldGauge />

          {/* Ống góp (manifold) — cao hơn các bình */}
          <div
            className="absolute inset-x-2 top-14 z-10 h-2.5 origin-left animate-[line-in_700ms_ease-out_both] rounded-full bg-gradient-to-b from-navy-600 to-navy-800 shadow-sm"
            style={{ animationDelay: '200ms' }}
          />

          {/* Dãy bình CO2 */}
          <div className="grid grid-cols-5">
            {cyls.map((i) => (
              <Cylinder key={i} delay={760 + i * 220} />
            ))}
          </div>
        </div>

        <span className="text-sm font-semibold tracking-wide text-navy-400">{t.hero.scene.co2Pressure}</span>
      </div>
    </div>
  )
}

function Cylinder({ delay }: { delay: number }) {
  return (
    <div className="flex flex-col items-center">
      {/* Dây mềm (pigtail) nối van lên ống góp — dày dặn */}
      <svg viewBox="0 0 22 40" className="h-10 w-[1.55rem]" aria-hidden="true">
        <path
          d="M11 2 C 11 13, 5 16, 7.5 26 C 8.5 33, 11 34, 11 39"
          fill="none"
          stroke="#8aa6d4"
          strokeWidth="4"
          strokeLinecap="round"
          className="animate-[draw-line_500ms_ease-out_both]"
          style={{ strokeDasharray: 64, animationDelay: `${delay + 430}ms` }}
        />
      </svg>

      {/* Van đầu bình: thân van + tay vặn tròn + cổng ra */}
      <svg
        viewBox="0 0 28 18"
        className="-mt-1 h-[1.2rem] w-7 animate-[pop_300ms_ease-out_both]"
        style={{ animationDelay: `${delay + 320}ms` }}
        aria-hidden="true"
      >
        <circle cx="14" cy="4" r="3.6" fill="none" stroke="#1e3a6b" strokeWidth="2" />
        <rect x="13" y="4" width="2" height="4" fill="#1e3a6b" />
        <rect x="9.5" y="7" width="9" height="8" rx="1.6" fill="#234c8c" />
        <rect x="2.5" y="8.5" width="8" height="3.6" rx="1.8" fill="#2f5aa6" />
      </svg>

      {/* Cổ bình */}
      <span
        className="-mt-px h-1.5 w-7 animate-[pop_300ms_ease-out_both] rounded-sm bg-navy-300"
        style={{ animationDelay: `${delay + 360}ms` }}
      />

      {/* Thân bình */}
      <div
        className="relative -mt-px h-[11rem] w-11 animate-[assemble-up_520ms_cubic-bezier(0.3,0.9,0.25,1)_both] overflow-hidden rounded-b-md rounded-t-2xl border-2 border-navy-400 bg-white"
        style={{ animationDelay: `${delay}ms` }}
      >
        <span className="absolute inset-x-0 top-11 h-5 bg-navy-50" />
        <span className="absolute inset-x-0 bottom-0 h-2 bg-navy-100" />
        <span className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-lg font-bold tracking-tight text-navy-600">
          CO₂
        </span>
      </div>
    </div>
  )
}

/** Van an toàn gắn đứng trên ống góp — kiểu hộp vuông vức. */
function SafetyValve() {
  return (
    <svg
      viewBox="0 0 26 44"
      className="absolute left-[20%] top-2 z-20 h-12 w-[1.65rem] animate-[pop_320ms_ease-out_both]"
      style={{ animationDelay: '900ms' }}
      aria-hidden="true"
    >
      <rect x="9" y="36" width="6" height="6" fill="#234c8c" />
      <rect x="4" y="17" width="16" height="19" rx="1.5" fill="#2f5aa6" />
      <rect x="20" y="22" width="6" height="7" rx="1" fill="#234c8c" />
      <rect x="7" y="6" width="10" height="11" rx="1" fill="#1e3a6b" />
      <rect x="9.5" y="1.5" width="5" height="5" rx="1" fill="#FFC55A" />
    </svg>
  )
}

/** Đồng hồ áp suất mặt tròn gắn trên ống góp. */
function ManifoldGauge() {
  return (
    <svg
      viewBox="0 0 30 44"
      className="absolute left-[56%] top-0 z-20 h-[3.4rem] w-[2.1rem] animate-[pop_320ms_ease-out_both]"
      style={{ animationDelay: '1080ms' }}
      aria-hidden="true"
    >
      <rect x="12.5" y="30" width="5" height="12" rx="1" fill="#234c8c" />
      <circle cx="15" cy="17" r="13" fill="white" stroke="#234c8c" strokeWidth="2.4" />
      <circle cx="15" cy="17" r="10" fill="none" stroke="#dbe6f7" strokeWidth="1" />
      <circle cx="24" cy="10" r="1.4" fill="#FFC55A" />
      <rect
        x="14.1"
        y="8"
        width="1.8"
        height="10"
        rx="0.9"
        fill="#1e4178"
        className="animate-[needle-sweep_900ms_cubic-bezier(0.3,0.9,0.25,1)_both]"
        style={{ transformBox: 'fill-box', transformOrigin: 'bottom', animationDelay: '2000ms' }}
      />
      <circle cx="15" cy="17" r="2.4" fill="#1e4178" />
    </svg>
  )
}
