export function generateVerificationEmailTemplate(studentId: string, verificationToken: string, appUrl: string): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
          body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 0;
            background-color: #f5f5f5;
          }
          .container {
            max-width: 600px;
            margin: 40px auto;
            padding: 40px;
            background: white;
            border-radius: 16px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
          }
          .logo {
            text-align: center;
            margin-bottom: 32px;
          }
          h1 {
            color: #111827;
            font-size: 24px;
            font-weight: 700;
            margin-bottom: 16px;
            text-align: center;
          }
          p {
            color: #4B5563;
            font-size: 16px;
            margin-bottom: 24px;
          }
          .credentials {
            background: #F3F4F6;
            padding: 20px;
            border-radius: 12px;
            margin-bottom: 24px;
          }
          .credentials p {
            margin: 8px 0;
            color: #374151;
          }
          .verify-button {
            display: inline-block;
            background: #2563EB;
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 500;
            margin: 24px 0;
            text-align: center;
            transition: background-color 0.2s ease;
          }
          .verify-button:hover {
            background: #1D4ED8;
          }
          .footer {
            text-align: center;
            font-size: 14px;
            color: #6B7280;
            margin-top: 32px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="logo">
            <h1>MODutd</h1>
          </div>
          <h1>Welcome to MODutd! 🎉</h1>
          <p>Thank you for joining MODutd! We're excited to have you on board. Before you can start using your account, please verify your email address by clicking the button below.</p>
          
          <div class="credentials">
            <p><strong>Student ID:</strong> ${studentId}</p>
            <p><strong>Email:</strong> ${studentId}@mymail.sutd.edu.sg</p>
          </div>

          <div style="text-align: center;">
            <a href="${appUrl}/signup/verify?token=${verificationToken}" class="verify-button" style="display: inline-block; background: #2563EB; color: #FFFFFF !important; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 500; margin: 24px 0; text-align: center; transition: background-color 0.2s ease;">
              Verify Email Address
            </a>
          </div>

          <p style="font-size: 14px; color: #6B7280;">If the button doesn't work, you can copy and paste this link into your browser:</p>
          <p style="font-size: 14px; color: #6B7280; word-break: break-all;">
            ${appUrl}/signup/verify?token=${verificationToken}
          </p>

          <div class="footer">
            <p>This email was sent by MODutd. If you didn't create this account, you can safely ignore this email.</p>
          </div>
        </div>
      </body>
    </html>
  `
} 