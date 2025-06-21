import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TaskService {
  @InjectRepository(Task)
  private readonly taskRepository: Repository<Task>;
  async create(task: CreateTaskDto): Promise<Task> {
    const newtask = this.taskRepository.create(task);
    return await this.taskRepository.save(newtask);
  }

  findAll(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  async findOne(id: number): Promise<Task> {
    const task = await this.taskRepository.findOneBy({ id });
    if (!task) {
      throw new HttpException(
        `Task with is ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const task = await this.taskRepository.findOneBy({ id });
    if (!task) {
      throw new HttpException(
        `Task with is ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    const updateTask = Object.assign(task, updateTaskDto);
    return this.taskRepository.save(updateTask);
  }
  async remove(id: number) {
    const task = await this.taskRepository.findOneBy({ id });
    if (!task) {
      throw new HttpException(
        `Task with is ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return this.taskRepository.delete(id);
  }
}
