import { Migration } from '@mikro-orm/migrations';

export class Migration20240901105430_AddMoreTables extends Migration {

  override async up(): Promise<void> {
    this.addSql('create table `payments` (`id` int unsigned not null auto_increment primary key, `created_at` datetime not null default CURRENT_TIMESTAMP, `updated_at` datetime not null default CURRENT_TIMESTAMP, `deleted_at` datetime null, `uuid` varchar(255) not null, `transaction_id` varchar(255) not null, `status` varchar(255) not null, `amount` int not null, `channel` varchar(255) not null, `metadata` varchar(255) not null, `type` enum(\'incoming\', \'outgoing\') not null, `currencies` enum(\'NGN\') not null) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `payments` add unique `payments_uuid_unique`(`uuid`);');

    this.addSql('create table `cooperatives` (`id` int unsigned not null auto_increment primary key, `created_at` datetime not null default CURRENT_TIMESTAMP, `updated_at` datetime not null default CURRENT_TIMESTAMP, `deleted_at` datetime null, `uuid` varchar(255) not null, `name` varchar(255) not null, `reg_no` varchar(255) not null, `address` varchar(255) not null, `contact_email` varchar(255) not null, `contact_phone` varchar(255) not null, `bank_name` varchar(255) not null, `account_no` varchar(255) not null, `account_name` varchar(255) not null, `unique_id` varchar(255) not null, `slug` varchar(255) not null, `profile_pic` varchar(255) null, `user_uuid` varchar(255) not null) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `cooperatives` add unique `cooperatives_uuid_unique`(`uuid`);');
    this.addSql('alter table `cooperatives` add index `cooperatives_user_uuid_index`(`user_uuid`);');

    this.addSql('create table `cooperative_users` (`id` int unsigned not null auto_increment primary key, `created_at` datetime not null default CURRENT_TIMESTAMP, `updated_at` datetime not null default CURRENT_TIMESTAMP, `deleted_at` datetime null, `uuid` varchar(255) not null, `user_uuid` varchar(255) not null, `cooperative_uuid` varchar(255) not null, `role` enum(\'MANAGER\', \'MEMBER\') not null default \'MEMBER\') default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `cooperative_users` add unique `cooperative_users_uuid_unique`(`uuid`);');
    this.addSql('alter table `cooperative_users` add index `cooperative_users_user_uuid_index`(`user_uuid`);');
    this.addSql('alter table `cooperative_users` add index `cooperative_users_cooperative_uuid_index`(`cooperative_uuid`);');

    this.addSql('create table `cooperative_applications` (`id` int unsigned not null auto_increment primary key, `created_at` datetime not null default CURRENT_TIMESTAMP, `updated_at` datetime not null default CURRENT_TIMESTAMP, `deleted_at` datetime null, `uuid` varchar(255) not null, `unique_id` varchar(255) not null, `membership_no` varchar(255) null, `full_name` varchar(255) not null, `date_of_birth` varchar(255) not null, `phone_number` varchar(255) not null, `email` varchar(255) null, `address` varchar(255) not null, `additional_details` longtext null, `reviewed_by` varchar(255) not null, `user_uuid` varchar(255) not null, `cooperative_uuid` varchar(255) not null, `reviewed_at` datetime null, `rejection_reason` varchar(255) null, `status` enum(\'PENDING\', \'APPROVED\', \'REJECTED\') not null) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `cooperative_applications` add unique `cooperative_applications_uuid_unique`(`uuid`);');
    this.addSql('alter table `cooperative_applications` add index `cooperative_applications_reviewed_by_index`(`reviewed_by`);');
    this.addSql('alter table `cooperative_applications` add index `cooperative_applications_user_uuid_index`(`user_uuid`);');
    this.addSql('alter table `cooperative_applications` add index `cooperative_applications_cooperative_uuid_index`(`cooperative_uuid`);');

    this.addSql('create table `wallets` (`id` int unsigned not null auto_increment primary key, `created_at` datetime not null default CURRENT_TIMESTAMP, `updated_at` datetime not null default CURRENT_TIMESTAMP, `deleted_at` datetime null, `uuid` varchar(255) not null, `title` varchar(255) not null, `balance` numeric(10,2) not null default 0, `cooperative_uuid` varchar(255) not null, `user_uuid` varchar(255) not null, `created_by` varchar(255) not null) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `wallets` add unique `wallets_uuid_unique`(`uuid`);');
    this.addSql('alter table `wallets` add index `wallets_cooperative_uuid_index`(`cooperative_uuid`);');
    this.addSql('alter table `wallets` add index `wallets_user_uuid_index`(`user_uuid`);');
    this.addSql('alter table `wallets` add index `wallets_created_by_index`(`created_by`);');

    this.addSql('create table `transactions` (`id` int unsigned not null auto_increment primary key, `created_at` datetime not null default CURRENT_TIMESTAMP, `updated_at` datetime not null default CURRENT_TIMESTAMP, `deleted_at` datetime null, `uuid` varchar(255) not null, `type` enum(\'credit\', \'debit\') not null, `balance_before` numeric(10,2) not null default 0, `balance_after` numeric(10,2) not null default 0, `amount` numeric(10,2) not null default 0, `wallet_uuid` varchar(255) not null, `user_uuid` varchar(255) not null, `payment_uuid` varchar(255) not null, `wallet_snapshot` longtext not null, `remark` varchar(255) not null) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `transactions` add unique `transactions_uuid_unique`(`uuid`);');
    this.addSql('alter table `transactions` add index `transactions_wallet_uuid_index`(`wallet_uuid`);');
    this.addSql('alter table `transactions` add index `transactions_user_uuid_index`(`user_uuid`);');
    this.addSql('alter table `transactions` add unique `transactions_payment_uuid_unique`(`payment_uuid`);');

    this.addSql('alter table `cooperatives` add constraint `cooperatives_user_uuid_foreign` foreign key (`user_uuid`) references `users` (`uuid`) on update cascade;');

    this.addSql('alter table `cooperative_users` add constraint `cooperative_users_user_uuid_foreign` foreign key (`user_uuid`) references `users` (`uuid`) on update cascade;');
    this.addSql('alter table `cooperative_users` add constraint `cooperative_users_cooperative_uuid_foreign` foreign key (`cooperative_uuid`) references `cooperatives` (`uuid`) on update cascade;');

    this.addSql('alter table `cooperative_applications` add constraint `cooperative_applications_reviewed_by_foreign` foreign key (`reviewed_by`) references `users` (`uuid`) on update cascade;');
    this.addSql('alter table `cooperative_applications` add constraint `cooperative_applications_user_uuid_foreign` foreign key (`user_uuid`) references `users` (`uuid`) on update cascade;');
    this.addSql('alter table `cooperative_applications` add constraint `cooperative_applications_cooperative_uuid_foreign` foreign key (`cooperative_uuid`) references `cooperatives` (`uuid`) on update cascade;');

    this.addSql('alter table `wallets` add constraint `wallets_cooperative_uuid_foreign` foreign key (`cooperative_uuid`) references `cooperatives` (`uuid`) on update cascade;');
    this.addSql('alter table `wallets` add constraint `wallets_user_uuid_foreign` foreign key (`user_uuid`) references `users` (`uuid`) on update cascade;');
    this.addSql('alter table `wallets` add constraint `wallets_created_by_foreign` foreign key (`created_by`) references `users` (`uuid`) on update cascade;');

    this.addSql('alter table `transactions` add constraint `transactions_wallet_uuid_foreign` foreign key (`wallet_uuid`) references `wallets` (`uuid`) on update cascade;');
    this.addSql('alter table `transactions` add constraint `transactions_user_uuid_foreign` foreign key (`user_uuid`) references `users` (`uuid`) on update cascade;');
    this.addSql('alter table `transactions` add constraint `transactions_payment_uuid_foreign` foreign key (`payment_uuid`) references `payments` (`uuid`) on update cascade;');
  }

  override async down(): Promise<void> {
    this.addSql('alter table `transactions` drop foreign key `transactions_payment_uuid_foreign`;');

    this.addSql('alter table `cooperative_users` drop foreign key `cooperative_users_cooperative_uuid_foreign`;');

    this.addSql('alter table `cooperative_applications` drop foreign key `cooperative_applications_cooperative_uuid_foreign`;');

    this.addSql('alter table `wallets` drop foreign key `wallets_cooperative_uuid_foreign`;');

    this.addSql('alter table `transactions` drop foreign key `transactions_wallet_uuid_foreign`;');

    this.addSql('drop table if exists `payments`;');

    this.addSql('drop table if exists `cooperatives`;');

    this.addSql('drop table if exists `cooperative_users`;');

    this.addSql('drop table if exists `cooperative_applications`;');

    this.addSql('drop table if exists `wallets`;');

    this.addSql('drop table if exists `transactions`;');
  }

}
