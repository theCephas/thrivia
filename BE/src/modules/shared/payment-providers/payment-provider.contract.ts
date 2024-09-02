import { ProviderPayoutDto } from 'src/modules/wallets/wallets.dto';

export interface PaymentProvider {
  getProviderId(): string;
  getAllBanks(): Promise<[{ name: string; code: string; [x: string]: any }]>;
  verifyBankDetails(bankDetails: any): Promise<{ account_name: string }>;
  payout(details: ProviderPayoutDto): Promise<{ status: string; data: any }>;
  calculatePayoutAmount(amount: number): number;
}
