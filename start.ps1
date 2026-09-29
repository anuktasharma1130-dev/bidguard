Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "  Starting BIDGUARD AI Prototype (Frontend & Backend)" -ForegroundColor Cyan
Write-Host "  Tagline: Understand. Verify. Bid with Confidence." -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan

# Start Backend in background process
Write-Host "`n[1/2] Starting FastAPI Backend on http://127.0.0.1:8000..." -ForegroundColor Yellow
$backend = Start-Process python -ArgumentList "-m uvicorn backend.main:app --host 127.0.0.1 --port 8000" -PassThru

# Start Frontend in current console
Write-Host "[2/2] Starting Vite Frontend on http://127.0.0.1:3000..." -ForegroundColor Green
Set-Location frontend
npm run dev -- --host 127.0.0.1 --port 3000
