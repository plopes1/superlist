import { Project } from '../models/project';

const API_URL = 'http://localhost:3333';

export const projectService = {
  async getAll(): Promise<Project[]> {
    const response = await fetch(`${API_URL}/projects`, {
      cache: 'no-store'
    });
    if (!response.ok) throw new Error('Erro ao buscar projetos');
    return response.json();
  },

  async create(name: string): Promise<Project> {
    const response = await fetch(`${API_URL}/projects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });
    if (!response.ok) throw new Error('Erro ao criar projeto');
    return response.json();
  },

  async update(id: string, name: string): Promise<Project> {
    const response = await fetch(`${API_URL}/projects/${id}`, {
      method: 'PATCH', 
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });
    if (!response.ok) throw new Error('Erro ao editar projeto');
    return response.json();
  },

  async delete(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/projects/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Erro ao apagar projeto');
  }
};