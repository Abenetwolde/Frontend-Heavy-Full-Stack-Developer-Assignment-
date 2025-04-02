// src/services/taskService.ts
import { prisma } from '../config/database';
import { Task } from '@prisma/client';
import { ErrorHandler } from '../middleware/errorHandler';

export class TaskService {
  static async getAllTasks() {
    const tasks = await prisma.task.findMany({
      include: {
        collection: true,
        subtasks: true,
      },
    });
    return tasks;
  }

  static async getTaskById(id: number) {
    const task = await prisma.task.findUnique({
      where: { id },
      include: {
        collection: true,
        subtasks: true,
      },
    });

    if (!task) {
      throw ErrorHandler.createError(404, 'Task not found', 'NOT_FOUND');
    }
    return task;
  }
  static async getTasksByCollectionId(collectionId: number) {
    if (!collectionId || isNaN(collectionId)) {
      throw ErrorHandler.createError(
        400,
        'Invalid or missing collection ID',
        'INVALID_ID'
      );
    }

    const tasks = await prisma.task.findMany({
      where: { collectionId },
      include: {
        collection: true,
        subtasks: true,
      },
    });
    return tasks;
  }
  static async createTask(data: {
    title: string;
    date: Date;
    completed?: boolean;
    collectionId: number;
  }) {
    const task = await prisma.task.create({
      data: {
        title: data.title,
        date: data.date,
        completed: data.completed || false,
        collectionId: data.collectionId,
      },
      include: {
        collection: true,
      },
    });
    return task;
  }

  static async updateTask(id: number, data: Partial<Task>) {
    const task = await prisma.task.update({
      where: { id },
      data,
      include: {
        collection: true,
        subtasks: true,
      },
    });
    return task;
  }

  static async deleteTask(id: number) {
    const task = await prisma.task.delete({
      where: { id },
    });
    return task;
  }
}