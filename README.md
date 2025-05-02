# MODSutd - Module Planning Tool

MODSutd is a modern web application built with Next.js 14, designed to help students plan and manage their academic modules. The application provides an intuitive interface for module planning, calendar integration, and academic progress tracking.

## Features

- **Modern Tech Stack**
  - Next.js 14 with App Router
  - TypeScript for type safety
  - Tailwind CSS for styling
  - MongoDB for data persistence
  - Framer Motion for animations
  - Lottie for animated illustrations

- **Core Functionality**
  - User authentication and account management
  - Module planning and scheduling
  - Interactive calendar view
  - Dashboard for academic progress
  - Email notifications (via Nodemailer)
  - Web scraping capabilities (via Puppeteer)

## Project Structure

```
src/
├── app/              # Next.js app router pages
│   ├── api/         # API routes
│   ├── dashboard/   # Dashboard interface
│   ├── modules/     # Module management
│   ├── calendar/    # Calendar view
│   └── new-plan/    # Module planning interface
├── components/      # Reusable UI components
├── lib/            # Utility functions and configurations
├── hooks/          # Custom React hooks
├── types/          # TypeScript type definitions
└── data/           # Static data and constants
```

## Getting Started

### Prerequisites

- Node.js (Latest LTS version recommended)
- MongoDB instance
- npm or yarn package manager

### Installation

1. Clone the repository:
   ```bash
   git clone [repository-url]
   cd MODSutd
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory with the following variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   EMAIL_SERVER=your_email_server_details
   ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Technologies Used

- **Frontend**
  - Next.js 14
  - React 18
  - TypeScript
  - Tailwind CSS
  - Framer Motion
  - Lottie React

- **Backend**
  - Next.js API Routes
  - MongoDB
  - Nodemailer
  - Puppeteer

## License

This project is licensed under the terms of the license included in the repository.
