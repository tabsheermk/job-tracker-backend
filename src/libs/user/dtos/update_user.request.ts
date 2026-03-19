import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateUserRequest {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsNumber()
  age: number;

  @IsOptional()
  @IsNumber()
  yearsOfExperience: number;

  @IsOptional()
  @IsBoolean()
  employmentStatus: boolean;
}
