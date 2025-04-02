// src/config/database.ts
import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
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