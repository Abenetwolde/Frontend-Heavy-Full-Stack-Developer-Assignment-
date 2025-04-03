# Overengineered To-Do App

## 🚀 Overview
This is an overengineered to-do app built using modern web technologies. It provides a smooth user experience with features like CRUD operations, real-time updates, theming, localization, onboarding, and a shimmer effect while loading data.


🏆 Why My Project Stands Out
- 🎨 **Theming Support** (Light/Dark Mode)
- 🌍 **Localization** (English & Amharic)
- 🚀 **Onboarding Screen** (Intro page for new users)
- ⏳ **Shimmer Loading Effect** for better UX


---
## 📸 Screenshots



### Localization Support
![Localization](https://drive.google.com/uc?export=view&id=1UlRu9l9uYS7IDcVmcNiabADz0cffG8Og)

### Theme Support
![Theme](https://drive.google.com/uc?export=view&id=1SXvAiHSKl5CvNNGQIlx7LBHqsSrDwDHP)

### Collection Page
![Collection](https://drive.google.com/uc?export=view&id=1NkFG8n1bE-fTGr8cRqY1-cOTUe0Lhvgf)

### Mobile Responsiveness
![Mobile](https://drive.google.com/uc?export=view&id=1NkFG8n1bE-fTGr8cRqY1-cOTUe0Lhvgf)

### Add Todo Modal
![Add](https://drive.google.com/uc?export=view&id=1tDYI4L3mwBlZNmhC7e-jCCfzV9ZSLpoh)

## 🛠️ Tech Stack

### **Frontend**
- **React + Vite** (for fast and efficient development)
- **TypeScript** (strict typing for reliability)
- **Redux Toolkit Query** (for caching and real-time updates)
- **Tailwind CSS** (for styling)
- **React Router** (for navigation)
- **i18n** (for multi-language support: English & Amharic)
- **Vercel** (for deployment)

### **Backend**
- **Node.js + Express** (for API handling)
- **PostgreSQL + Prisma** (for database management, chosen for its type safety, scalability, and developer-friendly migrations)
- **Render** (for backend and database deployment)

---
## 📬 Deployment
- **Frontend**: Vercel - [Live Demo](https://overengineeredtodoappassigment.vercel.app/)
- **Backend**: Render - [API Docs](https://frontend-heavy-full-stack-developer.onrender.com)
- **Database**: PostgreSQL on Render



## 📂 Project Structure

### **Frontend Folder Structure**
```plaintext
frontend/
├── src/
│   ├── api/ (API services using Redux Toolkit Query)
│   ├── components/ (Reusable UI components)
│   ├── features/ (State management with Redux slices)
│   ├── hooks/ (Custom hooks for reusability)
│   ├── layouts/ (App layouts)
│   ├── lib/ (Utility functions)
│   ├── pages/ (Page components)
│   ├── store/ (Redux store setup)
│   ├── styles/ (Global styles)
│   ├── i18n.ts (Localization setup)
│   └── router.tsx (App routing)
```

### **Backend Folder Structure**
```plaintext
backend/
├── src/
│   ├── controllers/ (Business logic for handling requests)
│   ├── middleware/ (Logging & error handling)
│   ├── routes/ (API routes)
│   ├── services/ (Database interactions)
│   ├── utils/ (Validation functions)
│   ├── config/ (Database configuration)
│   ├── types/ (TypeScript interfaces)
│   ├── app.ts (Main server file)
│   └── prisma/ (Database schema & migrations)
```

---

## 🛠️ Setup Instructions

### **1️⃣ Clone the Repository**
```bash
git clone https://github.com/Abenetwolde/Frontend-Heavy-Full-Stack-Developer-Assignment-.git
cd Frontend-Heavy-Full-Stack-Developer-Assignment
```

### **2️⃣ Install Dependencies**
#### **Frontend**
```bash
cd frontend
npm install
```
#### **Backend**
```bash
cd backend
npm install
```

### **3️⃣ Set Up Environment Variables**
Create a `.env` file in both `frontend/` and `backend/` and configure them as needed.

### **4️⃣ Run the App**
#### **Frontend**
```bash
npm run dev
```
#### **Backend**
```bash
npm run dev
```

---



