import { IsNumber, IsString } from 'class-validator';

export class CreateCooperativeDto {
  @IsString()
  name: string;

  @IsString()
  regNo: string;

  @IsString()
  address: string;

  @IsString()
  contactEmail: string;

  @IsString()
  contactPhone: string;

  @IsString()
  bankName: string;

  @IsString()
  bankCode: string;

  @IsString()
  accountNo: string;

  @IsString()
  accountName: string;
}

export class RejectApplicationDto {
  @IsString()
  reason: string;
}

export class PaymentInfo {
  @IsNumber()
  amount: number;
}

export class DepositMoneyDto {
  @IsString()
  paymentUuid: string;
}
