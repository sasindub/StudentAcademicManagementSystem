#!/bin/bash

echo "======================================"
echo "Student Academic Management System"
echo "======================================"
echo ""

# Start Backend in background
echo "[1/2] Starting Backend..."
cd Backend
python main.py &
BACKEND_PID=$!
cd ..

# Wait a bit
sleep 3

# Start Frontend in background
echo "[2/2] Starting Frontend..."
cd Frontend
npm run dev &
FRONTEND_PID=$!
cd ..

echo ""
echo "======================================"
echo "Both servers are running!"
echo "======================================"
echo ""
echo "Backend:  http://localhost:8000 (PID: $BACKEND_PID)"
echo "Frontend: http://localhost:3000 (PID: $FRONTEND_PID)"
echo ""
echo "Press Ctrl+C to stop both servers"
echo ""

# Wait for Ctrl+C
trap "kill $BACKEND_PID $FRONTEND_PID; exit" INT
wait

