import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AssignedTaskService } from './assigned-task.service';
import { CreateAssignedTaskDto } from './dto/create-assigned-task.dto';

@Controller('assigned-task')
export class AssignedTaskController {
  constructor(private readonly assignedTaskService: AssignedTaskService) {}

  @Post()
  async createAssignedTask(@Body() body: { taskId: number; userId: number }) {
    return await this.assignedTaskService.createAssignedTask(
      body.taskId,
      body.userId,
    );
  }

  @Get(':taskId')
  async getAssignedTasksByTaskId(@Param('taskId') taskId: number) {
    return await this.assignedTaskService.getAssignedTaskByTaskId(taskId);
  }
}
