import { PartialType } from '@nestjs/mapped-types';
import { CreateEvalDto } from './create-eval.dto';

export class UpdateEvalDto extends PartialType(CreateEvalDto) {}
