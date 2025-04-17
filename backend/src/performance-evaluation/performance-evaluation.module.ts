import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PerformanceEvaluationService } from './performance-evaluation.service';
import { PerformanceEvaluationController } from './performance-evaluation.controller';
import { PerformanceEvaluation } from './performance-evaluation.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PerformanceEvaluation, User])],
  controllers: [PerformanceEvaluationController],
  providers: [PerformanceEvaluationService],
  exports: [PerformanceEvaluationService],
})
export class PerformanceEvaluationModule {} 