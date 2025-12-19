# 🔧 Backend - Student Academic Management System

FastAPI backend for managing students and marks.

---

## 🚀 Quick Setup

### 1. Configure MongoDB

Copy `env.example` to `.env`:
```bash
cp env.example .env
```

Edit `.env` and update:
```env
MONGODB_URI=mongodb+srv://your_username:your_password@cluster.mongodb.net/?appName=Cluster0
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Run

```bash
python main.py
```

Server runs at: **http://localhost:8000**

---

## 📚 API Documentation

- **Swagger UI:** http://localhost:8000/docs
- **ReDoc:** http://localhost:8000/redoc

---

## 🔐 Default Admin

- **Username:** Admin
- **Password:** Abc@12345

---

## 📁 Structure

```
Backend/
├── main.py              # Main application
├── config.py            # Configuration
├── database.py          # MongoDB connection
├── models/              # Data models
├── routes/              # API endpoints
│   ├── auth.py         # Authentication
│   ├── students.py     # Student management
│   └── marks.py        # Marks management
├── services/            # Business logic
└── utils/               # Helpers (JWT, password)
```

---

## ⚙️ Configuration (.env)

```env
# MongoDB (REQUIRED)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/

# Database Name
DATABASE_NAME=student_academic_db

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000

# JWT Settings
JWT_SECRET_KEY=your-secret-key
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=480

# Admin User
ADMIN_USERNAME=Admin
ADMIN_PASSWORD=Abc@12345
```

---

## 🗄️ Database Collections

1. **users** - Admin authentication
2. **students** - Student records
3. **marks** - Academic marks

Sample data is auto-created on first run.

---

## 🛠️ Development

### Run with auto-reload:
```bash
uvicorn main:app --reload
```

### Check logs:
Watch terminal output for errors and info.

---

## 🆘 Troubleshooting

**MongoDB connection error:**
- Check connection string in `.env`
- Verify MongoDB is running (Atlas or local)
- Check IP whitelist if using Atlas

**Port 8000 already in use:**
- Stop other process using port 8000
- Or change port: `uvicorn main:app --port 8001`

**Import errors:**
- Reinstall: `pip install -r requirements.txt`
- Check Python version: `python --version` (needs 3.8+)
