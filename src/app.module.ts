import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './data-source';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';
import { AssignedTaskModule } from './assigned-task/assigned-task.module';
import { AuthModule } from './auth/auth.module';
import { EvalModule } from './eval/eval.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    UserModule,
    TaskModule,
    AssignedTaskModule,
    AuthModule,
    EvalModule,
  ],
})
export class AppModule {}
