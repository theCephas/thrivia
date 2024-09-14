import {
  Entity,
  Enum,
  Filter,
  ManyToOne,
  OneToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Timestamp } from '../../base/timestamp.entity';
import { Cooperatives, Payments } from '../cooperatives/cooperatives.entity';
import { Users } from '../users/users.entity';
import { TransactionType } from '../../types';

@Filter({
  name: 'notDeleted',
  cond: { deletedAt: null },
  default: true,
})
@Entity({ tableName: 'wallets' })
export class Wallets extends Timestamp {
  @PrimaryKey()
  uuid!: string;

  @Property()
  title!: string;

  @Property({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  availableBalance: number;

  @Property({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  totalBalance: number;

  @ManyToOne(() => Cooperatives, {
    fieldName: 'cooperative_uuid',
    referenceColumnName: 'uuid',
    joinColumn: 'uuid',
    columnType: 'varchar(255)',
    nullable: true,
    eager: true
  })
  cooperative: Cooperatives;

  @ManyToOne(() => Users, {
    fieldName: 'user_uuid',
    referenceColumnName: 'uuid',
    joinColumn: 'uuid',
    columnType: 'varchar(255)',
    nullable: true
  })
  user: Users;

  @ManyToOne(() => Users, {
    fieldName: 'created_by',
    referenceColumnName: 'uuid',
    joinColumn: 'uuid',
    columnType: 'varchar(255)',
    nullable: true
  })
  createdBy: Users;
}

@Filter({
  name: 'notDeleted',
  cond: { deletedAt: null },
  default: true,
})
@Entity({ tableName: 'transactions' })
export class Transactions extends Timestamp {
  @PrimaryKey()
  uuid!: string;

  @Enum({ items: () => TransactionType })
  type!: TransactionType;

  @Property({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  balanceBefore!: number;

  @Property({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  balanceAfter!: number;

  @Property({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  amount!: number;

  @ManyToOne(() => Wallets, {
    fieldName: 'wallet_uuid',
    referenceColumnName: 'uuid',
    joinColumn: 'uuid',
    columnType: 'varchar(255)',
    nullable: true
  })
  wallet!: Wallets;

  @ManyToOne(() => Users, {
    fieldName: 'user_uuid',
    referenceColumnName: 'uuid',
    joinColumn: 'uuid',
    columnType: 'varchar(255)',
    nullable: true
  })
  user!: Users;

  @ManyToOne(() => Payments, {
    fieldName: 'payment_uuid',
    referenceColumnName: 'uuid',
    joinColumn: 'uuid',
    columnType: 'varchar(255)',
  })
  payment!: Payments;

  @Property({ type: 'longtext' })
  walletSnapshot: string;

  @Property()
  remark: string;

  @Property({ default: true })
  locked: boolean;
}
