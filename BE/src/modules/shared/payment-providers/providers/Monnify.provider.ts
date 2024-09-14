import { BadRequestException, Injectable, Logger, ServiceUnavailableException } from '@nestjs/common';
import { MonnifyConfig } from 'src/config/types/monnify.config';
import axios, { AxiosError } from 'axios';
import { camelCaseKeysToUnderscore } from 'src/utils';
import { PaymentProvider } from '../payment-provider.contract';
import { ProviderPayoutDto } from 'src/modules/wallets/wallets.dto';
import util from 'util';

@Injectable()
export class MonnifyProvider implements PaymentProvider {
  private static PROVIDER_ID = 'MONNIFY';

  public logger = new Logger(MonnifyProvider.name);

  constructor(readonly config: MonnifyConfig) {}

  getProviderId(): string {
    return MonnifyProvider.PROVIDER_ID;
  }

  private async getAccessToken() {
    const response = await axios
      .post(
        `${this.config.baseUrl}/api/v1/auth/login`,
        {},
        {
          auth: {
            username: this.config.apiKey,
            password: this.config.secretKey,
          },
        },
      )
      .catch((error) => {
        console.log(error.response);
        throw error;
      });
    return response.data.responseBody.accessToken;
  }

  async getAllBanks() {
    const accessToken = await this.getAccessToken();
    const response = await axios.get(`${this.config.baseUrl}/api/v1/banks`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data.responseBody;
  }

  async verifyBankDetails({ accountNumber, bankCode }: any) {
    try {
      const accessToken = await this.getAccessToken();
      const response = await axios.get(
        `${this.config.baseUrl}/api/v1/disbursements/account/validate?accountNumber=${accountNumber}&bankCode=${bankCode}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      if (!response.data.responseBody.accountName)
        throw new BadRequestException('Invalid bank details provided');
      return camelCaseKeysToUnderscore(response.data.responseBody) as any;
    } catch (error) {
      throw new BadRequestException(
        ((error as AxiosError).response.data as any).message,
      );
    }
  }

  async payout({
    amount,
    bankCode,
    accountNumber,
    accountName,
    reference,
    narration,
  }: ProviderPayoutDto) {
    const accessToken = await this.getAccessToken();
    const response = await axios
      .post(
        `${this.config.baseUrl}/api/v2/disbursements/single`,
        {
          amount,
          reference,
          narration,
          destinationBankCode: bankCode,
          destinationAccountNumber: accountNumber,
          destinationAccountName: accountName,
          currency: 'NGN',
          sourceAccountNumber: this.config.accountNumber,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )
      .catch((error) => {
        console.log(util.inspect(error.response, true, null, false));
        throw new ServiceUnavailableException("Withdrawal currently unavailable");
        throw error;
      });
    return {
      status: String(response.data.responseBody.status).toLowerCase(),
      data: response.data.responseBody,
    };
  }

  calculatePayoutAmount(payoutAmount: number): number {
    return (payoutAmount =
      payoutAmount >= 50000
        ? payoutAmount + 40
        : payoutAmount >= 10000
          ? payoutAmount + 20
          : payoutAmount + 10);
  }
}
