import { IsEmail, IsEnum, IsInt, IsString } from 'class-validator';

import { UserRole } from '../enums/user-role.enum';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsInt()
  age: number;

  @IsEnum(UserRole)
  role: UserRole;
}
