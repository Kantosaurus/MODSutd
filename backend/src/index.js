const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const cors = require('cors');
const path = require('path');

// Load environment variables from root .env file
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const typeDefs = require('./schema/typeDefs');
const resolvers = require('./resolvers');
const { connectPostgreSQL } = require('./database/postgresql');
const { connectGraphDB } = require('./database/graphdb');

async function startServer() {
  // Connect to databases
  await connectPostgreSQL();
  await connectGraphDB();

  // Create Apollo Server
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const PORT = process.env.PORT || 4000;

  // Start the server
  const { url } = await startStandaloneServer(server, {
    listen: { port: PORT },
    context: async ({ req }) => {
      return {
        req,
        user: req.user
      };
    }
  });

  console.log(`🚀 Server ready at ${url}`);
}

startServer().catch(error => {
  console.error('Failed to start server:', error);
  process.exit(1);
});