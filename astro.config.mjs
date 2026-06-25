import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import tailwind from '@astrojs/tailwind'

// https://astro.build/config
export default defineConfig({
  site: 'https://minhhuymaritime.com',
  integrations: [
    react(),
    // applyBaseStyles: false -> dùng src/styles.css (đã có @tailwind base) thay vì style mặc định
    tailwind({ applyBaseStyles: false }),
  ],
  build: {
    // Gộp CSS vào ít file, gọn cho hosting tĩnh
    inlineStylesheets: 'auto',
  },
})
