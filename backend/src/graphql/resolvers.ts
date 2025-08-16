import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Context } from '../context';
import { sendVerificationEmail } from '../utils/email';

export const resolvers = {
  Query: {
    me: async (_: any, __: any, context: Context) => {
      if (!context.user) {
        throw new Error('Not authenticated');
      }
      
      return await context.prisma.user.findUnique({
        where: { id: context.user.id },
        include: {
          enrollments: {
            include: { module: true }
          },
          progress: {
            include: { module: true }
          }
        }
      });
    },

    modules: async (_: any, __: any, context: Context) => {
      return await context.prisma.module.findMany({
        include: {
          enrollments: {
            include: { user: true }
          },
          progress: {
            include: { user: true }
          }
        }
      });
    },

    module: async (_: any, { id }: { id: string }, context: Context) => {
      return await context.prisma.module.findUnique({
        where: { id },
        include: {
          enrollments: {
            include: { user: true }
          },
          progress: {
            include: { user: true }
          }
        }
      });
    },

    myEnrollments: async (_: any, __: any, context: Context) => {
      if (!context.user) {
        throw new Error('Not authenticated');
      }

      return await context.prisma.enrollment.findMany({
        where: { userId: context.user.id },
        include: {
          module: true,
          user: true
        }
      });
    },

    myProgress: async (_: any, __: any, context: Context) => {
      if (!context.user) {
        throw new Error('Not authenticated');
      }

      return await context.prisma.progress.findMany({
        where: { userId: context.user.id },
        include: {
          module: true,
          user: true
        }
      });
    },
  },

  Mutation: {
    register: async (_: any, { input }: { input: any }, context: Context) => {
      const { email, studentId, name, password } = input;

      const existingUser = await context.prisma.user.findFirst({
        where: {
          OR: [
            { email },
            { studentId }
          ]
        }
      });

      if (existingUser) {
        throw new Error('User with this email or student ID already exists');
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const verificationToken = jwt.sign({ email }, process.env.JWT_SECRET!, { expiresIn: '24h' });

      const user = await context.prisma.user.create({
        data: {
          email,
          studentId,
          name,
          password: hashedPassword,
          verificationToken,
        },
      });

      await sendVerificationEmail(email, verificationToken);

      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET!,
        { expiresIn: '7d' }
      );

      return {
        token,
        user,
      };
    },

    login: async (_: any, { input }: { input: any }, context: Context) => {
      const { email, password } = input;

      const user = await context.prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        throw new Error('Invalid credentials');
      }

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        throw new Error('Invalid credentials');
      }

      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET!,
        { expiresIn: '7d' }
      );

      return {
        token,
        user,
      };
    },

    verifyEmail: async (_: any, { token }: { token: string }, context: Context) => {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
        
        await context.prisma.user.update({
          where: { email: decoded.email },
          data: {
            emailVerified: true,
            verificationToken: null,
          },
        });

        return true;
      } catch (error) {
        throw new Error('Invalid verification token');
      }
    },

    enrollInModule: async (_: any, { moduleId }: { moduleId: string }, context: Context) => {
      if (!context.user) {
        throw new Error('Not authenticated');
      }

      const enrollment = await context.prisma.enrollment.create({
        data: {
          userId: context.user.id,
          moduleId,
        },
        include: {
          user: true,
          module: true,
        },
      });

      await context.prisma.progress.create({
        data: {
          userId: context.user.id,
          moduleId,
        },
      });

      return enrollment;
    },

    updateProgress: async (_: any, { input }: { input: any }, context: Context) => {
      if (!context.user) {
        throw new Error('Not authenticated');
      }

      const { moduleId, completed, percentage } = input;

      const progress = await context.prisma.progress.upsert({
        where: {
          userId_moduleId: {
            userId: context.user.id,
            moduleId,
          },
        },
        update: {
          completed: completed ?? undefined,
          percentage: percentage ?? undefined,
          lastAccessed: new Date(),
        },
        create: {
          userId: context.user.id,
          moduleId,
          completed: completed ?? false,
          percentage: percentage ?? 0,
          lastAccessed: new Date(),
        },
        include: {
          user: true,
          module: true,
        },
      });

      return progress;
    },

    createModule: async (_: any, { input }: { input: any }, context: Context) => {
      if (!context.user) {
        throw new Error('Not authenticated');
      }

      const module = await context.prisma.module.create({
        data: input,
        include: {
          enrollments: {
            include: { user: true }
          },
          progress: {
            include: { user: true }
          }
        }
      });

      return module;
    },
  },
};