// src/controllers/tasks.ts
import { Request, Response } from 'express';
import { TaskService } from '../services/taskService';
import { ErrorHandler } from '../middleware/errorHandler';

export class TaskController {
  static getAllTasks = ErrorHandler.catchAsync(
    async (req: Request, res: Response) => {
      const tasks = await TaskService.getAllTasks();
      res.status(200).json({
        success: true,
        data: tasks,
      });
    }
  );
  static getTasksByCollectionId = ErrorHandler.catchAsync(
    async (req: Request, res: Response) => {
      const collectionId = parseInt(req.params.collectionId, 10);
      if (isNaN(collectionId)) {
        throw ErrorHandler.createError(
          400,
          'Invalid collection ID',
          'INVALID_ID'
        );
      }
      const tasks = await TaskService.getTasksByCollectionId(collectionId);
      res.status(200).json({
        success: true,
        data: tasks,
      });
    }
  );
  static getTaskById = ErrorHandler.catchAsync(
    async (req: Request, res: Response) => {
      const id = parseInt(req.params.id);
      const task = await TaskService.getTaskById(id);
      res.status(200).json({
        success: true,
        data: task,
      });
    }
  );

  static createTask = ErrorHandler.catchAsync(
    async (req: Request, res: Response) => {
      const task = await TaskService.createTask(req.body);
      res.status(201).json({
        success: true,
        data: task,
      });
    }
  );

  static updateTask = ErrorHandler.catchAsync(
    async (req: Request, res: Response) => {
      const id = parseInt(req.params.id);
      const task = await TaskService.updateTask(id, req.body);
      res.status(200).json({
        success: true,
        data: task,
      });
    }
  );

  static deleteTask = ErrorHandler.catchAsync(
    async (req: Request, res: Response) => {
      const id = parseInt(req.params.id);
      await TaskService.deleteTask(id);
      res.status(204).json({
        success: true,
        data: null,
      });
    }
  );
}