import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { Transactions, Wallets } from './wallets.entity';
import { WalletController } from './wallets.controller';
import { WalletsService } from './wallets.service';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [
    MikroOrmModule.forFeature({ entities: [Wallets, Transactions] }),
    SharedModule,
  ],
  controllers: [WalletController],
  providers: [WalletsService],
  exports: [WalletsService],
})
export class WalletsModule {}
