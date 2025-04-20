import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: Request) {
  try {
    const { studentId } = await request.json()

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
      debug: true // include SMTP traffic in the logs
    })

    // Verify SMTP connection configuration
    try {
      await transporter.verify()
      console.log('SMTP connection verified successfully')
    } catch (verifyError) {
      console.error('SMTP Verification Error:', verifyError)
      throw new Error('Failed to verify SMTP connection')
    }

    // Log email details (remove in production)
    console.log('Attempting to send email with config:', {
      from: process.env.EMAIL_USER,
      to: `${studentId}@mymail.sutd.edu.sg`,
      subject: 'Verify your MODutd account'
    })

    // Send verification email
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

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Email verification error:', error)
    // Return more detailed error information
    return NextResponse.json(
      { 
        error: 'Failed to send verification email',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
} 