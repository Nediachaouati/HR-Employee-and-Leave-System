import { IsDateString, IsEnum, IsOptional, IsString } from "class-validator";

export class CreateDemandCongeDto {
    @IsDateString()
    start_date: string;
  
    @IsDateString()
    end_date: string;
  
    @IsEnum(['Congé payé', 'Congé maladie', 'Sans solde'])
    type: string;
  
    @IsOptional()
    @IsString()
    comments?: string;
}
