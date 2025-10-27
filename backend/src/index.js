const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const cors = require('cors');
const path = require('path');
const http = require('http');

// Load environment variables from root .env file
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const typeDefs = require('./schema/typeDefs');
const resolvers = require('./resolvers');
const { connectPostgreSQL, pool } = require('./database/postgresql');
const { connectGraphDB } = require('./database/graphdb');

async function startServer() {
  console.log('🔌 Connecting to databases...');

  // Connect to databases
  await connectPostgreSQL();
  await connectGraphDB();

  console.log('✅ Databases connected');

  // Create Express app
  const app = express();
  const httpServer = http.createServer(app);

  // Health check endpoint
  app.get('/health', async (req, res) => {
    try {
      // Check database connection
      const dbResult = await pool.query('SELECT COUNT(*) as count FROM courses');
      const courseCount = parseInt(dbResult.rows[0].count);

      res.status(200).json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        database: 'connected',
        coursesLoaded: courseCount,
        migrationComplete: courseCount > 0
      });
    } catch (error) {
      console.error('❌ Health check failed:', error);
      res.status(503).json({
        status: 'unhealthy',
        error: error.message,
        timestamp: new Date().toISOString()
      });
    }
  });

  // Create Apollo Server
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  const PORT = process.env.PORT || 4000;

  // CORS configuration
  const corsOptions = {
    origin: [
      'http://localhost:3000',
      'http://localhost:3001',
      'http://frontend:3000',
      process.env.FRONTEND_URL || 'http://localhost:3000'
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  };

  // Apply CORS globally
  app.use(cors(corsOptions));

  // Apply middleware
  app.use(
    '/graphql',
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        return {
          req,
          user: req.user
        };
      }
    })
  );

  // Start the server - listen on all interfaces (0.0.0.0) for Docker compatibility
  await new Promise((resolve) => httpServer.listen({ port: PORT, host: '0.0.0.0' }, resolve));

  console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
  console.log(`💚 Health check available at http://localhost:${PORT}/health`);
  console.log(`🌐 Listening on 0.0.0.0:${PORT} (accessible from all network interfaces)`);
}

startServer().catch(error => {
  console.error('❌ Failed to start server:', error);
  process.exit(1);
});