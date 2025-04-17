import { PartialType } from '@nestjs/mapped-types';
import { CreateTimesheetDto } from './create-timesheet.dto';
import { IsEnum } from 'class-validator';
import { TimesheetStatus } from '../entities/timesheet.entity';

export class UpdateTimesheetDto extends PartialType(CreateTimesheetDto) {
    @IsEnum(TimesheetStatus)
    status: TimesheetStatus; 
}
