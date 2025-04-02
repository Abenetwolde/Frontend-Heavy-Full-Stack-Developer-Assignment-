// src/server.ts
import app from './app';
import { prisma } from './config/database';
import * as dotenv from 'dotenv';
// Load environment variables from .env file
dotenv.config();
const PORT = process.env.PORT || 3000;

async function main() {
  try {
    await prisma.$connect();
    console.log('Database connected successfully');
    
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });