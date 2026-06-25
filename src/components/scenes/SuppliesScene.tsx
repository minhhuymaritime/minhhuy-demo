import { Check, ClipboardList, Compass, FireExtinguisher, LifeBuoy, Package, Shirt } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useLanguage } from '../../i18n/LanguageContext'

/** Scene "Cung cấp vật tư hàng hải": phiếu danh mục — từng hạng mục chạy hiện rồi tích ✓ đủ chuẩn. */
export default function SuppliesScene() {
  const { t } = useLanguage()
  const icons: LucideIcon[] = [FireExtinguisher, Shirt, LifeBuoy, Compass, Package]
  const items = icons.map((icon, i) => ({ icon, name: t.hero.scene.supItems[i], delay: 420 + i * 240 }))

  return (
    <div className="flex h-[24rem] w-full items-center justify-center">
      <div className="w-[20rem] rounded-xl bg-white/60 px-6 py-5 shadow-card">
        {/* Tiêu đề phiếu */}
        <div className="flex items-center gap-3 border-b border-navy-100 pb-3.5">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-navy-600 text-white">
            <ClipboardList className="h-[19px] w-[19px]" strokeWidth={1.9} />
          </span>
          <p
            className="origin-left animate-[line-in_500ms_ease-out_both] text-base font-bold uppercase tracking-wide text-navy-700"
            style={{ animationDelay: '120ms' }}
          >
            {t.hero.scene.supTitle}
          </p>
        </div>

        {/* Các hạng mục chạy hiện + tích ✓ */}
        <div className="mt-4 space-y-3">
          {items.map(({ icon: Icon, name, delay }, i) => (
            <div
              key={i}
              className="flex animate-[fade-up_460ms_ease-out_both] items-center gap-3"
              style={{ animationDelay: `${delay}ms` }}
            >
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-navy-50 text-navy-600">
                <Icon className="h-[18px] w-[18px]" strokeWidth={1.9} />
              </span>
              <span className="shrink-0 whitespace-nowrap text-[13px] font-semibold text-navy-700">
                {name}
              </span>
              <span className="h-px flex-1 border-b border-dashed border-navy-200" />
              <span
                className="grid h-5 w-5 shrink-0 animate-[pop_340ms_cubic-bezier(0.3,0.9,0.25,1)_both] place-items-center rounded-full bg-gold-400"
                style={{ animationDelay: `${delay + 220}ms` }}
              >
                <Check className="h-3 w-3 text-white" strokeWidth={3.5} />
              </span>
            </div>
          ))}
        </div>

        {/* Kết: đủ chuẩn */}
        <div
          className="mt-5 flex animate-[fade-up_500ms_ease-out_both] items-center justify-center gap-2 rounded-xl bg-navy-50 py-2.5"
          style={{ animationDelay: '1700ms' }}
        >
          <span className="grid h-5 w-5 place-items-center rounded-full bg-gold-400">
            <Check className="h-3 w-3 text-white" strokeWidth={3.5} />
          </span>
          <span className="text-xs font-bold tracking-wide text-navy-600">
            {t.hero.scene.supDone}
          </span>
        </div>
      </div>
    </div>
  )
}
