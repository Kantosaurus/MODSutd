#!/bin/bash

echo "🚀 Setting up MODSutd webapp..."

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Create .env file for backend if it doesn't exist
if [ ! -f "backend/.env" ]; then
    echo "📝 Creating backend .env file..."
    cp backend/.env.example backend/.env
    echo "✅ Backend .env file created. Please review and update the configuration."
fi

echo "🐳 Starting databases..."
docker-compose -f docker-compose.dev.yml up postgres neo4j -d

echo "⏳ Waiting for databases to be ready..."
sleep 10

echo "📦 Installing backend dependencies..."
cd backend && npm install && cd ..

echo "📦 Installing frontend dependencies..."
cd frontend && npm install && cd ..

echo "✅ Setup complete! You can now:"
echo ""
echo "Development mode:"
echo "  1. cd backend && npm run dev"
echo "  2. cd frontend && npm run dev"
echo ""
echo "Or run everything with Docker:"
echo "  docker-compose up -d (production)"
echo "  docker-compose -f docker-compose.dev.yml up -d (development)"
echo ""
echo "Access points:"
echo "  - Frontend: http://localhost:3000"
echo "  - Backend GraphQL: http://localhost:4000/graphql"
echo "  - Neo4j Browser: http://localhost:7474"
echo ""
echo "🎉 Happy coding!"