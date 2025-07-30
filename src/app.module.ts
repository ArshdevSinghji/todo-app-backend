import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './data-source';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';
import { AssignedTaskModule } from './assigned-task/assigned-task.module';

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), UserModule, TaskModule, AssignedTaskModule],
})
export class AppModule {}
