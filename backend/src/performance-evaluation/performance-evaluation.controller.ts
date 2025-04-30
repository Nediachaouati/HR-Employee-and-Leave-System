import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { PerformanceEvaluationService } from './performance-evaluation.service';
import { CreatePerformanceEvaluationDto } from './dto/create-performance-evaluation.dto';
import { UpdatePerformanceEvaluationDto } from './dto/update-performance-evaluation.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../role.enum';

@Controller('performance-evaluation')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PerformanceEvaluationController {
  constructor(private readonly performanceEvaluationService: PerformanceEvaluationService) {}

  @Post()
  @Roles(Role.RH, Role.ADMIN)
  create(@Body() createDto: CreatePerformanceEvaluationDto, @Request() req) {
    return this.performanceEvaluationService.create(createDto, req.user.id);
  }

  @Get()
  @Roles(Role.RH, Role.ADMIN)
  findAll() {
    return this.performanceEvaluationService.findAll();
  }

  @Get('my')
  @Roles(Role.EMPLOYE)
  findMyEvaluations(@Request() req) {
    return this.performanceEvaluationService.findByEmployee(req.user.id);
  }

  @Get(':id')
  @Roles(Role.RH, Role.ADMIN, Role.EMPLOYE)
  findOne(@Param('id') id: string) {
    return this.performanceEvaluationService.findOne(+id);
  }

  @Patch(':id')
  @Roles(Role.RH, Role.ADMIN)
  update(@Param('id') id: string, @Body() updateDto: UpdatePerformanceEvaluationDto) {
    return this.performanceEvaluationService.update(+id, updateDto);
  }

  @Delete(':id')
  @Roles(Role.RH, Role.ADMIN)
  remove(@Param('id') id: string) {
    return this.performanceEvaluationService.remove(+id);
  }
  @Get('/employee/:employeeId')
  @Roles(Role.RH)
  findByEmployee(@Param('employeeId') employeeId: number) {
  return this.performanceEvaluationService.findByEmployee(employeeId);
}
} 