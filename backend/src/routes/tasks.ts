// src/routes/tasks.ts
import { Router } from 'express';
import { TaskController } from '../controllers/tasks';

const tasksrouter = Router();

tasksrouter.get('/', TaskController.getAllTasks);
tasksrouter.get('/:id', TaskController.getTaskById);
tasksrouter.post('/', TaskController.createTask);
tasksrouter.put('/:id', TaskController.updateTask);
tasksrouter.delete('/:id', TaskController.deleteTask);


export default tasksrouter;