# Environment Configuration Guide

MODSutd uses a **centralized environment variable configuration** with all settings stored in a single root `.env` file. This simplifies configuration management and makes it easier to deploy across different environments.

## Quick Start

```bash
# 1. Copy the example configuration
cp .env.example .env

# 2. (Optional) Edit .env to customize settings
# For local development, the defaults work out of the box!

# 3. Start all services
docker-compose up -d --build
```

That's it! All services (PostgreSQL, Neo4j, Backend, Frontend) will automatically read from the root `.env` file.

## File Structure

```
MODSutd/
├── .env                    # Your actual config (gitignored)
├── .env.example            # Template with defaults
├── docker-compose.yml      # Uses ${VAR} syntax to read from .env
├── backend/
│   └── src/
│       └── index.js        # Loads ../../.env
└── frontend/
    └── (reads from Next.js env vars)
```

## Environment Variables

### Server Configuration

| Variable | Default | Description |
|----------|---------|-------------|
| `NODE_ENV` | `production` | Environment mode |
| `BACKEND_PORT` | `4000` | Backend API port |
| `FRONTEND_PORT` | `3000` | Frontend port |

### URLs

| Variable | Default | Description |
|----------|---------|-------------|
| `FRONTEND_URL` | `http://localhost:3000` | Frontend URL (for CORS) |
| `NEXT_PUBLIC_API_URL` | `http://localhost:4000/graphql` | GraphQL endpoint (browser) |

### Security

| Variable | Default | Description |
|----------|---------|-------------|
| `JWT_SECRET` | `your-super-secure-jwt-secret-key-change-this-in-production` | ⚠️ **MUST change in production!** |

### PostgreSQL

| Variable | Default | Description |
|----------|---------|-------------|
| `DB_HOST` | `postgres` | Database host (`localhost` for local dev) |
| `DB_PORT` | `5432` | Database port |
| `DB_NAME` | `modsutd` | Database name |
| `DB_USER` | `postgres` | Database user |
| `DB_PASSWORD` | `password` | ⚠️ **Change in production!** |
| `POSTGRES_DB` | `modsutd` | Used by Docker Compose |
| `POSTGRES_USER` | `postgres` | Used by Docker Compose |
| `POSTGRES_PASSWORD` | `password` | Used by Docker Compose |

### Neo4j

| Variable | Default | Description |
|----------|---------|-------------|
| `NEO4J_URI` | `bolt://neo4j:7687` | Neo4j connection URI |
| `NEO4J_USER` | `neo4j` | Neo4j username |
| `NEO4J_PASSWORD` | `password` | ⚠️ **Change in production!** |
| `NEO4J_AUTH` | `neo4j/password` | Used by Docker Compose (format: user/password) |

## Usage Patterns

### Docker Deployment (Recommended)

The default `.env` configuration is optimized for Docker:

```env
# Database hosts use service names
DB_HOST=postgres
NEO4J_URI=bolt://neo4j:7687
```

Simply run:
```bash
docker-compose up -d --build
```

### Local Development (Without Docker)

For local development, modify `.env` to use `localhost`:

```env
# Uncomment these lines in .env
NODE_ENV=development
DB_HOST=localhost
NEO4J_URI=bolt://localhost:7687
```

Then start databases with Docker and run services locally:
```bash
# Start only databases
docker-compose up postgres neo4j -d

# Run backend locally
cd backend
npm install
npm run dev

# Run frontend locally (in another terminal)
cd frontend
npm install
npm run dev
```

## How It Works

### Backend (`backend/src/index.js`)

```javascript
const path = require('path');

// Load environment variables from root .env file
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
```

The backend explicitly loads the root `.env` file, making all variables available via `process.env`.

### Frontend (Next.js)

Next.js automatically loads:
1. Root `.env` file
2. Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser

### Docker Compose (`docker-compose.yml`)

Uses variable substitution syntax:

```yaml
environment:
  DB_HOST: ${DB_HOST:-postgres}  # Uses $DB_HOST from .env, defaults to 'postgres'
  DB_PASSWORD: ${DB_PASSWORD:-password}
```

The `${VAR:-default}` syntax provides fallback values if `.env` is missing.

## Production Deployment

### Security Checklist

Before deploying to production, **update these critical values**:

```bash
# .env for production
NODE_ENV=production

# Generate a secure JWT secret (32+ random characters)
JWT_SECRET=<use a strong random string>

# Use strong passwords
DB_PASSWORD=<strong-password>
NEO4J_PASSWORD=<strong-password>
POSTGRES_PASSWORD=<strong-password>
NEO4J_AUTH=neo4j/<strong-password>

# Update URLs for your domain
FRONTEND_URL=https://your-domain.com
NEXT_PUBLIC_API_URL=https://your-domain.com/graphql
```

### Generating Secure Secrets

```bash
# Linux/Mac - Generate random JWT secret
openssl rand -base64 32

# Or use Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## Troubleshooting

### "Environment variable not found"

Make sure `.env` exists in the root directory:
```bash
cp .env.example .env
```

### "Connection refused" errors

Check that database hosts match your environment:
- **Docker**: Use service names (`postgres`, `neo4j`)
- **Local**: Use `localhost`

### Changes not taking effect

Restart the containers:
```bash
docker-compose down
docker-compose up -d
```

## Best Practices

### ✅ Do's

- ✅ Use `.env.example` as a template
- ✅ Keep `.env` in `.gitignore` (it's already configured)
- ✅ Document any new variables in `.env.example`
- ✅ Use strong passwords in production
- ✅ Validate required variables on startup

### ❌ Don'ts

- ❌ Commit `.env` to version control
- ❌ Use default passwords in production
- ❌ Hardcode secrets in source code
- ❌ Share `.env` files (use secure secret management)

## Migration from Old Setup

If you previously had separate `backend/.env` and `frontend/.env` files:

1. Create root `.env` from `.env.example`
2. Merge your custom values into root `.env`
3. Remove old `backend/.env` and `frontend/.env`
4. Restart services

The centralized configuration is now active!
