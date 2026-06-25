import { LanguageProvider } from './i18n/LanguageContext'
import App from './App'
import type { Lang } from './i18n/translations'

/** Một island duy nhất bọc toàn bộ ứng dụng + LanguageProvider.
 *  Astro render sẵn ra HTML lúc build (tốt cho SEO), React hydrate để tương tác.
 *  `lang` do trang Astro truyền vào -> mỗi URL render đúng ngôn ngữ của nó. */
export default function Root({ lang = 'vi' }: { lang?: Lang }) {
  return (
    <LanguageProvider initialLang={lang}>
      <App />
    </LanguageProvider>
  )
}
