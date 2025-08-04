# 💰 Expense Tracker

A full-stack **Expense Tracker** web application that allows users to securely **add, view, and manage their income and expenses** with real-time updates and insightful visualizations.

🔗 **Live Demo**: [expense-tracker-dun-ten.vercel.app](https://expense-tracker-dun-ten.vercel.app)

---

## ✨ Features

- 🔐 **JWT Authentication** with Bcrypt password hashing
- 📥 Add and delete **income or expense entries**
- 📊 **Dynamic charts** using Recharts to visualize spending patterns
- 📆 Beautiful **date formatting** using Moment.js
- ⚡ Optimized API calls and **lazy loading** for performance
- 🔔 Real-time **toast notifications** for user actions
- 💻 Fully responsive UI with **TailwindCSS**

---

## 🛠️ Tech Stack

**Frontend:**
- React.js
- TailwindCSS
- Axios
- Moment.js
- Recharts

**Backend:**
- Node.js
- Express.js
- MongoDB
- Mongoose
- Bcrypt
- JSON Web Token (JWT)

**Deployment:**
- Vercel (Frontend)
- Render / Railway / Cyclic (Backend - choose yours)

---

## 📸 Screenshots

<img width="810" height="548" alt="work-3" src="https://github.com/user-attachments/assets/cfe69705-30b1-4d5b-b1c6-1adc1ee51f23" />

---

## 📦 Getting Started (Local Setup)

### 1. Clone the Repository

```bash
git clone https://github.com/Cyrus253/Expense_tracker.git
cd Expense_tracker


# For frontend
cd client
npm install

# For backend
cd ../server
npm install

create .env file in backend folder
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

# Start backend server
cd server
npm run dev

# Start frontend (in another terminal)
cd client
npm start or ---check the package.json file 

