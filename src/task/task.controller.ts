import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get('/:id')
  async getTaskById(@Param('id') id: number) {
    return await this.taskService.getTaskById(id);
  }

  @UseGuards(AuthGuard)
  @Get()
  async getTasks(
    @Req() request: any,
    @Query('startTime') startTime?: Date,
    @Query('endTime') endTime?: Date,
    @Query('searchTerm') searchTerm?: string,
    @Query('filterType') filterType?: string,
    @Query('limit') limit: number = 10,
    @Query('offset') offset: number = 0,
  ) {
    return await this.taskService.getTasks(
      limit,
      offset * limit,
      filterType,
      searchTerm,
      startTime,
      endTime,
      request.user?.uid,
    );
  }

  @UseGuards(AuthGuard)
  @Post()
  async createTask(@Body() createTaskDto: CreateTaskDto, @Req() request: any) {
    const uid = request.user?.uid;
    return await this.taskService.createTask(createTaskDto, uid);
  }
}
