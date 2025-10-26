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

# Wait for Neo4j to be ready
echo "⏳ Waiting for Neo4j..."
until nc -z neo4j 7687; do
  echo "   Neo4j is unavailable - sleeping"
  sleep 1
done
echo "✅ Neo4j is ready!"

# Install csv-parse if not already installed (for production)
if [ ! -d "node_modules/csv-parse" ]; then
  echo "📦 Installing csv-parse..."
  npm install csv-parse
fi

# Start the application in the background to create tables
echo "🔧 Starting server briefly to initialize database..."
timeout 10 node src/index.js || true

# Give it a moment to create tables
sleep 2

# Run migrations
echo "📦 Running database migrations..."
npm run migrate || echo "⚠️  Migration failed, but continuing..."

# Switch to nodejs user and start the application
echo "🎬 Starting application as nodejs user..."
exec su-exec nodejs "$@"
