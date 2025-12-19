# 📚 Student Academic Management System

A comprehensive web-based CRUD application for managing students and their academic marks.

Built with **FastAPI** (Backend) + **React.js** (Frontend) + **MongoDB** (Database)

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

- 🔐 **JWT Authentication** - Secure login with encrypted passwords
- 👨‍🎓 **Student Management** - Full CRUD operations for students
- 📝 **Marks Management** - Manage academic marks by term and year
- 📊 **Dashboard** - Statistics and overview at a glance
- 🎨 **Modern UI** - Beautiful dark theme with smooth animations
- 📱 **Responsive** - Works on all devices
- 🚀 **Auto Setup** - Database auto-initialization with sample data

## 🏗️ Tech Stack

### Backend
- FastAPI
- MongoDB (Motor - async driver)
- JWT Authentication
- Pydantic validation
- Bcrypt password hashing

### Frontend
- React 18
- Tailwind CSS
- Framer Motion
- React Router v6
- Axios

## 🚀 Quick Start

### Prerequisites
- Python 3.9+
- Node.js 18+
- MongoDB (local or Atlas)

### Backend Setup

```bash
cd Backend
pip install -r requirements.txt
python main.py
```

Backend runs at: http://localhost:8000

### Frontend Setup

```bash
cd Frontend
npm install
npm run dev
```

Frontend runs at: http://localhost:3000

## 🔧 Configuration (Easy Setup!)

### Step 1: Create Environment File
```bash
cd Backend
copy env.example .env
```

### Step 2: Edit `.env` File
Open the `.env` file and update these values:

```env
# MongoDB Atlas Connection String
MONGODB_URI=mongodb+srv://your_username:your_password@cluster0.mongodb.net/?appName=Cluster0

# Your Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000

# Database Name
DATABASE_NAME=student_academic_db
```

### That's it! ✅

The application automatically:
- Creates collections
- Generates sample data (5 students + marks)
- Creates the admin user

## 🔑 Default Credentials

- **Username:** `Admin`
- **Password:** `Abc@12345`

## 📁 Project Structure

```
├── Backend/
│   ├── main.py              # FastAPI application
│   ├── config.py            # Configuration settings
│   ├── database.py          # MongoDB connection
│   ├── models/              # Pydantic models
│   ├── routes/              # API endpoints
│   ├── services/            # Business logic
│   └── utils/               # Utilities (JWT, password)
│
├── Frontend/
│   ├── src/
│   │   ├── api/             # API calls
│   │   ├── components/      # React components
│   │   ├── context/         # Auth context
│   │   ├── hooks/           # Custom hooks
│   │   ├── pages/           # Page components
│   │   └── App.jsx          # Main app
│   └── tailwind.config.js   # Tailwind configuration
```

## 📡 API Endpoints

### Authentication
- `POST /auth/login` - User login

### Students
- `GET /students` - List all students
- `POST /students` - Create student
- `GET /students/{id}` - Get student
- `PUT /students/{id}` - Update student
- `DELETE /students/{id}` - Soft delete student
- `GET /students/{id}/profile` - Get student with marks

### Marks
- `GET /marks` - List all marks
- `POST /marks` - Create marks
- `GET /marks/{id}` - Get marks
- `PUT /marks/{id}` - Update marks
- `DELETE /marks/{id}` - Soft delete marks
- `GET /marks/student/{id}` - Get marks by student
- `GET /marks/stats/summary` - Get statistics

## 🎨 Screenshots

The application features a modern dark theme with:
- Glassmorphism cards
- Smooth animations
- Gradient accents
- Responsive design

## 📝 License

MIT License - feel free to use this project for learning and development.

## 👨‍💻 Author

Built with ❤️ for academic demonstration purposes.

