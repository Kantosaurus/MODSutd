# MODSutd

A modern web application for managing academic modules and student data at Singapore University of Technology and Design (SUTD), built with React, TypeScript, Next.js, Node.js, PostgreSQL, and Neo4j GraphDB.

## 🚀 Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Utility-first CSS framework
- **ESLint** - Code linting

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Apollo Server Express** - GraphQL server
- **GraphQL** - API query language

### Databases
- **PostgreSQL** - Primary relational database
- **Neo4j** - Graph database for relationships and recommendations

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration

## 📋 Prerequisites

- Docker and Docker Compose
- Node.js 18+ (for local development)
- Git

## 🛠️ Getting Started

### Using Docker (Recommended)

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd MODSutd
   ```

2. **Configure environment variables**
   ```bash
   # Copy the example environment file
   cp .env.example .env

   # Edit .env with your preferred settings (optional - defaults work for local dev)
   # For production, make sure to change passwords and secrets!
   ```

3. **Start all services**
   ```bash
   # Production build (automatically runs database migrations)
   docker-compose up -d --build

   # Development build (with hot reload for backend)
   docker-compose -f docker-compose.dev.yml up -d
   ```

   **Note**: The backend container automatically:
   - Waits for PostgreSQL and Neo4j to be ready
   - Runs database migrations from `ISTD Mods.csv`
   - Imports all module data and relationships
   - Starts the GraphQL server

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend GraphQL: http://localhost:4000/graphql
   - Neo4j Browser: http://localhost:7474
   - PostgreSQL: localhost:5432 (user: postgres, password: password)

### Local Development

For local development without Docker:

1. **Configure environment for local development**
   ```bash
   # Copy root .env.example to .env if you haven't already
   cp .env.example .env

   # Edit .env and uncomment the local development overrides:
   # NODE_ENV=development
   # DB_HOST=localhost
   # NEO4J_URI=bolt://localhost:7687
   ```

2. **Start databases only**
   ```bash
   docker-compose up postgres neo4j -d
   ```

3. **Setup backend**
   ```bash
   cd backend
   npm install
   npm run dev
   ```

4. **Setup frontend**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

   **Note**: The backend and frontend will automatically read from the root `.env` file.

## 📚 Module System

MODSutd includes a comprehensive module management system with:

### Features
- **Complete Module Information**: All ISTD modules with detailed information
- **Prerequisites & Corequisites**: Visual prerequisite chains and corequisite tracking
- **Individual Module Pages**: Detailed pages for each module at `/dashboard/modules/[code]`
- **Module Browser**: Search and filter modules by code, name, and type
- **Term Planner**: Plan your modules across terms with prerequisite validation
- **Graph Relationships**: Neo4j-powered prerequisite/corequisite tracking

### Module Data
Module data is stored in `ISTD Mods.csv` and includes:
- Module code, name, and credits
- Overview and learning objectives
- Measurable outcomes and topics covered
- Prerequisites and corequisites
- Terms offered and teaching faculty
- Textbooks and delivery format

### Running Migrations Manually

If you need to re-run migrations (e.g., after updating the CSV):

```bash
# Using Docker
docker exec modsutd-backend npm run migrate

# Local development
cd backend
npm run migrate
```

## 🗄️ Database Schema

### PostgreSQL Tables
- `users` - User accounts and profiles
- `courses` - Module information with all details
- `enrollments` - Student course enrollments
- `password_reset_tokens` - Password reset tokens

### Neo4j Graph Schema
- `Course` nodes with `REQUIRES` relationships for prerequisites
- `Course` nodes with `COREQUISITE` relationships for corequisites
- `User` nodes with `ENROLLED_IN` relationships (future feature)

## 🔧 Environment Variables

All environment variables are centralized in the root `.env` file. Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

### Key Configuration Options

#### Server Configuration
- `NODE_ENV` - Environment (development/production)
- `BACKEND_PORT` - Backend API port (default: 4000)
- `FRONTEND_PORT` - Frontend port (default: 3000)

#### URLs
- `FRONTEND_URL` - Frontend URL for CORS
- `NEXT_PUBLIC_API_URL` - GraphQL API endpoint (exposed to browser)

#### Security
- `JWT_SECRET` - **⚠️ CHANGE THIS IN PRODUCTION!**

#### Database Credentials
- PostgreSQL: `DB_USER`, `DB_PASSWORD`, `DB_NAME`
- Neo4j: `NEO4J_USER`, `NEO4J_PASSWORD`, `NEO4J_AUTH`

**⚠️ Production Security Note**: Make sure to change all default passwords and secrets before deploying to production!

### Local Development vs Docker

The `.env` file works for both Docker and local development:
- **Docker**: Uses service names (`postgres`, `neo4j`) for hosts
- **Local Dev**: Uncomment and use `localhost` for database hosts

```env
# For local development without Docker, uncomment these:
# NODE_ENV=development
# DB_HOST=localhost
# NEO4J_URI=bolt://localhost:7687
```

## 📊 API Documentation

The GraphQL API provides:

### Queries
- User management: `users`, `user`, `me`
- Course catalog: `courses`, `course`, `courseByCode`, `coursesByCode`
- Prerequisites: `coursePrerequisites`, `courseCorequisites`
- Enrollment tracking: `enrollments`, `userEnrollments`, `courseEnrollments`
- Graph-based recommendations: `recommendedCourses`

### Mutations
- Authentication: `register`, `login`, `requestPasswordReset`, `resetPassword`
- Course management: `createCourse`, `updateCourse`, `deleteCourse`
- Enrollment operations: `enrollInCourse`, `dropCourse`, `updateGrade`

## 🐳 Docker Services

- **frontend**: Next.js application (port 3000)
- **backend**: Node.js GraphQL API (port 4000)
- **postgres**: PostgreSQL database (port 5432)
- **neo4j**: Neo4j graph database (ports 7474, 7687)

## 🧪 Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

## 📝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.