# 🚀 Deploy to Vercel - COMPLETE GUIDE

## 📋 Summary of Fixes

1. ✅ Backend files copied to `api/Backend` - Vercel can find modules
2. ✅ Removed Mangum - Vercel handles ASGI natively
3. ✅ CORS allows all origins - No CORS errors
4. ✅ Routes at root level - `/auth/login` works directly

---

## 🔧 Deploy Backend to Vercel

### Step 1: Push your code
```bash
git add .
git commit -m "Fix Vercel deployment"
git push
```

### Step 2: Configure Vercel Project

**In Vercel Dashboard → Your Backend Project → Settings:**

- **Root Directory:** (leave empty)
- **Framework Preset:** Other
- **Build Command:** (leave empty)
- **Output Directory:** (leave empty)

### Step 3: Environment Variables

**In Vercel Dashboard → Settings → Environment Variables:**

Add these:
```
MONGODB_URI=mongodb+srv://sasindulakshithabandara_db_user:8UiFpxGgTgUmezah@cluster0.phjufsa.mongodb.net/?appName=Cluster0
DATABASE_NAME=student_academic_db
JWT_SECRET_KEY=supersecretkey12345
ADMIN_USERNAME=Admin
ADMIN_PASSWORD=Abc@12345
```

### Step 4: Deploy

Click "Deploy" or let auto-deploy happen.

### Step 5: Test

Visit: `https://sams-neon.vercel.app/health`

Should return:
```json
{
  "status": "healthy",
  "service": "student-academic-api"
}
```

---

## 🎨 Deploy Frontend to Vercel

### Step 1: Environment Variable

**In Vercel Dashboard → Your Frontend Project → Settings → Environment Variables:**

Add:
```
VITE_API_URL=https://sams-neon.vercel.app
```

### Step 2: Redeploy

Click "Redeploy" in the Deployments tab.

### Step 3: Test

Visit: `https://samsapp.vercel.app`

Login with:
- Username: `Admin`
- Password: `Abc@12345`

---

## 📁 Project Structure (for reference)

```
your-repo/
├── api/
│   ├── Backend/              ← Copied from root Backend/
│   │   ├── config.py
│   │   ├── database.py
│   │   ├── routes/
│   │   ├── services/
│   │   └── ...
│   ├── index.py              ← Entry point
│   └── requirements.txt
├── Backend/                   ← Original source
├── Frontend/                  ← Frontend (deploy separately)
└── vercel.json                ← Routing config
```

---

## 🔄 Future Updates

When you update Backend code:

1. **Run sync script:**
   ```powershell
   .\sync-backend.ps1
   ```

2. **Commit and push:**
   ```bash
   git add .
   git commit -m "Update backend"
   git push
   ```

3. **Vercel auto-deploys** ✅

---

## ✅ Checklist

### Backend Deployment:
- [ ] Code pushed to GitHub
- [ ] Vercel project configured (root directory empty)
- [ ] Environment variables set (MongoDB URI, JWT secret, etc.)
- [ ] Deployed successfully
- [ ] `/health` endpoint returns `{"status": "healthy"}`

### Frontend Deployment:
- [ ] `VITE_API_URL` environment variable set to backend URL
- [ ] Redeployed
- [ ] Can access the login page
- [ ] Can login with Admin credentials
- [ ] No CORS errors in browser console

---

## 🆘 Troubleshooting

### Backend Error: 500
- Check Vercel Function Logs
- Verify environment variables are set
- Test MongoDB connection

### Frontend CORS Error
- CORS should allow all origins now
- Check if `VITE_API_URL` is set correctly
- Make sure frontend calls `/auth/login` not `/api/auth/login`

### Import Errors
- Make sure `api/Backend/` exists
- Run `sync-backend.ps1` to sync files

---

## 🎉 You're Done!

Push your code and deploy. Both backend and frontend should work now.

**Backend:** `https://sams-neon.vercel.app`  
**Frontend:** `https://samsapp.vercel.app`

