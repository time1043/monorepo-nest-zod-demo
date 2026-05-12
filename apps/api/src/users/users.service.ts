import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserRole } from './enums/user-role.enum';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: randomUUID(),
      name: 'Alice Johnson',
      email: 'alice@example.com',
      age: 30,
      role: UserRole.ADMIN,
      createdAt: new Date('2024-01-15').toISOString(),
    },
    {
      id: randomUUID(),
      name: 'Bob Smith',
      email: 'bob@example.com',
      age: 25,
      role: UserRole.USER,
      createdAt: new Date('2024-02-20').toISOString(),
    },
  ];

  create(createUserDto: CreateUserDto) {
    const user: User = {
      id: randomUUID(),
      ...createUserDto,
      createdAt: new Date().toISOString(),
    };
    this.users.push(user);
    return user;
  }

  findAll() {
    return this.users;
  }

  findOne(id: string) {
    const user = this.users.find((user) => user.id === id);
    if (!user) throw new NotFoundException(`User with id ${id} not found`);
    return user;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const idx = this.users.findIndex((user) => user.id === id);
    if (idx === -1) throw new NotFoundException(`User with id ${id} not found`);

    this.users[idx] = { ...this.users[idx], ...updateUserDto };
    return this.users[idx];
  }

  remove(id: string) {
    const idx = this.users.findIndex((user) => user.id === id);
    if (idx === -1) throw new NotFoundException(`User with id ${id} not found`);

    this.users.splice(idx, 1);
  }
}
