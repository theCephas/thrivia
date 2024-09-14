import {
  Entity,
  Enum,
  Filter,
  ManyToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Timestamp } from '../../base/timestamp.entity';
import { Users } from '../users/users.entity';
import { ApplicationStatus, Currencies, PaymentType, Role } from '../../types';
import { Wallets } from '../wallets/wallets.entity';

@Filter({
  name: 'notDeleted',
  cond: { deletedAt: null },
  default: true,
})
@Entity({ tableName: 'cooperatives' })
export class Cooperatives extends Timestamp {
  @PrimaryKey()
  uuid!: string;

  @Property()
  name!: string;

  @Property()
  regNo!: string;

  @Property()
  address!: string;

  @Property()
  contactEmail!: string;

  @Property()
  contactPhone!: string;

  @Property()
  bankName!: string;

  @Property({ nullable: true })
  bankCode: string;

  @Property()
  accountNo!: string;

  @Property()
  accountName!: string;

  @Property()
  uniqueId!: string;

  @Property()
  slug!: string;

  @Property({ nullable: true })
  profilePic: string;

  @ManyToOne(() => Users, {
    fieldName: 'user_uuid',
    referenceColumnName: 'uuid',
    joinColumn: 'uuid',
    columnType: 'varchar(255)',
    nullable: true,
    eager: true
  })
  createdBy: Users;
}

@Filter({
  name: 'notDeleted',
  cond: { deletedAt: null },
  default: true,
})
@Entity({ tableName: 'cooperative_users' })
export class CooperativeUsers extends Timestamp {
  @PrimaryKey()
  uuid!: string;

  @ManyToOne(() => Users, {
    fieldName: 'user_uuid',
    referenceColumnName: 'uuid',
    joinColumn: 'uuid',
    columnType: 'varchar(255)',
    eager: true,
    nullable: true
  })
  user: Users;

  @ManyToOne(() => Cooperatives, {
    fieldName: 'cooperative_uuid',
    referenceColumnName: 'uuid',
    joinColumn: 'uuid',
    columnType: 'varchar(255)',
    nullable: true,
    eager: true
  })
  cooperative: Cooperatives;

  @Enum({ items: () => Role, default: Role.MEMBER })
  role!: Role;
}

@Filter({
  name: 'notDeleted',
  cond: { deletedAt: null },
  default: true,
})
@Entity({ tableName: 'withdrawal_requests' })
export class WithdrawalRequests extends Timestamp {
  @PrimaryKey()
  uuid!: string;

  @ManyToOne(() => Users, {
    fieldName: 'user_uuid',
    referenceColumnName: 'uuid',
    joinColumn: 'uuid',
    columnType: 'varchar(255)',
    nullable: true,
  })
  user: Users;

  @ManyToOne(() => Cooperatives, {
    fieldName: 'cooperative_uuid',
    referenceColumnName: 'uuid',
    joinColumn: 'uuid',
    columnType: 'varchar(255)',
    eager: true,
    nullable: true,
  })
  cooperative: Cooperatives;

  @ManyToOne(() => Wallets, {
    fieldName: 'wallet_uuid',
    referenceColumnName: 'uuid',
    joinColumn: 'uuid',
    columnType: 'varchar(255)',
    eager: true,
    nullable: true
  })
  wallet: Wallets;

  @Enum({ items: () => ApplicationStatus })
  status: ApplicationStatus;

  @ManyToOne(() => Users, {
    fieldName: 'reviewed_by',
    referenceColumnName: 'uuid',
    joinColumn: 'uuid',
    columnType: 'varchar(255)',
    nullable: true
  })
  reviewedBy: Users;

  @Property({ nullable: true })
  rejectionReason: string;

  @Property({ type: 'datetime', nullable: true })
  reviewedAt: Date;

  @Property()
  bankName: string;

  @Property()
  bankCode: string;

  @Property()
  accountNumber: string;

  @Property()
  accountName: string;

  @Property({ nullable: true })
  purpose: string;

  @Property({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  amount: number;
}

@Filter({
  name: 'notDeleted',
  cond: { deletedAt: null },
  default: true,
})
@Entity({ tableName: 'cooperative_applications' })
export class CooperativeApplications extends Timestamp {
  @PrimaryKey()
  uuid!: string;

  @Property()
  uniqueId!: string;

  @Property({ nullable: true })
  membershipNo: string;

  @Property()
  fullName!: string;

  @Property()
  dateOfBirth!: string;

  @Property()
  phoneNumber!: string;

  @Property({ nullable: true })
  email: string;

  @Property()
  address!: string;

  @Property({ type: 'longtext', nullable: true })
  additionalDetails: string;

  @ManyToOne(() => Users, {
    fieldName: 'reviewed_by',
    referenceColumnName: 'uuid',
    joinColumn: 'uuid',
    columnType: 'varchar(255)',
    eager: true,
    nullable: true,
  })
  reviewedBy: Users;

  @ManyToOne(() => Users, {
    fieldName: 'user_uuid',
    referenceColumnName: 'uuid',
    joinColumn: 'uuid',
    columnType: 'varchar(255)',
    eager: true,
    nullable: true,
  })
  user: Users;

  @ManyToOne(() => Cooperatives, {
    fieldName: 'cooperative_uuid',
    referenceColumnName: 'uuid',
    joinColumn: 'uuid',
    columnType: 'varchar(255)',
    nullable: true
  })
  cooperative: Cooperatives;

  @Property({ type: 'datetime', nullable: true })
  reviewedAt: Date;

  @Property({ nullable: true })
  rejectionReason: string;

  @Enum({ items: () => ApplicationStatus })
  status: ApplicationStatus;
}

@Filter({
  name: 'notDeleted',
  cond: { deletedAt: null },
  default: true,
})
@Entity({ tableName: 'payments' })
export class Payments extends Timestamp {
  @PrimaryKey()
  uuid!: string;

  @Property()
  transactionId!: string;

  @Property()
  status: string;

  @Property()
  amount: number;

  @Property()
  channel: string;

  @Property({ type: 'longtext', nullable: true })
  metadata: string;

  @Enum({ items: () => PaymentType })
  type: PaymentType;

  @Enum({ items: () => Currencies })
  currencies: Currencies;
}
