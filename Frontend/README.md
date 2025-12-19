# 🎨 Frontend - Student Academic Management System

React.js frontend with Tailwind CSS.

---

## 🚀 Quick Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

Frontend runs at: **http://localhost:3000**

---

## 🔐 Login

1. Open: http://localhost:3000
2. Login with:
   - **Username:** Admin
   - **Password:** Abc@12345

---

## 📁 Structure

```
Frontend/
├── src/
│   ├── pages/              # Main pages
│   │   ├── Login.jsx      # Login page
│   │   ├── Dashboard.jsx  # Dashboard
│   │   ├── Students.jsx   # Student management
│   │   └── Marks.jsx      # Marks management
│   │
│   ├── components/         # Reusable components
│   │   ├── Layout/        # Layout components
│   │   └── UI/            # UI components
│   │
│   ├── api/                # API calls
│   │   ├── axios.js       # Axios config
│   │   ├── auth.js        # Auth API
│   │   ├── students.js    # Students API
│   │   └── marks.js       # Marks API
│   │
│   ├── context/            # State management
│   │   └── AuthContext.jsx
│   │
│   └── App.jsx             # Main app
│
├── package.json            # Dependencies
└── vite.config.js          # Vite config
```

---

## ⚙️ Configuration

The frontend automatically connects to backend at `http://localhost:8000`.

If backend runs on different port, update `Frontend/src/api/axios.js`:

```javascript
const API_BASE_URL = 'http://localhost:8000';
```

---

## 🎨 Features

- **Dashboard** - Overview statistics
- **Students** - Add, edit, search students
- **Marks** - Manage student marks by term
- **Responsive** - Works on all devices
- **Modern UI** - Clean Tailwind CSS design

---

## 🛠️ Development

### Build for production:
```bash
npm run build
```

### Preview production build:
```bash
npm run preview
```

---

## 🆘 Troubleshooting

**Can't connect to backend:**
- Check backend is running at `http://localhost:8000`
- Check browser console for errors
- Verify CORS is configured in backend

**Port 3000 already in use:**
- Stop other process
- Vite will auto-suggest another port

**npm install fails:**
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Check Node.js version: `node --version` (needs 16+)

**Login doesn't work:**
- Check backend is running
- Open DevTools Console for errors
- Verify credentials: Admin / Abc@12345
