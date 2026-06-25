import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import { useReveal } from '../hooks/useReveal'
import SectionEyebrow from './SectionEyebrow'
import { asset } from '../lib/asset'
import AmbientGlow from './AmbientGlow'
import NewsModal from './NewsModal'
import { NEWS, type NewsItem } from '../data/news'

/** Section "Tin tức": 1 tin nổi bật lớn + danh sách tin nhỏ; bấm thẻ mở modal đọc đầy đủ. */
export default function News() {
  const { t, lang } = useLanguage()
  const dl = lang === 'vi' ? 'vi' : 'en' // du lieu tin tuc/chi tiet chi co vi/en -> fallback en
  const { ref, visible } = useReveal()
  const [selected, setSelected] = useState<NewsItem | null>(null)

  // Sắp xếp theo ngày mới nhất -> cũ; tin mới nhất là tin nổi bật
  const sorted = [...NEWS].sort((a, b) => b.date.localeCompare(a.date))
  const [featured, ...rest] = sorted
  const fmt = (iso: string) =>
    new Date(iso).toLocaleDateString(lang === 'vi' ? 'vi-VN' : 'en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })

  return (
    <section id="news" className="relative bg-white py-20 sm:py-28">
      <AmbientGlow />
      <div className="container-px relative">
        {/* Header */}
        <div
          ref={ref}
          className={`mx-auto max-w-4xl text-center transition-all duration-700 ${
            visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          }`}
        >
          <SectionEyebrow>{t.news.tag}</SectionEyebrow>
          <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl">
            {t.news.heading}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-balance text-base leading-relaxed text-navy-700">
            {t.news.sub}
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {/* Tin nổi bật */}
          <button
            onClick={() => setSelected(featured)}
            className="group relative flex flex-col overflow-hidden rounded-xl border border-navy-100 bg-white text-left shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <img
                src={asset(featured.image)}
                alt={featured.title[dl]}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <span className="absolute left-4 top-4 rounded-full bg-gold-300 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-navy-900 shadow-sm">
                {featured.tag[dl]}
              </span>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950/30 to-transparent" />
            </div>
            <div className="flex flex-1 flex-col p-6">
              <time className="text-xs font-semibold uppercase tracking-wide text-navy-500">{fmt(featured.date)}</time>
              <h3 className="mt-2 text-xl font-bold leading-snug text-navy-900 transition-colors group-hover:text-navy-700">
                {featured.title[dl]}
              </h3>
              <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-navy-700">{featured.excerpt[dl]}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-gold-600">
                {t.news.readFull}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </div>
          </button>

          {/* Danh sách tin nhỏ — tối đa ~4 tin, dư thì cuộn */}
          <div className="flex max-h-[40rem] flex-col gap-4 overflow-y-auto pr-1 [scrollbar-width:thin]">
            {rest.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelected(item)}
                className="group flex gap-4 overflow-hidden rounded-xl border border-navy-100 bg-white p-3 text-left shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card sm:p-4"
              >
                <div className="relative h-24 w-32 shrink-0 overflow-hidden rounded-xl sm:h-28 sm:w-40">
                  <img
                    src={asset(item.image)}
                    alt={item.title[dl]}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="flex min-w-0 flex-col justify-center">
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-navy-50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-navy-700">
                      {item.tag[dl]}
                    </span>
                    <time className="text-[11px] font-semibold uppercase tracking-wide text-navy-500">
                      {fmt(item.date)}
                    </time>
                  </div>
                  <h3 className="mt-1.5 line-clamp-2 font-bold leading-snug text-navy-900 transition-colors group-hover:text-navy-700">
                    {item.title[dl]}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-[13px] leading-relaxed text-navy-600">{item.excerpt[dl]}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {selected && <NewsModal item={selected} onClose={() => setSelected(null)} />}
    </section>
  )
}
