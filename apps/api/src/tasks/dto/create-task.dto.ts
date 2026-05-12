import { CreateTaskDtoSchema } from '@repo/schemas';
import { createZodDto } from 'nestjs-zod';

export class CreateTaskDto extends createZodDto(CreateTaskDtoSchema) {}
