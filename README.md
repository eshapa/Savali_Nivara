#  Savali Nivara – NGO Management & Donation Platform

## 🌐 Live Demo  
👉 **Access the project here:**  
🔗 https://savali-nivara.vercel.app/

Savali Nivara is a full-stack MERN-based digital platform designed to streamline NGO operations such as resident management, admissions, discharge processes, donations, and volunteer coordination. It ensures transparency, efficiency, and better service delivery for needy people.

---

## 🚀 Features

### 👥 Resident Management
- Digital Admission & Discharge System  
- Maintain complete resident records  
- Store documents in PDF format  
- Easy access and management  

### 🎁 Donation System
- Donate money, food, clothes, and essentials  
- Real-time donation tracking  
- Transparent donation status (Received / In Process / Distributed)  
- Razorpay (Test Mode) integration  

### 🏢 Multi-Center Management
- Manage multiple centers:
  - Pimpri Center  
  - Rajuru Center  
  - YCM Center  
- Centralized system with separate center handling  

### 🙋 Volunteer Management
- Volunteer registration system  
- Admin approval and monitoring  

### 🔐 Authentication & Roles
- Secure login & registration  
- Role-based access:
  - User  
  - Admin  

---

## 🛠️ Tech Stack

**Frontend:**
- React.js (Vite)  
- Tailwind CSS  
- Framer Motion  

**Backend:**
- Node.js  
- Express.js  

**Database:**
- MongoDB Atlas  

**Tools & Services:**
- Razorpay (Test Mode)  
- Git & GitHub  
- Vercel (Deployment)  

---

## 📌 Problem Statement

Savali Nivara faced challenges in managing resident records, admissions, discharge processes, donations, and volunteer activities manually. Managing operations across three centers was difficult, and lack of transparency made it hard to track donations and records efficiently.

---

## 💡 Solution

This platform provides a centralized digital system to manage all NGO operations. It digitizes admissions and discharge processes, maintains PDF-based records, enables users to donate money or essentials, and supports multi-center management. The system ensures transparency, real-time tracking, and efficient coordination.

---

## ⚙️ Installation & Setup

```bash
# Clone the repository
git clone https://github.com/eshapa/Savali_Nivara.git

# Navigate to project folder
cd Savali_Nivara

# Install backend dependencies
cd ngo-backend
npm install

# Install frontend dependencies
cd ../ngo-frontend
npm install

# Run backend
cd ../ngo-backend
npm start

# Run frontend
cd ../ngo-frontend
npm run dev
