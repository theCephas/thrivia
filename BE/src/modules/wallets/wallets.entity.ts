import {
  Entity,
  Enum,
  Filter,
  ManyToOne,
  PrimaryKey,
  Property,
  Unique,
} from '@mikro-orm/core';
import { Timestamp } from '../../base/timestamp.entity';
import { Cooperatives } from '../cooperatives/cooperatives.entity';
import { Users } from '../users/users.entity';
import { TransactionType } from 'src/types';

@Filter({
  name: 'notDeleted',
  cond: { deletedAt: null },
  default: true,
})
@Entity({ tableName: 'wallets' })
export class Wallets extends Timestamp {
  @PrimaryKey()
  id!: number;

  @Property()
  @Unique()
  uuid!: string;

  @Property()
  title!: string;

  @Property({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  balance: string;

  @ManyToOne(() => Cooperatives, {
    fieldName: 'cooperative_uuid',
    referenceColumnName: 'uuid',
    joinColumn: 'uuid',
    columnType: 'varchar(255)',
  })
  cooperative: Cooperatives;

  @ManyToOne(() => Users, {
    fieldName: 'user_uuid',
    referenceColumnName: 'uuid',
    joinColumn: 'uuid',
    columnType: 'varchar(255)',
  })
  user: Users;

  @ManyToOne(() => Users, {
    fieldName: 'created_by',
    referenceColumnName: 'uuid',
    joinColumn: 'uuid',
    columnType: 'varchar(255)',
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
  id!: number;

  @Property()
  @Unique()
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
  })
  wallet!: Wallets;

  @Property({ type: 'longtext' })
  walletSnapshot: string;

  @Property()
  remark: string;
}
