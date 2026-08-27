# Viết listing Shopify chuẩn — skill cho ChatGPT, Claude và Codex

Bạn trả lời 6 câu hỏi. Nó viết ra đủ **tiêu đề, SEO title, meta description,
handle, mô tả HTML và tag** — dán thẳng vào Shopify được.

Không cần biết SEO. Không cần nhớ con số nào.

---

## Cài vào ChatGPT (3 phút, làm 1 lần)

**Bước 1.** Tải file cài sẵn:

👉 **https://github.com/wecat-team/shopify-listing-seo/releases/latest**

Bấm vào file `shopify-listing-seo.zip` để tải về.

> ⚠️ **Đừng dùng nút xanh "Code → Download ZIP"** ở trang chính. File đó có thêm
> một thư mục lồng bên ngoài nên ChatGPT có thể báo lỗi. Chỉ tải từ link
> **releases** ở trên.

**Bước 2.** Mở ChatGPT trên máy tính (trình duyệt), tìm mục **Skills**:

- Thanh bên trái → **Plugins** → tab **Skills**
- Nếu không thấy, bấm ảnh đại diện góc trên bên phải → **Settings** rồi tìm chữ
  **Skills**

**Bước 3.** Bấm **Create** → **Upload from your computer** → chọn file ZIP vừa
tải. ChatGPT quét file rồi bật skill lên.

Xong. Từ giờ chỉ cần mở ChatGPT và nhắn:

> Viết listing Shopify cho tôi

Nó sẽ tự hỏi bạn 6 câu rồi viết đủ các trường.

> **Nếu máy bạn không cài được skill** — vẫn dùng được. Mở file `SKILL.md`
> trong thư mục vừa tải, copy toàn bộ nội dung, dán vào ChatGPT rồi gõ thêm
> một dòng: *"Làm theo hướng dẫn trên, viết listing cho tôi."* Kết quả như nhau,
> chỉ là mỗi lần dùng phải dán lại.

---

## Dùng thế nào

Nhắn cho ChatGPT một câu bất kỳ trong số này:

> Viết listing Shopify cho tôi

> Tôi cần đăng một sản phẩm khăn trải bàn cưới in tên, giúp tôi viết listing

> Sửa lại tiêu đề và mô tả của sản phẩm này cho chuẩn: [dán nội dung cũ vào]

Nó sẽ hỏi bạn 6 câu:

1. Sản phẩm là gì, làm bằng chất liệu gì?
2. Khách cá nhân hoá được những gì? (tên, ngày cưới, ảnh, chữ riêng…)
3. Có những kích thước, màu, tuỳ chọn nào? *(ghi số cụ thể kèm đơn vị)*
4. Sản xuất mất bao lâu, giao mất bao lâu?
5. Dùng cho dịp gì, phong cách gì?
6. Tên shop là gì?

Trả lời xong là có listing hoàn chỉnh.

**Quan trọng:** trả lời bằng **số liệu thật**. Skill được viết để **không bịa**
kích thước hay thời gian giao. Bạn không cung cấp thì nó bỏ trống và báo cho bạn
biết, chứ không tự nghĩ ra.

### Ví dụ một lượt dùng

Bạn nhắn:

> Viết listing Shopify cho tôi

ChatGPT hỏi 6 câu. Bạn trả lời gọn:

> 1. Khăn trải bàn cưới, vải lanh
> 2. Tên cô dâu chú rể, ngày cưới
> 3. Kích thước 30x40, 40x60, 60x90 inch. Màu ngà, hồng, xanh
> 4. Sản xuất 1-3 ngày, giao 5-12 ngày
> 5. Đám cưới, phong cách vintage
> 6. LunaVows

Nhận về đủ 6 trường, dán vào Shopify là xong.

---

## Vì sao cần skill này thay vì tự hỏi ChatGPT

Phần lớn lời khuyên SEO trên mạng lặp lại những con số **không có trong bất kỳ
tài liệu nào của Google hay Shopify**. Skill này đã tra tận gốc và ghi rõ mỗi con
số thuộc loại nào:

| Loại | Nghĩa |
| --- | --- |
| **LUẬT** | Google/Shopify công bố, có chế tài |
| **KHUYẾN NGHỊ** | Google/Shopify khuyên, không chế tài |
| **QUY ƯỚC** | Chỉ là thói quen. Không phải luật |

Ba ví dụ nó sửa được cho bạn:

- **"Tiêu đề 45–70 ký tự"** — không có nguồn nào. Google Merchant Center nói
  ngược lại: giới hạn 150 ký tự và *"Use all 150 characters"*. Cắt xuống 70 là
  tự bỏ phần khớp truy vấn.
- **"Mô tả tối thiểu 250 từ"** — Google nói thẳng: *"Are you writing to a
  particular word count... (No, we don't.)"*
- **Thẻ `<title>`** — Google cắt theo **pixel**, không theo ký tự. Chữ `i` rộng
  4,4px còn chữ `W` rộng 18,9px, chênh hơn 4 lần. Skill tính cả hậu tố tên shop
  (` | LunaVows` ăn mất 110px, gần một phần năm chỗ trống).

---

## Cài vào Claude Code

```bash
git clone https://github.com/wecat-team/shopify-listing-seo \
  ~/.claude/skills/shopify-listing-seo
```

Thư mục gốc của repo chính là thư mục skill, clone vào là dùng được ngay.

## Cài vào Codex

Clone về rồi trỏ `AGENTS.md` của dự án sang:

```bash
git clone https://github.com/wecat-team/shopify-listing-seo vendor/shopify-listing-seo
```

```markdown
Khi làm việc với listing Shopify, đọc theo
vendor/shopify-listing-seo/AGENTS.md.
```

---

## Kiểm tra listing đã có

Nếu bạn có file JSON xuất từ Shopify:

```bash
node scripts/check-listing.mjs listing.json --suffix " | Tên Shop"
node scripts/check-listing.mjs catalog.json --suffix " | Tên Shop" --catalog
```

Không cần cài gì thêm, chỉ cần Node 18 trở lên.

Chế độ `--catalog` là chỗ đáng giá nhất: nó bắt được **meta description trùng
nhau**, **mô tả trùng mở đầu**, và **hai sản phẩm tranh nhau một từ khoá** —
những lỗi không thể thấy khi xem từng sản phẩm một.

```
Brand suffix " | Tên Shop" → SEO title budget 52 chars

  FAIL  custom-wedding-sign
        x title: 188 chars, over the 150-char feed limit
        x title: word "Personalized" repeated back to back
        ! tags: "dept:gifts" looks like an internal flag

  across the catalog
        x duplicate-meta: meta description shared by 5: ...
```

---

## Trong repo có gì

| Đường dẫn | Nội dung |
| --- | --- |
| `SKILL.md` | Bộ hướng dẫn chính — ChatGPT, Claude và Codex đều đọc file này |
| `AGENTS.md` | Cửa vào cho Codex |
| `references/field-rules.md` | Chi tiết từng trường, kèm nguồn |
| `references/shopify-api-traps.md` | Bẫy khi ghi hàng loạt qua Admin API |
| `references/sources.md` | Danh sách nguồn gốc |
| `scripts/check-listing.mjs` | Công cụ kiểm tra, không phụ thuộc thư viện |
| `examples/` | Listing mẫu đạt, mẫu lỗi, và một catalog |

## Giấy phép

MIT
