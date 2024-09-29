import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable } from "@nestjs/common";
import { Transactions, Wallets } from "../wallets/wallets.entity";
import { EntityManager, EntityRepository } from "@mikro-orm/core";
import { Cron } from "@nestjs/schedule";
import moment from "moment-timezone";
import { UsersService } from "../users/users.service";

@Injectable()
export class CronTasksService {
  constructor(
    @InjectRepository(Transactions) private readonly transactionRepository: EntityRepository<Transactions>,
    @InjectRepository(Wallets) private readonly walletRepository: EntityRepository<Wallets>,
    private readonly usersService: UsersService,
    private readonly em: EntityManager
  ) { }
  
  @Cron('0 1,7,13,19 * * *', { timeZone: 'Africa/Lagos' })
async unlockTransactions() {
  await this.em.transactional(async (em) => {
    // Find transactions that are locked and have been locked for at least 1 day
    const transactions = await this.transactionRepository.find({
      locked: true,
      createdAt: {
        $lte: moment().tz('Africa/Lagos').subtract(1, 'days').toDate(),
      },
    });

    // Prepare transactions to unlock and wallets to update
    const transactionsToUnlock: Transactions[] = [];
    const walletsToUpdate = new Set<string>();

    for (const transaction of transactions) {
      transactionsToUnlock.push(transaction);
      walletsToUpdate.add(transaction.wallet.uuid);
      transaction.locked = false;  // Unlock the transaction
    }

    // Batch persist unlocked transactions
    em.persist(transactionsToUnlock);

    // Fetch wallets to update
    const walletModels = await this.walletRepository.find({
      uuid: { $in: Array.from(walletsToUpdate) },
    });

    // Update wallet balances based on the latest unlocked transaction
    for (const wallet of walletModels) {
      const lastTransaction = transactionsToUnlock
        .find((transaction) => transaction.wallet.uuid === wallet.uuid);

      if (lastTransaction) {
        wallet.availableBalance = lastTransaction.balanceAfter;
      }
    }

    // Persist updated wallets
    em.persist(walletModels);

    // Commit all changes in one go
    await em.flush();
  });
}


  @Cron('*/15 * * * *', { timeZone: 'Africa/Lagos' })
  async wakeDBUp() {
    await this.usersService.findByEmailOrPhone('');
  }
}