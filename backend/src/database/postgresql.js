const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'modsutd',
  password: process.env.DB_PASSWORD || 'password',
  port: process.env.DB_PORT || 5432,
});

async function connectPostgreSQL() {
  try {
    await pool.connect();
    console.log('✅ Connected to PostgreSQL');
    
    // Create tables if they don't exist
    await createTables();
  } catch (error) {
    console.error('❌ Failed to connect to PostgreSQL:', error);
    throw error;
  }
}

async function createTables() {
  try {
    // Users table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Courses table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS courses (
        id SERIAL PRIMARY KEY,
        code VARCHAR(20) UNIQUE NOT NULL,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        credits INTEGER NOT NULL DEFAULT 4,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Enrollments table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS enrollments (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        course_id INTEGER REFERENCES courses(id) ON DELETE CASCADE,
        semester VARCHAR(20) NOT NULL,
        year INTEGER NOT NULL,
        grade VARCHAR(5),
        status VARCHAR(20) DEFAULT 'ENROLLED' CHECK (status IN ('ENROLLED', 'COMPLETED', 'DROPPED', 'WITHDRAWN')),
        enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(user_id, course_id, semester, year)
      )
    `);

    // Create indexes for better performance
    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_enrollments_user_id ON enrollments(user_id);
      CREATE INDEX IF NOT EXISTS idx_enrollments_course_id ON enrollments(course_id);
      CREATE INDEX IF NOT EXISTS idx_enrollments_status ON enrollments(status);
      CREATE INDEX IF NOT EXISTS idx_courses_code ON courses(code);
      CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
    `);

    console.log('✅ Database tables created successfully');
  } catch (error) {
    console.error('❌ Failed to create tables:', error);
    throw error;
  }
}

module.exports = { pool, connectPostgreSQL };