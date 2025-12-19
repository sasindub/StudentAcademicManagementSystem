# 🚀 Deploy Both Frontend & Backend on Vercel

Yes! You can deploy **BOTH** on Vercel! Here's how:

---

## ✅ Quick Setup (5 Minutes!)

### Step 1: Push to GitHub
Make sure your code is on GitHub.

### Step 2: Deploy on Vercel

1. **Go to [vercel.com](https://vercel.com)** → Sign up/Login
2. Click **"Add New Project"**
3. **Import your GitHub repository**
4. Vercel will auto-detect the setup!

### Step 3: Configure Environment Variables

In Vercel dashboard, go to **Settings** → **Environment Variables**, add:

```
# MongoDB
MONGODB_URI=your-mongodb-atlas-connection-string
DATABASE_NAME=student_academic_db

# Frontend URL (will be your Vercel URL)
FRONTEND_URL=https://your-project.vercel.app

# JWT
JWT_SECRET_KEY=your-secret-key-here
ADMIN_USERNAME=Admin
ADMIN_PASSWORD=Abc@12345

# Frontend API URL
VITE_API_URL=https://your-project.vercel.app/api
```

### Step 4: Deploy!

Click **"Deploy"** - Vercel will:
- ✅ Build your frontend
- ✅ Set up Python serverless functions for backend
- ✅ Deploy everything automatically!

---

## 📁 Project Structure for Vercel

```
your-project/
├── api/
│   └── index.py          # Serverless function (FastAPI)
│   └── requirements.txt  # Python dependencies
├── Backend/              # Your backend code
├── Frontend/             # Your frontend code
└── vercel.json           # Vercel configuration
```

---

## 🔧 How It Works

- **Frontend**: Served as static files from `Frontend/dist`
- **Backend**: Runs as serverless functions via `/api/*` routes
- **All on one domain**: `https://your-project.vercel.app`

---

## 🌐 URLs After Deployment

- **Frontend**: `https://your-project.vercel.app`
- **Backend API**: `https://your-project.vercel.app/api`
- **API Docs**: `https://your-project.vercel.app/api/docs`
- **Login**: `https://your-project.vercel.app/api/auth/login`

---

## ⚙️ Update Frontend API URL

The frontend is already configured to use `VITE_API_URL` environment variable!

In Vercel, set:
```
VITE_API_URL=https://your-project.vercel.app/api
```

---

## ✅ Checklist

- [ ] Code pushed to GitHub
- [ ] Project imported to Vercel
- [ ] Environment variables configured
- [ ] MongoDB Atlas IP whitelist set to `0.0.0.0/0`
- [ ] Deployed successfully
- [ ] Test login works!

---

## 🎯 Benefits of Vercel

✅ **One platform** for both frontend & backend  
✅ **Free tier** (generous limits)  
✅ **Auto-deploys** from GitHub  
✅ **CDN** for fast global access  
✅ **Serverless** - scales automatically  
✅ **Custom domains** included  

---

## 🆘 Troubleshooting

**Backend not working?**
- Check environment variables in Vercel
- Check MongoDB connection string
- View function logs in Vercel dashboard

**Frontend can't connect to API?**
- Verify `VITE_API_URL` is set correctly
- Check CORS settings
- Ensure routes in `vercel.json` are correct

**Build fails?**
- Check Python version (Vercel uses 3.9 by default)
- Verify all dependencies in `api/requirements.txt`
- Check build logs in Vercel dashboard

---

## 💡 Pro Tips

1. **Use Vercel CLI** for local testing:
   ```bash
   npm i -g vercel
   vercel dev
   ```

2. **Preview deployments** - Every push creates a preview URL!

3. **Environment variables** - Set different values for Production/Preview

4. **Analytics** - Enable Vercel Analytics for free!

---

## 🚀 That's It!

Your entire app (frontend + backend) will be live on one Vercel URL! 🎉

