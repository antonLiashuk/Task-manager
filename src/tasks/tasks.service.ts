import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
   constructor(
     @InjectRepository(TaskRepository)
     private taskRepository: TaskRepository,
   ) {}

    getTasks(filderDto: GetTasksFilterDto,
      user : User
      ): Promise<Task[]> {
      return this.taskRepository.getTasks(filderDto, user);
    }
  async getTaskById(id: string, user : User): Promise<Task> { 
    //wersja ktora nie sprawdza czy dany token nalezacy do danego usera posiada w ogole task z takim id const found = await this.taskRepository.findOne(id);
    const found = await this.taskRepository.findOne({where:{id, user}});

    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return found;
  }
  
  async deleteTaskById(
    id : string,
    user: User,
    ) : Promise<void> {
    const result = await this.taskRepository.delete({id, user});
    if(result.affected === 0) {
      throw new NotFoundException('Task with such id isn\' present inside the database');
    }
  }
  
  createTask(createTaskDto : CreateTaskDto, user : User) : Promise<Task> {
    return this.taskRepository.createTask(createTaskDto, user);
  }
  async updateTaskStatus(id: string, status: TaskStatus,
    user: User
    ): Promise<Task> {
    const task = await this.getTaskById(id, user);

    task.status = status;
    await this.taskRepository.save(task);

    return task;
  }
}
