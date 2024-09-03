import { MikroOrmModule } from '@mikro-orm/nestjs';
import { forwardRef, Module } from '@nestjs/common';
import { Users } from './users.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SharedModule } from '../shared/shared.module';
import { AuthModule } from '../auth/auth.module';
import {
  CooperativeApplications,
  Cooperatives,
  CooperativeUsers,
  Payments,
  WithdrawalRequests,
} from '../cooperatives/cooperatives.entity';
import { Transactions, Wallets } from '../wallets/wallets.entity';
import { WalletsModule } from '../wallets/wallets.module';

@Module({
  imports: [
    MikroOrmModule.forFeature({
      entities: [
        Users,
        CooperativeUsers,
        Cooperatives,
        CooperativeApplications,
        Payments,
        Transactions,
        Wallets,
        WithdrawalRequests,
      ],
    }),
    SharedModule,
    WalletsModule,
    forwardRef(() => AuthModule),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
