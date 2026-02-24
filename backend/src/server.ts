import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { projectRoutes } from './routes/project.routes.js';
import { taskRoutes } from './routes/task.routes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/projects', projectRoutes);
app.use('/tasks', taskRoutes);

const PORT = 3333;
app.listen(PORT, () => console.log(`Servidor online na porta ${PORT}`));