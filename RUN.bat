@echo off
echo ======================================
echo Student Academic Management System
echo ======================================
echo.

REM Start Backend
echo [1/2] Starting Backend...
start "Backend Server" cmd /k "cd Backend && python main.py"

REM Wait a bit
timeout /t 3 /nobreak >nul

REM Start Frontend
echo [2/2] Starting Frontend...
start "Frontend Server" cmd /k "cd Frontend && npm run dev"

echo.
echo ======================================
echo Both servers are starting!
echo ======================================
echo.
echo Backend:  http://localhost:8000
echo Frontend: http://localhost:3000
echo.
echo Two new windows have opened.
echo You can close this window now.
echo.
pause

