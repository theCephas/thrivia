import { Entity, Enum, Filter, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Timestamp } from "../../base/timestamp.entity";
import { Cooperatives } from "../cooperatives/cooperatives.entity";
import { Users } from "../users/users.entity";
import { LoanStatus } from "../../types";

@Filter({
  name: 'notDeleted',
  cond: { deletedAt: null },
  default: true,
})
@Entity({ tableName: 'loans' })
export class Loans extends Timestamp {
  @PrimaryKey()
  uuid!: string;

  @Property({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  requestedAmount: number;

  @Property({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  balance: number;

  @Property({ type: 'date', nullable: true })
  startDate: Date;

  @Property({ type: 'date', nullable: true })
  endDate: Date;

  @Enum({ items: () => LoanStatus })
  status: LoanStatus;

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

  @Property({ nullable: true })
  cancellationReason: string;

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

  @ManyToOne(() => Users, {
    fieldName: 'user_uuid',
    referenceColumnName: 'uuid',
    joinColumn: 'uuid',
    columnType: 'varchar(255)',
    nullable: true,
    eager: true
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
}

@Filter({
  name: 'notDeleted',
  cond: { deletedAt: null },
  default: true,
})
@Entity({ tableName: 'loan_history' })
export class LoanHistory extends Timestamp {
  @PrimaryKey()
  uuid!: string;

  @Property()
  action: string;

  @ManyToOne(() => Loans, {
    fieldName: 'loan_uuid',
    referenceColumnName: 'uuid',
    joinColumn: 'uuid',
    columnType: 'varchar(255)',
    eager: true,
    nullable: true,
  })
  loan: Loans;
}