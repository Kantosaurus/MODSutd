# MODSutd

A full-stack application for managing SUTD modules with user progress tracking.

## Architecture

- **Frontend**: Next.js 14 with TypeScript and Tailwind CSS
- **Backend**: Node.js with GraphQL, Apollo Server, and Prisma
- **Database**: PostgreSQL
- **Containerization**: Docker and Docker Compose

## Project Structure

```
.
├── frontend/          # Next.js frontend application
│   ├── src/          # Source code
│   ├── public/       # Static assets
│   └── Dockerfile    # Frontend Docker configuration
├── backend/          # Node.js backend API
│   ├── src/          # Source code
│   ├── prisma/       # Database schema and migrations
│   └── Dockerfile    # Backend Docker configuration
├── docker-compose.yml     # Production Docker Compose
├── docker-compose.dev.yml # Development Docker Compose
└── README.md
```

## Getting Started

### Prerequisites

- Docker
- Docker Compose
- Node.js 18+ (for local development)

### Development Setup

1. Clone the repository
2. Copy environment files:
   ```bash
   cp backend/.env.example backend/.env
   ```
3. Start the development environment:
   ```bash
   npm run dev
   ```

This will start:
- Frontend on http://localhost:3000
- Backend GraphQL API on http://localhost:4000/graphql
- PostgreSQL database on localhost:5432
- Adminer (database UI) on http://localhost:8080

### Production Setup

```bash
npm run build
npm start
```

### Database Setup

The database will be automatically set up when you start the Docker containers. To run migrations manually:

```bash
npm run db:migrate
```

To access the Prisma Studio (database UI):

```bash
npm run db:studio
```

## Available Scripts

- `npm run dev` - Start development environment
- `npm run build` - Build all services
- `npm start` - Start production environment
- `npm run stop` - Stop all services
- `npm run clean` - Clean up containers and volumes
- `npm run db:migrate` - Run database migrations
- `npm run db:generate` - Generate Prisma client
- `npm run db:studio` - Open Prisma Studio

## Environment Variables

### Backend (.env)

```
DATABASE_URL="postgresql://modsutd:password@postgres:5432/modsutd?schema=public"
JWT_SECRET="your-super-secret-jwt-key-here"
PORT=4000
NODE_ENV=development
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
FRONTEND_URL=http://localhost:3000
```

### Frontend

Environment variables are configured in `docker-compose.yml`:

```
NEXT_PUBLIC_GRAPHQL_URL=http://localhost:4000/graphql
```

## Features

- User authentication and email verification
- Module management and enrollment
- Progress tracking
- Responsive UI with Tailwind CSS
- GraphQL API with Apollo Server
- Type-safe database access with Prisma
- Containerized development and production environments

## Development

### Frontend Development

```bash
cd frontend
npm install
npm run dev
```

### Backend Development

```bash
cd backend
npm install
npm run dev
```

Make sure PostgreSQL is running (either through Docker or locally) and update the `DATABASE_URL` accordingly.

## Deployment

The application is containerized and can be deployed using Docker Compose or any container orchestration platform like Kubernetes.

For production deployment:

1. Update environment variables in `docker-compose.yml`
2. Set up a production PostgreSQL database
3. Configure proper secrets and security settings
4. Run `docker-compose up -d`

## Technologies Used

- **Frontend**
  - Next.js 14
  - React 18
  - TypeScript
  - Tailwind CSS
  - Framer Motion
  - Lottie React

- **Backend**
  - Node.js with TypeScript
  - GraphQL with Apollo Server
  - Prisma ORM
  - PostgreSQL
  - JWT Authentication
  - Nodemailer

## License

This project is licensed under the terms of the license included in the repository.
