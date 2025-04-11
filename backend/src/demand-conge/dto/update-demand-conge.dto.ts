import { PartialType } from '@nestjs/mapped-types';
import { CreateDemandCongeDto } from './create-demand-conge.dto';

export class UpdateDemandCongeDto extends PartialType(CreateDemandCongeDto) {}
