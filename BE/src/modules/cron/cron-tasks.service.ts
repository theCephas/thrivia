import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable } from "@nestjs/common";
import { Transactions, Wallets } from "../wallets/wallets.entity";
import { EntityManager, EntityRepository } from "@mikro-orm/core";
import { Cron } from "@nestjs/schedule";
import moment from "moment-timezone";

@Injectable()
export class CronTasksService {
  constructor(
    @InjectRepository(Transactions) private readonly transactionRepository: EntityRepository<Transactions>,
    @InjectRepository(Wallets) private readonly walletRepository: EntityRepository<Wallets>,
    private readonly em: EntityManager
  ) { }
  
  @Cron('0 1,7,13,19 * * *', { timeZone: 'Africa/Lagos' })
  async unlockTransactions() {
    await this.em.transactional(async (em) => {
      const transactions = await this.transactionRepository.find({
        locked: true,
      });
      const transactionsToUnlock: Transactions[] = [];
      for (const transaction of transactions) {
        const daysDiff = moment(moment().tz('Africa/Lagos')).diff(
          transaction.createdAt,
          'days',
        );
        if (daysDiff >= 1) transactionsToUnlock.push(transaction);
      }
      const walletsToUpdate: string[] = [];
      await Promise.all(
        transactionsToUnlock.map((transaction) => {
          if (!walletsToUpdate.includes(transaction.wallet.uuid))
            walletsToUpdate.push(transaction.wallet.uuid);
          transaction.locked = false;
          em.persist(transaction);
        }),
      );
      const walletModels = await this.walletRepository.find({
        uuid: { $in: walletsToUpdate }
      });
      for (const wallet of walletModels) {
        const lastTransaction = transactionsToUnlock
          .reverse()
          .find((transaction) => transaction.wallet.uuid === wallet.uuid);
        wallet.availableBalance = lastTransaction.balanceAfter;
        em.persist(wallet);
      }
      await em.flush();
    });
  }
}