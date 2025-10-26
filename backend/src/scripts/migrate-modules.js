const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse/sync');

// Load environment variables from root .env file
require('dotenv').config({ path: path.resolve(__dirname, '../../../.env') });

const { pool } = require('../database/postgresql');
const neo4j = require('neo4j-driver');

// Parse CSV using csv-parse library
function parseCSV(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');

  // Remove BOM if present
  const cleanContent = content.replace(/^\uFEFF/, '');

  const records = parse(cleanContent, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
    relax_quotes: true,
    relax_column_count: true,
  });

  return records;
}

// Parse prerequisites/corequisites
function parseRequirements(reqString) {
  if (!reqString || reqString.trim() === '') return [];

  // Split by common separators and clean
  return reqString
    .split(/,|\n|and|or/i)
    .map(r => r.trim())
    .filter(r => r && r.match(/^\d+\.\d+/)) // Only keep module codes
    .map(r => {
      // Extract just the module code (e.g., "50.001")
      const match = r.match(/(\d+\.\d+)/);
      return match ? match[1] : null;
    })
    .filter(r => r !== null);
}

async function migrateModules() {
  // Try different paths for CSV file (local vs Docker)
  const possiblePaths = [
    path.join(__dirname, '../../../ISTD Mods.csv'),  // Local development
    path.join(__dirname, '../../ISTD Mods.csv'),      // In backend directory
    '/app/ISTD Mods.csv',                              // Docker mount
    path.join(process.cwd(), 'ISTD Mods.csv'),        // Current directory
  ];

  let csvPath = null;
  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      csvPath = p;
      break;
    }
  }

  console.log('📚 Starting module migration...');

  if (!csvPath) {
    console.error('❌ CSV file not found. Tried paths:', possiblePaths);
    throw new Error('CSV file not found');
  }

  console.log('📂 Reading CSV from:', csvPath);

  // Parse CSV
  const modules = parseCSV(csvPath);
  console.log(`✅ Parsed ${modules.length} modules from CSV`);

  // Connect to databases
  const client = await pool.connect();

  const driver = neo4j.driver(
    process.env.NEO4J_URI || 'bolt://localhost:7687',
    neo4j.auth.basic(
      process.env.NEO4J_USER || 'neo4j',
      process.env.NEO4J_PASSWORD || 'password'
    )
  );
  const neo4jSession = driver.session();

  try {
    // Start transaction
    await client.query('BEGIN');

    console.log('💾 Inserting modules into PostgreSQL...');

    const insertedModules = [];

    for (const module of modules) {
      try {
        // Insert into PostgreSQL
        const result = await client.query(
          `INSERT INTO courses
          (code, name, overview, description, credits, learning_objectives,
           measurable_outcomes, topics_covered, textbooks, delivery_format,
           grading_scheme, terms, professors, tags, created_at, updated_at)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, NOW(), NOW())
          ON CONFLICT (code) DO UPDATE SET
            name = EXCLUDED.name,
            overview = EXCLUDED.overview,
            description = EXCLUDED.description,
            credits = EXCLUDED.credits,
            learning_objectives = EXCLUDED.learning_objectives,
            measurable_outcomes = EXCLUDED.measurable_outcomes,
            topics_covered = EXCLUDED.topics_covered,
            textbooks = EXCLUDED.textbooks,
            delivery_format = EXCLUDED.delivery_format,
            grading_scheme = EXCLUDED.grading_scheme,
            terms = EXCLUDED.terms,
            professors = EXCLUDED.professors,
            tags = EXCLUDED.tags,
            updated_at = NOW()
          RETURNING id, code`,
          [
            module['Mod number'] || '',
            module['Mod name'] || '',
            module['Overview'] || '',
            module['Overview'] || '', // Using overview as description for now
            parseInt(module['Credits']) || 4,
            module['Learning Objectives'] || '',
            module['Measureable Outcomes'] || '',
            module['Topics Covered'] || '',
            module['Textbook(s) and/or other required material'] || '',
            module['Delivery Format'] || '',
            module['Grading Scheme'] || '',
            module['Terms'] || '',
            module['Professors'] || '',
            module['Tags'] || ''
          ]
        );

        insertedModules.push({
          id: result.rows[0].id,
          code: result.rows[0].code,
          prerequisites: parseRequirements(module['Pre-Requisites']),
          corequisites: parseRequirements(module['Co-requisites'])
        });

      } catch (error) {
        console.error(`❌ Error inserting module ${module['Mod number']}:`, error.message);
      }
    }

    await client.query('COMMIT');
    console.log(`✅ Inserted ${insertedModules.length} modules into PostgreSQL`);

    // Create Neo4j relationships
    console.log('🔗 Creating relationships in Neo4j...');

    // Clear existing data
    await neo4jSession.run('MATCH (n:Course) DETACH DELETE n');

    // Create course nodes
    for (const module of insertedModules) {
      await neo4jSession.run(
        `CREATE (c:Course {id: $id, code: $code})`,
        { id: module.id.toString(), code: module.code }
      );
    }

    console.log(`✅ Created ${insertedModules.length} course nodes in Neo4j`);

    // Create prerequisite relationships
    let prereqCount = 0;
    let coreqCount = 0;

    for (const module of insertedModules) {
      // Prerequisites
      for (const prereqCode of module.prerequisites) {
        try {
          await neo4jSession.run(
            `MATCH (c:Course {code: $code})
             MATCH (p:Course {code: $prereqCode})
             CREATE (c)-[:REQUIRES]->(p)`,
            { code: module.code, prereqCode }
          );
          prereqCount++;
        } catch (error) {
          console.warn(`⚠️  Could not create prerequisite ${prereqCode} for ${module.code}`);
        }
      }

      // Corequisites
      for (const coreqCode of module.corequisites) {
        try {
          await neo4jSession.run(
            `MATCH (c:Course {code: $code})
             MATCH (co:Course {code: $coreqCode})
             CREATE (c)-[:COREQUISITE]->(co)`,
            { code: module.code, coreqCode }
          );
          coreqCount++;
        } catch (error) {
          console.warn(`⚠️  Could not create corequisite ${coreqCode} for ${module.code}`);
        }
      }
    }

    console.log(`✅ Created ${prereqCount} prerequisite relationships`);
    console.log(`✅ Created ${coreqCount} corequisite relationships`);

    console.log('🎉 Migration completed successfully!');

  } catch (error) {
    await client.query('ROLLBACK');
    console.error('❌ Migration failed:', error);
    throw error;
  } finally {
    client.release();
    await neo4jSession.close();
    await driver.close();
  }
}

// Run migration
if (require.main === module) {
  migrateModules()
    .then(() => {
      console.log('✅ Migration script completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Migration script failed:', error);
      process.exit(1);
    });
}

module.exports = { migrateModules };
