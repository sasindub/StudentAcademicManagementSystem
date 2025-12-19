# 🎓 Student Academic Management System

A complete web-based system for managing students and their academic marks, built with **FastAPI** and **React.js**.

---

## 📋 Features

- **Admin Authentication** - Secure JWT-based login
- **Student Management** - Add, view, edit, and search students
- **Marks Management** - Track student marks by terms and subjects
- **Dashboard** - Overview statistics and insights
- **Responsive UI** - Clean, modern interface with Tailwind CSS

---

## 🚀 Quick Start Guide

### Prerequisites

- **Python 3.8+**
- **Node.js 16+**
- **MongoDB** (Atlas or Local)

---

### Step 1: Setup Backend

1. **Navigate to Backend folder:**
   ```bash
   cd Backend
   ```

2. **Create .env file:**
   - Copy `env.example` to `.env`
   - Update `MONGODB_URI` with your MongoDB connection string

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run backend:**
   ```bash
   python main.py
   ```
   
   Backend runs at: `http://localhost:8000`

---

### Step 2: Setup Frontend

1. **Open new terminal, navigate to Frontend folder:**
   ```bash
   cd Frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run frontend:**
   ```bash
   npm run dev
   ```
   
   Frontend runs at: `http://localhost:3000`

---

### Step 3: Login

1. Open browser: `http://localhost:3000`
2. Login with:
   - **Username:** `Admin`
   - **Password:** `Abc@12345`

---

## 📁 Project Structure

```
StudentAcademicManagementSystem/
├── Backend/                # FastAPI Backend
│   ├── main.py            # Main application
│   ├── config.py          # Configuration
│   ├── database.py        # MongoDB connection
│   ├── models/            # Data models
│   ├── routes/            # API endpoints
│   ├── services/          # Business logic
│   ├── utils/             # Helper functions
│   ├── requirements.txt   # Python dependencies
│   └── env.example        # Environment template
│
├── Frontend/              # React Frontend
│   ├── src/
│   │   ├── pages/        # Page components
│   │   ├── components/   # Reusable components
│   │   ├── api/          # API calls
│   │   └── context/      # State management
│   ├── package.json      # Node dependencies
│   └── vite.config.js    # Vite configuration
│
├── start-backend.ps1     # Quick start script (Backend)
├── start-frontend.ps1    # Quick start script (Frontend)
└── start-all.ps1         # Quick start script (Both)
```

---

## ⚙️ Configuration

### Backend Configuration (Backend/.env)

```env
# MongoDB Connection (REQUIRED)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/?appName=Cluster0

# Database Name
DATABASE_NAME=student_academic_db

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000

# JWT Secret (change in production)
JWT_SECRET_KEY=your-super-secret-key

# Admin Credentials
ADMIN_USERNAME=Admin
ADMIN_PASSWORD=Abc@12345
```

---

## 🔧 Using Start Scripts (Windows)

### Start Both (Recommended):
```powershell
.\start-all.ps1
```

### Start Backend Only:
```powershell
.\start-backend.ps1
```

### Start Frontend Only:
```powershell
.\start-frontend.ps1
```

---

## 📚 API Documentation

Once backend is running, visit:
- **Swagger UI:** `http://localhost:8000/docs`
- **ReDoc:** `http://localhost:8000/redoc`

---

## 🗄️ Database

The system uses **MongoDB** with 3 collections:

1. **users** - Admin authentication
2. **students** - Student information
3. **marks** - Academic marks by term

Sample data is automatically created on first run.

---

## 🔐 Default Credentials

- **Username:** Admin
- **Password:** Abc@12345

*Change these in production!*

---

## 🛠️ Tech Stack

### Backend
- FastAPI
- MongoDB (Motor driver)
- JWT Authentication
- Pydantic validation

### Frontend
- React.js
- Tailwind CSS
- Axios
- Context API

---

## 📝 Client Instructions

1. **Update MongoDB URI** in `Backend/.env`
2. **Install backend:** `cd Backend && pip install -r requirements.txt`
3. **Install frontend:** `cd Frontend && npm install`
4. **Run backend:** `cd Backend && python main.py`
5. **Run frontend:** `cd Frontend && npm run dev`
6. **Login** at `http://localhost:3000`

---

## 🆘 Troubleshooting

### Backend won't start
- Check MongoDB connection string
- Ensure Python 3.8+ is installed
- Check if port 8000 is available

### Frontend won't start
- Run `npm install` again
- Check if port 3000 is available
- Ensure Node.js 16+ is installed

### Can't login
- Check backend is running at `http://localhost:8000`
- Check browser console for errors
- Verify credentials: Admin / Abc@12345

---

## 📄 License

This project is for educational purposes.

---

## 👨‍💻 Support

For issues or questions, check:
- Backend logs in terminal
- Frontend console in browser DevTools
- API docs at `http://localhost:8000/docs`
