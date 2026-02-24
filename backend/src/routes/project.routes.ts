import { Router } from 'express';
// Nota: Importação com a extensão .js no final devido ao "type": "module"
import { ProjectController } from '../controllers/ProjectController.js';

const projectRoutes = Router();
const projectController = new ProjectController();

// O '/' aqui significa a raiz da rota que será definida no server.ts (ou seja, /projects)
projectRoutes.post('/', projectController.create);
projectRoutes.get('/', projectController.index);
projectRoutes.patch('/:id', projectController.update);
projectRoutes.delete('/:id', projectController.delete);

export { projectRoutes };