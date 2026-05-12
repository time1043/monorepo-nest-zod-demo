// Re-export shared types
export type { Task, TaskStatus, CreateTaskDto, UpdateTaskDto, FilterTaskDto } from '@repo/schemas';

// Frontend-specific type for filtering (includes 'all')
import type { TaskStatus as TS } from '@repo/schemas';
export type TaskStatusFilter = TS | 'all';
