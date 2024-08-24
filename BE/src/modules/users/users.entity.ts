import { Entity, Filter, PrimaryKey, Property, Unique } from '@mikro-orm/core';
import { Timestamp } from '../../base/timestamp.entity';

@Filter({
  name: 'notDeleted',
  cond: { deletedAt: null },
  default: true,
})
@Entity({ tableName: 'otp' })
export class OTP extends Timestamp {
  @PrimaryKey()
  id!: number;

  @Property({ length: 6 })
  otp!: string;

  @Property()
  pinId!: string;

  @Property({ type: 'datetime', nullable: true })
  expiredAt: Date;
}

@Filter({
  name: 'notDeleted',
  cond: { deletedAt: null },
  default: true,
})
@Entity({ tableName: 'users' })
export class Users extends Timestamp {
  @PrimaryKey()
  id!: number;

  @Property()
  @Unique()
  uuid!: string;

  @Property()
  firstName!: string;

  @Property()
  lastName!: string;

  @Property()
  @Unique()
  phoneNumber!: string;

  @Property({ nullable: true })
  @Unique()
  email: string;

  @Property()
  password: string;

  @Property({ nullable: true })
  membershipNo: string;

  @Property({ nullable: true })
  dateOfBirth: string;

  @Property({ nullable: true })
  address: string;

  @Property({ default: false })
  phoneVerified: boolean;

  @Property({ type: 'datetime', nullable: true })
  lastLoggedIn: Date;

  @Property({ type: 'longtext', nullable: true })
  incomeSource: string;

  @Property({ type: 'longtext', nullable: true })
  employmentDetails: string;

  @Property({ type: 'longtext', nullable: true })
  additionalDetails: string;
}
