# 📥 Download and Run

## ⚡ Quick Setup (After Download)

### 1. Configure MongoDB

Edit `Backend/.env` file:
```env
MONGODB_URI=mongodb+srv://your_username:your_password@cluster.mongodb.net/
```

### 2. Install Dependencies

**Backend:**
```bash
cd Backend
pip install -r requirements.txt
```

**Frontend:**
```bash
cd Frontend
npm install
```

### 3. Run the System

**Windows:** Double-click `RUN.bat`

**Mac/Linux:** Run `./RUN.sh`

**Or manually:**
```bash
# Terminal 1 - Backend
cd Backend
python main.py

# Terminal 2 - Frontend
cd Frontend
npm run dev
```

### 4. Access

Open browser: http://localhost:3000

Login:
- Username: `Admin`
- Password: `Abc@12345`

---

## 📋 What's Included in `dev` Branch

✅ **Clean local development setup**
✅ **No deployment complexity**
✅ **Easy configuration (only MongoDB)**
✅ **Simple run scripts**
✅ **Complete documentation**
✅ **Sample data auto-generated**
✅ **All features working**

---

## 📁 Project Structure

```
StudentAcademicManagementSystem/
├── Backend/              # FastAPI Backend
├── Frontend/             # React Frontend
├── RUN.bat              # Windows start script
├── RUN.sh               # Mac/Linux start script
├── README.md            # Main documentation
├── SETUP_GUIDE.md       # Quick setup guide
└── HOW_TO_RUN.md        # How to run guide
```

---

## 🆘 Need Help?

Check these files:
- **SETUP_GUIDE.md** - Step-by-step setup
- **HOW_TO_RUN.md** - How to run the system
- **README.md** - Complete documentation
- **Backend/README.md** - Backend details
- **Frontend/README.md** - Frontend details

---

## 🎉 That's It!

The `dev` branch has everything you need to run the system locally. No complicated setup, no deployment configs - just download, configure MongoDB, and run!

---

## 🔗 Repository

**GitHub:** https://github.com/sasindub/StudentAcademicManagementSystem

**Branch:** `dev` (for local development)

**Main branch:** Has deployment files (for reference)

