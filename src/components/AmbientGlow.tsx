/** Đốm sáng nền trôi nhẹ vô tận — CHỈ hiện & chạy trên desktop (lg+), rất tinh tế.
 *  Dùng transform (rẻ, được tổng hợp GPU) nên không nặng máy. */
export default function AmbientGlow({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  const c2 = tone === 'dark' ? 'bg-white/[0.06]' : 'bg-navy-300/15'
  return (
    <div className="pointer-events-none absolute inset-0 hidden overflow-hidden lg:block" aria-hidden="true">
      <div className="absolute -left-24 top-0 h-72 w-72 animate-drift rounded-full bg-gold-300/10 blur-3xl" />
      <div
        className={`absolute -right-24 bottom-0 h-80 w-80 animate-drift-rev rounded-full ${c2} blur-3xl`}
        style={{ animationDelay: '3s' }}
      />
    </div>
  )
}
