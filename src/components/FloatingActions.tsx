import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'

/** Nút lên đầu trang, góc dưới bên phải (hiện khi cuộn). */
export default function FloatingActions() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="fixed bottom-24 right-5 z-40">
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Lên đầu trang"
        className={`grid h-11 w-11 place-items-center rounded-full border border-navy-100 bg-white text-navy-700 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-gold-300 ${
          show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
        }`}
      >
        <ArrowUp className="h-5 w-5" />
      </button>
    </div>
  )
}
