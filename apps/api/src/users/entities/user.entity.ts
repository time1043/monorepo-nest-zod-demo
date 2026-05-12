import { UserRole } from '../enums/user-role.enum';

export class User {
  id: string;
  name: string;
  email: string;
  age: number;
  role: UserRole;
  createdAt: string;
}
