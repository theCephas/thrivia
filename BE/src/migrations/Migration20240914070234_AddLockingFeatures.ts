import { Migration } from '@mikro-orm/migrations';

export class Migration20240914070234_AddLockingFeatures extends Migration {

  override async up(): Promise<void> {
    this.addSql('alter table `wallets` add `total_balance` numeric(10,2) not null default 0;');
    this.addSql('alter table `wallets` change `balance` `available_balance` numeric(10,2) not null default 0;');

    this.addSql('alter table `transactions` add `locked` tinyint(1) not null default true;');
  }

  override async down(): Promise<void> {
    this.addSql('alter table `wallets` drop column `total_balance`;');

    this.addSql('alter table `wallets` change `available_balance` `balance` numeric(10,2) not null default 0;');

    this.addSql('alter table `transactions` drop column `locked`;');
  }

}
