import { jest, describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import type { Request, Response } from 'express';

import { ProjectController } from '../../src/controllers/ProjectController.js';

import { mockPrisma } from '../mocks/prismaMock.js';

describe('ProjectController', () => {
  let projectController: ProjectController;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    projectController = new ProjectController();
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis() as any,
      json: jest.fn() as any,
      send: jest.fn() as any,
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve retornar erro 400 se o nome do projeto não for enviado', async () => {
    mockRequest.body = {}; 

    await projectController.create(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    
    expect(mockResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({ 
        error: 'Erro de validação' 
      })
    );
  });

  it('deve criar um projeto e retornar status 201', async () => {
    mockRequest.body = { name: 'Novo Projeto Teste' };
    const projetoCriado = { id: '123', name: 'Novo Projeto Teste', createdAt: new Date() };

    (mockPrisma.project.create as any).mockResolvedValue(projetoCriado);

    await projectController.create(mockRequest as Request, mockResponse as Response);

    expect(mockPrisma.project.create).toHaveBeenCalledWith({ data: { name: 'Novo Projeto Teste' } });
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith(projetoCriado);
  });
});