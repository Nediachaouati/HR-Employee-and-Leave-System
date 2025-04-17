import { PartialType } from '@nestjs/mapped-types';
import { CreatePerformanceEvaluationDto } from './create-performance-evaluation.dto';

export class UpdatePerformanceEvaluationDto extends PartialType(CreatePerformanceEvaluationDto) {} 