import type { Lang } from '../i18n/translations'

/** Toạ độ ngôi sao 5 cánh (cho cờ VN / TQ). */
function star(cx: number, cy: number, R: number): string {
  const r = R * 0.382
  const pts: string[] = []
  for (let i = 0; i < 5; i++) {
    const ao = ((-90 + i * 72) * Math.PI) / 180
    const ai = ((-90 + 36 + i * 72) * Math.PI) / 180
    pts.push(`${(cx + R * Math.cos(ao)).toFixed(2)},${(cy + R * Math.sin(ao)).toFixed(2)}`)
    pts.push(`${(cx + r * Math.cos(ai)).toFixed(2)},${(cy + r * Math.sin(ai)).toFixed(2)}`)
  }
  return pts.join(' ')
}

const SHAPES: Record<Lang, React.ReactNode> = {
  vi: (
    <>
      <rect width="20" height="20" fill="#DA251D" />
      <polygon points={star(10, 10, 6)} fill="#FFFF00" />
    </>
  ),
  en: (
    <>
      <rect width="20" height="20" fill="#fff" />
      {[0, 2, 4, 6, 8, 10, 12].map((i) => (
        <rect key={i} y={(i * 20) / 13} width="20" height={20 / 13} fill="#B22234" />
      ))}
      <rect width="9" height={(20 * 7) / 13} fill="#3C3B6E" />
      {[1.6, 3.2, 4.8, 6.4].map((x) =>
        [1.4, 3.2, 5, 6.8, 8.6].map((y) => <circle key={`${x}-${y}`} cx={x} cy={y} r="0.35" fill="#fff" />),
      )}
    </>
  ),
  zh: (
    <>
      <rect width="20" height="20" fill="#DE2910" />
      <polygon points={star(4, 4.2, 3)} fill="#FFDE00" />
      <polygon points={star(8.4, 1.8, 1)} fill="#FFDE00" />
      <polygon points={star(10.2, 3.8, 1)} fill="#FFDE00" />
      <polygon points={star(10.2, 6.4, 1)} fill="#FFDE00" />
      <polygon points={star(8.4, 8.2, 1)} fill="#FFDE00" />
    </>
  ),
  id: (
    <>
      <rect width="20" height="10" fill="#E70011" />
      <rect y="10" width="20" height="10" fill="#fff" />
    </>
  ),
  th: (
    <>
      <rect width="20" height="20" fill="#fff" />
      <rect width="20" height="3.333" y="0" fill="#A51931" />
      <rect width="20" height="3.333" y="16.667" fill="#A51931" />
      <rect width="20" height="6.667" y="6.667" fill="#2D2A4A" />
    </>
  ),
}

/** Cờ quốc gia hình tròn nhỏ cho bộ chọn ngôn ngữ. */
export default function Flag({ code, className = 'h-5 w-5' }: { code: Lang; className?: string }) {
  return (
    <span className={`block shrink-0 overflow-hidden rounded-full ring-1 ring-black/10 [clip-path:circle(50%)] ${className}`}>
      <svg viewBox="0 0 20 20" className="block h-full w-full" aria-hidden="true">
        {SHAPES[code]}
      </svg>
    </span>
  )
}
