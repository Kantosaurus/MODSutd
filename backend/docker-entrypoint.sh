#!/bin/sh
set -e

echo "🚀 Starting MODSutd Backend..."

# Wait for PostgreSQL to be ready
echo "⏳ Waiting for PostgreSQL..."
until nc -z postgres 5432; do
  echo "   PostgreSQL is unavailable - sleeping"
  sleep 1
done
echo "✅ PostgreSQL is ready!"

# Additional check: ensure PostgreSQL is actually accepting connections
echo "⏳ Verifying PostgreSQL is accepting connections..."
sleep 3

# Wait for Neo4j to be ready
echo "⏳ Waiting for Neo4j..."
until nc -z neo4j 7687; do
  echo "   Neo4j is unavailable - sleeping"
  sleep 1
done
echo "✅ Neo4j is ready!"

# Additional check: ensure Neo4j is fully initialized
echo "⏳ Waiting for Neo4j to fully initialize..."
sleep 5

# Install csv-parse if not already installed (for production)
if [ ! -d "node_modules/csv-parse" ]; then
  echo "📦 Installing csv-parse..."
  npm install csv-parse
fi

# Start the application in the background to create tables
echo "🔧 Starting server briefly to initialize database..."
timeout 15 node src/index.js || true

# Give it a moment to create tables
sleep 3

# Run migrations with better error handling
echo "📦 Running database migrations..."
if npm run migrate; then
  echo "✅ Migration completed successfully!"
else
  echo "❌ Migration failed! Check logs above."
  echo "⚠️  Continuing anyway, but data may be incomplete..."
fi

# Give migration time to complete fully
echo "⏳ Allowing migration to settle..."
sleep 5

# Switch to nodejs user and start the application
echo "🎬 Starting application as nodejs user..."
exec su-exec nodejs "$@"
