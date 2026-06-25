// Thêm tiền tố BASE_URL cho các ảnh trong thư mục /public.
// Khi host ở gốc tên miền, BASE_URL = '/' nên đường dẫn giữ nguyên.
// Khi host ở đường dẫn con (GitHub Pages repo thường: username.github.io/ten-repo/),
// BASE_URL = '/ten-repo/' nên ảnh vẫn trỏ đúng, không bị vỡ.
export function asset(path: string): string {
  const base = import.meta.env.BASE_URL // '/' hoặc '/ten-repo/'
  return base.replace(/\/$/, '') + (path.startsWith('/') ? path : '/' + path)
}
