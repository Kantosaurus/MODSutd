const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const cors = require('cors');
require('dotenv').config();

const typeDefs = require('./schema/typeDefs');
const resolvers = require('./resolvers');
const { connectPostgreSQL } = require('./database/postgresql');
const { connectGraphDB } = require('./database/graphdb');

async function startServer() {
  const app = express();
  
  // Connect to databases
  await connectPostgreSQL();
  await connectGraphDB();

  // Create Apollo Server
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  // Enable CORS and JSON parsing
  app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
  }));
  
  app.use(express.json());

  // Apply Apollo GraphQL middleware
  app.use('/graphql', expressMiddleware(server, {
    context: async ({ req }) => {
      return {
        req,
        user: req.user
      };
    }
  }));

  // Health check endpoint
  app.get('/health', (req, res) => {
    res.json({ status: 'OK', message: 'MODSutd Backend is running' });
  });

  const PORT = process.env.PORT || 4000;
  
  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
    console.log(`🏥 Health check at http://localhost:${PORT}/health`);
  });
}

startServer().catch(error => {
  console.error('Failed to start server:', error);
  process.exit(1);
});