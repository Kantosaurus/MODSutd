const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
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

    requestPasswordReset: async (parent, { email }) => {
      // Find user by email
      const result = await pool.query(
        'SELECT id, email, name FROM users WHERE email = $1',
        [email]
      );
      
      if (result.rows.length === 0) {
        // Don't reveal if user exists or not for security
        return { success: true, message: 'If an account with this email exists, a password reset link has been sent.' };
      }

      const user = result.rows[0];

      // Generate a secure reset token
      const resetToken = crypto.randomBytes(32).toString('hex');
      
      // Set expiration to 1 hour from now
      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 1);

      // Store the reset token in database
      await pool.query(
        'INSERT INTO password_reset_tokens (user_id, token, expires_at) VALUES ($1, $2, $3)',
        [user.id, resetToken, expiresAt]
      );

      // In a real application, you would send an email here
      // For now, we'll just return success (you can log the token for testing)
      console.log(`Password reset token for ${email}: ${resetToken}`);

      return { 
        success: true, 
        message: 'If an account with this email exists, a password reset link has been sent.',
        // In development, you might want to return the token for testing
        // Don't do this in production!
        token: process.env.NODE_ENV === 'development' ? resetToken : undefined
      };
    },

    resetPassword: async (parent, { token, newPassword }) => {
      // Find valid token
      const tokenResult = await pool.query(
        'SELECT prt.*, u.id as user_id, u.email FROM password_reset_tokens prt JOIN users u ON prt.user_id = u.id WHERE prt.token = $1 AND prt.used = FALSE AND prt.expires_at > NOW()',
        [token]
      );

      if (tokenResult.rows.length === 0) {
        throw new Error('Invalid or expired reset token');
      }

      const resetRecord = tokenResult.rows[0];

      // Hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, 12);

      // Update user password
      await pool.query(
        'UPDATE users SET password = $1, updated_at = NOW() WHERE id = $2',
        [hashedPassword, resetRecord.user_id]
      );

      // Mark token as used
      await pool.query(
        'UPDATE password_reset_tokens SET used = TRUE WHERE id = $1',
        [resetRecord.id]
      );

      // Optionally, invalidate all other tokens for this user
      await pool.query(
        'UPDATE password_reset_tokens SET used = TRUE WHERE user_id = $1 AND id != $2',
        [resetRecord.user_id, resetRecord.id]
      );

      return { 
        success: true, 
        message: 'Password has been reset successfully.' 
      };
    },
  },

  User: {
    // Add any additional field resolvers if needed
  },
};

module.exports = userResolvers;