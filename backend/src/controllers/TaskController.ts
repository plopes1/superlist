import type { Request, Response } from 'express';
import { PrismaClient } from '../../generated/prisma/client.js';
import { z } from 'zod';

const prisma = new PrismaClient();

const createTaskSchema = z.object({
  title: z.string().min(1, "O título é obrigatório").trim(),
  assignee: z.string().min(1, "O responsável é obrigatório").trim(),
  dueDate: z.string().nullable().optional(),
  projectId: z.string().uuid("ID do projeto inválido")
});

const updateTaskSchema = z.object({
  title: z.string().min(1, "O título não pode estar vazio").trim().optional(),
  assignee: z.string().min(1, "O responsável não pode estar vazio").trim().optional(),
  dueDate: z.string().nullable().optional(),
  done: z.boolean().optional()
});

export class TaskController {
  async create(req: Request, res: Response) {
    try {
      const data = createTaskSchema.parse(req.body);

      const task = await prisma.task.create({
        data: {
          title: data.title,
          assignee: data.assignee, 
          dueDate: data.dueDate ? new Date(data.dueDate) : null,
          projectId: data.projectId
        }
      });

      return res.status(201).json(task);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Erro de validação", details: error.format() });
      }
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
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

    try {
      const data = updateTaskSchema.parse(req.body);

      const updateData: any = {};
      if (data.title !== undefined) updateData.title = data.title;
      if (data.assignee !== undefined) updateData.assignee = data.assignee;
      if (data.done !== undefined) updateData.done = data.done;
      if (data.dueDate !== undefined) {
        updateData.dueDate = data.dueDate ? new Date(data.dueDate) : null;
      }

      const task = await prisma.task.update({
        where: { id },
        data: updateData
      });
      return res.json(task);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Erro de validação", details: error.format() });
      }
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