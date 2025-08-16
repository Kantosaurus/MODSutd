const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { pool } = require('../database/postgresql');

const userResolvers = {
  Query: {
    me: async (parent, args, { user }) => {
      if (!user) throw new Error('Not authenticated');
      
      const result = await pool.query(
        'SELECT * FROM users WHERE id = $1',
        [user.id]
      );
      return result.rows[0];
    },

    users: async () => {
      const result = await pool.query('SELECT * FROM users ORDER BY created_at DESC');
      return result.rows;
    },

    user: async (parent, { id }) => {
      const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
      return result.rows[0];
    },
  },

  Mutation: {
    register: async (parent, { email, password, name }) => {
      // Check if user already exists
      const existingUser = await pool.query(
        'SELECT * FROM users WHERE email = $1',
        [email]
      );
      
      if (existingUser.rows.length > 0) {
        throw new Error('User already exists with this email');
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 12);

      // Create user
      const result = await pool.query(
        'INSERT INTO users (email, password, name) VALUES ($1, $2, $3) RETURNING *',
        [email, hashedPassword, name]
      );

      const user = result.rows[0];

      // Generate JWT token
      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '7d' }
      );

      return { token, user };
    },

    login: async (parent, { email, password }) => {
      // Find user
      const result = await pool.query(
        'SELECT * FROM users WHERE email = $1',
        [email]
      );
      
      if (result.rows.length === 0) {
        throw new Error('Invalid credentials');
      }

      const user = result.rows[0];

      // Check password
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        throw new Error('Invalid credentials');
      }

      // Generate JWT token
      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '7d' }
      );

      return { token, user };
    },
  },

  User: {
    // Add any additional field resolvers if needed
  },
};

module.exports = userResolvers;