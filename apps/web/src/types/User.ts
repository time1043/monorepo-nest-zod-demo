export type UserResponse = {
  id: string;
  name: string;
  email: string;
  age: number;
  role: UserRole;
};

export type CreateUser = {
  name: string;
  email: string;
  age: number;
  role: UserRole;
};

export const UserRoleSchema = {
  options: ['admin', 'user', 'moderator'] as const,
};

export type UserRole = (typeof UserRoleSchema.options)[number];
