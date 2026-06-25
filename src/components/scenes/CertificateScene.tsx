import { asset } from '../../lib/asset'

/** Scene "Kiểm định & cấp giấy chứng nhận": tờ A4 có watermark, huy chương, chữ ký & con dấu. */
export default function CertificateScene() {
  const lines = ['94%', '78%', '90%', '70%', '86%', '64%', '82%', '58%']

  return (
    <div className="flex h-[24rem] w-full items-center justify-center">
      <div className="relative -translate-y-1">
        {/* Tờ phía sau tạo cảm giác xấp giấy */}
        <div
          className="absolute inset-0 translate-x-[10px] translate-y-[9px] animate-[fade-in_500ms_ease-out_both] rounded-xl border border-navy-100 bg-white shadow-md"
          style={{ animationDelay: '80ms' }}
        />

        {/* Tờ chứng nhận chính — tỉ lệ A4 (210×297) */}
        <div className="relative z-10 flex aspect-[210/297] w-[16rem] flex-col overflow-hidden rounded-xl border border-navy-100 bg-white shadow-xl">
          {/* Watermark logo mờ */}
          <img
            src={asset('/images/brand/logo.png')}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-[54%] w-36 -translate-x-1/2 -translate-y-1/2 opacity-[0.045]"
          />

          <div className="relative flex flex-1 flex-col px-7 py-5">
            {/* Header — logo + tiêu đề trên 1 hàng */}
            <div className="flex items-center justify-center gap-3">
              <img src={asset('/images/brand/logo.png')} alt="Minh Huy" className="h-11 w-11 shrink-0 rounded-full object-contain" />
              <p
                className="animate-[fade-up_500ms_ease-out_both] text-[13px] font-bold uppercase leading-tight tracking-wide text-navy-800"
                style={{ animationDelay: '160ms' }}
              >
                Certificate of Inspection
              </p>
            </div>

            {/* Gạch vàng dưới tiêu đề */}
            <div
              className="mx-auto mt-3 h-0.5 w-20 animate-[fade-in_500ms_ease-out_both] rounded-full bg-gradient-to-r from-gold-200 via-gold-400 to-gold-200"
              style={{ animationDelay: '320ms' }}
            />

            {/* Dòng chữ tượng trưng chạy hiện lần lượt */}
            <div className="mt-4 space-y-2.5">
              {lines.map((w, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span
                    className="h-1.5 w-1.5 shrink-0 animate-[pop_280ms_ease-out_both] rounded-full bg-gold-400"
                    style={{ animationDelay: `${460 + i * 150}ms` }}
                  />
                  <div
                    className={`h-2 origin-left animate-[line-in_440ms_ease-out_both] rounded ${
                      i % 2 === 0 ? 'bg-navy-200' : 'bg-slate-200'
                    }`}
                    style={{ width: w, animationDelay: `${500 + i * 150}ms` }}
                  />
                </div>
              ))}
            </div>

            {/* Chữ ký + con dấu — ghim đáy tờ */}
            <div className="mt-auto flex items-end justify-between pt-4">
              <div className="space-y-1">
                <Signature />
                <div className="h-px w-24 bg-navy-200" />
                <p className="text-[8px] font-semibold uppercase tracking-wide text-navy-400">Authorized Surveyor</p>
              </div>

              <div className="relative h-[4.25rem] w-[4.25rem]">
                <span
                  className="absolute inset-0 animate-[stamp-ring_650ms_ease-out_both] rounded-full border-[3px] border-gold-400/70"
                  style={{ animationDelay: '2380ms' }}
                />
                <div
                  className="h-full w-full animate-[stamp-drop_600ms_cubic-bezier(0.3,0.9,0.25,1)_both]"
                  style={{ animationDelay: '2080ms' }}
                >
                  <StampSeal />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/** Chữ ký viết tay tự nhiên — nét chính + gạch chân bay, vẽ ra như đang ký. */
function Signature() {
  return (
    <svg viewBox="0 0 92 38" className="h-7 w-[5.6rem]" aria-hidden="true">
      {/* Nét chữ ký cursive (ngắn) */}
      <path
        d="M3 25 C 5 11, 12 3, 15 14 C 18 25, 13 29, 13 18 C 13 7, 21 8, 22 19 C 24 28, 30 27, 34 17 C 39 7, 46 25, 53 16 C 61 7, 72 22, 86 10"
        fill="none"
        stroke="#1e3a6b"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={1}
        className="animate-[draw_750ms_ease-out_both]"
        style={{ strokeDasharray: 1, animationDelay: '1500ms' }}
      />
    </svg>
  )
}

/** Con dấu tròn (mực navy) với chữ vòng + dấu tích. */
function StampSeal() {
  return (
    <svg viewBox="0 0 80 80" className="h-full w-full text-navy-600/90" aria-hidden="true">
      <circle cx="40" cy="40" r="37" fill="none" stroke="currentColor" strokeWidth="2.4" />
      <circle cx="40" cy="40" r="29" fill="none" stroke="currentColor" strokeWidth="1.1" />
      <path id="sealArc" d="M40 9 A31 31 0 1 1 39.9 9" fill="none" />
      <text className="fill-current text-[6px] font-bold uppercase" style={{ letterSpacing: '1.3px' }}>
        <textPath href="#sealArc" startOffset="1%">
          KIỂM ĐỊNH · CERTIFIED · IMO/SOLAS ·
        </textPath>
      </text>
      <path
        d="M28 40 l8.5 8.5 16-19"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
