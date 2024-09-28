import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateLoanDto {
  @IsNumber()
  amount: number;

  @IsString()
  cooperativeUuid: string;

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
}

export class CancelLoanDto {
  @IsString()
  reason: string;
}

export class UpdateLoanDto {
  @IsNumber()
  @IsOptional()
  amount: number;

  @IsString()
  @IsOptional()
  bankCode: string;

  @IsString()
  @IsOptional()
  bankName: string;

  @IsString()
  @IsOptional()
  accountNumber: string;

  @IsString()
  @IsOptional()
  accountName: string;

  @IsString()
  @IsOptional()
  purpose: string;
}
