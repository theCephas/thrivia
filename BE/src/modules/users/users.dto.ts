import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { IsValidDate } from 'src/tools/date-validator';

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

export class CreateCooperativeApplicationDto {
  @IsString()
  uniqueId: string;

  @IsString()
  @IsOptional()
  membershipNo: string;

  @IsString()
  fullName: string;

  @IsValidDate()
  dateOfBirth: string;

  @IsString()
  phoneNumber: string;

  @IsString()
  @IsOptional()
  email: string;

  @IsString()
  address: string;
}

export class WithdrawalRequestDto {
  @IsString()
  bankCode: string;

  @IsString()
  bankName: string;

  @IsString()
  accountNumber: string;

  @IsString()
  accountName: string;

  @IsString()
  @IsOptional()
  purpose: string;

  @IsNumber()
  amount: number;
}
