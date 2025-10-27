@echo off
echo ========================================
echo MODSutd Service Status Check
echo ========================================
echo.

echo [1] Checking Docker containers...
docker-compose ps
echo.

echo [2] Checking Backend (port 4000)...
curl -s http://localhost:4000/health
if %errorlevel% equ 0 (
    echo [OK] Backend is running
) else (
    echo [ERROR] Backend is NOT running or not accessible
    echo Please start backend with: cd backend ^&^& npm start
)
echo.

echo [3] Checking Frontend (port 3000)...
curl -s -o nul -w "HTTP Status: %%{http_code}\n" http://localhost:3000
if %errorlevel% equ 0 (
    echo [OK] Frontend is running
) else (
    echo [ERROR] Frontend is NOT running
    echo Please start frontend with: cd frontend ^&^& npm run dev
)
echo.

echo [4] Checking if ports are in use...
netstat -ano | findstr ":4000"
netstat -ano | findstr ":3000"
echo.

echo ========================================
echo Status Check Complete
echo ========================================
pause
