import { useState, type FormEvent } from 'react'
import { Phone, MessageCircle, Mail, Send, Loader2, CheckCircle2, Clock } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import { useReveal } from '../hooks/useReveal'

// Dán Access Key từ https://web3forms.com (miễn phí) để form gửi thẳng về Gmail.
// Để trống → form sẽ tự mở ứng dụng email với nội dung điền sẵn (không cần đăng ký).
const WEB3FORMS_ACCESS_KEY = 'd867d7a7-77f6-4797-8743-277da0410892'

const PHONE = '0909239268'
const EMAIL = 'dichvuminhhuy@gmail.com'
const ZALO = 'https://zalo.me/0909239268'
const MESSENGER = 'https://m.me/dichvuhanghai.minhhuy'

/** Logo Facebook Messenger (bong bóng + tia). */
function MessengerIcon({ className }: { className?: string; strokeWidth?: number }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 2.04c-5.52 0-10 4.15-10 9.27 0 2.92 1.46 5.52 3.74 7.22V22l3.42-1.88c.91.25 1.87.39 2.84.39 5.52 0 10-4.15 10-9.27S17.52 2.04 12 2.04zm1 12.49l-2.55-2.72-4.97 2.72 5.47-5.81 2.61 2.72 4.91-2.72-5.47 5.81z" />
    </svg>
  )
}

type Status = 'idle' | 'sending' | 'success' | 'error'

export default function Contact() {
  const { t } = useLanguage()
  const { ref, visible } = useReveal()
  const [status, setStatus] = useState<Status>('idle')
  const f = t.contact.form

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const name = (data.get('name') as string)?.trim()
    const phone = (data.get('phone') as string)?.trim()
    if (!name || !phone) {
      setStatus('error')
      return
    }

    // Không có access key → fallback mở ứng dụng email với nội dung điền sẵn.
    if (!WEB3FORMS_ACCESS_KEY) {
      const body = [
        `${f.name}: ${name}`,
        `${f.phone}: ${phone}`,
        `${f.emailLabel}: ${data.get('email') || ''}`,
        `${f.product}: ${data.get('product') || ''}`,
        `${f.message}: ${data.get('message') || ''}`,
      ].join('\n')
      window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(
        `[Báo giá] ${name}`,
      )}&body=${encodeURIComponent(body)}`
      setStatus('success')
      form.reset()
      return
    }

    try {
      setStatus('sending')
      data.append('access_key', WEB3FORMS_ACCESS_KEY)
      data.append('subject', `[Báo giá] ${name} – ${phone}`)
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: data,
      })
      const json = await res.json()
      if (json.success) {
        setStatus('success')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const contacts = [
    { icon: Phone, label: t.contact.call, value: '0909.239.268', href: `tel:${PHONE}`, ext: false },
    { icon: MessageCircle, label: t.contact.zalo, value: '0909.239.268', href: ZALO, ext: true },
    { icon: MessengerIcon, label: t.contact.messenger, value: t.contact.messengerSub, href: MESSENGER, ext: true },
    { icon: Mail, label: t.contact.email, value: EMAIL, href: `mailto:${EMAIL}`, ext: false },
  ]

  const fieldCls =
    'mt-1.5 w-full rounded-xl border border-navy-200 bg-white px-3.5 py-2.5 text-sm text-navy-900 placeholder:text-navy-300 transition-colors focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-300/40'
  const labelCls = 'block text-xs font-semibold uppercase tracking-wide text-navy-600'

  return (
    <section id="contact" className="bg-white">
      {/* Dải navy full-width — header của mục liên hệ */}
      <div className="relative overflow-hidden bg-navy-600 pt-16 pb-32 sm:pt-20 sm:pb-44">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-navy-600 via-navy-600 to-navy-700" />
          <div className="absolute inset-0 bg-grid-navy bg-dotgrid opacity-50 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
          <div className="absolute -top-20 left-1/4 hidden h-64 w-64 rounded-full bg-gold-300/15 blur-[120px] sm:block" />
          <div className="shimmer-line absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 animate-shimmer" />
        </div>

        <div className="container-px relative">
          <div
            ref={ref}
            className={`mx-auto max-w-2xl text-center transition-all duration-700 ${
              visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            }`}
          >
            <span className="inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.18em] text-gold-300">
              <span aria-hidden="true" className="h-3.5 w-[3px] rounded-full bg-gold-400" />
              {t.contact.tag}
            </span>
            <h2 className="mt-4 text-balance text-2xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
              {t.cta.heading}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-balance text-base leading-relaxed text-navy-100/75">
              {t.cta.sub}
            </p>
          </div>
        </div>
      </div>

      {/* Thẻ liên hệ — nổi lên đè lên dải navy */}
      <div className="container-px relative z-10 -mt-16 pb-16 sm:-mt-28 sm:pb-24">
        <div className="overflow-hidden rounded-xl border border-navy-100 bg-white shadow-card-hover">
          <div className="grid lg:grid-cols-12">
            {/* Panel thông tin liên hệ — nền sáng nhẹ */}
            <div className="relative bg-gradient-to-br from-slate-50 to-navy-50/60 p-8 sm:p-10 lg:col-span-5">
              <div className="flex h-full flex-col">
                <h3 className="text-sm font-bold uppercase tracking-widest text-gold-600">{t.contact.quickTitle}</h3>

                <div className="mt-7 flex flex-col gap-1">
                  {contacts.map(({ icon: Icon, label, value, href, ext }) => (
                    <a
                      key={label}
                      href={href}
                      {...(ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="group -mx-2 flex items-center gap-4 rounded-xl px-2 py-2.5 transition-colors hover:bg-white"
                    >
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white text-gold-600 shadow-sm ring-1 ring-navy-100 transition-all group-hover:ring-gold-300/60">
                        <Icon className="h-5 w-5" strokeWidth={1.9} />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[11px] uppercase tracking-wide text-navy-500">{label}</span>
                        <span className="block truncate text-sm font-semibold text-navy-800">{value}</span>
                      </span>
                    </a>
                  ))}
                </div>

                <div className="mt-auto flex items-center gap-3 border-t border-navy-100 pt-6">
                  <Clock className="h-4 w-4 shrink-0 text-gold-600" />
                  <span className="text-xs text-navy-600">
                    <span className="font-semibold text-navy-700">{t.contact.hoursTitle}:</span> {t.contact.hours}
                  </span>
                </div>
              </div>
            </div>

            {/* Panel form — trắng */}
            <div className="border-t border-navy-100 p-8 sm:p-10 lg:col-span-7 lg:border-l lg:border-t-0">
              {status === 'success' ? (
                <div className="flex h-full min-h-[300px] flex-col items-center justify-center gap-4 text-center">
                  <span className="grid h-16 w-16 place-items-center rounded-full bg-emerald-50">
                    <CheckCircle2 className="h-9 w-9 text-emerald-500" strokeWidth={1.8} />
                  </span>
                  <p className="max-w-sm text-base font-semibold text-navy-800">{f.success}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  {/* Bẫy chống spam — người dùng không thấy; bot điền vào sẽ bị web3forms loại */}
                  <input
                    type="checkbox"
                    name="botcheck"
                    className="hidden"
                    style={{ display: 'none' }}
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                  />
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="ct-name" className={labelCls}>
                        {f.name} <span className="text-gold-500">*</span>
                      </label>
                      <input id="ct-name" name="name" type="text" required placeholder={f.namePh} className={fieldCls} />
                    </div>
                    <div>
                      <label htmlFor="ct-phone" className={labelCls}>
                        {f.phone} <span className="text-gold-500">*</span>
                      </label>
                      <input id="ct-phone" name="phone" type="tel" required placeholder={f.phonePh} className={fieldCls} />
                    </div>
                  </div>

                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="ct-email" className={labelCls}>
                        {f.emailLabel}
                      </label>
                      <input id="ct-email" name="email" type="email" placeholder={f.emailPh} className={fieldCls} />
                    </div>
                    <div>
                      <label htmlFor="ct-product" className={labelCls}>
                        {f.product}
                      </label>
                      <input id="ct-product" name="product" type="text" placeholder={f.productPh} className={fieldCls} />
                    </div>
                  </div>

                  <div className="mt-4">
                    <label htmlFor="ct-message" className={labelCls}>
                      {f.message}
                    </label>
                    <textarea id="ct-message" name="message" rows={4} placeholder={f.messagePh} className={`${fieldCls} resize-none`} />
                  </div>

                  {status === 'error' && (
                    <p className="mt-4 rounded-xl bg-red-50 px-4 py-2.5 text-sm font-medium text-red-600">{f.error}</p>
                  )}

                  <button type="submit" disabled={status === 'sending'} className="btn-primary mt-5 w-full disabled:opacity-70">
                    {status === 'sending' ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        {f.sending}
                      </>
                    ) : (
                      <>
                        {f.submit}
                        <Send className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
