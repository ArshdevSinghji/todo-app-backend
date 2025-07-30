import { IsNotEmpty, IsString } from 'class-validator';
import { IsCompleted } from 'src/enum';

export class CreateAssignedTaskDto {
  @IsString()
  @IsNotEmpty()
  isCompleted: IsCompleted;
}
