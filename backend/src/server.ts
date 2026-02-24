import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { projectRoutes } from './routes/project.routes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/projects', projectRoutes);

const PORT = 3333;
app.listen(PORT, () => console.log(`Servidor online na porta ${PORT}`));