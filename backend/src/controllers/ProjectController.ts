import type { Request, Response } from 'express'; 
import { PrismaClient } from '../../generated/prisma/client.js';

const prisma = new PrismaClient();

export class ProjectController {
  async create(req: Request, res: Response) {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: "O nome é obrigatório" });

    const project = await prisma.project.create({ data: { name } });
    return res.status(201).json(project);
  }

  async index(req: Request, res: Response) {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return res.json(projects);
  }

  async update(req: Request, res: Response) {
    const id = req.params.id as string; 
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
  }

  async delete(req: Request, res: Response) {
    const id = req.params.id as string; 
    try {
      await prisma.project.delete({ where: { id } });
      return res.status(204).send();
    } catch (error) {
      return res.status(404).json({ error: "Projeto não encontrado" });
    }
  }
}