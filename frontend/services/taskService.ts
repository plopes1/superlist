import { Task } from '../models/task';

const API_URL = 'http://localhost:3333';

export const taskService = {
  async getByProjectId(projectId: string): Promise<Task[]> {
    const response = await fetch(`${API_URL}/tasks/project/${projectId}`, {
      cache: 'no-store'
    });
    if (!response.ok) throw new Error('Erro ao buscar tarefas');
    return response.json();
  },

  async create(data: { title: string; projectId: string; assignee?: string; dueDate?: string }): Promise<Task> {
    const response = await fetch(`${API_URL}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Erro ao criar tarefa');
    return response.json();
  },

  async update(id: string, data: Partial<Task>): Promise<Task> {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Erro ao atualizar tarefa');
    return response.json();
  },

  async delete(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Erro ao apagar tarefa');
  }
};