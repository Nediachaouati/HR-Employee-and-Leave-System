import { IsOptional, IsString } from "class-validator";

export class FindUsersDto{

  @IsOptional()
  @IsString()
  search?: string; // For searching by name or email

  @IsOptional()
  @IsString()
  role?: string;
}