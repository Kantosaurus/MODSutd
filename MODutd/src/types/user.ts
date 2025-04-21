export interface User {
  id: string;
  studentId: string;
  password: string;
  name: string;
  pillar: string;
  year: number | string;
  term: number;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface VerificationToken {
  id: string;
  token: string;
  studentId: string;
  expiresAt: Date;
  createdAt: Date;
} 