import { IsEmail, IsOptional, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(1, 200)
  firstName: string;

  @IsString()
  @Length(1, 200)
  lastName: string;

  @IsEmail()
  @IsOptional()
  @Length(1, 200)
  email: string;

  @IsString()
  @Length(1, 15)
  phoneNumber: string;

  @IsString()
  @Length(1, 50)
  password: string;
}
