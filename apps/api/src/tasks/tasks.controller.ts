import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { ZodSerializerDto, ZodSerializerInterceptor } from 'nestjs-zod';

import { CreateTaskDto } from './dto/create-task.dto';
import { DeleteTaskResponseDto } from './dto/delete-task-response.dto';
import { FilterTaskDto } from './dto/filter-task.dto';
import { TaskResponseDto } from './dto/task-response.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TasksService } from './tasks.service';

@Controller('tasks')
@UseInterceptors(ZodSerializerInterceptor)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new task' })
  @ApiCreatedResponse({ description: 'Task created successfully', type: TaskResponseDto })
  @ApiBadRequestResponse({ description: 'Invalid input' })
  @ZodSerializerDto(TaskResponseDto)
  create(@Body() createTaskDto: CreateTaskDto): TaskResponseDto {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all tasks' })
  @ApiOkResponse({ description: 'List of tasks', type: [TaskResponseDto] })
  @ZodSerializerDto([TaskResponseDto])
  findAll(@Query() { status, search }: FilterTaskDto): TaskResponseDto[] {
    return this.tasksService.findAll(status, search);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a task by ID' })
  @ApiOkResponse({ description: 'Task found', type: TaskResponseDto })
  @ApiNotFoundResponse({ description: 'Task not found' })
  @ZodSerializerDto(TaskResponseDto)
  findOne(@Param('id') id: string): TaskResponseDto {
    return this.tasksService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a task' })
  @ApiOkResponse({ description: 'Task found', type: TaskResponseDto })
  @ApiNotFoundResponse({ description: 'Task not found' })
  @ZodSerializerDto(TaskResponseDto)
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto): TaskResponseDto {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a task' })
  @ApiOkResponse({ description: 'Task deleted successfully', type: DeleteTaskResponseDto })
  @ApiNotFoundResponse({ description: 'Task not found' })
  @ZodSerializerDto(DeleteTaskResponseDto)
  remove(@Param('id') id: string): DeleteTaskResponseDto {
    this.tasksService.remove(id);
    return { success: true };
  }
}
