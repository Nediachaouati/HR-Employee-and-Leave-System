import { IsEnum, IsNumber, IsString, IsOptional, Min, Max } from 'class-validator';
import { EvaluationPeriod, EvaluationStatus } from '../performance-evaluation.entity';

export class CreatePerformanceEvaluationDto {
  @IsNumber()
  employeeId: number;

  @IsEnum(EvaluationPeriod)
  evaluationPeriod: EvaluationPeriod;

  @IsNumber()
  evaluationYear: number;

  @IsEnum(EvaluationStatus)
  @IsOptional()
  status?: EvaluationStatus;

  @IsNumber()
  @Min(0)
  @Max(5)
  @IsOptional()
  overallScore?: number;

  @IsString()
  @IsOptional()
  comments?: string;
} 