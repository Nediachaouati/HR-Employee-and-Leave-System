import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/role.enum';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('statistics')
export class StatisticsController {
    constructor(private readonly statisticsService: StatisticsService) {}

    @Roles(Role.RH)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('employee/:userId')
    async getEmployeeStatistics(
      @Param('userId') userId: string,
      @Query('year') year?: string,
    ) {
      return this.statisticsService.getEmployeeStatistics(+userId, year ? +year : undefined);
    }
}
