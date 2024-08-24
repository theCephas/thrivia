// import { BankDetailsDto } from 'src/modules/wallet/wallet.dto';

export interface PaymentProvider {
  getProviderId(): string;
  getAllBanks(): Promise<[{ name: string; code: string; [x: string]: any }]>;
  verifyBankDetails(
    bankDetails: any,
  ): Promise<{ account_name: string }>;
}
