# 🔍 Check Vercel Function Logs

## The function is running but crashing (500 error)

This means:
- ✅ Vercel found the function
- ✅ Python is running
- ❌ Something inside is crashing

---

## Step 1: CHECK THE LOGS

**CRITICAL - Do this now:**

1. Go to **Vercel Dashboard** (https://vercel.com)
2. Click on **sams-neon** project
3. Click **"Deployments"** tab
4. Click on the **latest deployment**
5. Click **"Functions"** tab
6. Click on **"api"** or **"api/index.py"**
7. **Look for error messages**

**Tell me what error you see!**

---

## Common Errors & Fixes

### Error 1: Missing Environment Variables
```
KeyError: 'MONGODB_URI'
or
Settings validation error
```

**Fix:** Add environment variables in Vercel Dashboard → Settings → Environment Variables:
```
MONGODB_URI=mongodb+srv://sasindulakshithabandara_db_user:8UiFpxGgTgUmezah@cluster0.phjufsa.mongodb.net/?appName=Cluster0
DATABASE_NAME=student_academic_db
JWT_SECRET_KEY=supersecretkey12345
ADMIN_USERNAME=Admin
ADMIN_PASSWORD=Abc@12345
```

Then redeploy.

---

### Error 2: Import Error
```
ModuleNotFoundError: No module named 'config'
or
ImportError: cannot import name 'settings'
```

**Fix:** Backend directory issue. Check if `api/Backend/config.py` exists.

---

### Error 3: MongoDB Connection Timeout
```
pymongo.errors.ServerSelectionTimeoutError
or
SSL handshake failed
```

**Fix:** MongoDB might be blocking Vercel's IP. Check MongoDB Atlas whitelist.

---

## Quick Test: Disable Database

Let me create a version that doesn't connect to DB on startup:

