import { Migration } from '@mikro-orm/migrations';

export class Migration20240824045747_InitialMigration extends Migration {

  override async up(): Promise<void> {
    this.addSql('create table `notification_templates` (`id` int unsigned not null auto_increment primary key, `created_at` datetime not null default CURRENT_TIMESTAMP, `updated_at` datetime not null default CURRENT_TIMESTAMP, `deleted_at` datetime null, `code` varchar(255) not null, `body` longtext not null) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `notification_templates` add unique `notification_templates_code_unique`(`code`);');

    this.addSql('create table `otp` (`id` int unsigned not null auto_increment primary key, `created_at` datetime not null default CURRENT_TIMESTAMP, `updated_at` datetime not null default CURRENT_TIMESTAMP, `deleted_at` datetime null, `otp` varchar(6) not null, `pin_id` varchar(255) not null, `expired_at` datetime null) default character set utf8mb4 engine = InnoDB;');

    this.addSql('create table `users` (`id` int unsigned not null auto_increment primary key, `created_at` datetime not null default CURRENT_TIMESTAMP, `updated_at` datetime not null default CURRENT_TIMESTAMP, `deleted_at` datetime null, `uuid` varchar(255) not null, `first_name` varchar(255) not null, `last_name` varchar(255) not null, `phone_number` varchar(255) not null, `email` varchar(255) null, `password` varchar(255) not null, `membership_no` varchar(255) null, `date_of_birth` varchar(255) null, `address` varchar(255) null, `phone_verified` tinyint(1) not null default false, `last_logged_in` datetime null, `income_source` longtext null, `employment_details` longtext null, `additional_details` longtext null) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `users` add unique `users_uuid_unique`(`uuid`);');
    this.addSql('alter table `users` add unique `users_phone_number_unique`(`phone_number`);');
    this.addSql('alter table `users` add unique `users_email_unique`(`email`);');
  }

  override async down(): Promise<void> {
    this.addSql('drop table if exists `notification_templates`;');

    this.addSql('drop table if exists `otp`;');

    this.addSql('drop table if exists `users`;');
  }

}
