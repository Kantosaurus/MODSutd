@echo off
echo ========================================
echo MODSutd Development Startup Script
echo ========================================
echo.

REM Check if Docker is running
docker info >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Docker is not running!
    echo Please start Docker Desktop and try again.
    pause
    exit /b 1
)

echo [1/4] Starting Docker containers (PostgreSQL + Neo4j)...
docker-compose up -d postgres neo4j

echo.
echo [2/4] Waiting for databases to be ready (30 seconds)...
timeout /t 30 /nobreak >nul

echo.
echo [3/4] Starting Backend Server...
start cmd /k "cd backend && npm install && npm run migrate && npm start"

echo.
echo [4/4] Waiting for backend to initialize (10 seconds)...
timeout /t 10 /nobreak >nul

echo.
echo [5/4] Starting Frontend Server...
start cmd /k "cd frontend && npm install && npm run dev"

echo.
echo ========================================
echo Startup Complete!
echo ========================================
echo Backend:  http://localhost:4000/graphql
echo Frontend: http://localhost:3000
echo Health:   http://localhost:4000/health
echo ========================================
echo.
echo Press any key to check backend health...
pause >nul

curl http://localhost:4000/health

echo.
pause
