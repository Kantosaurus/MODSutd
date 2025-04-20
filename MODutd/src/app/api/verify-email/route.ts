import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

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

    // Create a verification token (you might want to use a more secure method in production)
    const verificationToken = Math.random().toString(36).substring(2, 15)
    
    // Create email transporter with debug logging
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
      logger: true,
      debug: true
    })

    // Verify SMTP connection configuration
    try {
      await transporter.verify()
      console.log('SMTP connection verified successfully')
    } catch (verifyError) {
      console.error('SMTP Verification Error:', verifyError)
      return NextResponse.json(
        { 
          error: 'Email service configuration error',
          details: 'Failed to verify SMTP connection'
        },
        { status: 500 }
      )
    }

    // Send verification email
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: `${studentId}@mymail.sutd.edu.sg`,
        subject: 'Verify your MODutd account',
        html: `
          <h1>Welcome to MODutd!</h1>
          <p>Please click the link below to verify your email address:</p>
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/verify?token=${verificationToken}">
            Verify Email
          </a>
        `,
      })
      console.log('Verification email sent successfully')
      return NextResponse.json({ success: true })
    } catch (sendError) {
      console.error('Email sending error:', sendError)
      return NextResponse.json(
        { 
          error: 'Failed to send verification email',
          details: sendError instanceof Error ? sendError.message : 'Unknown error'
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