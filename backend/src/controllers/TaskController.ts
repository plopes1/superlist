import type { Request, Response } from 'express';
import { PrismaClient } from '../../generated/prisma/client.js';

const prisma = new PrismaClient();

export class TaskController {
  async create(req: Request, res: Response) {
    const { title, assignee, dueDate, projectId } = req.body;

    if (!title || !projectId) {
      return res.status(400).json({ error: "Título e ID do projeto são obrigatórios" });
    }

    const task = await prisma.task.create({
      data: {
        title,
        assignee,
        dueDate: dueDate ? new Date(dueDate) : null,
        projectId
      }
    });

    return res.status(201).json(task);
  }

  async listByProject(req: Request, res: Response) {
    const projectId = req.params.projectId as string;

    const tasks = await prisma.task.findMany({
      where: { projectId },
      orderBy: { createdAt: 'asc' }
    });

    return res.json(tasks);
  }

  async update(req: Request, res: Response) {
    const id = req.params.id as string;
    const { title, assignee, dueDate, done } = req.body;

    try {
      const task = await prisma.task.update({
        where: { id },
        data: { 
          title, 
          assignee, 
          done,
          dueDate: dueDate ? new Date(dueDate) : null
        }
      });
      return res.json(task);
    } catch (error) {
      return res.status(404).json({ error: "Tarefa não encontrada" });
    }
  }

  async delete(req: Request, res: Response) {
    const id = req.params.id as string;
    try {
      await prisma.task.delete({ where: { id } });
      return res.status(204).send();
    } catch (error) {
      return res.status(404).json({ error: "Tarefa não encontrada" });
    }
  }
}