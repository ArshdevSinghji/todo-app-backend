import { Injectable } from '@nestjs/common';
import { CreateEvalDto } from './dto/create-eval.dto';
import { UpdateEvalDto } from './dto/update-eval.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Eval } from './entities/eval.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EvalService {
  constructor(
    @InjectRepository(Eval)
    private readonly evalRepository: Repository<Eval>,
  ) {}

  async create(createEvalDto: CreateEvalDto) {
    const evalEntity = this.evalRepository.create(createEvalDto);
    return await this.evalRepository.save(evalEntity);
  }
}
