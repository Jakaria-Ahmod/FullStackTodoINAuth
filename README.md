# 🔐 MERN Authentication Backend

This is a complete **Authentication System Backend** built with **Node.js, Express.js, and MongoDB**.  
It includes all essential auth features like **User Registration, Login, Email Verification, Forgot Password, and Reset Password** with JWT and secure cookie-based refresh tokens.

---

## 🚀 Features
- ✅ User Registration with validation
- ✅ Secure Password Hashing (bcrypt)
- ✅ User Login with JWT Authentication
- ✅ Access Token & Refresh Token (stored in cookies)
- ✅ Email Verification using Nodemailer (Gmail SMTP)
- ✅ Forgot Password & Reset Password with token
- ✅ Middleware Authentication
- ✅ Morgan logger for API requests
- ✅ Environment variables support (dotenv)

---

## 🛠️ Tech Stack
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB, Mongoose  
- **Authentication:** JWT, Bcrypt, Cookie-Parser  
- **Email Service:** Nodemailer (Gmail App Password)  
- **Logger:** Morgan  
- **Frontend (Planned):** React.js  

---

## ⚙️ Installation

1. Clone the repository  
   ```bash
   git clone https://github.com/<your-username>/<your-repo>.git
   cd <your-repo>
Install dependencies

npm install


Setup .env file in root directory

PORT=5000
MONGO_URI=your_mongodb_url
ACCESS_KEY=your_jwt_access_secret
REFRESH_KEY=your_jwt_refresh_secret
MY_EMAIL=your_gmail
MY_APP_PASSWORD=your_gmail_app_password
CLIENT_URL=http://localhost:3000


Run the project

npm run dev

📡 API Endpoints
🔑 Auth Routes

POST /api/auth/register → Register new user

POST /api/auth/login → Login user

GET /api/auth/verify/:token → Verify email

POST /api/auth/forgot-password → Send reset password email

POST /api/auth/reset-password/:token → Reset password

POST /api/auth/refresh-token → Generate new access token

🧪 Example Request
POST /api/auth/register
Content-Type: application/json

{
  "fullName": "Jakaria Ahmod",
  "email": "jakaria@example.com",
  "password": "123456",
  "dateOfBirth": "2005-01-01"
}

🖥️ Frontend

The frontend will be built using React.js to consume these APIs.
(Coming soon...)
