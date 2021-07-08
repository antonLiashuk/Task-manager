import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { stat } from 'fs';
import { AuthModule } from 'src/auth/auth.module';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto,
  @GetUser() user : User,
  ): Promise<Task[]> {
    return this.tasksService.getTasks(filterDto, user);
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string,
  @GetUser() user : User
  ): Promise<Task> {
    return this.tasksService.getTaskById(id, user);
  }
  @Delete('/:id')
  deleteTaskById(
    @Param('id') id: string,
    @GetUser() user: User,
    ): Promise<void> {
    return this.tasksService.deleteTaskById(id, user);
  }
  /*if we passing @GetUser we also tell our compiler that we want to define a relationship => every task should have defined its owner => User */
  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto,
  @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksService.createTask(createTaskDto, user);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updateStateStatusDto: UpdateTaskStatusDto,
    @GetUser()user: User
  ): Promise<Task> {
    const { status } = updateStateStatusDto;
    return this.tasksService.updateTaskStatus(id, status, user);
  }
}