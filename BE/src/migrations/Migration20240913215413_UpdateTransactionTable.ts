import { Migration } from '@mikro-orm/migrations';

export class Migration20240913215413_UpdateTransactionTable extends Migration {

  override async up(): Promise<void> {
    this.addSql('alter table `transactions` drop index `transactions_payment_uuid_unique`;');

    this.addSql('alter table `transactions` add index `transactions_payment_uuid_index`(`payment_uuid`);');
  }

  override async down(): Promise<void> {
    this.addSql('alter table `transactions` drop index `transactions_payment_uuid_index`;');

    this.addSql('alter table `transactions` add unique `transactions_payment_uuid_unique`(`payment_uuid`);');
  }

}
