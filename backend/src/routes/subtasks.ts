// src/routes/subtasks.ts
import { Router } from 'express';
import { SubtaskController } from '../controllers/subtasks';

const subtasksrouter = Router();

subtasksrouter.get('/', SubtaskController.getAllSubtasks);
subtasksrouter.get('/:id', SubtaskController.getSubtaskById);
subtasksrouter.post('/', SubtaskController.createSubtask);
subtasksrouter.put('/:id', SubtaskController.updateSubtask);
subtasksrouter.delete('/:id', SubtaskController.deleteSubtask);

export default subtasksrouter;