# thanh-nien-bot

một con bot nho nhỏ giúp bạn làm bài kiểm tra trắc nghiệm trên app Thanh Niên
vèo vèo :P

## ✨ Tính năng chính

-   🔐 Đăng nhập bằng tài khoản của bạn
-   🔄 Đọc file đáp án "answers.json" và trả lời dựa theo đáp án đã có sẵn
-   🔥 Kết quả chạy thử: **83/100 điểm\*** trong vòng **8 giây\*\***
    -   \*Tuỳ vào độ chính xác của file đáp án
    -   \*\*Tuỳ vào tốc độ kết nối mạng của bạn

[![Screenshot-2024-12-04-225754](https://i.ibb.co/d6MQkd3/Screenshot-2024-12-04-225754.png)](https://ibb.co/7VCGrwT)

## ⚙️ Hướng dẫn cài đặt

1. Clone repository:

```bash
git clone https://github.com/finntrannn/thanh-nien-bot.git
```

2. Cài đặt dependencies:

```bash
npm install
```

3. Cấu hình môi trường:

-   Tạo file `.env` từ file `.env.example` (còn không thì chạy lần đầu app sẽ tự
    tạo .env)
-   Cập nhật thông tin tài khoản của bạn vào `.env`:

```env
USER_NAME=""
PASSWORD=""
```

4. Tạo file JSON chứa nội dung đáp án

-   File json sẽ có định dạng như sau
-   Câu hỏi hoặc đáp án không cần phải quá chính xác, có thể gần giống (thiếu
    hoặc thừa vài chữ) cũng được vì bot sử dụng cơ chế fuzzy matching

```json
[
	{
		"Question": "Câu hỏi 1",
		"Answer": "Đáp án 1"
	},
	{
		"Question": "Câu hỏi 2",
		"Answer": "Đáp án 2"
	}
]
```

## 🚀 Sử dụng

Chạy ứng dụng:

```bash
npm start
```

## ⚠️ Cảnh báo

-   Công cụ này được thiết kế chỉ dành cho mục đích giáo dục. Việc sử dụng nó để
    gian lận trong thi cử hoặc các hoạt động vi phạm quy định là không được phép
    và có thể dẫn đến hậu quả nghiêm trọng.

-   Tác giả của công cụ này không chịu trách nhiệm đối với bất kỳ hành vi sử
    dụng sai mục đích hoặc hậu quả nào gây ra từ việc sử dụng công cụ này.

## 📄 Giấy phép

Project được phân phối dưới giấy phép GPL-3.0. Xem file `LICENSE` để biết thêm
chi tiết.

---
