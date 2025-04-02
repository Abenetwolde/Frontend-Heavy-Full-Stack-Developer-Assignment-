import * as dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

// Load environment variables
dotenv.config();

const prisma = new PrismaClient();

async function main() {
  // Seed Collections with React Iconify icons
  const collections = [
    { name: 'school', icon: 'mdi:school' },
    { name: 'personal', icon: 'mdi:account' },
    { name: 'design', icon: 'mdi:palette' },
    { name: 'groceries', icon: 'mdi:cart' },
  ];

  for (const collection of collections) {
    await prisma.collection.upsert({
      where: { name: collection.name },
      update: {},
      create: {
        name: collection.name,
        icon: collection.icon,
      },
    });
  }

  // Seed some example Tasks
  await prisma.task.createMany({
    data: [
      {
        title: 'Finish homework',
        date: new Date(),
        collectionId: 1,
      },
      {
        title: 'Call mom',
        date: new Date(),
        collectionId: 2,
      },
      {
        title: 'Create wireframes',
        date: new Date(),
        collectionId: 3,
      },
      {
        title: 'Buy milk',
        date: new Date(),
        collectionId: 4,
      },
    ],
    skipDuplicates: true,
  });

  // Seed some example Subtasks
  await prisma.subtask.createMany({
    data: [
      {
        title: 'Math assignment',
        taskId: 1,
      },
      {
        title: 'Science project',
        taskId: 1,
      },
      {
        title: 'Sketch initial design',
        taskId: 3,
      },
    ],
    skipDuplicates: true,
  });

  console.log('Database seeded successfully');
}

main()
  .catch((e) => {
    console.error('Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });