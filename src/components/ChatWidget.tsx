import { useState, useRef, useEffect } from 'react'
import { X, ArrowUp, ArrowUpRight, SquarePen, Sparkles } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import { asset } from '../lib/asset'
import { CHAT_ENDPOINT } from '../lib/chatConfig'

type Msg = { role: 'user' | 'assistant'; content: string }

const HISTORY_KEY = 'mh_chat_history'
const HISTORY_TTL = 60 * 60 * 1000 // giữ lịch sử 1 giờ kể từ tin nhắn cuối

function loadHistory(): Msg[] {
  try {
    const data = JSON.parse(localStorage.getItem(HISTORY_KEY) || 'null')
    if (data && Array.isArray(data.messages) && typeof data.ts === 'number' && Date.now() - data.ts < HISTORY_TTL) {
      return data.messages
    }
  } catch {
    /* ignore */
  }
  try {
    localStorage.removeItem(HISTORY_KEY)
  } catch {
    /* ignore */
  }
  return []
}

/** Widget chat AI — góc dưới-phải, giao diện kiểu trợ lý hiện đại. Gọi Cloudflare Worker (xem worker/). */
export default function ChatWidget() {
  const { t, lang } = useLanguage()
  const c = t.chat
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Msg[]>(loadHistory)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [teaser, setTeaser] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, loading, open])

  // Lưu lịch sử + gia hạn mốc 1 giờ mỗi khi có tin nhắn mới
  useEffect(() => {
    try {
      if (messages.length) localStorage.setItem(HISTORY_KEY, JSON.stringify({ messages, ts: Date.now() }))
      else localStorage.removeItem(HISTORY_KEY)
    } catch {
      /* ignore */
    }
  }, [messages])

  // Mở chat khi có tín hiệu open-chat
  useEffect(() => {
    const onOpen = () => setOpen(true)
    window.addEventListener('open-chat', onOpen)
    return () => window.removeEventListener('open-chat', onOpen)
  }, [])

  // Bong bóng mời chào: hiện sau ~3s, chỉ 1 lần/phiên
  useEffect(() => {
    if (sessionStorage.getItem('mh_chat_teaser')) return
    const id = setTimeout(() => {
      if (!sessionStorage.getItem('mh_chat_teaser')) setTeaser(true)
    }, 3000)
    return () => clearTimeout(id)
  }, [])

  const dismissTeaser = () => {
    setTeaser(false)
    try {
      sessionStorage.setItem('mh_chat_teaser', '1')
    } catch {
      /* ignore */
    }
  }
  const toggle = () => {
    dismissTeaser()
    setOpen((v) => !v)
  }

  async function send(text: string) {
    const content = text.trim()
    if (!content || loading) return
    const next: Msg[] = [...messages, { role: 'user', content }]
    setMessages(next)
    setInput('')

    if (!CHAT_ENDPOINT) {
      setMessages([...next, { role: 'assistant', content: c.maintenance }])
      return
    }

    setLoading(true)
    const started = Date.now()
    let reply = c.error
    try {
      const res = await fetch(CHAT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next, lang }),
      })
      const data = await res.json()
      reply = (data.reply || c.error).trim()
    } catch {
      reply = c.error
    }
    // Giữ hiệu ứng "đang trả lời" tối thiểu ~0.8s để thấy rõ ba chấm
    const wait = Math.max(0, 800 - (Date.now() - started))
    setTimeout(() => {
      setMessages([...next, { role: 'assistant', content: reply }])
      setLoading(false)
    }, wait)
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-4">
      {/* Gradient cho icon ngôi sao (giống tông viền) */}
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <defs>
          <linearGradient id="mh-icon-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#34a8c0" />
            <stop offset="40%" stopColor="#565ad6" />
            <stop offset="70%" stopColor="#9450e0" />
            <stop offset="100%" stopColor="#d35089" />
          </linearGradient>
        </defs>
      </svg>
      {open && (
        <div className="flex h-[calc(100vh-11.5rem)] max-h-[52rem] w-[21rem] max-w-[calc(100vw-2.5rem)] origin-bottom-right animate-[chat-pop_0.35s_cubic-bezier(0.2,0.8,0.2,1)_both] flex-col overflow-hidden rounded-xl bg-white shadow-[0_24px_60px_-15px_rgba(15,34,64,0.45)] ring-1 ring-navy-900/10">
          {/* Header: logo + tên + trạng thái hoạt động + nút */}
          <div className="relative shrink-0">
            <div className="flex items-center justify-between bg-gradient-to-br from-navy-50 via-white to-white px-4 py-3">
              <div className="flex items-center gap-2.5">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white shadow-sm ring-1 ring-navy-100">
                  <img src={asset('/images/brand/logo.png')} alt="" className="h-7 w-7 rounded-full object-contain" />
                </span>
                <div className="leading-tight">
                  <p className="text-[15px] font-bold tracking-tight text-navy-700">{c.title}</p>
                  <p className="mt-0.5 flex items-center gap-1.5 text-[11px] font-medium text-navy-500">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                    </span>
                    {c.subtitle}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-0.5">
                <button
                  onClick={() => setMessages([])}
                  aria-label={lang === 'en' ? 'New chat' : 'Trò chuyện mới'}
                  className="grid h-8 w-8 place-items-center rounded-xl text-slate-400 transition-colors hover:bg-white hover:text-slate-800"
                >
                  <SquarePen className="h-[18px] w-[18px]" />
                </button>
                <button
                  onClick={() => setOpen(false)}
                  aria-label={lang === 'en' ? 'Close' : 'Đóng'}
                  className="grid h-8 w-8 place-items-center rounded-xl text-slate-400 transition-colors hover:bg-white hover:text-slate-800"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            {/* vạch gradient mảnh, mềm ở hai mép */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-navy-200/70 to-transparent" />
          </div>

          {/* Nội dung */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 [scrollbar-width:thin]">
            {messages.length === 0 && !loading ? (
              /* Màn chào + gợi ý */
              <div className="flex flex-col items-center pt-4 text-center">
                <img
                  src={asset('/images/brand/logo.png')}
                  alt=""
                  className="h-16 w-16 rounded-full object-contain"
                />
                <p className="mt-4 text-lg font-bold tracking-tight text-slate-800">{c.welcomeTitle}</p>
                <p className="mt-1 text-sm text-slate-500">{c.welcomeSub}</p>

                <div className="mt-6 w-full space-y-1">
                  {c.quicks.map((q) => (
                    <button
                      key={q}
                      onClick={() => send(q)}
                      className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-[13.5px] font-medium text-slate-700 transition-colors hover:bg-slate-50"
                    >
                      <ArrowUpRight className="h-4 w-4 shrink-0 text-gold-500" strokeWidth={2.4} />
                      <span>{q}</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((m, i) =>
                  m.role === 'user' ? (
                    <div key={i} className="flex animate-[fade-up_0.3s_ease-out_both] justify-end">
                      <div className="max-w-[82%] whitespace-pre-wrap rounded-xl rounded-br-md bg-neutral-100 px-4 py-2.5 text-[14px] leading-relaxed text-slate-800">
                        {m.content}
                      </div>
                    </div>
                  ) : (
                    <div key={i} className="animate-[fade-up_0.3s_ease-out_both] space-y-1">
                      <p className="text-[13px] font-semibold text-navy-700">{c.title}</p>
                      <p className="whitespace-pre-wrap text-[14px] font-medium leading-relaxed text-slate-800">
                        {m.content}
                      </p>
                    </div>
                  ),
                )}
                {loading && (
                  <div className="space-y-1">
                    <p className="text-[13px] font-semibold text-navy-700">{c.title}</p>
                    <div className="flex items-center gap-1.5 py-1.5">
                      {[0, 1, 2].map((i) => (
                        <span
                          key={i}
                          className="chat-typing-dot h-2.5 w-2.5 rounded-full bg-slate-400"
                          style={{ animationDelay: `${i * 0.18}s` }}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Ô nhập to + nút gửi bên trong + disclaimer */}
          <div className="px-3 pb-3 pt-1">
            <form onSubmit={(e) => { e.preventDefault(); send(input) }}>
              <div className="relative rounded-xl border-2 border-navy-900 bg-white transition-colors focus-within:border-navy-950">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      send(input)
                    }
                  }}
                  placeholder={c.placeholder}
                  rows={2}
                  className="block max-h-32 w-full resize-none rounded-xl bg-transparent px-4 pb-11 pt-3 text-[14px] leading-snug text-slate-800 placeholder:font-medium placeholder:text-slate-400 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || loading}
                  aria-label={c.send}
                  className="absolute bottom-2.5 right-2.5 grid h-9 w-9 place-items-center rounded-xl bg-neutral-100 text-slate-400 transition-colors hover:bg-neutral-200 disabled:opacity-50"
                >
                  <ArrowUp className="h-[18px] w-[18px]" strokeWidth={2.4} />
                </button>
              </div>
            </form>
            <p className="mt-2 text-center text-[11px] text-slate-400">{c.disclaimer}</p>
          </div>
        </div>
      )}

      {/* Bong bóng mời chào (teaser) — viền gradient match nút Hỏi AI */}
      {!open && teaser && (
        <div className="relative w-[16.5rem] origin-bottom-right animate-[chat-pop_0.4s_cubic-bezier(0.2,0.8,0.2,1)_both] rounded-2xl p-[1.5px] shadow-[0_12px_30px_-10px_rgba(124,77,255,0.4)]">
          <span aria-hidden="true" className="mh-ai-border absolute inset-0 rounded-2xl" />
          <div className="relative flex items-start gap-2.5 rounded-2xl bg-white px-3.5 py-3">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-navy-50">
              <Sparkles className="h-[18px] w-[18px]" strokeWidth={2.2} style={{ stroke: 'url(#mh-icon-grad)' }} />
            </span>
            <button
              onClick={toggle}
              className="flex-1 pt-0.5 text-left text-[13px] font-medium leading-snug text-slate-700 transition-colors hover:text-slate-900"
            >
              {c.teaser}
            </button>
            <button
              onClick={dismissTeaser}
              aria-label="Đóng"
              className="-mr-1 -mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full text-slate-300 transition-colors hover:bg-slate-100 hover:text-slate-600"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Nút "Hỏi AI" — viền gradient nhiều màu xoay quanh + ánh sáng toả */}
      <button
        onClick={toggle}
        aria-label={open ? (lang === 'en' ? 'Close chat' : 'Đóng chat') : t.nav.askAi}
        className="group relative rounded-full p-[3px] shadow-[0_9px_26px_-8px_rgba(124,77,255,0.4)] transition-transform duration-300 hover:-translate-y-0.5 active:scale-95"
      >
        {/* Ánh sáng toả (halo xoay) — vừa đủ tinh tế */}
        <span aria-hidden="true" className="mh-ai-border absolute -inset-[3px] rounded-full opacity-40 blur-md" />
        {/* Viền gradient xoay */}
        <span aria-hidden="true" className="mh-ai-border absolute inset-0 rounded-full" />
        {/* Mặt trong */}
        <span className="relative flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-indigo-900 transition-colors duration-300 group-hover:bg-indigo-50">
          {open ? (
            <>
              <X className="h-[18px] w-[18px] text-indigo-400" />
              {lang === 'en' ? 'Close' : 'Đóng'}
            </>
          ) : (
            <>
              <Sparkles className="h-[19px] w-[19px]" strokeWidth={2.2} style={{ stroke: 'url(#mh-icon-grad)' }} />
              {t.nav.askAi}
            </>
          )}
        </span>
      </button>
    </div>
  )
}
