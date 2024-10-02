import { Migration } from '@mikro-orm/migrations';

export class Migration20240930220118_MakeLoanDatesOptional extends Migration {

  override async up(): Promise<void> {
    this.addSql('alter table `loans` modify `start_date` date null, modify `end_date` date null;');
  }

  override async down(): Promise<void> {
    this.addSql('alter table `loans` modify `start_date` date not null, modify `end_date` date not null;');
  }

}
