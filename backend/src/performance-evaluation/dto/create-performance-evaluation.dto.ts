import { IsEnum, IsNumber, IsString, IsOptional, Min, Max, IsInt } from 'class-validator';
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

  @IsInt()
  @Min(1)
  @Max(12)
  @IsOptional()
  month?: number;

  @IsNumber()
  @Min(0)
  @Max(5)
  @IsOptional()
  overallScore?: number;

  @IsString()
  @IsOptional()
  comments?: string;
} 