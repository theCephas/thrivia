import { Migration } from '@mikro-orm/migrations';

export class Migration20240902072436_AddWithdrawalRequests extends Migration {

  override async up(): Promise<void> {
    this.addSql('create table `withdrawal_requests` (`id` int unsigned not null auto_increment primary key, `created_at` datetime not null default CURRENT_TIMESTAMP, `updated_at` datetime not null default CURRENT_TIMESTAMP, `deleted_at` datetime null, `uuid` varchar(255) not null, `user_uuid` varchar(255) not null, `cooperative_uuid` varchar(255) not null, `wallet_uuid` varchar(255) not null, `status` enum(\'PENDING\', \'APPROVED\', \'REJECTED\') not null, `reviewed_by` varchar(255) not null, `rejection_reason` varchar(255) null, `reviewed_at` datetime null, `bank_name` varchar(255) not null, `bank_code` varchar(255) not null, `account_number` varchar(255) not null, `account_name` varchar(255) not null, `purpose` varchar(255) null, `amount` numeric(10,2) not null default 0) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `withdrawal_requests` add unique `withdrawal_requests_uuid_unique`(`uuid`);');
    this.addSql('alter table `withdrawal_requests` add index `withdrawal_requests_user_uuid_index`(`user_uuid`);');
    this.addSql('alter table `withdrawal_requests` add index `withdrawal_requests_cooperative_uuid_index`(`cooperative_uuid`);');
    this.addSql('alter table `withdrawal_requests` add index `withdrawal_requests_wallet_uuid_index`(`wallet_uuid`);');
    this.addSql('alter table `withdrawal_requests` add index `withdrawal_requests_reviewed_by_index`(`reviewed_by`);');

    this.addSql('alter table `withdrawal_requests` add constraint `withdrawal_requests_user_uuid_foreign` foreign key (`user_uuid`) references `users` (`uuid`) on update cascade;');
    this.addSql('alter table `withdrawal_requests` add constraint `withdrawal_requests_cooperative_uuid_foreign` foreign key (`cooperative_uuid`) references `cooperatives` (`uuid`) on update cascade;');
    this.addSql('alter table `withdrawal_requests` add constraint `withdrawal_requests_wallet_uuid_foreign` foreign key (`wallet_uuid`) references `wallets` (`uuid`) on update cascade;');
    this.addSql('alter table `withdrawal_requests` add constraint `withdrawal_requests_reviewed_by_foreign` foreign key (`reviewed_by`) references `users` (`uuid`) on update cascade;');
  }

  override async down(): Promise<void> {
    this.addSql('drop table if exists `withdrawal_requests`;');
  }

}
