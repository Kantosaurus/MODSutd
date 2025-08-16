const neo4j = require('neo4j-driver');

let driver;

async function connectGraphDB() {
  try {
    driver = neo4j.driver(
      process.env.NEO4J_URI || 'bolt://localhost:7687',
      neo4j.auth.basic(
        process.env.NEO4J_USER || 'neo4j',
        process.env.NEO4J_PASSWORD || 'password'
      )
    );

    // Test the connection
    const session = driver.session();
    await session.run('RETURN 1');
    await session.close();

    console.log('✅ Connected to Neo4j GraphDB');
    
    // Create constraints and indexes
    await createConstraintsAndIndexes();
  } catch (error) {
    console.error('❌ Failed to connect to Neo4j GraphDB:', error);
    throw error;
  }
}

async function createConstraintsAndIndexes() {
  const session = driver.session();
  try {
    // Create constraints
    await session.run('CREATE CONSTRAINT user_id IF NOT EXISTS FOR (u:User) REQUIRE u.id IS UNIQUE');
    await session.run('CREATE CONSTRAINT course_id IF NOT EXISTS FOR (c:Course) REQUIRE c.id IS UNIQUE');
    await session.run('CREATE CONSTRAINT course_code IF NOT EXISTS FOR (c:Course) REQUIRE c.code IS UNIQUE');
    
    // Create indexes
    await session.run('CREATE INDEX user_email IF NOT EXISTS FOR (u:User) ON (u.email)');
    await session.run('CREATE INDEX course_name IF NOT EXISTS FOR (c:Course) ON (c.name)');
    
    console.log('✅ GraphDB constraints and indexes created successfully');
  } catch (error) {
    console.error('❌ Failed to create GraphDB constraints and indexes:', error);
    // Don't throw here as constraints might already exist
  } finally {
    await session.close();
  }
}

function getGraphDBSession() {
  if (!driver) {
    throw new Error('Neo4j driver not initialized. Call connectGraphDB() first.');
  }
  return driver.session();
}

async function closeGraphDB() {
  if (driver) {
    await driver.close();
    console.log('✅ GraphDB connection closed');
  }
}

// Graceful shutdown
process.on('SIGINT', async () => {
  await closeGraphDB();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await closeGraphDB();
  process.exit(0);
});

module.exports = { 
  connectGraphDB, 
  getGraphDBSession, 
  closeGraphDB 
};