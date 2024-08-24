import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { MonnifyConfig } from 'src/config/types/monnify.config';
import axios, { AxiosError } from 'axios';
import { camelCaseKeysToUnderscore } from 'src/utils';
import { PaymentProvider } from '../payment-provider.contract';
// import { BankDetailsDto } from 'src/modules/wallet/wallet.dto';

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
}
