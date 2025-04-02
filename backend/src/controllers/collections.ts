// src/controllers/collections.ts
import { Request, Response } from 'express';
import { CollectionService } from '../services/collectionService';
import { ErrorHandler } from '../middleware/errorHandler';

export class CollectionController {
  static getAllCollections = ErrorHandler.catchAsync(
    async (req: Request, res: Response) => {
      const collections = await CollectionService.getAllCollections();
      res.status(200).json({
        success: true,
        data: collections,
      });
    }
  );

  static getCollectionById = ErrorHandler.catchAsync(
    async (req: Request, res: Response) => {
      const id = parseInt(req.params.id);
      const collection = await CollectionService.getCollectionById(id);
      res.status(200).json({
        success: true,
        data: collection,
      });
    }
  );

  static createCollection = ErrorHandler.catchAsync(
    async (req: Request, res: Response) => {
      const collection = await CollectionService.createCollection(req.body);
      res.status(201).json({
        success: true,
        data: collection,
      });
    }
  );

  static updateCollection = ErrorHandler.catchAsync(
    async (req: Request, res: Response) => {
      const id = parseInt(req.params.id);
      const updatedCollection = await CollectionService.updateCollection(id, req.body);
      res.status(200).json({
        success: true,
        data: updatedCollection,
      });
    }
  );

  static deleteCollection = ErrorHandler.catchAsync(
    async (req: Request, res: Response) => {
      const id = parseInt(req.params.id);
      await CollectionService.deleteCollection(id);
      res.status(200).json({
        success: true,
        message: 'Collection deleted successfully',
      });
    }
  );

  static getCompletedTasksCount = ErrorHandler.catchAsync(
    async (req: Request, res: Response) => {
      const counts = await CollectionService.getCompletedTasksCountByCollection();
      res.status(200).json({
        success: true,
        data: counts,
      });
    }
  );
}