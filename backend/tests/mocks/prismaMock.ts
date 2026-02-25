import { jest } from '@jest/globals';

export const mockPrisma = {
  project: {
    create: jest.fn(),
    findMany: jest.fn(),
    delete: jest.fn(),
  },
  task: {
    create: jest.fn(),
    findMany: jest.fn(),
    delete: jest.fn(),
  }
};

export const PrismaClient = jest.fn(() => mockPrisma);