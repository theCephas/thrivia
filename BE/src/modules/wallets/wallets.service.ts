import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { PaymentProvider } from '../shared/payment-providers/payment-provider.contract';
import PaymentFactory from '../shared/payment-providers/payment-provider.factory';
import { CacheKeys, TransactionType } from 'src/types';
import { Cache } from 'cache-manager';
import { BankDetailsDto, CreditWalletDto } from './wallets.dto';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Transactions, Wallets } from './wallets.entity';
import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { Payments } from '../cooperatives/cooperatives.entity';
import { Users } from '../users/users.entity';

@Injectable()
export class WalletsService {
  private paymentProvider: PaymentProvider;

  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @InjectRepository(Wallets)
    private readonly walletsRepository: EntityRepository<Wallets>,
    @InjectRepository(Transactions)
    private readonly transactionRepository: EntityRepository<Transactions>,
    @InjectRepository(Payments)
    private readonly paymentsRepository: EntityRepository<Payments>,
    @InjectRepository(Users)
    private readonly usersRepository: EntityRepository<Users>,
    private readonly paymentFactory: PaymentFactory,
    private readonly em: EntityManager,
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

  async creditWallet(details: CreditWalletDto) {
    await this.em.transactional(async (em) => {
      const wallet = await this.walletsRepository.findOne({
        uuid: details.walletUuid,
      });
      if (!wallet)
        throw new NotFoundException(
          `Wallet with id: ${details.walletUuid} does not exist`,
        );
      const transactionModel = this.transactionRepository.create({
        type: TransactionType.CREDIT,
        balanceBefore: wallet.balance,
        balanceAfter: wallet.balance + details.amount,
        amount: details.amount,
        wallet: this.walletsRepository.getReference(wallet.uuid),
        walletSnapshot: JSON.stringify(wallet),
        payment: this.paymentsRepository.getReference(details.paymentUuid),
        user: this.usersRepository.getReference(details.userUuid),
        remark: details.remark,
      });
      await em.persistAndFlush(transactionModel);
      const walletModel = this.walletsRepository.create({
        uuid: wallet.uuid,
        balance: wallet.balance + details.amount,
      });
      await em.persistAndFlush(walletModel);
    });
  }
}
