// create-timesheet.dto.ts
import { IsDateString, IsNumber } from 'class-validator';

export class CreateTimesheetDto {
  @IsDateString()
  date: string;

  @IsNumber()
  hoursWorked: number;
}
