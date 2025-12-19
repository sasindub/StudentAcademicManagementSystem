# Start Both Servers
Write-Host "Starting Student Academic Management System..." -ForegroundColor Cyan
Write-Host ""

# Start Backend in new window
Write-Host "Starting Backend on http://localhost:8000..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\Backend'; python main.py"

# Wait a bit
Start-Sleep -Seconds 2

# Start Frontend in new window
Write-Host "Starting Frontend on http://localhost:3000..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\Frontend'; npm run dev"

Write-Host ""
Write-Host "Both servers are starting in separate windows!" -ForegroundColor Green
Write-Host "Backend: http://localhost:8000" -ForegroundColor Cyan
Write-Host "Frontend: http://localhost:3000" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press any key to exit this window (servers will keep running)..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")


