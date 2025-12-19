# 🚀 How to Run the System

## ⚡ Quick Start

Choose the method for your operating system:

---

## 🪟 Windows Users

### Option 1: Double-Click (Easiest)

**Double-click one of these files:**
- `RUN.bat` - Opens two command windows
- `start-all.ps1` - Opens two PowerShell windows

Both do the same thing - run backend and frontend.

### Option 2: PowerShell

Right-click in the folder → "Open PowerShell here"

```powershell
.\start-all.ps1
```

### Option 3: Command Prompt

```cmd
RUN.bat
```

---

## 🍎 Mac / 🐧 Linux Users

### Option 1: Terminal Script

```bash
./RUN.sh
```

### Option 2: Manual (Two terminals)

**Terminal 1 - Backend:**
```bash
cd Backend
python3 main.py
```

**Terminal 2 - Frontend:**
```bash
cd Frontend
npm run dev
```

---

## 🌐 Access the System

After running:

1. **Wait 10-15 seconds** for both servers to start
2. **Open browser:** http://localhost:3000
3. **Login:**
   - Username: `Admin`
   - Password: `Abc@12345`

---

## 🛑 How to Stop

### Windows
- Close the command/PowerShell windows
- Or press `Ctrl+C` in each window

### Mac/Linux
- Press `Ctrl+C` in the terminal

---

## ✅ What Should Happen

### Backend Window
```
[STARTUP] Starting Student Academic Management System...
[CONFIG] CONFIGURATION LOADED
[OK] Connected to MongoDB
[OK] Database initialized
INFO: Uvicorn running on http://0.0.0.0:8000
```

### Frontend Window
```
VITE v5.x.x  ready in xxx ms
➜  Local:   http://localhost:3000/
➜  Network: use --host to expose
```

---

## 🆘 Troubleshooting

### Script doesn't run
**Windows:**
- Right-click `RUN.bat` → "Run as Administrator"
- Or use PowerShell: `.\start-all.ps1`

**Mac/Linux:**
- Make executable: `chmod +x RUN.sh`
- Then run: `./RUN.sh`

### Nothing happens
- Check if Python is installed: `python --version`
- Check if Node is installed: `node --version`
- Make sure you ran `pip install` and `npm install` first

### Port already in use
- Close other programs using ports 8000 or 3000
- Or restart your computer

---

## 📋 First Time Setup

If this is your first time running:

1. **Configure MongoDB:**
   - Edit `Backend/.env`
   - Add your MongoDB connection string

2. **Install Dependencies:**
   ```bash
   # Backend
   cd Backend
   pip install -r requirements.txt
   
   # Frontend
   cd Frontend
   npm install
   ```

3. **Now run the system** (see above)

---

## 🎉 That's It!

The system should now be running at http://localhost:3000

