import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAssignedTaskDto } from './dto/create-assigned-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AssignedTask } from './entities/assigned-task.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { TaskService } from 'src/task/task.service';

@Injectable()
export class AssignedTaskService {
  constructor(
    @InjectRepository(AssignedTask)
    private assignedTaskRepository: Repository<AssignedTask>,
    private readonly userService: UserService,
    private readonly taskService: TaskService,
  ) {}

  async createAssignedTask(
    createAssignedTaskDto: CreateAssignedTaskDto,
    userId: number,
    taskId: number,
  ) {
    const user = await this.userService.findOneById(userId);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    const task = await this.taskService.findOneById(taskId);
    if (!task) {
      throw new BadRequestException('Task not found');
    }

    const assignedTask = this.assignedTaskRepository.create({
      ...createAssignedTaskDto,
      user,
      task,
    });
    return await this.assignedTaskRepository.save(assignedTask);
  }
}
