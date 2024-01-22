import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  private readonly logger = new Logger('TasksService');
  constructor(
    @InjectRepository(Task) private readonly tasksRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    const task = this.tasksRepository.create(createTaskDto);
    await this.tasksRepository.save(task);
    return task;
  }

  async findAll() {
    return await this.tasksRepository.find();
  }

  async findOne(id: string) {
    const task = this.tasksRepository.findBy({ id });
    if (!task)
      throw new NotFoundException(
        `La tarea con el id: ${id} no fue encontrada.`,
      );
    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    const task = await this.tasksRepository.preload({ id, ...updateTaskDto });
    if (!task) throw new NotFoundException('Tarea no encontrada');

    return this.tasksRepository.save(task);
  }

  remove(id: string) {this.tasksRepository.findBy({ id })
    return this.tasksRepository.delete(id);
  }

  private handleDBErrors(error: any): never {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }
    this.logger.error(error);
    throw new InternalServerErrorException(error.detail);
  }
}
