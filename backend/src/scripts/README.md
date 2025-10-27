# Module Migration Script

This script migrates module data from both the ISTD Mods.csv and Freshmore.csv files into the database.

## What it does

1. **Parses the CSV files** - Reads both ISTD Mods.csv and Freshmore.csv and parses all module information
2. **Inserts into PostgreSQL** - Stores module details in the `courses` table
3. **Creates Neo4j relationships** - Sets up prerequisite and corequisite relationships

## Prerequisites

Make sure you have:
- PostgreSQL running and accessible
- Neo4j running and accessible
- Environment variables configured (or using defaults)

## How to run

### Method 1: Using npm script (recommended)
```bash
cd backend
npm run migrate
```

### Method 2: Using node directly
```bash
cd backend
node src/scripts/migrate-modules.js
```

## Environment Variables

The script uses the following environment variables (with defaults):

### PostgreSQL
- `DB_USER` (default: postgres)
- `DB_HOST` (default: localhost)
- `DB_NAME` (default: modsutd)
- `DB_PASSWORD` (default: password)
- `DB_PORT` (default: 5432)

### Neo4j
- `NEO4J_URI` (default: bolt://localhost:7687)
- `NEO4J_USER` (default: neo4j)
- `NEO4J_PASSWORD` (default: password)

## Expected Output

```
📚 Starting module migration...
📂 Reading ISTD Mods CSV from: /path/to/ISTD Mods.csv
✅ Parsed XX modules from ISTD Mods.csv
📂 Reading Freshmore CSV from: /path/to/Freshmore.csv
✅ Parsed XX modules from Freshmore.csv
✅ Total modules to migrate: XX
💾 Inserting modules into PostgreSQL...
✅ Inserted XX modules into PostgreSQL
🔗 Creating relationships in Neo4j...
✅ Created XX course nodes in Neo4j
✅ Created XX prerequisite relationships
✅ Created XX corequisite relationships
🎉 Migration completed successfully!
```

## What gets migrated

For each module:
- Module code (e.g., 50.001)
- Module name
- Overview
- Credits
- Learning objectives
- Measurable outcomes
- Topics covered
- Textbooks
- Delivery format
- Grading scheme
- Terms offered
- Professors
- Tags (Core/Elective)
- Prerequisites (with relationships)
- Corequisites (with relationships)

## Notes

- The script uses `ON CONFLICT` to handle duplicate module codes, so it's safe to run multiple times
- Existing relationships in Neo4j are cleared before creating new ones
- The script will show warnings for missing prerequisite/corequisite relationships but will continue
