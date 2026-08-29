# Ví dụ: viết listing từ 1 tấm ảnh

Hai tình huống thật. Cùng một tấm ảnh, khác nhau ở lượng thông tin seller đưa.

---

## Tình huống 1 — đủ thông tin, viết luôn

### Bạn gửi

*[đính kèm ảnh: khăn trải bàn vải lanh màu ngà, in tên "Harper & James" và ngày
"09.14.2026" bằng chữ script, trải trên bàn sweetheart có nến và hoa hồng]*

> Viết listing cho cái này. Shop mình gọi nó là **Lumière Runner**. Size 30x40,
> 40x60, 60x90 inch. Vải lanh hoặc polyester. Sản xuất 1-3 ngày, giao 5-12 ngày.
> Shop tên LunaVows.

### ChatGPT trả lời

> **Đọc từ ảnh:** khăn trải bàn cưới vải lanh, chữ script màu taupe, in tên đôi
> và ngày cưới, phong cách vintage, dùng cho bàn sweetheart. Tên "Harper & James"
> trên ảnh là mẫu — tôi không đưa vào listing.
>
> **Tên sản phẩm:** bạn gọi nó là *Lumière Runner*. "Lumière" là chữ riêng của
> shop nên tôi giữ nguyên, kể cả dấu, và đặt lên đầu tiêu đề. Riêng handle thì
> phải bỏ dấu — Shopify chỉ nhận chữ thường không dấu.
>
> Đủ thông tin để viết. Listing viết bằng **tiếng Anh** (bạn nhắn tiếng Việt
> nhưng khách của bạn đọc tiếng Anh):

**Product title** — 91 ký tự, tên thương hiệu và cụm tên chính nằm gọn trong 70
ký tự đầu

```
Lumière Personalized Wedding Table Runner with Names and Date, Linen
Sweetheart Table Decor
```

**SEO title** — 41 ký tự, 511px sau khi cộng ` | LunaVows` (ngưỡng 600px)

```
Lumière Personalized Wedding Linen Runner
```

**Meta description** — 139 ký tự

```
Lumière linen wedding table runner printed with your names and wedding
date. Three sizes from 30x40 to 60x90 inches, ships in 5 to 12 days.
```

**Handle** — bỏ dấu, vì handle chỉ nhận `a-z`, `0-9` và gạch ngang

```
lumiere-personalized-wedding-linen-table-runner
```

**Tags** — từ khách gõ vào ô tìm kiếm

```
linen, wedding table runner, sweetheart table, vintage wedding, ivory
```

**Product type**: `Table Runner`

**Mô tả (dán vào ô Description, bấm nút `<>` trước)**

```html
<p>The Lumière Runner is an ivory linen table runner printed with your names
and wedding date in a soft script, made for the sweetheart table and kept
afterwards.</p>

<h3>What you personalize</h3>
<p>Add both first names and your wedding date in the fields on this page
before adding the runner to your cart. We print exactly what you submit,
so read the spelling back before you check out.</p>

<h3>Sizes and materials</h3>
<ul>
  <li><strong>Sizes:</strong> 30x40, 40x60 and 60x90 inches</li>
  <li><strong>Material:</strong> cotton linen or polyester</li>
</ul>
<p>Measure your table first: a runner should overhang each end by a few
inches.</p>

<h3>Making and delivery</h3>
<p>Made to order. Production takes 1 to 3 business days once your details
are confirmed, then tracked delivery takes 5 to 12 business days.</p>

<h3>Care</h3>
<p>Cotton linen creases by nature and relaxes once the runner is laid flat.</p>
<p>[cần điền: cách giặt, phơi và là — tấm này có in lên vải nên cả ba đều phụ
thuộc phương pháp in, không suy ra được từ tên chất liệu]</p>

<h3>Where it works</h3>
<p>Sweetheart tables, cake tables and reception head tables, and afterwards
as a keepsake of the day.</p>
```

> **Đã kiểm:** tiêu đề 91 ký tự (dưới trần 150 của Google), không lặp từ, SEO
> title 511px (dưới ngưỡng 600px), meta 139 ký tự (trong khoảng 120–160), mô tả
> đủ 6 mục, có kích thước cụ thể và thời gian giao, HTML chỉ dùng thẻ an toàn.
>
> Listing này chạy qua `scripts/check-listing.mjs` cho kết quả **0 lỗi, 3 cảnh
> báo** — không phải tôi tự nói, mà là công cụ kiểm:
>
> - `no images supplied to check` — ví dụ này chưa kèm dữ liệu ảnh
> - `152 words` — Shopify khuyến nghị ít nhất 250 từ mỗi trang. Google không có
>   ngưỡng nào, nên đây là cảnh báo chứ không phải lỗi; muốn hết thì viết dày
>   thêm phần chất liệu và bảo quản, đừng độn chữ cho đủ số.
> - `primary keyword appears only as scattered words` — từ khoá chính là
>   *personalized wedding linen table runner*, nhưng tiêu đề chèn "Lumière" và
>   "Table" vào giữa nên không còn là một cụm liền. Đây là đánh đổi có chủ ý:
>   giữ tên thương hiệu ở đầu, và cụm liền vẫn nằm nguyên trong SEO title.
>
> Và **1 lỗi cố ý**: `placeholder: body still contains 1 unfilled marker`.
>
> Phần Care chỉ giữ lại **câu mô tả bản chất vải** ("lanh nhăn tự nhiên, trải
> phẳng sẽ giãn ra") — câu này không bảo ai làm gì cả nên an toàn. Còn **mọi câu
> mệnh lệnh — giặt, phơi, là — đều để trống**, vì tấm khăn này *có in lên vải*.
> Khi đã in thì cả ba việc đó đều phụ thuộc phương pháp in là DTG, chuyển nhiệt
> hay decal, chứ không phụ thuộc chữ "cotton linen". Viết "giặt điểm bằng khăn
> ẩm" nghe vô hại nhưng vẫn có thể làm bong mực.
>
> Đây đúng là hành vi mong muốn: checker chặn đăng cho tới khi shop điền câu
> thật. Không phải lỗi của ví dụ.

---

## Tình huống 2 — thiếu thông số, hỏi lại

### Bạn gửi

*[đính kèm cùng tấm ảnh]*

> Viết listing cho cái này

### ChatGPT trả lời

> **Đọc được từ ảnh:**
>
> - Khăn trải bàn cưới, vải trông như lanh, màu ngà
> - In tên đôi và ngày cưới bằng chữ script màu taupe
> - Phong cách vintage, đang trải trên bàn sweetheart có nến và hoa hồng
> - Tên "Harper & James" trên ảnh là chữ mẫu, không phải nội dung listing
>
> **Cần bạn cho thêm 5 thứ ảnh không nói được:**
>
> 1. **Tên sản phẩm** — shop bạn đang gọi nó là gì? *(Ảnh cho thấy đây là khăn
>    trải bàn, nhưng không cho thấy bạn bán nó dưới tên nào. Nếu tên có chữ
>    riêng của thương hiệu thì tôi giữ nguyên chữ đó.)*
> 2. **Kích thước cụ thể** — có những size nào, tính bằng inch? *(Ảnh không có
>    thước nên tôi không đoán được. Đây là thứ khách tìm nhiều nhất.)*
> 3. **Chất liệu thật** — lanh thật hay polyester giả lanh? Có mấy lựa chọn?
> 4. **Thời gian** — sản xuất mấy ngày, giao mấy ngày?
> 5. **Tên shop** — để tôi tính độ dài SEO title cho vừa.
>
> Còn màu sắc: ảnh chỉ có bản màu ngà. Nếu còn màu khác thì cho tôi biết luôn.

### Bạn trả lời gọn

> Lumière Runner. 30x40, 40x60, 60x90 inch. Lanh hoặc polyester. 1-3 ngày sản
> xuất, 5-12 ngày giao. LunaVows. Có 6 màu.

Kết quả giống Tình huống 1, thêm dòng màu trong phần Sizes and options.

---

## Tình huống 3 — thiếu một thứ, vẫn viết và đánh dấu chỗ trống

Nếu bạn đưa đủ mọi thứ trừ thời gian giao, ChatGPT **không hỏi lại toàn bộ** mà
viết listing rồi chừa chỗ:

```html
<h3>Making and delivery</h3>
<p>Made to order. Production takes [cần điền: số ngày sản xuất] business days,
then tracked delivery takes [cần điền: số ngày giao] business days.</p>
```

> **Còn thiếu:** thời gian sản xuất và thời gian giao. Điền vào hai chỗ
> `[cần điền: ...]` rồi listing dùng được ngay.

---

## Vì sao nó hỏi thay vì tự đoán

Skill được viết để **không bịa thông số**. Từ một tấm ảnh thì:

| Đọc được từ ảnh | Phải hỏi |
| --- | --- |
| Loại sản phẩm, kiểu dáng | Tên sản phẩm shop đang dùng |
| Bố cục, cách trình bày | Kích thước chính xác |
| Chất liệu trông như thế nào | Chất liệu thật (lanh thật hay giả lanh?) |
| Hoạ tiết, phong cách, màu đang hiện | Danh sách đầy đủ các màu |
| Trường cá nhân hoá (thường có chú thích trên ảnh mockup) | Thời gian sản xuất và giao |
| Bối cảnh sử dụng | Giá |

Một câu "giao trong 2 ngày" đoán bừa gây khiếu nại tốn hơn nhiều so với một câu
để trống. Nếu ảnh bạn gửi **là bảng size hoặc bảng màu** thì khác — trong đó có
số thật, ChatGPT sẽ đọc và nói rõ nó lấy số từ ảnh nào.

---

## Vì sao listing luôn là tiếng Anh

Bạn nhắn tiếng Việt thì ChatGPT hỏi lại và giải thích bằng tiếng Việt. Nhưng
**mọi trường listing đều viết tiếng Anh** — tiêu đề, meta description, handle,
mô tả, tag.

Lý do đơn giản: ngôn ngữ bạn dùng để mô tả sản phẩm không liên quan gì tới ngôn
ngữ khách hàng đọc. Store bán cho khách Mỹ thì listing phải là tiếng Anh, dù
người viết là ai.

Nó cũng **dịch nghĩa chứ không phiên âm**: "khăn trải bàn vải lanh" thành
"linen table runner".

Nếu store của bạn bán cho khách Việt thì nói rõ, nó sẽ viết tiếng Việt.
