import { Module } from '@nestjs/common';
import { AssignedTaskService } from './assigned-task.service';
import { AssignedTaskController } from './assigned-task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssignedTask } from './entities/assigned-task.entity';
import { UserModule } from 'src/user/user.module';
import { TaskModule } from 'src/task/task.module';

@Module({
  imports: [TypeOrmModule.forFeature([AssignedTask]), UserModule, TaskModule],
  controllers: [AssignedTaskController],
  providers: [AssignedTaskService],
})
export class AssignedTaskModule {}
