# 💼 JobMatch AI — Full Stack Job Matching Platform

A full-stack prototype developed in 48 hours for a hackathon challenge. The platform connects employers and candidates through job postings and profile submissions, using basic skill-based matching to demonstrate AI potential.

---

## 🚀 Live Demo

- **Frontend:** [https://your-frontend.vercel.app](https://your-frontend.vercel.app)
- **Backend:** [https://your-backend.onrender.com](https://your-backend.onrender.com)


---

## ✨ Features

### Candidate
- Signup/Login
- Profile creation and update:
  - Skills (as chips)
  - Work experience (title, company, dates, description, location)
  - Resume (as URL)
- Fetch and update profile on the same form

### Employer
- Signup/Login
- Post a job (title, description, skills)
- View posted jobs
- View potential candidate matches

### Matching
- Basic skill keyword matching between job requirements and candidate profiles
- Placeholder structure for future AI enhancements

---

## 🛠️ Tech Stack

### Frontend
- Vite + React + TypeScript
- Material UI
- Axios with interceptor (`axiosInstance`)
- Deployment: **Vercel**

### Backend
- Node.js + Express + TypeScript
- MongoDB + Mongoose
- JWT Authentication
- Deployment: **Render**

---

## 🧾 Project Structure

├── client/ # Frontend
└── server/ # Backend


---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/AjmalAsharaf/owow-hackathon
cd jobmatch-ai

cd server
cp .env.example .env   
npm install
npm run dev
```

```bash
cd ../client
cp .env.example .env   # Add your VITE_API_BASE_URL
npm install
npm run dev
```

## Author
Ajmal Asharaf T

