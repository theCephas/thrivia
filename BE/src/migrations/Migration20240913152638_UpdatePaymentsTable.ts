import { Migration } from '@mikro-orm/migrations';

export class Migration20240913152638_UpdatePaymentsTable extends Migration {

  override async up(): Promise<void> {
    this.addSql('alter table `payments` modify `metadata` longtext null;');
  }

  override async down(): Promise<void> {
    this.addSql('alter table `payments` modify `metadata` varchar(255) not null;');
  }

}
