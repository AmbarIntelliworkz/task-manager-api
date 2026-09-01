import {Test, TestingModule} from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

describe('TasksService', () => {
  let service: TasksService;

  const mockPrismaService = {
    task: {
      findMany: jest.fn(),
      create: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    }
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TasksService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);

  });

  it('should return all tasks', async () => {
    const tasks = [
      {
        id: 1,
        title: 'Learn NestJS',
        description: 'Learn testing',
        completed: false,
      },
      {
        id: 2,
        title: 'Learn Prisma',
        description: null,
        completed: true,
      },
    ];

    mockPrismaService.task.findMany.mockResolvedValue(tasks);

    const result = await service.findAll();

    expect(result).toEqual(tasks);
  });

  it('should create a task', async () => {

    const createTaskDto = {
      title: 'Leran Java',
      description: 'Learn testing testing',
      completed: false,
    };

    const createdTask = {
      id: 1,
      ...createTaskDto,
    };

    mockPrismaService.task.create.mockResolvedValue(createdTask);

    const result = await service.create(createTaskDto);

    expect(mockPrismaService.task.create).toHaveBeenCalledWith({
      data: createTaskDto,
    });
    
    expect(result).toEqual(createdTask);
  });

  it('should return a task', async () => {
    const task = {
      id: 1,
      title: 'Learn NestJS',
      description: 'Learn testing',
      completed: false,
    };

    mockPrismaService.task.findUnique.mockResolvedValue(task);

    const result = await service.find(1);

    expect(mockPrismaService.task.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
    });

    expect(result).toEqual(task);
  });

  it('should throw NotFoundException when task does not exist', async () => {
    mockPrismaService.task.findUnique.mockResolvedValue(null);

    await expect(service.find(5)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should update a task', async () => {

    const id = 1;

    const updateTaskDto = {
      "title": "Updated Task",
      "description": "Updated description",
      "completed": true
    };

    const existingTask = {
      id: 1,
      title: 'Learn NestJS',
      description: 'Learn testing',
      completed: false,
    };

    const updatedTask = {
      id: 1,
      ...updateTaskDto,
    };

    mockPrismaService.task.findUnique.mockResolvedValue(existingTask);

    mockPrismaService.task.update.mockResolvedValue(updatedTask);

    const result = await service.update(id, updateTaskDto);

    expect(mockPrismaService.task.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
    });

    expect(mockPrismaService.task.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: updateTaskDto,
    });

    expect(result).toEqual(updatedTask);
  });
  
});