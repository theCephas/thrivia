import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import {
  CooperativeApplications,
  Cooperatives,
  CooperativeUsers,
  Payments,
  WithdrawalRequests,
} from './cooperatives.entity';
import { CooperativesController } from './cooperatives.controller';
import { CooperativesService } from './cooperatives.service';
import { Transactions, Wallets } from '../wallets/wallets.entity';
import { ConfigModule } from '@nestjs/config';
import { MonnifyConfiguration } from 'src/config/configuration';
import { WalletsModule } from '../wallets/wallets.module';
import { SharedModule } from '../shared/shared.module';
import { Users } from '../users/users.entity';
import { Loans } from '../loans/loans.entity';

@Module({
  imports: [
    MikroOrmModule.forFeature({
      entities: [
        Cooperatives,
        CooperativeUsers,
        Wallets,
        CooperativeApplications,
        Transactions,
        Payments,
        WithdrawalRequests,
        Users,
        Loans
      ],
    }),
    ConfigModule.forFeature(MonnifyConfiguration),
    WalletsModule,
    SharedModule,
  ],
  controllers: [CooperativesController],
  providers: [CooperativesService],
  exports: [CooperativesService],
})
export class CooperativesModule {}
