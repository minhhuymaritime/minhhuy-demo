import { useLanguage } from '../i18n/LanguageContext'
import { useReveal } from '../hooks/useReveal'
import SectionEyebrow from './SectionEyebrow'
import AmbientGlow from './AmbientGlow'

export default function CoreValues() {
  const { t } = useLanguage()
  const { ref, visible } = useReveal()

  return (
    <section id="about" className="relative bg-white py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 top-1/2 hidden h-80 w-80 -translate-y-1/2 rounded-full bg-gold-300/10 blur-[120px] sm:block" />
      </div>
      <AmbientGlow />

      <div className="container-px relative">
        <div ref={ref} className="grid items-start gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* Cột tiêu đề */}
          <div
            className={`transition-all duration-700 lg:sticky lg:top-28 lg:self-start ${
              visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            }`}
          >
            <SectionEyebrow>{t.commitments.tag}</SectionEyebrow>
            <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-navy-900 sm:text-4xl">
              {t.commitments.heading}
            </h2>
            <div className="relative mt-6 h-1 w-20 overflow-hidden rounded-full bg-gradient-to-r from-gold-300 to-gold-400">
              <span className="shimmer-line absolute inset-0 hidden lg:block lg:animate-shimmer" aria-hidden="true" />
            </div>
            <p className="mt-6 max-w-md text-base leading-relaxed text-navy-700">{t.commitments.intro}</p>
          </div>

          {/* Cột danh sách quyền lợi (editorial) */}
          <div className="divide-y divide-navy-100">
            {t.commitments.items.map((item, i) => (
              <div
                key={item.title}
                style={{ transitionDelay: `${i * 100}ms` }}
                className={`group flex items-start gap-5 py-6 first:pt-0 last:pb-0 transition-all duration-500 sm:gap-7 ${
                  visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
              >
                <span className="shrink-0 text-2xl font-bold leading-none tabular-nums text-navy-200 transition-colors duration-300 group-hover:text-gold-400">
                  0{i + 1}
                </span>
                <div>
                  <h3 className="text-lg font-bold leading-snug text-navy-900">
                    <span className="relative inline-block">
                      {item.title}
                      <span className="absolute -bottom-1 left-0 h-[2px] w-full origin-left scale-x-0 rounded-full bg-gold-400 transition-transform duration-300 ease-out group-hover:scale-x-100" />
                    </span>
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy-700">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
