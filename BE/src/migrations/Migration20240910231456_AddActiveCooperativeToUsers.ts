import { Migration } from '@mikro-orm/migrations';

export class Migration20240910231456_AddActiveCooperativeToUsers extends Migration {

  override async up(): Promise<void> {
    this.addSql('alter table `users` add `active_cooperative` varchar(255) null;');
    this.addSql('alter table `users` add constraint `users_active_cooperative_foreign` foreign key (`active_cooperative`) references `cooperatives` (`uuid`) on update cascade on delete set null;');
    this.addSql('alter table `users` add index `users_active_cooperative_index`(`active_cooperative`);');
  }

  override async down(): Promise<void> {
    this.addSql('alter table `users` drop foreign key `users_active_cooperative_foreign`;');

    this.addSql('alter table `users` drop index `users_active_cooperative_index`;');
    this.addSql('alter table `users` drop column `active_cooperative`;');
  }

}
