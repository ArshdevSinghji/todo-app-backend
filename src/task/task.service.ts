import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm/repository/Repository';
import { CreateTaskDto } from './dto/create-task.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    private readonly userService: UserService,
  ) {}

  async createTask(createTaskDto: CreateTaskDto, uid: number) {
    const user = await this.userService.findOneById(uid);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    const task = this.taskRepository.create({ ...createTaskDto, user });
    return await this.taskRepository.save(task);
  }

  async getTaskById(id: number) {
    const task = await this.taskRepository.findOne({
      where: { taskId: id },
      relations: ['user', 'assignedTasks'],
    });
    if (!task) {
      throw new BadRequestException('Task not found');
    }
    return task;
  }

  async getTasks(
    limit: number,
    offset: number,
    filterType?: string,
    searchTerm?: string,
    startTime?: Date,
    endTime?: Date,
    userId?: number,
  ) {
    const qb = this.taskRepository
      .createQueryBuilder('task')
      .leftJoinAndSelect('task.user', 'createdBy');

    if (startTime) {
      qb.andWhere('task.startTime >= :startTime', { startTime });
    }

    if (endTime) {
      qb.andWhere('task.endTime <= :endTime', { endTime });
    }

    // if (filterType === 'myCreation' && userId) {
    //   qb.andWhere('createdBy.uid = :userId', { userId });
    // } else if (userId) {
    //   qb.andWhere('assignee.uid = :userId', { userId });
    // }

    if (searchTerm) {
      searchTerm = searchTerm.trim();
      if (!searchTerm) {
        throw new BadRequestException('Search term cannot be empty');
      }
    }
    if (searchTerm) {
      qb.andWhere(
        '(task.title ILIKE :searchTerm OR task.description ILIKE :searchTerm OR createdBy.email ILIKE :searchTerm)',
        { searchTerm: `%${searchTerm}%` },
      );
    }

    qb.orderBy('task.taskId', 'ASC');
    qb.take(limit);
    qb.skip(offset);

    const count = await qb.getCount();

    return {
      total: count,
      tasks: await qb.getMany(),
    };
  }

  async findOneById(taskId: number) {
    return await this.taskRepository.findOne({
      where: { taskId },
      relations: ['user', 'assignedTasks'],
    });
  }
}
