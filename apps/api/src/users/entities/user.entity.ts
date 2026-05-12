import { UserRole } from '@repo/schemas';

export class User {
  id: string;
  name: string;
  email: string;
  age: number;
  role: UserRole;
  createdAt: string;
}
