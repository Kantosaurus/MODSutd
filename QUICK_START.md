# Quick Start Guide

## Prerequisites
- Docker Desktop installed and running
- Node.js 20+ installed
- Git Bash or PowerShell

## Option 1: Automated Startup (Windows)

Double-click `start-dev.bat` in the project root.

This will:
1. ✅ Start Docker containers (PostgreSQL + Neo4j)
2. ✅ Wait for databases to initialize
3. ✅ Start backend server
4. ✅ Run database migration
5. ✅ Start frontend server

## Option 2: Manual Startup (All Platforms)

### Step 1: Start Databases

```bash
cd C:\Users\wooai\Documents\MODSutd
docker-compose up -d postgres neo4j
```

Wait 30 seconds for databases to initialize.

### Step 2: Start Backend

Open a new terminal:

```bash
cd C:\Users\wooai\Documents\MODSutd\backend
npm install
npm run migrate  # This loads all modules into database
npm start
```

**Wait until you see:**
```
✅ Databases connected
🚀 Server ready at http://localhost:4000/graphql
💚 Health check available at http://localhost:4000/health
```

### Step 3: Verify Backend is Running

Open browser or use curl:
```bash
curl http://localhost:4000/health
```

Should return:
```json
{
  "status": "healthy",
  "coursesLoaded": 1482,
  "migrationComplete": true
}
```

### Step 4: Start Frontend

Open a new terminal:

```bash
cd C:\Users\wooai\Documents\MODSutd\frontend
npm install
npm run dev
```

Wait until you see:
```
✓ Ready in 3.2s
○ Local:   http://localhost:3000
```

### Step 5: Access Application

Open browser: **http://localhost:3000**

## Troubleshooting

### Backend won't start

**Error: `ECONNREFUSED` or database connection failed**

Solution:
```bash
# Restart databases
docker-compose restart postgres neo4j

# Wait 30 seconds
# Then try starting backend again
cd backend
npm start
```

**Error: `Migration failed`**

Solution:
```bash
# Check CSV files exist
ls frontend/src/Mods/

# Should show:
# ASD Mods.csv
# Freshmore.csv
# ISTD Mods.csv

# Run migration manually
cd backend
npm run migrate
```

### Frontend shows "Cannot connect to backend"

**Check backend is running:**
```bash
curl http://localhost:4000/health
```

If this fails, backend is not running. Go back to Step 2.

**Check API URL in browser console:**
Open DevTools (F12) → Console tab. Should see:
```
🔍 Fetching courses from: http://localhost:4000/graphql
```

If you see a different URL, check `frontend/.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:4000/graphql
```

### Port already in use

**Error: `EADDRINUSE` port 4000 or 3000**

Solution:
```bash
# Find and kill process using port
# Windows:
netstat -ano | findstr :4000
taskkill /PID <PID> /F

# Mac/Linux:
lsof -ti:4000 | xargs kill -9
```

## Complete Restart

If everything is broken:

```bash
# Stop everything
docker-compose down
# Kill any running npm processes

# Start fresh
docker-compose up -d postgres neo4j
# Wait 30 seconds
cd backend && npm start
# Wait for backend ready message
cd ../frontend && npm run dev
```

## Docker-Only Setup (Alternative)

If you prefer to run everything in Docker:

```bash
docker-compose up --build
```

This takes 2-3 minutes to build and start all services.

Access:
- Frontend: http://localhost:3000
- Backend: http://localhost:4000/graphql
- Neo4j Browser: http://localhost:7474

## Environment Variables

The project uses these files:
- `.env` - Root environment variables (for Docker)
- `frontend/.env.local` - Frontend-specific variables
- Backend reads from root `.env`

Make sure these are configured correctly.

## Need Help?

1. Check backend logs in the backend terminal
2. Check frontend logs in the frontend terminal
3. Check browser console (F12)
4. Verify databases are running: `docker-compose ps`
