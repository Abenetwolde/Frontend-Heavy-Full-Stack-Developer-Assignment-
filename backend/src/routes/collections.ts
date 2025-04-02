// src/routes/collections.ts
import { Router } from 'express';
import { CollectionController } from '../controllers/collections';
import { TaskController } from '../controllers/tasks';

const collectionRoute = Router();

collectionRoute.get('/', CollectionController.getAllCollections);
// collectionRoute.get('/:id', CollectionController.getCollectionById);
collectionRoute.post('/', CollectionController.createCollection);
collectionRoute.get('/completed-count', CollectionController.getCompletedTasksCount);
collectionRoute.get('/:collectionId', TaskController.getTasksByCollectionId);
collectionRoute.delete('/:id', CollectionController.deleteCollection);

export default collectionRoute;