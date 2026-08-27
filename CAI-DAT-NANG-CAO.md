# Cài đặt nâng cao

Dành cho lập trình viên. Seller không cần đọc file này —
xem [README.md](README.md).

## Claude Code

```bash
git clone https://github.com/wecat-team/shopify-listing-seo \
  ~/.claude/skills/shopify-listing-seo
```

Thư mục gốc của repo chính là thư mục skill. Claude Code tự kích hoạt khi yêu
cầu khớp `description`; gọi thẳng bằng `/shopify-listing-seo`.

## Codex

```bash
git clone https://github.com/wecat-team/shopify-listing-seo vendor/shopify-listing-seo
```

Trỏ `AGENTS.md` của dự án sang:

```markdown
Khi làm việc với listing Shopify, đọc theo vendor/shopify-listing-seo/AGENTS.md.
```

Trong Codex CLI, xem danh sách bằng `/skills` và gọi thẳng bằng
`$shopify-listing-seo`.

## Công cụ kiểm tra

Không phụ thuộc thư viện nào, cần Node 18+.

```bash
node scripts/check-listing.mjs listing.json --suffix " | Tên Shop"
node scripts/check-listing.mjs catalog.json --suffix " | Tên Shop" --catalog
```

Chế độ `--catalog` bắt được meta description trùng nhau, mô tả trùng mở đầu, và
hai sản phẩm tranh nhau một từ khoá — những lỗi không thấy khi xem từng sản phẩm.

Thoát với mã khác 0 khi có lỗi, nên cắm được vào hook trước khi publish.

```
Brand suffix " | Tên Shop" → SEO title budget 52 chars

  FAIL  custom-wedding-sign
        x title: 188 chars, over the 150-char feed limit
        x title: word "Personalized" repeated back to back
        ! tags: "dept:gifts" looks like an internal flag

  across the catalog
        x duplicate-meta: meta description shared by 5: ...
```

## Cấu trúc repo

| Đường dẫn | Nội dung |
| --- | --- |
| `SKILL.md` | Hướng dẫn chính — ChatGPT, Claude, Codex đều đọc file này |
| `AGENTS.md` | Cửa vào cho Codex |
| `references/shop-profile.md` | Thông tin cố định của shop: tên, thời gian sản xuất, thời gian giao, bảo đảm, đổi trả — đọc trước khi hỏi seller |
| `references/field-rules.md` | Chi tiết từng trường kèm nguồn |
| `references/shopify-api-traps.md` | Bẫy khi ghi hàng loạt qua Admin API |
| `references/sources.md` | Bảng đăng ký từng con số |
| `scripts/check-listing.mjs` | Công cụ kiểm tra |
| `examples/` | Ví dụ và listing mẫu |

## Về các ngưỡng số

Mỗi con số trong skill được gắn nhãn **LUẬT** (có chế tài), **KHUYẾN NGHỊ**
(công bố thành văn) hoặc **QUY ƯỚC** (chỉ là thói quen). Ba con số phổ biến bị
loại vì truy về hư không: "tiêu đề 45-70 ký tự", "mô tả tối thiểu 250 từ", và
"độ dài handle tối ưu". Chi tiết ở [references/sources.md](references/sources.md).
