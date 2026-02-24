import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { PrismaClient } from '../generated/prisma/client.js';

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.post('/projects', async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "O nome é obrigatório" });

  const project = await prisma.project.create({ data: { name } });
  return res.status(201).json(project);
});

app.get('/projects', async (req, res) => {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: 'desc' }
  });
  return res.json(projects);
});

app.patch('/projects/:id', async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const updatedProject = await prisma.project.update({
      where: { id },
      data: { name }
    });
    return res.json(updatedProject);
  } catch (error) {
    return res.status(404).json({ error: "Projeto não encontrado" });
  }
});

app.delete('/projects/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.project.delete({ where: { id } });
    return res.status(204).send();
  } catch (error) {
    return res.status(404).json({ error: "Projeto não encontrado" });
  }
});

app.listen(3333, () => console.log("Servidor online na porta 3333 apenas com Projetos!"));