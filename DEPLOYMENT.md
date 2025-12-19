# 🚀 Deployment Guide - Student Academic Management System

## Recommended: Railway (Easiest - Hosts Both!)

Railway is the **easiest** option - it can host both backend and frontend in one project!

### Why Railway?
- ✅ One platform for both frontend & backend
- ✅ Automatic deployments from GitHub
- ✅ Free tier available ($5 credit/month)
- ✅ Easy MongoDB Atlas integration
- ✅ No complex configuration needed

---

## 📋 Deployment Steps

### Step 1: Prepare Your Code

1. **Make sure your `.env` file is NOT committed** (already in `.gitignore`)
2. **Update MongoDB URI** in Railway environment variables
3. **Push to GitHub** (if not already done)

### Step 2: Deploy Backend on Railway

1. Go to [railway.app](https://railway.app) and sign up/login
2. Click **"New Project"** → **"Deploy from GitHub repo"**
3. Select your repository
4. Railway will auto-detect it's Python
5. Add these **Environment Variables**:
   ```
   MONGODB_URI=your-mongodb-atlas-connection-string
   DATABASE_NAME=student_academic_db
   FRONTEND_URL=https://your-frontend-url.vercel.app
   JWT_SECRET_KEY=your-secret-key-here
   ADMIN_USERNAME=Admin
   ADMIN_PASSWORD=Abc@12345
   ```
6. Set **Root Directory** to: `Backend`
7. Set **Start Command** to: `python main.py`
8. Railway will auto-deploy! 🎉

### Step 3: Deploy Frontend on Railway (or Vercel)

#### Option A: Railway (Same Platform)
1. In Railway, click **"New Service"** → **"GitHub Repo"**
2. Select same repository
3. Set **Root Directory** to: `Frontend`
4. Set **Build Command** to: `npm install && npm run build`
5. Set **Start Command** to: `npm run preview` (or use Vite's serve)
6. Add **Environment Variable**:
   ```
   VITE_API_URL=https://your-backend-url.railway.app
   ```

#### Option B: Vercel (Recommended for Frontend)
1. Go to [vercel.com](https://vercel.com) and sign up
2. Click **"Add New Project"** → Import your GitHub repo
3. Set **Root Directory** to: `Frontend`
4. Add **Environment Variable**:
   ```
   VITE_API_URL=https://your-backend-url.railway.app
   ```
5. Click **Deploy** - Done! 🚀

---

## 🔧 Alternative: Render (Also Easy)

### Backend on Render:
1. Go to [render.com](https://render.com)
2. Click **"New +"** → **"Web Service"**
3. Connect GitHub repo
4. Settings:
   - **Name**: `sams-backend`
   - **Root Directory**: `Backend`
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `python main.py`
5. Add **Environment Variables** (same as Railway)
6. Deploy!

### Frontend on Render:
1. **"New +"** → **"Static Site"**
2. Connect GitHub repo
3. Settings:
   - **Root Directory**: `Frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
4. Add **Environment Variable**: `VITE_API_URL`
5. Deploy!

---

## 🌐 Update Frontend API URL

After deploying backend, update frontend to use the new API URL:

**File: `Frontend/src/api/axios.js`**

Change:
```javascript
const API_BASE_URL = 'http://localhost:8000';
```

To:
```javascript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
```

---

## 📝 MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. **Network Access** → Add IP: `0.0.0.0/0` (allow all)
3. Copy your connection string
4. Add to Railway/Render environment variables

---

## ✅ Quick Checklist

- [ ] Backend deployed and running
- [ ] Frontend deployed and running
- [ ] MongoDB Atlas IP whitelist configured
- [ ] Environment variables set correctly
- [ ] CORS configured with frontend URL
- [ ] Test login works

---

## 🎯 Recommended Setup

**Best for Beginners:**
- **Backend**: Railway
- **Frontend**: Vercel

**Why?**
- Vercel is optimized for React apps
- Railway handles Python easily
- Both have great free tiers
- Both auto-deploy from GitHub

---

## 💡 Pro Tips

1. **Use Railway's MongoDB plugin** - Even easier than Atlas!
2. **Enable auto-deploy** - Push to GitHub = auto deploy
3. **Use custom domains** - Both platforms support it
4. **Monitor logs** - Both have built-in log viewers

---

## 🆘 Troubleshooting

**Backend won't start?**
- Check environment variables
- Check MongoDB connection string
- Check logs in Railway/Render dashboard

**Frontend can't connect to backend?**
- Check CORS settings in backend
- Verify `VITE_API_URL` is set correctly
- Check backend URL is accessible

**MongoDB connection fails?**
- Verify IP whitelist in Atlas
- Check connection string format
- Ensure database name is correct

---

## 📚 Resources

- [Railway Docs](https://docs.railway.app)
- [Vercel Docs](https://vercel.com/docs)
- [Render Docs](https://render.com/docs)

