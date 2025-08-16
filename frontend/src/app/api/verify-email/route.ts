import { NextResponse } from 'next/server'
import { EmailService } from './email-service'
import clientPromise from '@/lib/mongodb'
import { VerificationToken } from '@/types/user'

export async function POST(request: Request) {
  try {
    const { studentId } = await request.json()

    // Debug logging for environment variables
    console.log('Environment variables check:', {
      EMAIL_USER: process.env.EMAIL_USER ? 'Set' : 'Not Set',
      EMAIL_PASSWORD: process.env.EMAIL_PASSWORD ? 'Set' : 'Not Set',
      NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'Not Set'
    })

    // Check if required environment variables are set
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      console.error('Missing email configuration:', {
        hasEmailUser: !!process.env.EMAIL_USER,
        hasEmailPassword: !!process.env.EMAIL_PASSWORD,
        appUrl: process.env.NEXT_PUBLIC_APP_URL
      })
      return NextResponse.json(
        { 
          error: 'Email service not configured',
          details: 'Please contact the administrator',
          debug: {
            hasEmailUser: !!process.env.EMAIL_USER,
            hasEmailPassword: !!process.env.EMAIL_PASSWORD,
            appUrl: process.env.NEXT_PUBLIC_APP_URL
          }
        },
        { status: 500 }
      )
    }

    // Create a verification token
    const verificationToken = Math.random().toString(36).substring(2, 15)
    
    // Store the verification token in the database
    const client = await clientPromise
    const db = client.db()

    // Set token expiration to 24 hours from now
    const expiresAt = new Date()
    expiresAt.setHours(expiresAt.getHours() + 24)

    await db.collection<VerificationToken>('verificationTokens').insertOne({
      id: Math.random().toString(36).substring(2, 15),
      token: verificationToken,
      studentId,
      expiresAt,
      createdAt: new Date()
    })

    // Initialize email service
    const emailService = new EmailService({
      user: process.env.EMAIL_USER,
      password: process.env.EMAIL_PASSWORD,
      appUrl: process.env.NEXT_PUBLIC_APP_URL || ''
    })

    // Verify SMTP connection and send email
    try {
      await emailService.verifyConnection()
      await emailService.sendVerificationEmail(
        studentId,
        verificationToken,
        process.env.NEXT_PUBLIC_APP_URL || ''
      )
      return NextResponse.json({ success: true })
    } catch (error) {
      console.error('Email service error:', error)
      return NextResponse.json(
        { 
          error: 'Failed to send verification email',
          details: error instanceof Error ? error.message : 'Unknown error'
        },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Email verification error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to process verification request',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
} 