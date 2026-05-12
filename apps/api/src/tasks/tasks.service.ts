import { Injectable, NotFoundException } from '@nestjs/common';
import {
  Task,
  CreateTaskDto as CreateTaskDtoType,
  UpdateTaskDto as UpdateTaskDtoType,
} from '@repo/schemas';
import { randomUUID } from 'node:crypto';

import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    {
      id: randomUUID(),
      title: 'Learn TanStack Start',
      description: 'Explore file-based routing and server functions',
      status: 'in-progress',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: randomUUID(),
      title: 'Build NestJS API',
      description: 'Create REST endpoints for tasks',
      status: 'done',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: randomUUID(),
      title: 'Integrate frontend and backend',
      description: 'Connect TanStack Start with NestJS using server functions',
      status: 'todo',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  create(createTaskDto: CreateTaskDto | CreateTaskDtoType): Task {
    const dto = createTaskDto as CreateTaskDtoType;
    const task: Task = {
      id: randomUUID(),
      title: dto.title,
      description: dto.description || '',
      status: 'todo',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.tasks.push(task);
    return task;
  }

  findAll(status?: string, search?: string): Task[] {
    let result = this.tasks;

    if (status && status !== 'all') {
      result = result.filter((task) => task.status === status);
    }

    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter(
        (task) =>
          task.title.toLowerCase().includes(searchLower) ||
          task.description.toLowerCase().includes(searchLower),
      );
    }

    return result;
  }

  findOne(id: string): Task {
    const task = this.tasks.find((t) => t.id === id);
    if (!task) throw new NotFoundException(`Task with ID "${id}" not found`);

    return task;
  }

  update(id: string, updateTaskDto: UpdateTaskDto | UpdateTaskDtoType): Task {
    const task = this.findOne(id);
    const dto = updateTaskDto as UpdateTaskDtoType;
    Object.assign(task, dto, { updatedAt: new Date().toISOString() });
    return task;
  }

  remove(id: string): void {
    const index = this.tasks.findIndex((t) => t.id === id);
    if (index === -1) throw new NotFoundException(`Task with ID "${id}" not found`);

    this.tasks.splice(index, 1);
  }
}
