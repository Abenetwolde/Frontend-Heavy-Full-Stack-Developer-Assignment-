// src/services/subtaskService.ts
import { prisma } from '../config/database';
import { Subtask } from '@prisma/client';
import { ErrorHandler } from '../middleware/errorHandler';

export class SubtaskService {
  static async getAllSubtasks() {
    const subtasks = await prisma.subtask.findMany({
      include: {
        task: {
          include: {
            collection: true,
          },
        },
      },
    });
    return subtasks;
  }

  static async getSubtaskById(id: number) {
    const subtask = await prisma.subtask.findUnique({
      where: { id },
      include: {
        task: {
          include: {
            collection: true,
          },
        },
      },
    });

    if (!subtask) {
      throw ErrorHandler.createError(404, 'Subtask not found', 'NOT_FOUND');
    }
    return subtask;
  }

  static async createSubtask(data: { title: string; completed?: boolean; taskId: number }) {
    const subtask = await prisma.subtask.create({
      data: {
        title: data.title,
        completed: data.completed || false,
        taskId: data.taskId,
      },
      include: {
        task: true,
      },
    });
    return subtask;
  }

  static async updateSubtask(id: number, data: Partial<Subtask>) {
    const subtask = await prisma.subtask.update({
      where: { id },
      data,
      include: {
        task: true,
      },
    });
    return subtask;
  }

  static async deleteSubtask(id: number) {
    const subtask = await prisma.subtask.delete({
      where: { id },
    });
    return subtask;
  }
}