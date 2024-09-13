import { IsNumberString, IsString, Length } from 'class-validator';
import { Wallets } from './wallets.entity';

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

export class CreditWalletDto {
  walletUuid: string;

  amount: number;

  paymentUuid: string;

  userUuid: string;

  remark: string;

  cooperativeWallet?: Wallets
}

export class ProviderPayoutDto {
  amount: number;
  bankCode: string;
  accountNumber: string;
  accountName: string;
  reference: string;
  narration: string;
}
