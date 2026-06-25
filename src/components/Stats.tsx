import { Handshake, Ship, MapPin } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import { useCountUp } from '../hooks/useCountUp'
import AmbientGlow from './AmbientGlow'

const ICONS = [Handshake, Ship, MapPin]

export default function Stats() {
  const { t } = useLanguage()

  return (
    <section className="relative overflow-hidden bg-navy-600 py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-600 via-navy-600 to-navy-700" />
        <div className="absolute inset-0 bg-grid-navy bg-dotgrid opacity-50 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
        <div className="absolute -top-20 left-1/4 hidden h-64 w-64 rounded-full bg-gold-300/15 blur-[120px] sm:block" />
        <div className="shimmer-line absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 animate-shimmer" />
      </div>
      <AmbientGlow tone="dark" />

      <div className="container-px relative">
        <div className="mx-auto mb-12 max-w-xl text-center">
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            {t.stats.heading}
          </h2>
          <p className="mt-4 text-sm text-navy-100/70">{t.stats.sub}</p>
        </div>

        <div className="grid gap-5 sm:grid-cols-3">
          {t.stats.items.map((item, i) => (
            <StatCard
              key={item.label}
              icon={ICONS[i]}
              value={item.value}
              suffix={item.suffix}
              label={item.label}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function StatCard({
  icon: Icon,
  value,
  suffix,
  label,
}: {
  icon: typeof Ship
  value: number
  suffix: string
  label: string
}) {
  const { ref, value: count } = useCountUp(value)

  return (
    <div
      ref={ref}
      className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.05] p-7 text-center backdrop-blur transition-all duration-500 hover:-translate-y-1.5 hover:border-gold-300/50 hover:bg-white/[0.08]"
    >
      <span className="mx-auto grid h-14 w-14 place-items-center rounded-xl bg-gold-300 text-navy-900 shadow-[0_8px_24px_-8px_rgba(255,197,90,0.6)] transition-transform duration-300 group-hover:scale-110">
        <Icon className="h-7 w-7 group-hover:animate-wiggle" strokeWidth={2} />
      </span>
      <div className="mt-5 flex items-center justify-center text-5xl font-bold tracking-tight text-white tabular-nums">
        {count}
        <span className="text-gold-300">{suffix}</span>
      </div>
      <p className="mt-2 text-sm font-semibold text-navy-100/80">{label}</p>
    </div>
  )
}
