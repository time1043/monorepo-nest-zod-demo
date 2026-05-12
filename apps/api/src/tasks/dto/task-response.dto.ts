import { TaskSchema } from '@repo/schemas';
import { createZodDto } from 'nestjs-zod';

export class TaskResponseDto extends createZodDto(TaskSchema) {}
