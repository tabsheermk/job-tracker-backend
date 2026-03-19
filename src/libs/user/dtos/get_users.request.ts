import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class GetUsersRequest {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  from: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  size: number;

  @IsOptional()
  @IsString()
  sendAll: string;
}
