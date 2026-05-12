import { z } from 'zod';

export const UserRoleSchema = z.enum(['admin', 'user', 'moderator']);
export type UserRole = z.infer<typeof UserRoleSchema>;

export const UserSchema = z
  .object({
    id: z.uuid(),
    name: z.string().min(1, 'Name is required').max(100),
    email: z.email('Invalid email address'),
    age: z.number().int().min(0).max(150),
    role: UserRoleSchema,
    createdAt: z.iso.datetime(),
  })
  .meta({ id: 'User' });
export type User = z.infer<typeof UserSchema>;

export const CreateUserSchema = UserSchema.omit({
  id: true,
  createdAt: true,
}).meta({ id: 'CreateUser' });
export type CreateUser = z.infer<typeof CreateUserSchema>;

export const UpdateUserSchema = CreateUserSchema.partial().meta({ id: 'UpdateUser' });
export type UpdateUser = z.infer<typeof UpdateUserSchema>;

export const UserResponseSchema = UserSchema.meta({ id: 'UserResponseDto' });
export type UserResponse = z.infer<typeof UserResponseSchema>;
