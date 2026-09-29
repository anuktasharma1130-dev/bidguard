#!/usr/bin/env bash
echo "=========================================================="
echo "  Starting BIDGUARD AI Prototype (Frontend & Backend)"
echo "  Tagline: Understand. Verify. Bid with Confidence."
echo "=========================================================="

# Start backend
echo -e "\n[1/2] Starting FastAPI Backend on http://127.0.0.1:8000..."
python -m uvicorn backend.main:app --host 127.0.0.1 --port 8000 &
BACKEND_PID=$!

# Trap exit to kill backend
trap "kill $BACKEND_PID" EXIT

# Start frontend
echo -e "[2/2] Starting Vite Frontend on http://127.0.0.1:3000..."
cd frontend && npm run dev -- --host 127.0.0.1 --port 3000
