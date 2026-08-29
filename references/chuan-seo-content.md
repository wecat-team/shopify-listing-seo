# Chuẩn SEO cho tạo content (Shopify listing)

Mọi con số ở đây đều kèm nguồn và **mức ràng buộc**. Không có con số nào là
"nghe nói". Kiểm ngày 29/08/2026 trên tài liệu gốc của Google và Shopify.

| Mức | Nghĩa | Hậu quả khi vi phạm |
| --- | --- | --- |
| **HARD** | Google/Shopify công bố, có cơ chế cưỡng chế | Bị cắt, cảnh báo feed, hoặc từ chối |
| **REC** | Công bố dưới dạng khuyến nghị, không cưỡng chế | Không phạt, nhưng là lời khuyên chính chủ |
| **QUY ƯỚC** | Không tổ chức nào công bố | Được phép ghi đè |

---

## 1. Bảng ngưỡng — mọi con số có nguồn

| Trường | Ngưỡng | Nguồn | Mức |
| --- | --- | --- | --- |
| Feed title `[title]` | 1–150 ký tự | Merchant Center product data spec | **HARD** |
| Feed title | "users will usually notice only the first 70 or fewer characters" | Merchant Center spec | Quan sát |
| Feed title | "Use all 150 characters", "Put the most important details first" | Merchant Center spec | **REC** |
| Feed title | Cấm giá, giá sale, ngày sale, phí ship, ngày giao | Merchant Center spec | **HARD** |
| Feed title | Cấm VIẾT HOA để nhấn mạnh; hoa chỉ dành cho từ viết tắt và danh từ riêng | Merchant Center spec | **HARD** |
| Feed title | Cấm ký hiệu lạ, thẻ HTML, dấu câu thừa, khoảng trắng thừa | Merchant Center spec | **HARD** |
| `<title>` | Không có giới hạn ký tự nào được công bố | Google: "there's no limit on how long a `<title>` element can be" | — |
| `<title>` | Bị cắt "typically to fit the device width" → là bài toán **pixel** | Google title link docs | — |
| `<title>` | Cắt desktop ~580–600px | Đo của bên thứ ba | **QUY ƯỚC** |
| Page title (Shopify) | Ô nhập tối đa 70 ký tự; nên giữ ≤60 để tránh bị cắt | Shopify Help Center | **REC** |
| Meta description | Không có giới hạn; Google "sometimes uses" nó | Google snippet docs | — |
| Meta description | "It's recommended that 160 characters is used" | Shopify Help Center | **REC** |
| Meta description | Phải **riêng biệt từng trang** | Google snippet docs | **REC** |
| Handle | Tối đa 255 ký tự | Shopify | **HARD** |
| Handle | Gạch ngang, chữ đọc được, không phải ID | Google URL structure | **REC** |
| Handle | Độ dài tối ưu | **Không ai công bố** | — |
| Body copy | Số từ tối thiểu | **Không có.** Google: "(No, we don't.)" | — |
| `image_link` | ≥ 500×500 px **từ 31/01/2027**, cảnh báo từ 14/04/2026 | Merchant Center 2026 spec update | **HARD** |
| Ảnh | Google khuyến nghị **1500×1500** trở lên; >1024px được tính là "high-resolution" | Merchant Center | **REC** |
| Ảnh | 1 ảnh chính + tối đa 10 ảnh phụ, nhiều góc chụp | Merchant Center valuable content coverage | **REC** |

**Ba con số bị dùng sai nhiều nhất, và sự thật:**

- **"Title 45–70 ký tự"** — không nằm trong tài liệu nào của Google. Con số 70
  duy nhất là quan sát hiển thị của *feed title*, không phải giới hạn.
- **"Meta description 155 ký tự"** — Google không công bố giới hạn nào. Shopify
  khuyến nghị **160**. Cắt ở 155 là quy ước, và cắt ở 120 là tự trói tay.
- **"Bài viết tối thiểu 250/300 từ"** — Google phủ nhận thẳng bằng văn bản.

---

## 2. Ba cái "title" khác nhau — đừng gộp làm một

Đây là chỗ sai hệ thống của gần như mọi hướng dẫn SEO Shopify.

| | Product title | SEO title (`<title>`) | Feed title |
| --- | --- | --- | --- |
| Hiện ở đâu | `<h1>`, thẻ sản phẩm, kết quả tìm kiếm nội bộ | Tab trình duyệt, kết quả Google | Google Shopping |
| Ràng buộc | Đọc được, không xuống 5 dòng trên mobile | ~600px kể cả đuôi thương hiệu | 1–150 ký tự |
| Shopify search có đọc không | **Có** | **Không** | — |
| Áp lực | Ngắn, dễ đọc | Vừa khung pixel | Dài, phủ nhiều truy vấn |

Trong Shopify, kênh Google & YouTube cho chọn nguồn feed: *Settings → Product
feed → Additional settings → Product titles and descriptions*. **Kiểm cái này
trước.** Nếu feed lấy SEO title thì product title được tự do ngắn gọn, không phải
đánh đổi gì cả.

### Cách tính SEO title bằng pixel

Storefront tự nối tên shop: `Tên sản phẩm | Tên shop`. Đuôi đó ăn mất ngân sách.

1. Đo đuôi. ` | LunaVows` = 11 ký tự ≈ **110px** — một phần năm ngân sách.
2. Ngân sách ≈ 600px. Chữ thường tiếng Anh ≈ 9,9px/ký tự.
3. `(600 − 110) / 9,9` ≈ **49 ký tự**.

Siết lại khi title nhiều chữ hoa hoặc nhiều `M W G O Q` — đó đúng là lúc đếm ký
tự nói dối. Ký tự `i` rộng 4,4px, `W` rộng 18,9px: hai title cùng độ dài có thể
lệch nhau hơn 100px.

### Google viết lại title khi nào

Google sinh title link từ nhiều nguồn — `<title>`, `<h1>`, `og:title`, chữ lớn
nổi bật, anchor text. Nó **viết lại** khi gặp: title rỗng một nửa, ngày tháng đã
cũ, mô tả sai nội dung, **văn bản lặp khuôn giữa nhiều trang**, tiêu đề không rõ,
title khác ngôn ngữ với nội dung, hoặc lặp tên site.

Ý nghĩa thực tế cho catalog: **title sinh theo khuôn `{Sản phẩm} - {Màu} - Shop`
hàng loạt chính là "boilerplate" Google nêu đích danh.** Mỗi title phải có một
mẩu thông tin thật sự riêng.

---

## 3. Nhồi từ khoá — định nghĩa gốc, không có ngưỡng số

Google định nghĩa **định tính**: "filling a web page with keywords or numbers in
an attempt to manipulate rankings". Ví dụ Google đưa ra:

- Danh sách số điện thoại không có giá trị gì thêm
- Khối chữ liệt kê các thành phố/khu vực muốn xếp hạng
- **"Repeating the same words or phrases so often that it sounds unnatural"**

Riêng cho title, Google nêu ví dụ trực tiếp: `Foobar, foo bar, foobars, foo bars`
— "doesn't help the user, and this kind of keyword stuffing can make your results
look spammy."

**Không có ngưỡng số nào.** Nên title kiểu Etsy — `Wedding Sign, Custom Wedding
Sign, Personalized Wedding Sign, Wedding Welcome Sign` — vi phạm định nghĩa này
dù chỉ dài 102 ký tự và không có từ nào lặp liền nhau.

Quy tắc làm việc được: **một từ khoá chính, tối đa hai từ bổ trợ. Một danh từ
lõi không xuất hiện quá 2 lần trong title.**

---

## 4. Nội dung mô tả — sáu mục, không đếm chữ

Không có sàn số từ. Phủ đủ sáu mục thì độ dài tự khắc hợp lý:

1. **Nó là cái gì** — 1–2 câu, từ khoá chính dùng tự nhiên
2. **Khách cá nhân hoá được gì** — từng trường, và nhận dữ liệu kiểu gì
3. **Thông số** — kích thước chính xác **kèm đơn vị**, chất liệu, cách treo/lắp
4. **Thời gian** — sản xuất, giao hàng, mốc đặt trước
5. **Bảo quản**
6. **Dịp dùng**

Mục 3 và 4 là hai mục hay thiếu nhất và cũng là hai mục khách gõ vào ô tìm kiếm
nhiều nhất. Listing không có kích thước thì **vĩnh viễn không match** truy vấn
`30x40 table runner`.

**Với sản phẩm gần giống nhau:** ranh giới là *scaled content abuse* — "many
pages generated for the primary purpose of manipulating search rankings and not
helping users", "no matter how it's created". Không phải chuyện trùng lặp, không
phải chuyện độ dài, không phải chuyện AI viết hay người viết. Trong một họ sản
phẩm gần giống nhau, thứ khác biệt thật thường là **hoạ tiết** — nên dẫn đầu
bằng nó.

Google nói riêng một câu đáng dán lên tường: tạo **các biến thể nội dung riêng
dành cho AI search** là vi phạm chính sách scaled content abuse.

---

## 5. Cái mới của 2026 — tối ưu cho AI Overviews / AI Mode

Google đã ra hẳn một tài liệu chính thức về việc này. Phần giá trị nhất là danh
sách **những thứ KHÔNG hiệu quả** — vì đó đúng là những thứ đang được bán như
dịch vụ "GEO/AEO":

| Lời khuyên đang lan truyền | Google nói |
| --- | --- |
| Thêm file `llms.txt` | "Google Search itself doesn't use them" — không lợi không hại |
| Cắt nội dung thành chunk nhỏ cho AI | "No requirement to break your content into tiny pieces" |
| Viết lại theo văn phong hợp AI | "You don't need to write in a specific way just for generative AI search" |
| Đổ tiền vào structured data để lọt AI | "Structured data isn't required for generative AI search" |
| Đi mua brand mention | Mention giả không hiệu quả về lâu dài |
| Tạo bản nội dung riêng cho AI | **Vi phạm scaled content abuse** |

Còn những thứ Google nói là **có** tác dụng, và chúng trùng khớp với SEO tử tế:

- Nội dung **không phải hàng chợ** — góc nhìn riêng, hiểu biết thật
- **Ảnh và video chất lượng cao** đi kèm chữ
- Trang index được và **đủ điều kiện hiện snippet** (đừng chặn snippet)
- Với sản phẩm: **feed Merchant Center** là kênh đưa dữ liệu vào AI features
- Đo bằng **Generative AI performance report** trong Search Console

Kết luận thẳng cho Google: không có "SEO cho AI" tách rời. Có nội dung tốt, dữ
liệu sản phẩm sạch, và trang cho phép Google đọc.

### Nhưng Google không phải engine duy nhất

Bảng trên là **lập trường công bố của Google**, và nó chỉ ràng buộc Google. Các
engine khác — ChatGPT, Perplexity, Claude, Copilot — hành xử khác, và điều này
phải tách bạch chứ không gộp làm một:

| | Google AI Overviews / AI Mode | ChatGPT, Perplexity, Claude, Copilot |
| --- | --- | --- |
| Nguồn nội dung | Chính chỉ mục Search của Google | Crawler riêng, cộng nguồn bên thứ ba |
| `llms.txt` | **Không dùng** (Google nói rõ) | Một số có parse khi có sẵn |
| Cấu trúc dễ trích | Không bắt buộc | Được tưởng thưởng rõ rệt |
| Nguồn hay được trích | Trang xếp hạng tốt | Reddit, Wikipedia, trang review — nhiều hơn bạn nghĩ |

Mức của cột phải là **QUAN SÁT**, không phải RECOMMENDATION: không engine nào
trong số đó công bố tài liệu kiểu Search Central, nên đây là hành vi ghi nhận
được chứ không phải quy tắc ai đó cam kết.

Điều may mắn là hai cột không mâu thuẫn. Bảng so sánh, đoạn định nghĩa rõ ràng,
tiêu đề đặt theo cách người ta hỏi, thông số có số thật — những thứ giúp engine
khác trích được cũng chính là nội dung được tổ chức tốt cho người đọc, và Google
không phạt gì cả. Cái **không** được làm là thứ duy nhất bảng trên đã nêu: viết
một bản nội dung riêng cho máy.

Với một shop Shopify thì thứ tự ưu tiên không đổi: feed sạch trước, mô tả có
thông số thật trước, rồi mới tới cấu trúc trình bày.

---

## 6. Structured data cho trang sản phẩm

Merchant listing (trang mua được hàng) — **bắt buộc**:

`name`, `image`, `offers` (với `price` > 0 và `priceCurrency` theo ISO 4217)

**Khuyến nghị**: `brand`, `description`, `availability`, `itemCondition`,
`shippingDetails`, `hasMerchantReturnPolicy`, `aggregateRating`.

Theme Shopify thường đã sinh phần bắt buộc. Việc của người viết content là đảm
bảo `description` trong markup **khớp** với mô tả hiển thị, và `shippingDetails`
khớp với câu thời gian giao trong mô tả — nói hai con số khác nhau ở hai chỗ là
lỗi thật, không phải lỗi kỹ thuật.

---

## 7. Tám trường Shopify search thật sự đọc

`title`, `body`, `product_type`, `vendor`, `tag`, `variants.title`,
`variants.sku`, `variants.barcode`

(Nguồn: enum `SearchableField`, Storefront API.)

Nó **không** đọc `seo.title`, `seo.description`, `handle`, `category`, metafield.

Hai hệ quả:

- SEO title và meta description **không làm gì** cho tìm kiếm nội bộ. Chúng là
  metadata cho Google và là nguồn feed tuỳ chọn. Product title gánh cả hai mặt
  trận — nên nó đáng được đầu tư nhất.
- **Tag, product type, vendor, variant title là chỗ match truy vấn.** Ưu tiên từ
  khách gõ: chất liệu, dịp, người nhận, màu. Trước khi dời một tag nào, kiểm cái
  gì đang phụ thuộc nó — collection tự động, bộ lọc, menu, thao tác hàng loạt,
  app. Một tag trông có vẻ nội bộ có thể đang gánh việc.

---

## 8. Quy trình 7 bước khi tạo content

1. **Xác định ngôn ngữ bán hàng**, không phải ngôn ngữ hội thoại. Mặc định tiếng
   Anh. Nói ra giả định đó trong một dòng để khách sửa cho rẻ.
2. **Kiểm nguồn feed** trong kênh Google & YouTube — product title hay SEO title?
3. **Chốt từ khoá chính**, một cái. Kiểm cannibalization: sản phẩm nào trong shop
   đang nhắm cùng từ đó?
4. **Viết product title** — từ khoá chính nằm gọn trong 70 ký tự đầu, đọc như một
   câu người nói, không đuôi comma nhồi từ.
5. **Viết SEO title riêng** — đo pixel kèm đuôi thương hiệu, mục tiêu <580px.
6. **Viết mô tả** đủ 6 mục, số đo có đơn vị, thời gian có con số.
7. **Chạy checker**, rồi chạy tiếp ở chế độ catalog để bắt trùng lặp — trùng meta
   description và tranh nhau từ khoá là thứ nhìn từng cái một không thấy.

```bash
node scripts/check-listing.mjs listing.json --suffix " | Shop"
```

```bash
node scripts/check-listing.mjs catalog.json --suffix " | Shop" --catalog
```

---

## 9. Checklist trước khi đăng

```
[ ] Product title: 70 ký tự đầu nhận diện được sản phẩm
[ ] Product title: ≤150 ký tự nếu product title là nguồn feed
[ ] Product title: không danh từ lõi nào lặp quá 2 lần
[ ] Product title: không giá, sale, phí ship, ngày giao (cấm trong feed)
[ ] Product title: không VIẾT HOA nhấn mạnh, không ký hiệu lạ, không dấu câu thừa
[ ] Product title: không phải khuôn boilerplate dùng chung cả catalog
[ ] SEO title: <580px sau khi cộng đuôi thương hiệu
[ ] SEO title: không trùng với sản phẩm khác
[ ] Meta description: riêng biệt, mô tả đúng trang này, ~160 ký tự
[ ] Handle: chữ thường, gạch ngang, đọc được, đặt một lần rồi thôi
[ ] Mô tả: đủ 6 mục
[ ] Mô tả: kích thước chính xác kèm đơn vị
[ ] Mô tả: thời gian sản xuất và giao hàng bằng con số
[ ] Mô tả: khác biệt thật so với sản phẩm anh em (dẫn bằng hoạ tiết)
[ ] Ảnh: ≥1500×1500, nhiều góc, alt mô tả ảnh chứ không nhồi từ khoá
[ ] Ảnh trang trí thuần tuý: alt rỗng (`alt=""`), không mô tả
[ ] Structured data: description và shippingDetails khớp nội dung hiển thị
[ ] Mọi trường listing viết bằng ngôn ngữ bán hàng
[ ] Không bịa thông số nào
```

---

## 10. Những gì không được hứa

Google sinh title link từ nhiều nguồn và tạo snippet **chủ yếu từ nội dung
trang**, nên những gì viết ra là **đề xuất**, không phải quyết định. Đo bằng
Search Console theo đơn vị tuần, không phải ngày. Không có tỷ lệ "Google viết
lại X% title" nào được Google công bố — mọi con số kiểu đó đều không nguồn.

---

## Nguồn

- Google Merchant Center — [Product data specification](https://support.google.com/merchants/answer/7052112), [`title` attribute](https://support.google.com/merchants/answer/6324415), [2026 spec update](https://support.google.com/merchants/answer/16989427), [valuable content coverage](https://support.google.com/merchants/answer/14185775)
- Google Search Central — [Title links](https://developers.google.com/search/docs/appearance/title-link), [Snippets](https://developers.google.com/search/docs/appearance/snippet), [Creating helpful content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content), [Spam policies](https://developers.google.com/search/docs/essentials/spam-policies), [Optimizing for generative AI features](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide), [Merchant listing structured data](https://developers.google.com/search/docs/appearance/structured-data/merchant-listing)
- Shopify — [Adding keywords for SEO](https://help.shopify.com/en/manual/promoting-marketing/seo/adding-keywords), [Storefront search](https://help.shopify.com/en/manual/online-store/storefront-search), [`SearchableField` enum](https://shopify.dev/docs/api/storefront/latest/enums/searchablefield)
