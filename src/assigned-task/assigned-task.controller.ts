import { Controller, Get, Param, Post } from '@nestjs/common';
import { AssignedTaskService } from './assigned-task.service';

@Controller('assigned-task')
export class AssignedTaskController {
  constructor(private readonly assignedTaskService: AssignedTaskService) {}

  @Post(':taskId/userId/:userId')
  async createAssignedTask(
    @Param('taskId') taskId: number,
    @Param('userId') userId: number,
  ) {
    return await this.assignedTaskService.createAssignedTask(taskId, userId);
  }

  @Get(':taskId')
  async getAssignedTasksByTaskId(@Param('taskId') taskId: number) {
    return await this.assignedTaskService.getAssignedTaskByTaskId(taskId);
  }
}
