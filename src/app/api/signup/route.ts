import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { User } from '@/types/user';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: Request) {
  try {
    const { name, studentId, password } = await request.json();

    // Validate input
    if (!name || !studentId || !password) {
      return NextResponse.json(
        { error: 'Name, student ID, and password are required' },
        { status: 400 }
      );
    }

    // Validate student ID format
    if (!/^100\d{4}$/.test(studentId)) {
      return NextResponse.json(
        { error: 'Student ID must be 7 digits starting with 100' },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db();

    // Check if user already exists
    const existingUser = await db.collection('users').findOne({ studentId });
    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this student ID already exists' },
        { status: 400 }
      );
    }

    // Generate UUID
    const uuid = uuidv4();

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser: User = {
      id: studentId,
      uuid,
      studentId,
      password: hashedPassword,
      name,
      pillar: '', // Will be updated later
      year: 0, // Will be updated later
      term: 0, // Will be updated later
      emailVerified: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Insert user into database
    await db.collection('users').insertOne(newUser);

    return NextResponse.json(
      { 
        success: true,
        message: 'User registered successfully. Please verify your email.',
        uuid // Return the UUID in the response
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Failed to register user' },
      { status: 500 }
    );
  }
} 