import { useState } from 'react'
import { ShieldCheck, Flame, Package, ArrowRight, Check } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import { useReveal } from '../hooks/useReveal'
import { asset } from '../lib/asset'
import SectionEyebrow from './SectionEyebrow'
import AmbientGlow from './AmbientGlow'
import ServiceDetailModal from './ServiceDetailModal'
import { SERVICE_DETAILS } from '../data/serviceDetails'

const ICONS = [ShieldCheck, Flame, Package]
// Ảnh mỗi dịch vụ (thay bằng ảnh thật khi có)
const IMAGES = ['/images/services/service-maintenance.jpg', '/images/services/service-co2.jpg', '/images/hero/hero-supply.jpg']
// Bật true nếu ảnh dọc, muốn dùng object-contain (không cắt). Mặc định cover lấp đầy ô.
const CONTAIN = [false, false, false]

export default function Services() {
  const { t, lang } = useLanguage()
  const dl = lang === 'vi' ? 'vi' : 'en' // du lieu tin tuc/chi tiet chi co vi/en -> fallback en
  const { ref, visible } = useReveal()
  const [detail, setDetail] = useState<number | null>(null)

  return (
    <section id="services" className="relative bg-slate-50 py-20 sm:py-28">
      <AmbientGlow />
      <div className="container-px relative">
        {/* Tiêu đề */}
        <div
          ref={ref}
          className={`mx-auto max-w-2xl text-center transition-all duration-700 ${
            visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          }`}
        >
          <SectionEyebrow>{t.services.tag}</SectionEyebrow>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl">
            {t.services.heading}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-navy-700">{t.services.sub}</p>
        </div>

        {/* Lưới card */}
        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {t.services.items.map((item, i) => {
            const Icon = ICONS[i]
            return (
              <article
                key={item.title}
                style={{ transitionDelay: `${i * 110}ms` }}
                className={`group flex flex-col overflow-hidden rounded-xl border border-navy-100 bg-white shadow-card transition-all duration-500 hover:-translate-y-1.5 hover:border-gold-300/50 hover:shadow-card-hover ${
                  visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
              >
                {/* Ảnh — khối lớn, riêng, không đè chữ */}
                <div className="relative h-60 overflow-hidden bg-navy-50 sm:h-64">
                  {CONTAIN[i] ? (
                    <>
                      {/* Nền mờ lấp khoảng trống khi ảnh dọc */}
                      <img
                        src={asset(IMAGES[i])}
                        alt=""
                        aria-hidden="true"
                        className="absolute inset-0 h-full w-full scale-110 object-cover opacity-50 blur-xl"
                      />
                      <img
                        src={asset(IMAGES[i])}
                        alt={item.title}
                        loading="lazy"
                        decoding="async"
                        className="relative h-full w-full object-contain transition-transform duration-[900ms] ease-out group-hover:scale-105"
                      />
                    </>
                  ) : (
                    <img
                      src={asset(IMAGES[i])}
                      alt={item.title}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover [filter:saturate(0.96)] transition-transform duration-[900ms] ease-out group-hover:scale-105"
                    />
                  )}
                </div>

                {/* Nội dung — khối trắng gọn */}
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center gap-3">
                    <span
                      className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-navy-50 text-navy-700 transition-colors duration-300 group-hover:bg-gold-300/20 group-hover:text-gold-600 lg:animate-[float-soft_4.5s_ease-in-out_infinite]"
                      style={{ animationDelay: `${i * 0.6}s` }}
                    >
                      <Icon className="h-5 w-5" strokeWidth={2} />
                    </span>
                    <h3 className="text-[15px] font-bold leading-snug text-navy-900 sm:text-base">{item.title}</h3>
                  </div>

                  <p className="mt-2.5 text-sm leading-relaxed text-navy-700">{item.desc}</p>

                  <ul className="mt-3 space-y-1.5">
                    {item.points.map((p) => (
                      <li key={p} className="flex items-start gap-2 text-[13px] font-medium text-navy-700">
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-500" strokeWidth={2.8} />
                        {p}
                      </li>
                    ))}
                  </ul>

                  <button
                    type="button"
                    onClick={() => setDetail(i)}
                    className="group/link mt-auto inline-flex items-center gap-1.5 self-start pt-4 text-sm font-bold text-navy-700 transition-colors hover:text-gold-600"
                  >
                    <span className="relative">
                      {t.services.learnMore}
                      <span className="absolute -bottom-0.5 left-0 h-0.5 w-full origin-left scale-x-0 bg-gold-400 transition-transform duration-300 group-hover/link:scale-x-100" />
                    </span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </div>
              </article>
            )
          })}
        </div>
      </div>

      <ServiceDetailModal
        data={
          detail === null
            ? null
            : { title: t.services.items[detail].title, image: IMAGES[detail], sections: SERVICE_DETAILS[dl][detail] }
        }
        onClose={() => setDetail(null)}
      />
    </section>
  )
}
