# 🐞 Bug Tracker System

A full-stack Bug Tracking System built using React, Node.js, Express, and MySQL.  
This application helps teams manage projects, track bugs, assign responsibilities, and monitor issue resolution efficiently.

---

## 🚀 Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- React Router
- Axios

### Backend
- Node.js
- Express.js
- MySQL
- JWT Authentication
- bcrypt (Password Hashing)

### Database
- MySQL (Relational Schema)

---

## 🔐 Features

### ✅ Authentication & Authorization
- User Signup & Login
- JWT-based authentication
- Role-based access control
- Secure password hashing with bcrypt

### 👥 User Roles
- Admin
- Developer
- Tester
- Business Analyst

### 📁 Project Management
- Create and manage projects
- View project statistics
- Assign users to projects

### 🐞 Bug Management
- Report new bugs
- Assign bugs to developers
- Bug lifecycle:
  - Open
  - In Progress
  - Resolved
  - Closed
- Set priority levels
- View detailed bug information

### 💬 Comment System
- Add comments to bugs
- Timestamped activity logs

### 📊 Dashboard
- Total Projects
- Total Bugs
- Open Bugs
- Project health indicators
- Resolution progress tracking

---

## 📂 Project Structure

bug-tracker/
│
├── frontend/ → React UI
├── backend/ → Express API
├── database/ → SQL schema
├── .env
└── README.md


---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

git clone https://github.com/yourusername/bug-tracker.git
cd bug-tracker


---

### 2️⃣ Setup Backend

cd backend
npm install


Create a `.env` file:

PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=bugtracker
JWT_SECRET=your_secret_key


Run backend:

npm start


---

### 3️⃣ Setup Frontend

cd frontend
npm install
npm run dev


Frontend runs on:

http://localhost:5173


---

### 4️⃣ Setup Database

Import the SQL schema from:

database/schema.sql


Create database:

```sql
CREATE DATABASE bugtracker;
USE bugtracker;


🏗 Architecture

RESTful API architecture

Modular backend structure (routes, middleware, db)

Normalized relational database schema

Secure authentication flow

Responsive frontend design

📈 Future Improvements

Email notifications

Real-time updates (WebSockets)

File upload for bug attachments

Advanced filtering & search

Role-based dashboard customization

👨‍💻 Author

Gladson K
