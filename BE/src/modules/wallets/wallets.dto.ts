import { IsNumberString, IsString, Length } from 'class-validator';

export class BankDetailsDto {
  @IsNumberString()
  @Length(10)
  accountNumber: string;

  @IsNumberString()
  bankCode: string;
}

export class CreateWalletDto {
  @IsString()
  title: string;
}
