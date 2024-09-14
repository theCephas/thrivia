import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
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
import { v4 } from 'uuid';

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
    let transactionModel: Transactions;
    await this.em.transactional(async (em) => {
      const wallet = await this.walletsRepository.findOne({
        uuid: details.walletUuid,
      });
      if (!wallet)
        throw new NotFoundException(
          `Wallet with id: ${details.walletUuid} does not exist`,
        );
      const transactionExists = await this.transactionRepository.findOne({
        payment: { uuid: details.paymentUuid }
      });
      if (transactionExists) throw new ConflictException(`Payment has already been used`);
      transactionModel = this.transactionRepository.create({
        uuid: v4(),
        type: TransactionType.CREDIT,
        balanceBefore: wallet.totalBalance,
        balanceAfter: wallet.totalBalance + details.amount,
        amount: details.amount,
        wallet: this.walletsRepository.getReference(wallet.uuid),
        walletSnapshot: JSON.stringify(wallet),
        payment: this.paymentsRepository.getReference(details.paymentUuid),
        user: this.usersRepository.getReference(details.userUuid),
        remark: details.remark,
      });
      wallet.totalBalance += details.amount;
      if (details.cooperativeWallet) {
        const coopWalletModel = await this.walletsRepository.findOne({ uuid: details.cooperativeWallet.uuid })
        const coopTransactionModel = this.transactionRepository.create({
          uuid: v4(),
          type: TransactionType.CREDIT,
          balanceBefore: coopWalletModel.totalBalance,
          balanceAfter: coopWalletModel.totalBalance + details.amount,
          amount: details.amount,
          wallet: this.walletsRepository.getReference(details.cooperativeWallet.uuid),
          walletSnapshot: JSON.stringify(details.cooperativeWallet),
          payment: this.paymentsRepository.getReference(details.paymentUuid),
          user: this.usersRepository.getReference(details.userUuid),
          remark: details.remark,
        });
        coopWalletModel.totalBalance += details.amount;
        em.persist(coopWalletModel);
        em.persist(coopTransactionModel);
      }
      em.persist(transactionModel);
      em.persist(wallet);
      await em.flush();
    });
    return transactionModel;
  }
}
