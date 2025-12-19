# 🚀 Quick Deployment Guide

## ⚡ EASIEST: Railway (Recommended)

Railway can host **BOTH** backend and frontend - super easy!

### 🎯 Step-by-Step:

#### 1. Deploy Backend
1. Go to [railway.app](https://railway.app) → Sign up (free)
2. Click **"New Project"** → **"Deploy from GitHub repo"**
3. Select your repo
4. Click **"Add Service"** → **"GitHub Repo"** (same repo)
5. Settings:
   - **Name**: `sams-backend`
   - **Root Directory**: `Backend`
   - **Start Command**: `python main.py`
6. Go to **Variables** tab, add:
   ```
   MONGODB_URI=your-mongodb-atlas-connection-string
   DATABASE_NAME=student_academic_db
   FRONTEND_URL=https://your-frontend-url.railway.app
   JWT_SECRET_KEY=any-random-secret-key
   ADMIN_USERNAME=Admin
   ADMIN_PASSWORD=Abc@12345
   ```
7. Railway auto-deploys! Copy the URL (e.g., `https://sams-backend.railway.app`)

#### 2. Deploy Frontend
1. In Railway, click **"New Service"** → **"GitHub Repo"**
2. Select same repo
3. Settings:
   - **Name**: `sams-frontend`
   - **Root Directory**: `Frontend`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run preview`
4. Go to **Variables**, add:
   ```
   VITE_API_URL=https://sams-backend.railway.app
   ```
5. Deploy! Copy frontend URL

#### 3. Update Backend CORS
1. Go back to backend service
2. Update `FRONTEND_URL` variable with your frontend URL
3. Redeploy (automatic)

**Done! 🎉**

---

## 🌟 Alternative: Vercel (Frontend) + Railway (Backend)

### Frontend on Vercel (Even Easier!)

1. Go to [vercel.com](https://vercel.com) → Sign up
2. Click **"Add New Project"**
3. Import your GitHub repo
4. Settings:
   - **Framework Preset**: Vite
   - **Root Directory**: `Frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Add **Environment Variable**:
   ```
   VITE_API_URL=https://your-backend.railway.app
   ```
6. Click **Deploy** - Done in 2 minutes! ⚡

---

## 📝 MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. **Network Access** → **Add IP Address**
3. Click **"Allow Access from Anywhere"** (0.0.0.0/0)
4. Copy your connection string
5. Paste in Railway environment variables

---

## ✅ Checklist

- [ ] Backend deployed on Railway
- [ ] Frontend deployed (Railway or Vercel)
- [ ] MongoDB Atlas IP whitelist set to 0.0.0.0/0
- [ ] Environment variables configured
- [ ] CORS updated with frontend URL
- [ ] Test login works!

---

## 🎯 Why Railway?

✅ **One platform** for both services  
✅ **Auto-deploys** from GitHub  
✅ **Free tier** ($5 credit/month)  
✅ **Easy MongoDB** integration  
✅ **No complex config** needed  

---

## 🆘 Need Help?

**Backend won't start?**
- Check environment variables in Railway
- Check MongoDB connection string
- View logs in Railway dashboard

**Frontend can't connect?**
- Verify `VITE_API_URL` is set
- Check backend URL is correct
- Check CORS settings in backend

---

## 💡 Pro Tip

Railway gives you a **free domain** like:
- `your-backend.railway.app`
- `your-frontend.railway.app`

You can also add custom domains later!

