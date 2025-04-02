// src/services/collectionService.ts
import { prisma } from '../config/database';
import { Collection } from '@prisma/client';
import { ErrorHandler } from '../middleware/errorHandler';

export class CollectionService {
  static async getAllCollections() {
    const collections = await prisma.collection.findMany({
      include: {
        tasks: {
          include: {
            subtasks: true,
          },
        },
      },
    });
    return collections;
  }

  static async getCollectionById(id: number) {
    const collection = await prisma.collection.findUnique({
      where: { id },
      include: {
        tasks: {
          include: {
            subtasks: true,
          },
        },
      },
    });

    if (!collection) {
      throw ErrorHandler.createError(
        404,
        'Collection not found',
        'NOT_FOUND'
      );
    }
    return collection;
  }

  static async createCollection(data: { name: string; icon?: string }) {
    const collection = await prisma.collection.create({
      data,
    });
    return collection;
  }
  
  static async getCompletedTasksCountByCollection() {
    const result = await prisma.collection.findMany({
      select: {
        id: true,
        name: true,
        icon: true,
        tasks: {
          select: {
            completed: true,
          },
        },
      },
    });

    const completedCounts = result.map((collection:any) => ({
      id: collection.id,
      name: collection.name,
      icon: collection.icon,
      totalTasks: collection.tasks.length,
      completedTasks: collection.tasks.filter((task:any) => task.completed).length,
    }));

    return completedCounts;
  }
  static async updateCollection(id: number, data: { name?: string; icon?: string }) {
    const collection = await prisma.collection.update({
      where: { id },
      data,
    });
    return collection;
  }

  static async deleteCollection(id: number) {
    await prisma.collection.delete({
      where: { id },
    });
    return { message: 'Collection deleted successfully' };
  }
}


