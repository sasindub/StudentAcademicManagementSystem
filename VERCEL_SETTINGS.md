# ⚙️ Vercel Project Settings

## 🔧 Backend Project (sams-neon)

### General Settings
- **Root Directory:** (leave empty)
- **Framework Preset:** Other
- **Build Command:** (leave empty)
- **Output Directory:** (leave empty)
- **Install Command:** (leave empty)

### Environment Variables
```
MONGODB_URI=mongodb+srv://sasindulakshithabandara_db_user:8UiFpxGgTgUmezah@cluster0.phjufsa.mongodb.net/?appName=Cluster0
DATABASE_NAME=student_academic_db
JWT_SECRET_KEY=supersecretkey12345
ADMIN_USERNAME=Admin
ADMIN_PASSWORD=Abc@12345
```

### Test
`https://sams-neon.vercel.app/health`

---

## 🎨 Frontend Project (samsapp)

### General Settings
- **Root Directory:** `Frontend` ⚠️ **IMPORTANT**
- **Framework Preset:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

### Environment Variables
```
VITE_API_URL=https://sams-neon.vercel.app
```

### Test
`https://samsapp.vercel.app`

---

## 🔄 How to Set Root Directory

1. Go to **Vercel Dashboard**
2. Select your **Frontend project** (samsapp)
3. Go to **Settings** → **General**
4. Scroll to **Root Directory**
5. Click **"Edit"**
6. Enter: `Frontend`
7. Click **"Save"**
8. Go to **Deployments** tab
9. Click **"Redeploy"** on latest deployment

---

## ✅ Checklist

### Backend:
- [ ] Root directory: empty
- [ ] Environment variables set
- [ ] Deployed successfully
- [ ] `/health` returns `{"status": "healthy"}`

### Frontend:
- [ ] Root directory: `Frontend` ⚠️
- [ ] `VITE_API_URL` environment variable set
- [ ] Redeployed
- [ ] Can access login page
- [ ] Can login with Admin credentials

---

## 🎉 Done!

Both projects should deploy successfully now.

