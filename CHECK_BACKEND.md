# 🔍 Check Backend Deployment

## Step 1: Check Vercel Function Logs

1. Go to **Vercel Dashboard** → **sams-neon project**
2. Click **"Functions"** tab (or "Deployments" → latest deployment → "Functions")
3. Look for errors in the logs

**Common issues:**
- Environment variables not set
- MongoDB connection failing
- Import errors
- Timeout errors

---

## Step 2: Test Backend Endpoints

### Test 1: Health Check
Open in browser: `https://sams-neon.vercel.app/health`

**Expected:**
```json
{
  "status": "healthy",
  "service": "student-academic-api"
}
```

**If this fails:** Backend is not running properly. Check Vercel logs.

---

### Test 2: Root Endpoint
Open in browser: `https://sams-neon.vercel.app/`

**Expected:**
```json
{
  "message": "Student Academic Management System API",
  "status": "running",
  "version": "1.0.0"
}
```

---

### Test 3: CORS Test (using curl)

```bash
curl -X OPTIONS https://sams-neon.vercel.app/auth/login \
  -H "Origin: https://samsapp.vercel.app" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: content-type" \
  -v
```

**Look for these headers in response:**
```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS, PATCH
Access-Control-Allow-Headers: *
```

**If missing:** CORS middleware not working.

---

### Test 4: Login Test

```bash
curl -X POST https://sams-neon.vercel.app/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"Admin","password":"Abc@12345"}' \
  -v
```

**Expected:** JWT token response

---

## Step 3: Check Environment Variables

In Vercel Dashboard → sams-neon → Settings → Environment Variables:

**Required:**
- `MONGODB_URI`
- `DATABASE_NAME`
- `JWT_SECRET_KEY`
- `ADMIN_USERNAME`
- `ADMIN_PASSWORD`

**If any are missing:** Add them and redeploy.

---

## Step 4: Check vercel.json

Make sure root `vercel.json` is:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "api/index.py",
      "use": "@vercel/python",
      "config": {
        "maxLambdaSize": "15mb"
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "api/index.py"
    }
  ]
}
```

---

## Step 5: Test with test-backend.html

1. Open `test-backend.html` in your browser
2. Check results for each test
3. See which test fails

---

## Common Fixes

### If backend returns 500:
- Check Vercel function logs for errors
- Verify MongoDB connection string
- Check environment variables

### If CORS headers missing:
- Make sure `api/index.py` has CORS middleware
- Redeploy backend

### If backend times out:
- MongoDB connection might be slow
- Increase function timeout in Vercel settings

---

## Next Steps

1. **Test `/health` endpoint first** - if this fails, backend isn't running
2. **Check Vercel logs** - see actual error messages
3. **Report back what you see** - I'll help fix it

