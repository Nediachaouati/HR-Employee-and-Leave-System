import { Module } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { StatisticsController } from './statistics.controller';
import { DemandConge } from 'src/demand-conge/entities/demand-conge.entity';
import { Timesheet } from 'src/timesheet/entities/timesheet.entity';
import { PerformanceEvaluation } from 'src/performance-evaluation/performance-evaluation.entity';
import { User } from 'src/users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([DemandConge, Timesheet, PerformanceEvaluation, User])],
  providers: [StatisticsService],
  controllers: [StatisticsController]
})
export class StatisticsModule {}
