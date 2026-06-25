import type { Lang } from '../i18n/translations'

/** Tên miền chính (dùng cho canonical / hreflang / og:url / sitemap). */
export const SITE = 'https://minhhuymaritime.com'

/** Mã locale đầy đủ cho Open Graph theo từng ngôn ngữ. */
export const OG_LOCALE: Record<Lang, string> = {
  vi: 'vi_VN',
  en: 'en_US',
  zh: 'zh_CN',
  id: 'id_ID',
  th: 'th_TH',
}

/** Đường dẫn tương đối (kèm base) tới trang của một ngôn ngữ. Tiếng Việt = gốc "/". */
export function localePath(lang: Lang): string {
  const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '')
  return lang === 'vi' ? base + '/' : `${base}/${lang}/`
}

/** URL tuyệt đối (cho canonical / hreflang / sitemap). */
export function localeUrl(lang: Lang): string {
  return SITE + (lang === 'vi' ? '/' : `/${lang}/`)
}
