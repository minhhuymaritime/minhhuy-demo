import {
  FireExtinguisher,
  Shirt,
  LifeBuoy,
  ThermometerSnowflake,
  Sailboat,
  Droplets,
  Wind,
  Rocket,
  Flame,
  ShieldCheck,
  ArrowUpRight,
} from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import { useReveal } from '../hooks/useReveal'
import { asset } from '../lib/asset'
import SectionEyebrow from './SectionEyebrow'
import AmbientGlow from './AmbientGlow'

const ICONS = [FireExtinguisher, Shirt, LifeBuoy, ThermometerSnowflake, Sailboat, Droplets, Wind, Rocket]
// Ảnh sản phẩm — đặt file trong /public rồi điền đường dẫn vào đây (vd '/sp1.jpg').
// null = tạm dùng icon cho tới khi có ảnh thật.
const IMAGES: (string | null)[] = ['/images/products/product-foam-cmf9.jpg', '/images/products/product-co2-mt5.jpg', '/images/products/product-lifebuoy-fzq25.jpg', '/images/products/product-lifejacket-hxy-a6.jpg', '/images/products/product-firehose-d50.jpg', '/images/products/product-fire-panel-yf3.jpg', '/images/products/product-imo-decal.jpg', '/images/products/product-distress-flare.jpg']
// Badge chứng nhận ở góc ảnh: 'pccc' = Tem kiểm định CA · PCCC (bình chữa cháy),
// 'vr' = Giấy CN sản phẩm công nghiệp · VR (Đăng kiểm VN), 'ccs' = Chứng chỉ CCS, null = không hiển thị.
const CERT: ('pccc' | 'vr' | 'ccs' | null)[] = ['pccc', 'pccc', 'vr', 'vr', 'pccc', 'pccc', null, 'ccs']

export default function Products() {
  const { t } = useLanguage()
  const { ref, visible } = useReveal()

  return (
    <section id="products" className="relative bg-slate-50 py-20 sm:py-28">
      <AmbientGlow />
      <div className="container-px relative">
        <div
          ref={ref}
          className={`mx-auto max-w-4xl text-center transition-all duration-700 ${
            visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          }`}
        >
          <SectionEyebrow>{t.products.tag}</SectionEyebrow>
          <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl">
            {t.products.heading}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-balance text-base leading-relaxed text-navy-700">{t.products.sub}</p>
        </div>

        {/* Lưới thẻ sản phẩm — 2 cột trên mobile, 4 cột desktop */}
        <div className="mt-10 grid grid-cols-2 gap-3 sm:mt-14 sm:gap-5 lg:grid-cols-4">
          {t.products.items.map((item, i) => {
            const Icon = ICONS[i]
            const img = IMAGES[i]
            const cert = CERT[i]
            return (
              <article
                key={item.name}
                style={{ transitionDelay: `${i * 70}ms` }}
                className={`group flex flex-col overflow-hidden rounded-xl border border-navy-100 bg-white shadow-card transition-all duration-500 hover:-translate-y-1.5 hover:border-gold-300/60 hover:shadow-card-hover ${
                  visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
              >
                {/* Ảnh sản phẩm */}
                <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-navy-50 to-slate-100">
                  {img ? (
                    <img
                      src={asset(img)}
                      alt={item.name}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <div className="absolute inset-0 bg-grid-navy bg-dotgrid opacity-40" />
                      <Icon
                        className="relative h-12 w-12 text-navy-300 transition-all duration-500 group-hover:scale-110 group-hover:text-gold-500"
                        strokeWidth={1.6}
                      />
                    </div>
                  )}

                  {/* Badge Bán chạy */}
                  <span
                    className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full border border-gold-200 bg-white/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-gold-700 shadow-sm backdrop-blur lg:animate-[float-soft_4s_ease-in-out_infinite]"
                    style={{ animationDelay: `${i * 0.5}s` }}
                  >
                    <Flame className="h-3 w-3 text-gold-500" strokeWidth={2.6} />
                    {t.products.badge}
                  </span>

                  {/* Badge chứng nhận (PCCC / VR) */}
                  {cert && (
                    <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full border border-navy-100 bg-white/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-navy-700 shadow-sm backdrop-blur transition-opacity duration-300 group-hover:opacity-0">
                      <ShieldCheck className="h-3 w-3 text-emerald-600" strokeWidth={2.4} />
                      {cert === 'ccs'
                        ? t.products.certBadgeCcs
                        : cert === 'vr'
                          ? t.products.certBadgeVr
                          : t.products.certBadge}
                    </span>
                  )}

                  {/* Hành động hiện khi hover */}
                  <a
                    href="#contact"
                    className="absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-center gap-1.5 bg-navy-700/95 py-2.5 text-xs font-bold uppercase tracking-wide text-white backdrop-blur transition-transform duration-300 group-hover:translate-y-0"
                  >
                    {t.products.cta}
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </div>

                {/* Nội dung */}
                <div className="flex flex-1 flex-col p-3 sm:p-4">
                  <h3 className="line-clamp-2 min-h-[2.25rem] text-[13px] font-bold leading-snug text-navy-900 sm:min-h-[2.5rem] sm:text-sm">
                    {item.name}
                  </h3>
                  <p className="mt-1 text-xs font-medium leading-relaxed text-navy-700 sm:mt-1.5 sm:text-[13px]">
                    {t.products.originLabel}: {item.origin}
                  </p>
                  <p className="mt-1 hidden line-clamp-3 whitespace-pre-line text-[13px] font-medium leading-relaxed text-navy-700 sm:block">{item.desc}</p>

                  {/* Giá */}
                  <div className="mt-3 flex items-center justify-between border-t border-navy-100 pt-3 sm:mt-4 sm:pt-3.5">
                    <span className="text-[11px] font-medium uppercase tracking-wide text-navy-500">
                      {t.products.priceLabel}
                    </span>
                    <span className="text-[13px] font-bold text-gold-600 sm:text-sm">{t.products.price}</span>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
