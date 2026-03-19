import {
  IsBoolean,
  IsEmail,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateUserRequest {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsNumber()
  @Min(18)
  @Max(80)
  age: number;

  @IsBoolean()
  employmentStatus: boolean;

  @IsNumber()
  @Min(0)
  @Max(40)
  yearsOfExperience: number;
}
