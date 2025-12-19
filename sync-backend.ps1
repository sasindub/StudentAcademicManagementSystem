# Sync Backend to api/Backend for Vercel deployment
# Run this before pushing to Vercel

Write-Host "Syncing Backend to api/Backend..." -ForegroundColor Cyan

# Copy Backend files
xcopy /E /I /Y Backend api\Backend

# Remove cache files and .env
Remove-Item -Path "api\Backend\__pycache__" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path "api\Backend\**\__pycache__" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path "api\Backend\.env" -Force -ErrorAction SilentlyContinue
Remove-Item -Path "api\Backend\*.pyc" -Force -ErrorAction SilentlyContinue

Write-Host "Backend synced successfully!" -ForegroundColor Green
Write-Host "You can now commit and push to deploy on Vercel." -ForegroundColor Yellow

