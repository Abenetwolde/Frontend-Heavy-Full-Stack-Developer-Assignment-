import * as dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

// Load environment variables
dotenv.config();

export const prisma = new PrismaClient({
  // log: ['query', 'info', 'warn', 'error'], datasources: {
  //   db: {
  //     url: process.env.DATABASE_URL + "?sslmode=require"  // Force SSL
  //   }
  // }
});

// Optional: Add error handling for Prisma connection
export async function connectDatabase() {
  try {
    await prisma.$connect();
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
}

export async function disconnectDatabase() {
  await prisma.$disconnect();
}