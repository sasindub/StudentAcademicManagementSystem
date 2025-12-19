# 📖 SETUP GUIDE - For Clients

## ⚡ Quick Start 

### Prerequisites
- Python 3.8 or higher
- Node.js 16 or higher
- MongoDB connection string (Atlas or local)

---

## 🔧 Step-by-Step Setup

### Step 1: Configure Backend

1. Go to `Backend` folder
2. Copy `env.example` to `.env`
3. Open `.env` file
4. Replace this line:
   ```
   MONGODB_URI=mongodb+srv://your_username:your_password@cluster0.mongodb.net/?appName=Cluster0
   ```
   With YOUR MongoDB connection string

**That's the only thing you need to change!**

---

### Step 2: Install Backend Dependencies

Open terminal/command prompt in the project folder:

```bash
cd Backend
pip install -r requirements.txt
```

Wait for installation to complete (1-2 minutes).

---

### Step 3: Install Frontend Dependencies

Open another terminal/command prompt:

```bash
cd Frontend
npm install
```

Wait for installation to complete (2-3 minutes).

---

### Step 4: Run the System

#### Option A: Use Start Script (Easiest - Windows)

Double-click or run:
```powershell
start-all.ps1
```

This opens two windows:
- Backend server (port 8000)
- Frontend server (port 3000)

#### Option B: Manual Start

**Terminal 1 - Backend:**
```bash
cd Backend
python main.py
```

**Terminal 2 - Frontend:**
```bash
cd Frontend
npm run dev
```

---

### Step 5: Access the System

1. Open browser
2. Go to: http://localhost:3000
3. Login with:
   - Username: `Admin`
   - Password: `Abc@12345`

---

## ✅ That's It!

The system is now running locally on your computer.

---

## 🔄 To Run Again Later

Just repeat Step 4:
- Run `start-all.ps1` script, OR
- Run backend and frontend manually in separate terminals

**No need to install dependencies again!**

---

## 🆘 Common Issues

### "pip not found"
- Install Python: https://www.python.org/downloads/
- Make sure to check "Add Python to PATH" during installation

### "npm not found"
- Install Node.js: https://nodejs.org/
- Restart terminal after installation

### "Can't connect to MongoDB"
- Check your MongoDB connection string in `Backend/.env`
- Make sure your IP is whitelisted in MongoDB Atlas
- Test connection: https://www.mongodb.com/docs/atlas/troubleshoot-connection/

### "Port already in use"
- Backend (8000): Close other programs using port 8000
- Frontend (3000): Close other programs using port 3000
- Or restart your computer

### "Login doesn't work"
- Make sure backend is running (check terminal for errors)
- Check browser console (F12 → Console tab)
- Verify you're using: Admin / Abc@12345

---

## 📞 Need Help?

Check these files:
- `README.md` - Full documentation
- `Backend/README.md` - Backend details
- `Frontend/README.md` - Frontend details

---

## 🎉 You're Done!

Enjoy using the Student Academic Management System!

