import { Controller, Get, Post, Body, Patch, Param, Delete,Request } from '@nestjs/common';
import { TimesheetService } from './timesheet.service';
import { CreateTimesheetDto } from './dto/create-timesheet.dto';
import { UpdateTimesheetDto } from './dto/update-timesheet.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/role.enum';

@Controller('timesheet')

@Controller('timesheet')
export class TimesheetController {
  constructor(private readonly timesheetService: TimesheetService) {}

  @Post()
  @Roles(Role.EMPLOYE)
  create(@Body() createDto: CreateTimesheetDto, @Request() req) {
    return this.timesheetService.create(createDto, req.user);
  }
  @Patch(':id/validate')
  @Roles(Role.RH) // Only RH can access this route
  validate(@Param('id') id: number, @Request() req: any, @Body('action') action: 'validate' | 'reject') {
    return this.timesheetService.validate(id, req.user, action);
  }
  
  @Get()
  findAll() {
    return this.timesheetService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.timesheetService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTimesheetDto: UpdateTimesheetDto) {
    return this.timesheetService.update(+id, updateTimesheetDto);
  }
  @Get('employee/:id')
  @Roles(Role.RH) // Only RH can access this route
  getTimesheetsByEmployee(@Param('id') employeeId: number, @Request() req: any) {
    return this.timesheetService.getTimesheetsByEmployee(employeeId);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.timesheetService.remove(+id);
  }
}
