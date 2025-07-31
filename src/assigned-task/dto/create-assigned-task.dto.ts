import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { IsCompleted } from 'src/enum';

export class CreateAssignedTaskDto {
  @IsEnum(IsCompleted)
  isCompleted: IsCompleted = IsCompleted.FALSE;
}
