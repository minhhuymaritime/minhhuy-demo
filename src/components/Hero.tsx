import { useEffect, useState } from 'react'
import {
  ArrowUpRight,
  ShieldCheck,
  BadgeCheck,
  Clock,
  ClipboardCheck,
  Flame,
  LifeBuoy,
} from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import { asset } from '../lib/asset'
import CertificatesModal from './CertificatesModal'
import CertificateScene from './scenes/CertificateScene'
import Co2Scene from './scenes/Co2Scene'
import SuppliesScene from './scenes/SuppliesScene'

// Đường sóng tuần hoàn (chu kỳ 300, lặp liền mạch khi trượt -50%)
const WAVE_PATH =
  'M0,40 C75,40 75,80 150,80 C225,80 225,40 300,40 C375,40 375,80 450,80 C525,80 525,40 600,40 C675,40 675,80 750,80 C825,80 825,40 900,40 C975,40 975,80 1050,80 C1125,80 1125,40 1200,40 L1200,120 L0,120 Z'

export default function Hero() {
  const { t } = useLanguage()

  // Showcase dịch vụ tự xoay vòng (ảnh crop dọc)
  const showcase = [
    {
      icon: ClipboardCheck,
      title: t.hero.serviceA,
      scene: 'certificate' as string | undefined,
      img: '/images/hero/hero-inspection.jpg',
      imgPos: 'object-center',
    },
    {
      icon: Flame,
      title: t.hero.serviceB,
      scene: 'co2' as string | undefined,
      img: '/images/hero/hero-co2.jpg',
      imgPos: 'object-center',
    },
    {
      icon: LifeBuoy,
      title: t.hero.serviceC,
      scene: 'supplies' as string | undefined,
      img: '/images/hero/hero-supply.jpg',
      imgPos: 'object-[68%_center]',
    },
  ]

  const [active, setActive] = useState(0)
  const [stage, setStage] = useState(0) // 0: chỉ icon · 1: + tiêu đề · 2: + nội dung
  // Chỉ bắt đầu chạy scene khi màn intro đã biến mất
  const [started, setStarted] = useState(() => {
    if (typeof window === 'undefined') return false
    if ((window as typeof window & { __introDone?: boolean }).__introDone === true) return true
    try { return !!sessionStorage.getItem('mh-entered') } catch { return false }
  })

  useEffect(() => {
    if (started) return
    const onDone = () => setStarted(true)
    window.addEventListener('intro:done', onDone)
    return () => window.removeEventListener('intro:done', onDone)
  }, [started])

  // Điều phối animation 3 giai đoạn rồi chuyển mục, lặp vô tận
  useEffect(() => {
    if (!started) {
      setStage(0) // đợi intro: chỉ hiện icon, chưa chạy
      return
    }
    setStage(0)
    // Mục 3 (danh mục vật tư) giữ lâu hơn để đọc kịp
    const hold = active === 2 ? 1800 : 0
    const timers = [
      setTimeout(() => setStage(1), 500), // nở sang phải + tiêu đề
      setTimeout(() => setStage(2), 1300), // xổ xuống + ảnh
      setTimeout(() => setStage(1), 5100 + hold), // thu ảnh lên
      setTimeout(() => setStage(0), 5900 + hold), // thu về icon
      setTimeout(() => setActive((a) => (a + 1) % 3), 6600 + hold), // chuyển mục
    ]
    return () => timers.forEach((tm) => clearTimeout(tm))
  }, [active, started])

  const current = showcase[active]
  const CurrentIcon = current.icon

  const trust = [
    { icon: ShieldCheck, label: t.hero.trust1 },
    { icon: BadgeCheck, label: t.hero.trust2 },
    { icon: Clock, label: t.hero.trust3 },
  ]

  // Hiện showcase dịch vụ ở cột phải (false = hiện panel ảnh xuồng cứu sinh)
  const showBubbles = true

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-white pt-28 pb-20 sm:pt-32 sm:pb-28 lg:pt-36"
    >
      {/* Lớp nền hàng hải: gradient trời→biển + đốm sáng + sóng động ở đáy */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Gradient trời → biển */}
        <div className="absolute inset-0 bg-gradient-to-b from-sky-50 via-white to-navy-50" />
        {/* Lưới chấm công nghệ + đốm sáng thương hiệu */}
        <div className="absolute inset-0 animate-pulse-soft bg-grid-navy bg-dotgrid opacity-20 [mask-image:radial-gradient(ellipse_at_top,black,transparent_60%)]" />
        <div className="absolute -top-24 right-0 hidden h-96 w-96 rounded-full bg-gold-300/25 blur-[120px] sm:block" />
        <div className="absolute top-1/4 -left-24 hidden h-80 w-80 rounded-full bg-navy-200/40 blur-[120px] sm:block" />

        {/* Sóng biển xếp lớp ở đáy (parallax) */}
        <svg
          className="absolute -bottom-1 left-0 h-20 w-[200%] animate-wave-x text-blue-300/80 sm:h-36 sm:text-navy-200 lg:h-44"
          style={{ animationDuration: '30s' }}
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d={WAVE_PATH} fill="currentColor" />
        </svg>
        <svg
          className="absolute -bottom-1 left-0 hidden h-28 w-[200%] animate-wave-x text-navy-300/70 [animation-direction:reverse] sm:block lg:h-36"
          style={{ animationDuration: '21s' }}
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d={WAVE_PATH} fill="currentColor" />
        </svg>
        {/* Lớp sóng vàng ấm phía dưới (yếu tố an toàn/ánh nắng) */}
        <svg
          className="absolute -bottom-1 left-0 hidden h-32 w-[200%] animate-wave-x text-gold-300/55 [animation-direction:reverse] sm:block lg:h-40"
          style={{ animationDuration: '19s' }}
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d={WAVE_PATH} fill="currentColor" />
        </svg>
        {/* Vệt sóng sáng (ánh nước) */}
        <svg
          className="absolute bottom-6 left-0 hidden h-20 w-[200%] animate-wave-x text-sky-300/65 sm:block lg:h-24"
          style={{ animationDuration: '15s' }}
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d={WAVE_PATH} fill="currentColor" />
        </svg>
        {/* Sóng trước cùng tông slate hòa vào section dưới */}
        <svg
          className="absolute -bottom-1 left-0 h-14 w-[200%] animate-wave-x text-slate-50 sm:h-20 lg:h-28"
          style={{ animationDuration: '13s' }}
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d={WAVE_PATH} fill="currentColor" />
        </svg>

        {/* Phủ sáng vùng chữ bên trái cho dễ đọc */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/75 via-white/25 to-transparent" />
      </div>

      <div className="container-px relative grid items-start gap-14 lg:grid-cols-[1.35fr_1fr]">
        {/* Cột trái: nội dung (xuất hiện lần lượt) */}
        <div>
          <span className="badge animate-fade-up">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-gold-400" />
            </span>
            {t.hero.badge}
          </span>

          <h1 className="mt-6 flex animate-fade-up flex-col gap-2.5 text-[2rem] font-bold leading-[1.08] tracking-tight text-navy-900 [animation-delay:80ms] sm:gap-3 sm:text-[2.6rem] lg:text-[3.4rem]">
            <span>{t.hero.title1}</span>
            <span className="relative isolate inline-block w-fit whitespace-nowrap text-navy-700">
              {/* Dải sóng vàng gợn sóng phía sau chữ */}
              <svg
                className="pointer-events-none absolute inset-x-0 bottom-[0.06em] -z-10 h-[0.74em] w-full"
                viewBox="0 0 100 16"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path fill="#FFC55A">
                  <animate
                    attributeName="d"
                    dur="3.5s"
                    repeatCount="indefinite"
                    values="M0,6 C8.3,1 16.7,1 25,6 C33.3,11 41.7,11 50,6 C58.3,1 66.7,1 75,6 C83.3,11 91.7,11 100,6 L100,16 L0,16 Z;
                            M0,6 C8.3,11 16.7,11 25,6 C33.3,1 41.7,1 50,6 C58.3,11 66.7,11 75,6 C83.3,1 91.7,1 100,6 L100,16 L0,16 Z;
                            M0,6 C8.3,1 16.7,1 25,6 C33.3,11 41.7,11 50,6 C58.3,1 66.7,1 75,6 C83.3,11 91.7,11 100,6 L100,16 L0,16 Z"
                  />
                </path>
              </svg>
              <span className="relative z-10">{t.hero.titleAccent}</span>
            </span>
            <span>{t.hero.title2}</span>
          </h1>

          <p className="mt-6 max-w-xl animate-fade-up text-sm font-medium leading-relaxed text-navy-600 [animation-delay:160ms] sm:text-base">
            {t.hero.subtitle}
          </p>

          <div className="mt-9 flex animate-fade-up items-stretch gap-3 [animation-delay:240ms] sm:items-center">
            <a href="#services" className="btn-accent flex-1 justify-center text-center sm:flex-none">
              {t.hero.ctaSecondary}
              <ArrowUpRight className="h-4 w-4 shrink-0" />
            </a>
            <CertificatesModal className="flex-1 justify-center text-center sm:flex-none" />
          </div>

          {/* Dải tin cậy */}
          <div className="mt-10 flex animate-fade-up flex-wrap items-center gap-x-6 gap-y-3 border-t border-navy-100 pt-6 [animation-delay:320ms]">
            {trust.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="group flex items-center gap-2 text-sm font-medium text-navy-500 transition-colors hover:text-navy-800"
              >
                <span className="grid h-6 w-6 place-items-center rounded-md bg-gold-50 transition-colors group-hover:bg-gold-100">
                  <Icon className="h-4 w-4 text-gold-600 group-hover:animate-wiggle" />
                </span>
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* Cột phải: bong bóng dịch vụ HOẶC bảng số liệu năng lực */}
        <div className="relative hidden min-h-[33rem] animate-fade-up [animation-delay:160ms] lg:block">
          {showBubbles ? (
            <>
              {/* Showcase không khung — icon → sổ tiêu đề → xổ ảnh xuống */}
              <div className="absolute inset-x-0 top-1 flex justify-center pr-16">
                <div className="group w-[24rem]">
                  {/* Hàng: icon + tiêu đề sổ ra phải */}
                  <div className="flex items-center gap-4 [perspective:700px]">
                    <span
                      key={active}
                      className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-navy-50 text-navy-600 transition-colors duration-300 animate-[flip-in_750ms_ease-out] group-hover:bg-gold-300/20 group-hover:text-gold-500"
                    >
                      <CurrentIcon className="h-7 w-7 group-hover:animate-wiggle" strokeWidth={2} />
                    </span>
                    <h3
                      className="line-clamp-2 text-lg font-bold leading-snug tracking-tight text-navy-600 transition-all duration-700 ease-out"
                      style={{
                        opacity: stage >= 1 ? 1 : 0,
                        clipPath: stage >= 1 ? 'inset(0 0 0 0)' : 'inset(0 100% 0 0)',
                      }}
                    >
                      {current.title}
                    </h3>
                  </div>

                  {/* Vùng minh họa xổ xuống: scene động HOẶC ảnh (crop dọc) */}
                  {/* px/py để shadow của scene không bị overflow cắt xén */}
                  <div
                    className="overflow-hidden px-5 py-5 transition-all duration-700 ease-out"
                    style={{
                      maxHeight: stage >= 2 ? '26.5rem' : '0',
                      opacity: stage >= 2 ? 1 : 0,
                      marginTop: stage >= 2 ? '0.5rem' : '0',
                    }}
                  >
                    {current.scene ? (
                      stage >= 1 ? (
                        current.scene === 'certificate' ? (
                          <CertificateScene key={active} />
                        ) : current.scene === 'co2' ? (
                          <Co2Scene key={active} />
                        ) : (
                          <SuppliesScene key={active} />
                        )
                      ) : null
                    ) : (
                      <div className="relative overflow-hidden rounded-xl shadow-[0_20px_44px_-18px_rgba(15,34,64,0.5)]">
                        <img
                          key={active}
                          src={asset(current.img)}
                          alt={current.title}
                          className={`h-[24rem] w-full object-cover [filter:saturate(0.88)_contrast(1.04)] ${current.imgPos}`}
                          loading="eager"
                          decoding="async"
                        />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950/35 via-navy-900/12 to-navy-800/8" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </>
          ) : (
            /* Panel ảnh xuồng cứu sinh */
            <div className="flex h-full min-h-[26rem] items-center justify-center">
              <div className="relative w-full">
                <div className="overflow-hidden rounded-[1.75rem] border border-white/70 shadow-card-hover ring-1 ring-navy-900/[0.06]">
                  <img
                    src={asset('/images/news/news-imo-lsa.jpg')}
                    alt="Xuồng cứu sinh trên tàu hàng hải"
                    className="h-[26rem] w-full object-cover object-center"
                    loading="eager"
                    decoding="async"
                  />
                  {/* Lớp tối nhẹ ở đáy ảnh tạo chiều sâu */}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-navy-950/35 to-transparent" />
                </div>

                {/* Huy hiệu IMO/SOLAS nổi */}
                <div className="absolute -bottom-4 -left-4 flex animate-float items-center gap-3 rounded-xl border border-white/70 bg-white/85 px-4 py-3 shadow-card-hover ring-1 ring-navy-900/[0.06] backdrop-blur-md">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-gold-300 text-navy-900">
                    <BadgeCheck className="h-5 w-5" strokeWidth={2.4} />
                  </span>
                  <div className="leading-tight">
                    <p className="text-xs font-bold text-navy-900">IMO / SOLAS</p>
                    <p className="text-[11px] text-navy-500">Certified</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
