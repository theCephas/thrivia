import { Migration } from '@mikro-orm/migrations';

export class Migration20240914212715_AddBankCodeToCooperative extends Migration {

  override async up(): Promise<void> {
    this.addSql('alter table `cooperatives` add `bank_code` varchar(255) null;');
  }

  override async down(): Promise<void> {
    this.addSql('alter table `cooperatives` drop column `bank_code`;');
  }

}
