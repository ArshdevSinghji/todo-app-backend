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

  async findOneById(taskId: number) {
    return await this.taskRepository.findOne({
      where: { taskId },
      relations: ['user', 'assignedTasks'],
    });
  }
}
