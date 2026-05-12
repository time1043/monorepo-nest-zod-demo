import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { UserResponseSchema } from '@repo/schemas';
import { ZodResponse } from 'nestjs-zod';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new user' })
  @ZodResponse({ type: UserResponseDto })
  create(@Body() createUserDto: CreateUserDto) {
    const user = this.usersService.create(createUserDto);
    return UserResponseSchema.parse(user);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ZodResponse({ type: [UserResponseDto] })
  findAll() {
    const users = this.usersService.findAll();
    return users.map((u) => UserResponseSchema.parse(u));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a user by ID' })
  @ZodResponse({ type: UserResponseDto })
  findOne(@Param('id') id: string) {
    const user = this.usersService.findOne(id);
    return UserResponseSchema.parse(user);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing user' })
  @ZodResponse({ type: UserResponseDto })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = this.usersService.update(id, updateUserDto);
    return UserResponseSchema.parse(user);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a user' })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
