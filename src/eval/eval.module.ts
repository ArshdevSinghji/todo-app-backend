import { Module } from '@nestjs/common';
import { EvalService } from './eval.service';
import { EvalController } from './eval.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Eval } from './entities/eval.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Eval])],
  controllers: [EvalController],
  providers: [EvalService],
})
export class EvalModule {}
