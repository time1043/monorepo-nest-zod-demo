import { FilterTaskDtoSchema } from '@repo/schemas';
import { createZodDto } from 'nestjs-zod';

export class FilterTaskDto extends createZodDto(FilterTaskDtoSchema) {}
