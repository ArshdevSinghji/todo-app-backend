import { Controller } from '@nestjs/common';
import { AssignedTaskService } from './assigned-task.service';

@Controller('assigned-task')
export class AssignedTaskController {
  constructor(private readonly assignedTaskService: AssignedTaskService) {}
}
