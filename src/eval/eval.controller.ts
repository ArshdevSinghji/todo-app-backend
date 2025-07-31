import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EvalService } from './eval.service';
import { CreateEvalDto } from './dto/create-eval.dto';
import { UpdateEvalDto } from './dto/update-eval.dto';

@Controller('eval')
export class EvalController {
  constructor(private readonly evalService: EvalService) {}

  @Post()
  create(@Body() createEvalDto: CreateEvalDto) {
    return this.evalService.create(createEvalDto);
  }
}
