import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export interface Context {
  prisma: PrismaClient;
  user?: {
    id: string;
    email: string;
  };
}

export async function createContext({ req }: { req: any }): Promise<Context> {
  const context: Context = {
    prisma,
  };

  const token = req.headers.authorization?.replace('Bearer ', '');
  
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
      context.user = {
        id: decoded.userId,
        email: decoded.email,
      };
    } catch (error) {
      console.log('Invalid token');
    }
  }

  return context;
}