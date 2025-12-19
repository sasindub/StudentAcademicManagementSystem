# 🚀 Deploy Backend Only on Vercel (Separate Project)

## Quick Fix for CORS Issues

### Step 1: Update Your Backend Project Structure

Make sure your backend Vercel project has this structure:
```
your-backend-repo/
├── api/
│   ├── index.py          ← This is your serverless function
│   ├── requirements.txt  ← Python dependencies
│   └── vercel.json       ← Backend routing config
└── Backend/              ← Your backend code
    ├── config.py
    ├── database.py
    ├── routes/
    ├── services/
    └── ...
```

### Step 2: Vercel Project Settings

**Root Directory:** Leave empty (or set to root)

**Build Settings:**
- Framework Preset: Other
- Build Command: (leave empty - Vercel auto-detects Python)
- Output Directory: (leave empty)

### Step 3: Environment Variables

Add these in Vercel → Settings → Environment Variables:

```
MONGODB_URI=your-mongodb-connection-string
DATABASE_NAME=student_academic_db
JWT_SECRET_KEY=any-secret-key
ADMIN_USERNAME=Admin
ADMIN_PASSWORD=Abc@12345
```

**NO FRONTEND_URL NEEDED** - CORS allows all origins now!

### Step 4: Deploy

Click Deploy. Your backend will be at:
- `https://sams-neon.vercel.app`

### Step 5: Update Frontend

In your **frontend Vercel project**, set environment variable:

```
VITE_API_URL=https://sams-neon.vercel.app
```

**IMPORTANT:** Make sure frontend calls:
- ✅ `https://sams-neon.vercel.app/auth/login`
- ✅ `https://sams-neon.vercel.app/students`
- ✅ `https://sams-neon.vercel.app/marks`

NOT `/api/auth/login` - the routes are now at root level!

---

## ✅ What I Fixed

1. **CORS now allows ALL origins** - No more CORS errors
2. **Routes work at root level** - `/auth/login` not `/api/auth/login`
3. **Explicit CORS headers** - Added in middleware
4. **OPTIONS handler** - For preflight requests

---

## 🧪 Test Your Backend

After deploying, test:
```
https://sams-neon.vercel.app/health
```

Should return: `{"status": "healthy", "service": "student-academic-api"}`

---

## 🆘 Still Having Issues?

1. **Check Vercel Function Logs** - See what errors are happening
2. **Verify MongoDB connection** - Check environment variables
3. **Test with curl:**
   ```bash
   curl https://sams-neon.vercel.app/health
   ```

---

**Push the updated `api/index.py` and redeploy!** 🚀

