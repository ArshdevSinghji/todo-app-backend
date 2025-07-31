import {
  IsDateString,
  IsNotEmpty,
  IsString,
  Validate,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'isEndTimeAfterStartTime', async: false })
class IsEndTimeAfterStartTimeConstraint
  implements ValidatorConstraintInterface
{
  validate(endTime: any, args: ValidationArguments) {
    const obj: any = args.object;
    if (!obj.startTime || !endTime) return false;
    return new Date(endTime) > new Date(obj.startTime);
  }

  defaultMessage(args: ValidationArguments) {
    return 'endTime must be after startTime';
  }
}

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsDateString()
  @Validate((value) => new Date(value) >= new Date(), {
    message: 'startTime must not be in the past',
  })
  startTime: Date;

  @IsDateString()
  @Validate(IsEndTimeAfterStartTimeConstraint)
  endTime: Date;
}
