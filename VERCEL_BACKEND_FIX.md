# 🔧 Fix for Vercel Backend Deployment

## The Problem
`ModuleNotFoundError: No module named 'config'` - Vercel can't find the Backend directory.

## ✅ Solution

### Option 1: Deploy from Root (Recommended)

1. **In Vercel Project Settings:**
   - **Root Directory:** Leave EMPTY (or set to `/`)
   - **Framework Preset:** Other
   - **Build Command:** (leave empty)
   - **Output Directory:** (leave empty)

2. **Make sure `vercel.json` is at ROOT level** (not in api/)

3. **The vercel.json should route everything to api/index.py**

### Option 2: Copy Backend Files to api/ (Alternative)

If Option 1 doesn't work, copy Backend files:

```bash
# In your local repo
cp -r Backend api/Backend
```

Then update `api/index.py` to:
```python
backend_path = Path(__file__).parent / "Backend"
```

### Option 3: Use Root Directory Setting

In Vercel Dashboard:
1. Go to **Settings** → **General**
2. Set **Root Directory** to: `api` (if deploying only backend)
3. Or leave empty if deploying from root

---

## 🚀 Quick Fix Steps

1. **Push the updated `api/index.py`** (with better path detection)
2. **Make sure `vercel.json` is at root** with correct config
3. **Redeploy on Vercel**
4. **Check logs** if still failing

---

## 📝 Current vercel.json (for backend-only)

The root `vercel.json` should be:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "api/index.py",
      "use": "@vercel/python",
      "config": {
        "includeFiles": "Backend/**"
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/api/index.py"
    }
  ],
  "env": {
    "PYTHONPATH": "Backend"
  }
}
```

---

## ✅ Test After Deploy

Visit: `https://your-backend.vercel.app/health`

Should return: `{"status": "healthy"}`

