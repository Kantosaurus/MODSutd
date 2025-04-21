import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { VerificationToken } from '@/types/user'

export async function POST(request: Request) {
  try {
    const { token } = await request.json()

    if (!token) {
      return NextResponse.json(
        { error: 'No verification token provided' },
        { status: 400 }
      )
    }

    const client = await clientPromise
    const db = client.db()

    // Find the verification token
    const verificationToken = await db
      .collection<VerificationToken>('verificationTokens')
      .findOne({ token })

    if (!verificationToken) {
      return NextResponse.json(
        { error: 'Invalid verification token' },
        { status: 400 }
      )
    }

    // Check if token has expired
    if (verificationToken.expiresAt < new Date()) {
      // Delete expired token
      await db
        .collection<VerificationToken>('verificationTokens')
        .deleteOne({ token })
      
      return NextResponse.json(
        { error: 'Verification token has expired' },
        { status: 400 }
      )
    }

    // Update user's verification status
    const result = await db
      .collection('users')
      .updateOne(
        { studentId: verificationToken.studentId },
        { 
          $set: { 
            emailVerified: true,
            updatedAt: new Date()
          }
        }
      )

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Delete the used verification token
    await db
      .collection<VerificationToken>('verificationTokens')
      .deleteOne({ token })

    return NextResponse.json({ 
      success: true,
      message: 'Email verified successfully'
    })
  } catch (error) {
    console.error('Email verification confirmation error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to confirm email verification',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
} 