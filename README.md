# Viết listing Shopify

Gửi ảnh sản phẩm cho ChatGPT. Nhận về tiêu đề, mô tả và tag để dán vào Shopify.

---

## Cài (làm 1 lần, 3 phút)

**1.** Tải file: **[bấm vào đây](https://github.com/wecat-team/shopify-listing-seo/releases/latest/download/shopify-listing-seo.zip)**

**2.** Mở ChatGPT trên máy tính → thanh bên trái → **Plugins** → tab **Skills**

**3.** Bấm **Create** → **Upload from your computer** → chọn file vừa tải

Xong.

---

## Dùng

Gõ **`@`** rồi chọn **shopify-listing-seo**, sau đó gửi ảnh kèm vài dòng thông số:

> **@shopify-listing-seo** *[đính kèm ảnh]*
>
> Viết listing cho cái này. Shop mình gọi nó là **Lumière Runner**. Size 30x40,
> 40x60, 60x90 inch. Vải lanh hoặc polyester. Sản xuất 1-3 ngày, giao 5-12 ngày.
> Shop tên LunaVows.

Nhận về đủ **tiêu đề, SEO title, meta description, handle, mô tả và tag**.

> Bạn nhắn tiếng Việt, nó trả lời tiếng Việt — nhưng **listing viết bằng ngôn
> ngữ store bạn bán**, mặc định là tiếng Anh, vì phần lớn shop Việt bán cho khách
> nước ngoài. Nếu store bán cho khách Việt thì nói một câu, nó viết tiếng Việt
> (và lúc chạy công cụ kiểm nhớ thêm `--selling-language vi`).

**Vì sao nên gõ `@`:** ChatGPT cũng tự nhận ra skill khi bạn nhắn "viết listing
Shopify cho tôi", nhưng không phải lúc nào cũng chắc. Gõ `@` là gọi thẳng, luôn
đúng. Chỉ cần gõ ở tin nhắn đầu, các tin sau trong cùng cuộc trò chuyện không
cần gõ lại.

**Không có ảnh?** Vẫn gõ `@shopify-listing-seo` rồi nhắn *"Viết listing Shopify
cho tôi"*, nó sẽ hỏi bạn 7 câu.

## Cần đưa những gì

ChatGPT nhìn ảnh biết được sản phẩm là gì, chất liệu trông ra sao, hoạ tiết,
phong cách. Nhưng có 5 thứ ảnh không nói được, bạn phải đưa:

1. **Tên sản phẩm** — tên bạn đang dùng trong Shopify hoặc trên Etsy
2. **Kích thước** cụ thể kèm đơn vị *(ảnh không có thước)*
3. **Chất liệu thật** *(lanh thật và polyester giả lanh nhìn y hệt)*
4. **Sản xuất mấy ngày, giao mấy ngày**
5. **Tên shop**

Thiếu thì nó hỏi lại, **không tự bịa**. Vì một câu "giao trong 2 ngày" đoán bừa
gây khiếu nại tốn hơn nhiều so với một chỗ để trống.

**Vì sao cần tên sản phẩm:** ảnh cho thấy đó là cái khăn trải bàn, nhưng không
cho thấy shop bạn đang bán nó dưới tên gì. Nếu tên có chữ riêng của thương hiệu
thì chữ đó phải được giữ nguyên, và tên bạn đang dùng thường chính là cụm khách
quen gõ để tìm lại. Không đưa thì nó vẫn viết được, nhưng sẽ **tự đặt tên và nói
rõ đó là đề xuất** để bạn sửa. Nếu tên nội bộ chỉ là mã (`Mẫu 12`, `TR-LIN-3040`)
thì nó sẽ nói thẳng là mã không dùng làm tiêu đề được, rồi viết tiêu đề thật.

👉 [Xem ví dụ đầy đủ](examples/vi-du-tu-anh.md)

---

## Nếu không cài được skill

Mở file [SKILL.md](SKILL.md), copy hết, dán vào ChatGPT, rồi gõ thêm:
*"Làm theo hướng dẫn trên, viết listing cho tôi."*

Kết quả như nhau, chỉ là mỗi lần dùng phải dán lại.

---

*Dành cho lập trình viên: [CAI-DAT-NANG-CAO.md](CAI-DAT-NANG-CAO.md) — cài vào
Claude Code, Codex, và công cụ kiểm tra listing hàng loạt.*

*Giấy phép MIT.*
