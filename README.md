# FreshFood 🍏

**FreshFood** là dự án bán hàng thực phẩm online gồm **Backend (ExpressJS) và Frontend (ReactJS)** phục vụ học tập và triển khai thực tế.  

## 🗂 Cấu trúc thư mục  

## 🛠 Công nghệ sử dụng  
Backend: NodeJS, ExpressJS  
Frontend: ReactJS  
Database: MySQL  
Thanh toán: Stripe API  



---

## ⚙️ Cài đặt

1️⃣ Clone repo:  
## bash  
git clone https://github.com/BuiTrung1710/FreshFood.git


2️⃣ Cài đặt dependencies:  
cd BE/express_be  
npm install  

cd FE  
npm install  

🌱 Biến môi trường .env  
## Tạo file .env trong BE/express_be với nội dung:  
SESSION_SECRET=  
DB_HOST=  
DB_USER=  
DB_PASSWORD=  
DB_DATABASE=  
STRIPE_SECRET=your_stripe_secret  
STRIPE_WEBHOOK_SECRET=your_webhook_secret  
CORS_URLS=http://localhost:3335  

🖥️ Chạy dự án  
## Backend  
cd BE/express_be  
npm run dev  

## Frontend  
cd FE  
npm start  


