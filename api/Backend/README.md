# Student Academic Management System - Backend

FastAPI backend for the Student Academic Management System.

## 🚀 Quick Setup (3 Steps)

### Step 1: Install dependencies
```bash
pip install -r requirements.txt
```

### Step 2: Configure Environment
```bash
# Copy the example environment file
copy env.example .env
```

Then edit `.env` file with your settings:
```env
# Your MongoDB Atlas connection string
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/?appName=Cluster0

# Your frontend URL for CORS
FRONTEND_URL=http://localhost:3000

# Database name
DATABASE_NAME=student_academic_db
```

### Step 3: Run the server
```bash
python main.py
```

Or with uvicorn:
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

---

## 📋 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/` |
| `DATABASE_NAME` | Database name | `student_academic_db` |
| `FRONTEND_URL` | Frontend URL(s) for CORS | `http://localhost:3000` |
| `JWT_SECRET_KEY` | Secret key for JWT tokens | `your-secret-key` |
| `ADMIN_USERNAME` | Default admin username | `Admin` |
| `ADMIN_PASSWORD` | Default admin password | `Abc@12345` |

> **Note:** Multiple frontend URLs can be added separated by comma:
> `FRONTEND_URL=http://localhost:3000,https://yourdomain.com`

---

## 📖 API Documentation

- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## 🔑 Default Admin Credentials

- Username: `Admin`
- Password: `Abc@12345`

## ✨ Features

- ✅ JWT Authentication
- ✅ Student CRUD operations
- ✅ Marks management
- ✅ Automatic database initialization
- ✅ Synthetic data seeding
- ✅ CORS configuration via .env

