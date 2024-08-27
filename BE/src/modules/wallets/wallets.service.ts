import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { PaymentProvider } from '../shared/payment-providers/payment-provider.contract';
import PaymentFactory from '../shared/payment-providers/payment-provider.factory';
import { CacheKeys } from 'src/types';
import { Cache } from 'cache-manager';
import { BankDetailsDto } from './wallets.dto';

@Injectable()
export class WalletsService {
  private paymentProvider: PaymentProvider;

  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly paymentFactory: PaymentFactory,
  ) {
    this.paymentProvider = this.paymentFactory.getProvider();
  }

  async getAllBanks() {
    const cacheKey = `${CacheKeys.BANKS_DATA}`;
    const cachedBanks: string = await this.cacheManager.get(cacheKey);
    if (cachedBanks) return JSON.parse(cachedBanks);
    const banks = await this.paymentProvider.getAllBanks();
    await this.cacheManager.set(cacheKey, JSON.stringify(banks), 0);
    return banks;
  }

  async verifyBankDetails(bankDetails: BankDetailsDto) {
    return this.paymentProvider.verifyBankDetails(bankDetails);
  }
}
