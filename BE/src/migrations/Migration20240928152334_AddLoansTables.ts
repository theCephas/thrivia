import { Migration } from '@mikro-orm/migrations';

export class Migration20240928152334_AddLoansTables extends Migration {

  override async up(): Promise<void> {
    this.addSql('create table `loans` (`uuid` varchar(255) not null, `created_at` datetime not null default CURRENT_TIMESTAMP, `updated_at` datetime not null default CURRENT_TIMESTAMP, `deleted_at` datetime null, `requested_amount` numeric(10,2) not null default 0, `balance` numeric(10,2) not null default 0, `start_date` date not null, `end_date` date not null, `status` enum(\'PENDING\', \'ACTIVE\', \'REJECTED\', \'CANCELLED\', \'CLOSED\', \'OVERDUE\') not null, `reviewed_by` varchar(255) null, `rejection_reason` varchar(255) null, `cancellation_reason` varchar(255) null, `reviewed_at` datetime null, `bank_name` varchar(255) not null, `bank_code` varchar(255) not null, `account_number` varchar(255) not null, `account_name` varchar(255) not null, `purpose` varchar(255) null, `user_uuid` varchar(255) null, `cooperative_uuid` varchar(255) null, primary key (`uuid`)) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `loans` add index `loans_reviewed_by_index`(`reviewed_by`);');
    this.addSql('alter table `loans` add index `loans_user_uuid_index`(`user_uuid`);');
    this.addSql('alter table `loans` add index `loans_cooperative_uuid_index`(`cooperative_uuid`);');

    this.addSql('create table `loan_history` (`uuid` varchar(255) not null, `created_at` datetime not null default CURRENT_TIMESTAMP, `updated_at` datetime not null default CURRENT_TIMESTAMP, `deleted_at` datetime null, `action` varchar(255) not null, `loan_uuid` varchar(255) null, primary key (`uuid`)) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `loan_history` add index `loan_history_loan_uuid_index`(`loan_uuid`);');

    this.addSql('alter table `loans` add constraint `loans_reviewed_by_foreign` foreign key (`reviewed_by`) references `users` (`uuid`) on update cascade on delete set null;');
    this.addSql('alter table `loans` add constraint `loans_user_uuid_foreign` foreign key (`user_uuid`) references `users` (`uuid`) on update cascade on delete set null;');
    this.addSql('alter table `loans` add constraint `loans_cooperative_uuid_foreign` foreign key (`cooperative_uuid`) references `cooperatives` (`uuid`) on update cascade on delete set null;');

    this.addSql('alter table `loan_history` add constraint `loan_history_loan_uuid_foreign` foreign key (`loan_uuid`) references `loans` (`uuid`) on update cascade on delete set null;');
  }

  override async down(): Promise<void> {
    this.addSql('alter table `loan_history` drop foreign key `loan_history_loan_uuid_foreign`;');

    this.addSql('drop table if exists `loans`;');

    this.addSql('drop table if exists `loan_history`;');
  }

}
