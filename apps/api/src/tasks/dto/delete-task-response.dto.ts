import { DeleteResponseSchema } from '@repo/schemas';
import { createZodDto } from 'nestjs-zod';

export class DeleteTaskResponseDto extends createZodDto(DeleteResponseSchema) {}
