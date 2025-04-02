// src/controllers/subtasks.ts
import { Request, Response } from 'express';
import { SubtaskService } from '../services/subtaskService';
import { ErrorHandler } from '../middleware/errorHandler';

export class SubtaskController {
  static getAllSubtasks = ErrorHandler.catchAsync(
    async (req: Request, res: Response) => {
      const subtasks = await SubtaskService.getAllSubtasks();
      res.status(200).json({
        success: true,
        data: subtasks,
      });
    }
  );

  static getSubtaskById = ErrorHandler.catchAsync(
    async (req: Request, res: Response) => {
      const id = parseInt(req.params.id);
      const subtask = await SubtaskService.getSubtaskById(id);
      res.status(200).json({
        success: true,
        data: subtask,
      });
    }
  );
  

  static createSubtask = ErrorHandler.catchAsync(
    async (req: Request, res: Response) => {
      const subtask = await SubtaskService.createSubtask(req.body);
      res.status(201).json({
        success: true,
        data: subtask,
      });
    }
  );

  static updateSubtask = ErrorHandler.catchAsync(
    async (req: Request, res: Response) => {
      const id = parseInt(req.params.id);
      const subtask = await SubtaskService.updateSubtask(id, req.body);
      res.status(200).json({
        success: true,
        data: subtask,
      });
    }
  );

  static deleteSubtask = ErrorHandler.catchAsync(
    async (req: Request, res: Response) => {
      const id = parseInt(req.params.id);
      await SubtaskService.deleteSubtask(id);
      res.status(204).json({
        success: true,
        data: null,
      });
    }
  );
}