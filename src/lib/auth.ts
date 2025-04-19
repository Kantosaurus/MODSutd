import { compare, hash } from 'bcryptjs';
import clientPromise from './mongodb';

export interface User {
  email: string;
  password: string;
  name?: string;
}

export async function signup(user: User) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const users = db.collection('users');

    // Check if user already exists
    const existingUser = await users.findOne({ email: user.email });
    if (existingUser) {
      throw new Error('User already exists');
    }

    // Hash password
    const hashedPassword = await hash(user.password, 12);

    // Create new user
    const result = await users.insertOne({
      email: user.email,
      password: hashedPassword,
      name: user.name,
      createdAt: new Date(),
    });

    return { id: result.insertedId, email: user.email, name: user.name };
  } catch (error) {
    throw error;
  }
}

export async function login(email: string, password: string) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const users = db.collection('users');

    // Find user
    const user = await users.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }

    // Verify password
    const isValid = await compare(password, user.password);
    if (!isValid) {
      throw new Error('Invalid password');
    }

    return { id: user._id, email: user.email, name: user.name };
  } catch (error) {
    throw error;
  }
} 