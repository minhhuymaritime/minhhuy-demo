# Minh Huy Maritime — Landing Page (Astro)

Trang landing giới thiệu dịch vụ an toàn hàng hải của **Công ty TNHH Thương mại & Dịch vụ Kỹ thuật Minh Huy**.
Bản dựng trên **Astro** (render sẵn HTML tĩnh, tốt cho SEO), đa ngôn ngữ (5 thứ tiếng, mỗi ngôn ngữ một URL), kèm chatbot AI.

> Đây là phiên bản Astro. Phiên bản React/Vite gốc nằm ở thư mục `MinhHuy_Landing_Page` (vẫn dùng được).

## Vì sao là Astro
- **Nội dung nằm sẵn trong HTML** khi build → Google/Facebook/Zalo đọc được ngay, không phải chờ JavaScript (khắc phục điểm yếu lớn nhất của bản SPA cũ).
- **Mỗi ngôn ngữ một URL riêng** (`/`, `/en/`, `/zh/`, `/id/`, `/th/`) + thẻ `hreflang` → cả 5 ngôn ngữ được index tốt.
- **React islands**: tái sử dụng nguyên các component React (Hero, ChatWidget, Intro…), Astro render sẵn rồi hydrate để tương tác. Sửa UI/animation vẫn bằng React như cũ.

## Công nghệ
- **Astro 4** + **@astrojs/react** + **@astrojs/tailwind**
- **React + TypeScript** (các component trong `src/components/`)
- **Tailwind CSS** — bảng màu thương hiệu trong `tailwind.config.js` (`navy` #234C8C, `gold` #FFC55A)
- **lucide-react** (icon), **qrcode.react** (mã QR Zalo), font **Inter**
- Chatbot: **Cloudflare Worker + Workers AI** (thư mục `worker/` ở dự án gốc — không đổi)

## Lệnh
```bash
npm install      # cài đặt
npm run dev      # chạy localhost (Astro dev, có HMR)
npm run build    # build tĩnh -> dist/
npm run preview  # xem thử bản build
```

## Cấu trúc thư mục
```
src/
├─ pages/
│  ├─ index.astro          # Trang tiếng Việt (/) — gốc
│  └─ [lang]/index.astro   # Sinh /en/, /zh/, /id/, /th/ (getStaticPaths)
├─ layouts/
│  └─ Layout.astro         # <head> SEO localized: title/description/OG/canonical/hreflang/JSON-LD
├─ Root.tsx                # Island gốc: bọc LanguageProvider + App (nhận prop lang theo trang)
├─ App.tsx                 # Lắp ráp các section theo thứ tự
├─ components/             # Các section/UI React (tái dùng từ bản gốc)
│  ├─ Navbar, Hero, Services, CoreValues, Stats, Products, News, Contact, Footer
│  ├─ Intro, ChatWidget, *Modal, Logo, Flag, SocialDock, QrDock, FloatingActions
│  ├─ scenes/              # Minh hoạ động trong Hero
│  └─ Analytics.astro      # Nhúng GA4 (xem mục bên dưới)
├─ data/                   # news.ts, serviceDetails.ts
├─ hooks/                  # useReveal, useCountUp
├─ i18n/                   # translations.ts (5 ngôn ngữ) + LanguageContext.tsx
├─ lib/                    # asset.ts, chatConfig.ts, i18nRoutes.ts (URL/hreflang/og:locale theo ngôn ngữ)
└─ styles.css              # Tailwind + CSS tuỳ biến (keyframes, tiện ích)

public/                    # images/, robots.txt, sitemap.xml, .htaccess
astro.config.mjs           # cấu hình Astro (react + tailwind, site=minhhuymaritime.com)
.env                       # PUBLIC_GA_ID (mã GA4) — không commit
```

## Đa ngôn ngữ (5 thứ tiếng)
- Mỗi ngôn ngữ một trang tĩnh: `/` (vi), `/en/`, `/zh/`, `/id/`, `/th/`.
- Bấm đổi ngôn ngữ (Navbar/Intro) → **điều hướng sang URL ngôn ngữ đó** (logic ở `setLang` trong `LanguageContext.tsx`).
- Màn Intro chỉ hiện lần đầu mỗi phiên (cờ `sessionStorage 'mh-entered'`).

**Sửa nội dung / văn bản:** `src/i18n/translations.ts` (mỗi ngôn ngữ một object cùng cấu trúc).
Tin tức ở `src/data/news.ts`, chi tiết dịch vụ ở `src/data/serviceDetails.ts`.

**Thêm một ngôn ngữ mới:**
1. Thêm mã vào type `Lang` + mảng `LANGS` và một object dịch đầy đủ trong `translations.ts`.
2. Thêm lá cờ trong `components/Flag.tsx`, mã locale trong `lib/i18nRoutes.ts` (`OG_LOCALE`).
3. Thêm mã vào `getStaticPaths` trong `src/pages/[lang]/index.astro` và vào `public/sitemap.xml`.

**Thêm một section mới:** tạo `src/components/TenSection.tsx`, thêm chuỗi dịch vào cả 5 ngôn ngữ, import vào `src/App.tsx`.

**Sửa UI / animation:** sửa thẳng trong các component `.tsx` như bình thường (vẫn là React).

## Google Analytics 4
1. Tạo Property tại analytics.google.com → **Quản trị → Luồng dữ liệu** → lấy **Mã đo lường** `G-XXXXXXXXXX`.
2. Mở `.env`, đặt: `PUBLIC_GA_ID=G-XXXXXXXXXX`
3. `npm run build` lại. Để trống = không bật GA (không script, không cookie).

## Triển khai (Hostinger)
1. `npm run build` → ra thư mục `dist/`.
2. Nén **nội dung bên trong** `dist/` thành zip.
3. Tải lên `public_html` của Hostinger (tên miền `minhhuymaritime.com`). Đã kèm `.htaccess` (ép HTTPS, gzip, cache).

## SEO
- Thẻ meta/OG/Twitter + JSON-LD `LocalBusiness` + canonical + hreflang: trong `src/layouts/Layout.astro`, localized theo từng trang.
- `public/robots.txt` + `public/sitemap.xml` (liệt kê đủ 5 URL + hreflang).
