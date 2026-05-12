import { UpdateTaskDtoSchema } from '@repo/schemas';
import { createZodDto } from 'nestjs-zod';

export class UpdateTaskDto extends createZodDto(UpdateTaskDtoSchema) {}
