import { Controller, Get, Post, Body, Patch, Param, Delete,Request, Query } from '@nestjs/common';
import { TimesheetService } from './timesheet.service';
import { CreateTimesheetDto } from './dto/create-timesheet.dto';
import { UpdateTimesheetDto } from './dto/update-timesheet.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/role.enum';



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
  @Roles(Role.RH, Role.ADMIN)
  getAllTimesheets() {
    return this.timesheetService.getAllTimesheets();
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
  @Get('mysheet')
  @Roles(Role.EMPLOYE)
  getMyTimesheets(@Request() req) {
    return this.timesheetService.getMyTimesheets(req.user.id);
  }
  @Get('stats/status')
  async getStatsByStatus() {
    return this.timesheetService.getTimesheetStats();
  }
}
