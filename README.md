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

2. **Start all services**
   ```bash
   # Production build
   docker-compose up -d

   # Development build (with hot reload for backend)
   docker-compose -f docker-compose.dev.yml up -d
   ```

3. **Access the application**
   - Frontend: http://localhost:3000
   - Backend GraphQL: http://localhost:4000/graphql
   - Neo4j Browser: http://localhost:7474

### Local Development

1. **Start databases only**
   ```bash
   docker-compose -f docker-compose.dev.yml up postgres neo4j -d
   ```

2. **Setup backend**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   npm run dev
   ```

3. **Setup frontend**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## 🗄️ Database Schema

### PostgreSQL Tables
- `users` - User accounts and profiles
- `courses` - Course information
- `enrollments` - Student course enrollments

### Neo4j Graph Schema
- `User` nodes with `ENROLLED_IN` relationships to `Course` nodes
- `Course` nodes with `PREREQUISITE_OF` relationships for course dependencies

## 🔧 Environment Variables

Copy `backend/.env.example` to `backend/.env` and configure:

```env
# Server Configuration
PORT=4000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

# JWT Configuration
JWT_SECRET=your-super-secure-jwt-secret-key-here

# PostgreSQL Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=modsutd
DB_USER=postgres
DB_PASSWORD=password

# Neo4j GraphDB Configuration
NEO4J_URI=bolt://localhost:7687
NEO4J_USER=neo4j
NEO4J_PASSWORD=password
```

## 📊 API Documentation

The GraphQL API provides:

### Queries
- User management (`users`, `user`, `me`)
- Course catalog (`courses`, `course`, `coursesByCode`)
- Enrollment tracking (`enrollments`, `userEnrollments`)
- Graph-based recommendations (`coursePrerequisites`, `recommendedCourses`)

### Mutations
- Authentication (`register`, `login`)
- Course management (`createCourse`, `updateCourse`, `deleteCourse`)
- Enrollment operations (`enrollInCourse`, `dropCourse`, `updateGrade`)

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