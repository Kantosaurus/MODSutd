import nodemailer from 'nodemailer'
import { generateVerificationEmailTemplate } from '@/app/api/verify-email/email-templates'

export interface EmailConfig {
  user: string
  password: string
  appUrl: string
}

export class EmailService {
  private transporter: nodemailer.Transporter

  constructor(config: EmailConfig) {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: config.user,
        pass: config.password,
      },
      logger: true,
      debug: true
    })
  }

  async verifyConnection(): Promise<void> {
    try {
      await this.transporter.verify()
      console.log('SMTP connection verified successfully')
    } catch (error) {
      console.error('SMTP Verification Error:', error)
      throw new Error('Failed to verify SMTP connection')
    }
  }

  async sendVerificationEmail(studentId: string, verificationToken: string, appUrl: string): Promise<void> {
    try {
      await this.transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: `${studentId}@mymail.sutd.edu.sg`,
        subject: 'Welcome to MODSutd! Please verify your email',
        html: generateVerificationEmailTemplate(studentId, verificationToken, appUrl)
      })
      console.log('Verification email sent successfully')
    } catch (error) {
      console.error('Email sending error:', error)
      throw new Error('Failed to send verification email')
    }
  }
} 