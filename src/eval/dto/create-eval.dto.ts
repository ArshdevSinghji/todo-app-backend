import { Type } from 'class-transformer';
import {
  IsDateString,
  IsNotEmpty,
  IsString,
  MinDate,
  Validate,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isAfterStartTime', async: false })
class IsAfterStartTimeConstraint implements ValidatorConstraintInterface {
  validate(endTime: Date, args: ValidationArguments) {
    const obj = args.object as any;
    const startTime = obj.startTime;
    return endTime > startTime;
  }

  defaultMessage(args: ValidationArguments) {
    return 'endTime must be after startTime';
  }
}

export class CreateEvalDto {
  @IsString()
  @IsNotEmpty({ message: 'Username is required' })
  username: string;

  @Type(() => Date)
  @MinDate(new Date(), { message: 'startTime must not be in the past' })
  startTime: Date;

  @Type(() => Date)
  @Validate(IsAfterStartTimeConstraint)
  endTime: Date;
}
