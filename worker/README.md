# Minh Huy Chat Worker (Cloudflare Workers AI — miễn phí)

Worker này nhận tin nhắn từ widget chat trên web, gọi model AI miễn phí của Cloudflare
(Llama) với "bộ não" thông tin Minh Huy, rồi trả lời.

## Deploy (1 lần)

Trong thư mục `worker/`:

```bash
cd worker
npx -y wrangler login        # mở trình duyệt, bấm Authorize (1 lần)
npx -y wrangler deploy       # đẩy worker lên Cloudflare
```

Sau khi deploy xong, Cloudflare in ra URL dạng:
`https://minhhuy-chat.<tên-tài-khoản>.workers.dev`

→ Đưa URL đó vào `src/lib/chatConfig.ts` của web (biến `CHAT_ENDPOINT`).

## Cập nhật "bộ não"
Sửa `SYSTEM_PROMPT` trong `src/index.js` rồi chạy lại `npx wrangler deploy`.

## Đổi model
Sửa hằng `MODEL` trong `src/index.js`. Một số model text miễn phí:
- `@cf/meta/llama-3.1-8b-instruct` (mặc định, nhanh)
- `@cf/meta/llama-3.3-70b-instruct-fp8-fast` (thông minh hơn, chậm hơn)

## Chi phí
Dùng hạn mức miễn phí hằng ngày của Workers AI — đủ cho site nhỏ, không cần thẻ.
