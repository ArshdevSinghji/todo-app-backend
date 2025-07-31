import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAssignedTaskDto } from './dto/create-assigned-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AssignedTask } from './entities/assigned-task.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { TaskService } from 'src/task/task.service';
import { IsCompleted } from 'src/enum';

@Injectable()
export class AssignedTaskService {
  constructor(
    @InjectRepository(AssignedTask)
    private assignedTaskRepository: Repository<AssignedTask>,
    private readonly userService: UserService,
    private readonly taskService: TaskService,
  ) {}

  async createAssignedTask(userId: number, taskId: number) {
    const user = await this.userService.findOneById(userId);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    const task = await this.taskService.getTaskById(taskId);
    console.log('Task found:', task);

    const assignedTask = this.assignedTaskRepository.create({
      isCompleted: IsCompleted.FALSE,
      user,
      task,
    });
    return await this.assignedTaskRepository.save(assignedTask);
  }

  async getAssignedTaskByTaskId(taskId: number) {
    const assignedTasks = await this.assignedTaskRepository.find({
      where: { task: { taskId } },
      relations: ['user', 'task'],
    });
    if (!assignedTasks || assignedTasks.length === 0) {
      throw new BadRequestException('No assigned tasks found for this task');
    }
    return assignedTasks;
  }
}
