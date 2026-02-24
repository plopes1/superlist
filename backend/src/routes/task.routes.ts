import { Router } from 'express';
import { TaskController } from '../controllers/TaskController.js';

const taskRoutes = Router();
const taskController = new TaskController();

taskRoutes.post('/', taskController.create);
taskRoutes.get('/project/:projectId', taskController.listByProject);
taskRoutes.patch('/:id', taskController.update);
taskRoutes.delete('/:id', taskController.delete);

export { taskRoutes };