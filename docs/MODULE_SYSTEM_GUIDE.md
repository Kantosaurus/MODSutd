# Module System Implementation Guide

This document describes the complete module system implementation with prerequisites, corequisites, and detailed module pages.

## Overview

The module system consists of:
1. **PostgreSQL Database** - Stores module details
2. **Neo4j GraphDB** - Manages prerequisite and corequisite relationships
3. **GraphQL API** - Provides queries for module data
4. **Frontend Pages** - Displays module information

## Architecture

### Database Schema

#### PostgreSQL - `courses` table
Stores all module information:
- `code` - Module code (e.g., 50.001)
- `name` - Module name
- `overview` - Module description
- `credits` - Credit value
- `learning_objectives` - Learning objectives
- `measurable_outcomes` - Measurable outcomes
- `topics_covered` - Topics covered
- `textbooks` - Required textbooks
- `delivery_format` - How the course is delivered
- `grading_scheme` - Grading information
- `terms` - Terms when offered
- `professors` - Teaching faculty
- `tags` - Core/Elective classification

#### Neo4j - Course Nodes and Relationships
- **Nodes**: `Course {id, code}`
- **Relationships**:
  - `REQUIRES` - Prerequisites
  - `COREQUISITE` - Corequisites

## Setup and Migration

### 1. Start the databases

Make sure PostgreSQL and Neo4j are running:

```bash
# Using Docker Compose (if configured)
docker-compose up -d

# Or start them individually
# PostgreSQL on port 5432
# Neo4j on port 7687
```

### 2. Configure environment

Copy and configure the environment file:

```bash
cd backend
cp .env.example .env
# Edit .env with your database credentials
```

### 3. Run the migration

```bash
cd backend
npm run migrate
```

This will:
1. Read `ISTD Mods.csv`
2. Insert modules into PostgreSQL
3. Create course nodes in Neo4j
4. Set up prerequisite/corequisite relationships

## GraphQL API

### Queries

#### Get all modules
```graphql
query {
  courses {
    id
    code
    name
    credits
    tags
  }
}
```

#### Get a specific module by ID
```graphql
query {
  course(id: "1") {
    id
    code
    name
    overview
    credits
    learningObjectives
    prerequisites {
      code
      name
    }
    corequisites {
      code
      name
    }
  }
}
```

#### Get a module by code
```graphql
query {
  courseByCode(code: "50.001") {
    id
    code
    name
    overview
    credits
    prerequisites {
      code
      name
    }
    corequisites {
      code
      name
    }
  }
}
```

#### Search modules by code
```graphql
query {
  coursesByCode(code: "50.0") {
    id
    code
    name
  }
}
```

#### Get prerequisites for a module
```graphql
query {
  coursePrerequisites(courseId: "1") {
    code
    name
    credits
  }
}
```

#### Get corequisites for a module
```graphql
query {
  courseCorequisites(courseId: "1") {
    code
    name
    credits
  }
}
```

## Frontend Routes

### Module List Page
**URL**: `/dashboard/modules`

Features:
- Browse all modules
- Search by code or name
- Filter by pillar and term
- Click on modules to view details

### Module Detail Page
**URL**: `/dashboard/modules/[code]`

Example: `/dashboard/modules/50.001`

Features:
- Complete module information
- Prerequisites (clickable links)
- Corequisites (clickable links)
- Learning objectives
- Topics covered
- Faculty information
- Terms offered

## Module Data Structure

```typescript
interface ModuleData {
  code: string;                    // "50.001"
  name: string;                    // "Information Systems and Programming"
  overview?: string;               // Course description
  credits: number;                 // 4
  prerequisites: string[];         // ["10.025"]
  corequisites: string[];          // []
  learningObjectives?: string;
  measurableOutcomes?: string;
  topicsCovered?: string;
  textbooks?: string;
  deliveryFormat?: string;
  gradingScheme?: string;
  terms?: string;                  // "4"
  professors?: string;             // "Norman Lee, ..."
  tags?: string;                   // "Core" or "Elective"
}
```

## Testing

### 1. Test the migration

```bash
cd backend
npm run migrate
```

Expected output:
- ✅ Parsed XX modules from CSV
- ✅ Inserted XX modules into PostgreSQL
- ✅ Created XX course nodes in Neo4j
- ✅ Created XX prerequisite relationships
- ✅ Created XX corequisite relationships

### 2. Test the GraphQL API

Start the backend server:
```bash
cd backend
npm run dev
```

Visit the GraphQL Playground at `http://localhost:4000/graphql` and try the queries above.

### 3. Test the frontend

Start the frontend:
```bash
cd frontend
npm run dev
```

1. Go to `http://localhost:3000/dashboard/modules`
2. Click on a module (e.g., 50.001)
3. Verify module details are displayed
4. Click on prerequisite/corequisite links
5. Verify navigation works

## Key Files

### Backend
- `backend/src/database/postgresql.js` - Database schema
- `backend/src/schema/typeDefs.js` - GraphQL schema
- `backend/src/resolvers/courseResolvers.js` - GraphQL resolvers
- `backend/src/scripts/migrate-modules.js` - Migration script

### Frontend
- `frontend/src/app/dashboard/modules/page.tsx` - Module list
- `frontend/src/app/dashboard/modules/[code]/page.tsx` - Module detail page

### Data
- `ISTD Mods.csv` - Source data file

## Troubleshooting

### Migration fails
- Check database connections
- Verify PostgreSQL is running on port 5432
- Verify Neo4j is running on port 7687
- Check credentials in `.env`

### Modules not showing on frontend
- Ensure backend is running
- Check GraphQL API is accessible
- Verify migration completed successfully
- Check browser console for errors

### Prerequisites/Corequisites not linking
- Verify Neo4j relationships were created
- Check the module codes match exactly
- Use Neo4j Browser to inspect relationships:
  ```cypher
  MATCH (c:Course)-[r:REQUIRES]->(p:Course)
  RETURN c, r, p
  ```

## Next Steps

To extend the system:

1. **Add more module data** - Update ISTD Mods.csv and re-run migration
2. **Implement module recommendations** - Use the `recommendedCourses` query
3. **Add user progress tracking** - Track completed modules
4. **Validate prerequisites** - Prevent enrollment without prerequisites
5. **Generate study plans** - Auto-generate term-by-term plans
6. **Add module reviews** - Let students review modules
