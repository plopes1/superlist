import type { Request, Response } from 'express'; 
import { PrismaClient } from '../../generated/prisma/client.js';
import { z } from 'zod';

const prisma = new PrismaClient();

const projectSchema = z.object({
  name: z.string().min(1, "O nome do projeto é obrigatório").trim(),
});

export class ProjectController {
  async create(req: Request, res: Response) {
    try {
      const { name } = projectSchema.parse(req.body);
      
      const project = await prisma.project.create({ data: { name } });
      return res.status(201).json(project);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Erro de validação", details: error.format() });
      }
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  }

  async index(req: Request, res: Response) {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return res.json(projects);
  }

  async update(req: Request, res: Response) {
    const id = req.params.id as string; 

    try {
      const { name } = projectSchema.parse(req.body);
      
      const updatedProject = await prisma.project.update({
        where: { id },
        data: { name }
      });
      return res.json(updatedProject);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Erro de validação", details: error.format() });
      }
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